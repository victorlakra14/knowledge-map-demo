import ReactFlow, { Background, Controls, Panel, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import './App.css';
import { useCallback, useState } from 'react';
import { TopicNode } from './nodes/TopicNode';
import { BottomBar } from './components/BottomBar/BottomBar';
import TopicEdges from './edges/TopicEdges';

const initialNodes = [
  {
    id: 'n-1',
    position: {x:0, y:0},
    data: {label: "Topic 1-1" },
    type: 'topicNode'
  },
  {
    id: 'n-2',
    position: {x: 200, y: 100},
    data: {label: "Topic 1-2"},
    type: 'topicNode'
  },
  {
    id: 'n-3',
    position: {x: 320, y: 230},
    data: {label: "Topic 1-3"},
    type: 'topicNode'
  },
  {
    id: 'n-999',
    position: {x: 500, y: 200},
    data: {label: "Topic output"},
    type: 'topicNode'
  }
]

const nodeTypes = {
  topicNode: TopicNode
}

const edgeTypes = {
  topicEdge: TopicEdges
}

function App() {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  )

  // const onConnect = useCallback(
  //   (connection) => {
  //     const edge = { ...connection, type: 'topicEdge' };
  //     setEdges((eds) => addEdge(edge, eds));
  //   },
  //   [setEdges],
  // );

  const addNewNode = () => {
    const newNode = {
      id: `n-${nodes.length + 1}`,
      position: { x: 200, y: 200 },
      data: { label: `Topic ${mainGrade} - ${nodes.length + 1}` },
      type: 'topicNode'
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  // const main grade selection
  const [mainGrade, setMainGrade] = useState(1);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <Panel position='bottom-center'>
        <BottomBar mainGrade={mainGrade} setMainGrade={setMainGrade} addNewNode={addNewNode}/>
      </Panel>
    </>
  );
}

export default App;
