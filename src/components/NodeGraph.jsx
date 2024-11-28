"use client"

import React, { useRef } from "react"
import { useD3Graph } from "../hooks/useD3Graph"

const NodeGraph = ({ ecosystem }) => {
  const svgRef = useRef()
  useD3Graph(svgRef, ecosystem)

  return <svg ref={svgRef}></svg>
}

export default NodeGraph
