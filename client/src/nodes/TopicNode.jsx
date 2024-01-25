import React from 'react'
import { Handle, Position } from 'reactflow'

export const TopicNode = ({data}) => {
  return (
    <>
        <Handle style={{height: "8px", width: "8px"}} type="target" position={Position.Left} />
        <div className="bg-white border border-black border-solid rounded pr-7 pl-7 pt-2 pb-2">
            <p>{data.label}</p>
        </div>
        <Handle style={{height: "8px", width: "8px"}} type="source" position={Position.Right} />
    </>
  )
}
