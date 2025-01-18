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

    const svgGroup = svg.append("g")

    svgGroup
      .selectAll(".link")
      .data(treeData.links())
      .join("path")
      .attr("d", (d) => {
        const midX = (d.source.x + d.target.x) / 2
        const midY = (d.source.y + d.target.y) / 2
        return `
            M${d.source.y},${d.source.x}
            C${midY},${d.source.x} ${midY},${d.target.x} ${d.target.y},${d.target.x}
          `
      })
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

    const bbox = svgGroup.node().getBBox()

    svg
      .attr("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`)
      .attr("width", bbox.width)
      .attr("height", bbox.height)
      .classed("block", true)
  }, [data, svgRef])
}
