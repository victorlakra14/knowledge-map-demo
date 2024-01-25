import React from 'react'
import { BaseEdge, EdgeLabelRenderer, getSimpleBezierPath, useReactFlow } from 'reactflow'

const TopicEdges = ({id, sourceX, sourceY, targetX, targetY}) => {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = ({sourceX, sourceY, targetX, targetY});
   return (
    <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
            <button onClick={() => setEdges((es) => es.filter((e) => e.id !== id))}>X</button>
        </EdgeLabelRenderer>
    </>
  )
}

export default TopicEdges