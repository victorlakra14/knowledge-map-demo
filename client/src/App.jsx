import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow
} from "reactflow";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { TopicNode } from "./nodes/TopicNode";
import { BottomBar } from "./components/BottomBar/BottomBar";
import TopicEdges from "./edges/TopicEdges";
import axiosInstance from "./Axios";
import { v4 } from "uuid";
import Dagre from "@dagrejs/dagre";
import { TopRightPanel } from "./components/TopRightPanel/TopRightPanel";
import "reactflow/dist/style.css";

const nodeTypes = {
  topicNode: TopicNode,
};

const edgeTypes = {
  topicEdge: TopicEdges,
};

// layout implentation
const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  // g.setGraph({ rankdir: "LR" });
  if(options.direction === "TB"){
    g.setGraph({
      rankdir: options.direction,
      ranksep: 200,
      nodesep: 200,
    });
  }else{
    g.setGraph({
      rankdir: options.direction,
    });
  }

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges
  };
};

function App() {
  const { fitView } = useReactFlow();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const [reload, setReload] = useState(false);

  const onConnect = useCallback(async (connection) => {
    const edgeObj = {
      id: v4(),
      source: connection.source,
      target: connection.target,
    };

    setEdges((eds) => addEdge(connection, eds));

    try {
      const res = await axiosInstance.post("/edge/add", edgeObj);
      setReload(true); // to fetch the updated data from the server as new edge is added and we don't have the edge id
      console.log("Edge added successfully", res);
    } catch (err) {
      alert(err.message);
    }
  }, []);

  const onEdgesDelete = useCallback(async (edgeID) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeID));
    try {
      const res = await axiosInstance.delete(`/edge/delete/${edgeID[0]._id}`);
      console.log("Edge deleted successfully", res);
    } catch (err) {
      alert(err.message);
    }
  }, []);

  const onNodeDragStop = useCallback(
    async (event, node) => {
      const { id, position, _id } = node;

      setNodes((nds) => 
        nds.map((node)=>
          node.id === id ? {...node, position} : node
        )
      );

      try {
        // const res = await axiosInstance.put(`/node/updateposition/${_id}`, {position});
        const res = await axiosInstance.put(`/testNodes/updateposition/${_id}`, {position});
        console.log("Node position updated successfully", res);
      } catch (err) {
        alert(err.message);
      }
    }, []
  )

  // const main grade selection
  const [mainGrade, setMainGrade] = useState([]);

  // Test server backend data fetch
  const getNodes = async () => {
    try {
      const res = await axiosInstance.get("/testNodes");
      // const res = await axiosInstance.get("/node");
      const nodesWithIdAsString = res.data.testNodes.map(node => ({
        ...node,
        id: String(node.id)
      }));
      setNodes(nodesWithIdAsString);
      // setNodes(res.data.nodes);
    } catch (err) {
      alert(err.message);
    }
  };

  const getEdges = async () => {
    try {
      const res = await axiosInstance.get("/edge");
      setEdges(res.data.edges);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getNodes();
    getEdges();
    if(reload){
      setReload(false);
    }
  }, [reload]);

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  )

  return (
    <>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onNodeDragStop={onNodeDragStop}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onEdgesDelete={onEdgesDelete}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap nodeStrokeWidth={3} />
        </ReactFlow>
        <Panel position="top-left">
          <div style={{display: "flex", gap: "10px", backgroundColor: "white"}}>
            <button onClick={() => onLayout("TB")}>Horizontal</button>
            <button onClick={() => onLayout("LR")}>Vertical</button>
          </div>
        </Panel>
        <Panel position="top-right">
          <TopRightPanel />
        </Panel>
        <Panel position="bottom-center">
          <BottomBar
            setReload={setReload}
            mainGrade={mainGrade}
            setMainGrade={setMainGrade}
            setNodes={setNodes}
          />
        </Panel>
      </ReactFlowProvider>
    </>
  );
}

export default App;
