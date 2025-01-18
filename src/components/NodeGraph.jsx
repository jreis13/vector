"use client"

import { useRef } from "react"
import { useD3Graph } from "../hooks/useD3Graph"

const NodeGraph = ({ nodeGroup }) => {
  const svgRef = useRef()
  useD3Graph(svgRef, nodeGroup)

  return (
    <div className="w-full h-[80vh]">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  )
}

export default NodeGraph
