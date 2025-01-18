"use client"

import * as d3 from "d3"
import { useEffect } from "react"

export const useD3Graph = (svgRef, data) => {
  useEffect(() => {
    if (!data || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const container = svg.node().parentElement
    const width = container.offsetWidth * 0.8
    const height = container.offsetHeight * 0.8

    const root = d3.hierarchy(data, (d) => d.nodes || d.subnodes)

    const tree = d3.tree().size([height, width])

    const treeData = tree(root)

    const svgGroup = svg
      .append("g")
      .attr(
        "transform",
        `translate(${(container.offsetWidth - width) / 2}, ${(container.offsetHeight - height) / 2})`
      )

    svgGroup
      .selectAll(".link")
      .data(treeData.links())
      .join("path")
      .attr(
        "d",
        (d) => `
        M${d.source.y},${d.source.x}
        H${(d.source.y + d.target.y) / 2}
        V${d.target.x}
        H${d.target.y}
      `
      )
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2)

    const nodes = svgGroup
      .selectAll(".node")
      .data(treeData.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)

    nodes
      .append("circle")
      .attr("r", (d) => (d.depth === 0 ? 20 : 15))
      .attr("fill", (d) => (d.depth === 0 ? "#4B5563" : "#6B7280"))

    nodes
      .append("text")
      .attr("dy", (d) => (d.depth === 0 ? 40 : 30))
      .attr("text-anchor", "middle")
      .text((d) => d.data.name)
      .style("font-size", (d) => (d.depth === 0 ? "24px" : "16px"))
      .style("fill", "#ddd")
      .style("pointer-events", "none")

    svg
      .attr("viewBox", `0 0 ${container.offsetWidth} ${container.offsetHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("block", true)
  }, [data, svgRef])
}
