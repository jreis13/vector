"use client"

import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "../Button"
import arrowBack from "/public/icons/arrowBack.svg"

const EcosystemDetails = ({ ecosystem }) => {
  const router = useRouter()
  const svgRef = useRef()

  useEffect(() => {
    if (!ecosystem) return

    const width = 800
    const height = 600

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const svgGroup = svg.append("g")

    // Set up zoom behavior (only scale, no translation by dragging background)
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        svgGroup.attr("transform", event.transform)
      })

    svg
      .attr("width", "100%")
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .call(zoom)
      .on("dblclick.zoom", null) // Disable double-click to prevent zoom reset
      .on("mousedown.zoom", null) // Disable dragging on the SVG background
      .on("touchstart.zoom", null) // Disable touch dragging on the SVG background
      .on("click", () => {
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity)
      }) // Reset zoom on background click

    const networkData = transformNetworkData(ecosystem)

    const simulation = d3
      .forceSimulation(networkData.nodes)
      .force(
        "link",
        d3
          .forceLink(networkData.links)
          .id((d) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked)

    const link = svgGroup
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(networkData.links)
      .enter()
      .append("line")
      .attr("stroke-width", 2)
      .attr("stroke", "#999")

    const nodeGroup = svgGroup
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(networkData.nodes)
      .enter()
      .append("g")
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            if (!d.fixed) {
              d.fx = d.x
              d.fy = d.y
            }
          })
          .on("drag", (event, d) => {
            if (!d.fixed) {
              d.fx = Math.max(d.radius, Math.min(width - d.radius, event.x))
              d.fy = Math.max(d.radius, Math.min(height - d.radius, event.y))
            }
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            if (!d.fixed) {
              d.fx = null
              d.fy = null
            }
          })
      )
      .on("click", (event, d) => {
        event.stopPropagation() // Prevent the click from propagating to the SVG background

        // Zoom in on the clicked node
        const scale = 2 // Adjust scale as needed
        const x = width / 2 - d.x * scale
        const y = height / 2 - d.y * scale

        svg
          .transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale))
      })

    nodeGroup.each(function (d) {
      const textNode = d3
        .select(this)
        .append("text")
        .attr("text-anchor", "middle")
        .text(d.id)
        .attr("font-size", 12)
        .attr("pointer-events", "none")
        .style("user-select", "none")
        .style("fill", "white")
        .attr("dy", "0.35em")

      const textWidth = textNode.node().getBBox().width
      d.radius = Math.max(20, textWidth / 2 + 10)
    })

    nodeGroup
      .append("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) =>
        d.fixed ? "orange" : d3.schemeCategory10[d.group % 10]
      )

    nodeGroup.each(function () {
      const textElement = d3.select(this).select("text")
      d3.select(this).append(() => textElement.node())
    })

    function ticked() {
      // Constrain all nodes to remain within the SVG bounds
      networkData.nodes.forEach((d) => {
        const radius = d.radius || 12
        d.x = Math.max(radius, Math.min(width - radius, d.x))
        d.y = Math.max(radius, Math.min(height - radius, d.y))
      })

      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)

      nodeGroup.attr("transform", (d) => `translate(${d.x},${d.y})`)
    }
  }, [ecosystem])

  const transformNetworkData = (ecosystem) => {
    if (!ecosystem || typeof ecosystem !== "object") {
      console.error("Invalid ecosystem data provided.")
      return { nodes: [], links: [] }
    }

    const nodes = [{ id: ecosystem.name, group: 1, fixed: true }]
    const links = []

    const addCategoryNodesAndLinks = (categoryName, category, group) => {
      if (!category || !category.data) return

      nodes.push({ id: categoryName, group })
      links.push({ source: ecosystem.name, target: categoryName })

      if (Array.isArray(category.data)) {
        category.data.forEach((item, index) => {
          const itemId = `${categoryName}-${index}`
          nodes.push({ id: itemId, group: group + 1 })
          links.push({ source: categoryName, target: itemId })
        })
      } else if (typeof category.data === "string") {
        const textId = `${categoryName}-text`
        nodes.push({ id: textId, group: group + 1 })
        links.push({ source: categoryName, target: textId })
      }
    }

    if (Array.isArray(ecosystem.mainStats)) {
      const mainStatsCategoryId = "Main Stats"
      nodes.push({ id: mainStatsCategoryId, group: 2 })
      links.push({ source: ecosystem.name, target: mainStatsCategoryId })

      ecosystem.mainStats.forEach((stat, index) => {
        const statId = `${mainStatsCategoryId}-${index}`
        nodes.push({ id: statId, group: 3 })
        links.push({ source: mainStatsCategoryId, target: statId })
      })
    }

    addCategoryNodesAndLinks("Applications", ecosystem.applications, 3)
    addCategoryNodesAndLinks("Innovations", ecosystem.innovations, 3)
    addCategoryNodesAndLinks("Challenges", ecosystem.challenges, 3)
    addCategoryNodesAndLinks("Insights", ecosystem.insights, 3)
    addCategoryNodesAndLinks("Key Players", ecosystem.keyPlayers, 3)

    return { nodes, links }
  }

  const handleBackClick = () => {
    router.push("/ecosystems")
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:px-16 lg:py-16"
      style={{ userSelect: "none" }}
    >
      <h1 className="mb-8 text-center text-4xl font-bold">{ecosystem.name}</h1>
      <p className="mb-8 text-center">{ecosystem.summary}</p>
      <div className="mb-8 flex w-full justify-center">
        <svg ref={svgRef}></svg>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleBackClick}>
          <Image src={arrowBack} alt="Back" width={24} height={24} />
        </Button>
      </div>
    </div>
  )
}

export default EcosystemDetails
