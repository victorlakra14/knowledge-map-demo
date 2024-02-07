import { schemeCategory10 } from 'd3-scale-chromatic';
import React from 'react'
import { Handle, Position } from 'reactflow'

export const TopicNode = ({data}) => {

  const getColorScale = () => {
    return schemeCategory10;
  }

  const getNodeColor = (courseID) => {
    const colorScale = getColorScale();
    return colorScale[courseID % colorScale.length];
  }

  return (
    <>
        <Handle style={{height: "8px", width: "8px"}} type="target" position={Position.Left} />
        <div
          style={{backgroundColor: getNodeColor(data.course_id)}}
          className="border border-black border-solid rounded pr-7 pl-7 pt-2 pb-2"
        >
            <p>{data.label}</p>
        </div>
        <Handle style={{height: "8px", width: "8px"}} type="source" position={Position.Right} />
    </>
  )
}
