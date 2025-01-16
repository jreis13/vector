"use client"

import * as d3 from "d3"
import { useEffect } from "react"

export const useD3Graph = (svgRef, data) => {
  useEffect(() => {
    if (!data || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const container = svg.node().parentElement
    const width = container.offsetWidth
    const height = container.offsetHeight
    const radius = Math.min(width, height) / 2 - 50

    const transformData = (node) => {
      const children = []
      if (node.nodes) {
        children.push(...node.nodes.map(transformData))
      }
      if (node.subnodes) {
        children.push(...node.subnodes.map(transformData))
      }
      return { ...node, children: children.length > 0 ? children : undefined }
    }

    const rootData = transformData(data)
    const root = d3.hierarchy(rootData)

    const tree = d3
      .tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 2 : 3))

    const treeData = tree(root)

    const svgGroup = svg
      .append("g")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${width / 2}, ${height / 3})`)

    const links = svgGroup
      .selectAll(".link")
      .data(treeData.links())
      .join("path")
      .attr(
        "d",
        d3
          .linkRadial()
          .angle((d) => d.x)
          .radius((d) => d.y)
      )
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1.5)

    const nodes = svgGroup
      .selectAll(".node")
      .data(treeData.descendants())
      .join("g")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )

    nodes
      .append("circle")
      .attr("r", 15)
      .attr("fill", "#6b7280")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)

    nodes
      .append("text")
      .attr("dy", "0.35em")
      .attr("x", (d) => (d.x < Math.PI ? 16 : -16))
      .attr("text-anchor", (d) => (d.x < Math.PI ? "start" : "end"))
      .attr("transform", (d) => (d.x >= Math.PI ? "rotate(180)" : null))
      .text((d) => d.data.title)
      .style("font-size", "16px")
      .style("fill", "#ddd")
      .style("pointer-events", "none")

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("block", true)
  }, [data, svgRef])
}
