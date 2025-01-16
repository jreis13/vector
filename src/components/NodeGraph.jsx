"use client"

import { useRef } from "react"
import { useD3Graph } from "../hooks/useD3Graph"

const NodeGraph = ({ ecosystem }) => {
  const svgRef = useRef()
  useD3Graph(svgRef, ecosystem)

  return (
    <div className="w-full h-[80vh]">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  )
}

export default NodeGraph
