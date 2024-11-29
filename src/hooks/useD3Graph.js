import { useEffect } from "react"
import * as d3 from "d3"
import GraphGradients from "../components/GraphGradients"

export const useD3Graph = (svgRef, ecosystem) => {
  useEffect(() => {
    if (!ecosystem || !svgRef.current) return

    const width = 1200
    const height = 600

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    GraphGradients({ svg })

    const svgGroup = svg.append("g")

    let currentScale = 1

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .filter((event) => !event.ctrlKey && event.type !== "wheel")
      .on("zoom", (event) => {
        currentScale = event.transform.k
        svgGroup.attr("transform", event.transform)
      })

    svg
      .attr("width", "100%")
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .call(zoom)
      .on("dblclick.zoom", null)
      .on("mousedown.zoom", null)
      .on("touchstart.zoom", null)
      .on("click", () => {
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity)
      })

    const networkData = transformNetworkData(ecosystem)

    const simulation = d3
      .forceSimulation(networkData.nodes)
      .force(
        "link",
        d3
          .forceLink(networkData.links)
          .id((d) => d.id)
          .distance(150)
          .strength(0.7)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.radius + 25)
      )
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1))
      .on("tick", ticked)

    const rootNode = networkData.nodes.find((node) => node.group === 1)
    if (rootNode) {
      rootNode.fx = width / 2
      rootNode.fy = height / 2
    }

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
            if (d.group !== 1) {
              d.fx = d.x
              d.fy = d.y
            }
          })
          .on("drag", (event, d) => {
            if (d.group !== 1) {
              d.fx = Math.max(d.radius, Math.min(width - d.radius, event.x))
              d.fy = Math.max(d.radius, Math.min(height - d.radius, event.y))
            }
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            if (d.group !== 1) {
              d.fx = null
              d.fy = null
            }
          })
      )
      .on("click", (event, d) => {
        event.stopPropagation()

        const scale = 3
        const x = width / 2 - d.x * scale
        const y = height / 2 - d.y * scale

        svg
          .transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale))
      })

    nodeGroup
      .append("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => {
        switch (d.group) {
          case 1:
            return "url(#gradientLevel0)"
          case 2:
            return "url(#gradientLevel1)"
          case 3:
            return "url(#gradientLevel2)"
          case 4:
            return "url(#gradientLevel3)"
          default:
            return "url(#gradientLevel4)"
        }
      })

    nodeGroup
      .append("text")
      .attr("text-anchor", "middle")
      .each(function (d) {
        adjustTextSizeAndWrap(d3.select(this), d.radius)
      })
      .attr("pointer-events", "none")
      .style("user-select", "none")
      .style("fill", "white")

    function adjustTextSizeAndWrap(textNode, radius) {
      const text = textNode.datum().title || textNode.datum().name
      const words = text.split(" ")
      textNode.text(null)

      let lineHeight = 1
      let maxFontSize = radius / 4

      let line = []
      let lineNumber = 0
      let tspan = textNode
        .append("tspan")
        .attr("x", 0)
        .attr("y", 0)
        .attr("font-size", `${maxFontSize}px`)

      let tspans = []

      words.forEach((word) => {
        line.push(word)
        tspan.text(line.join(" "))
        if (tspan.node().getComputedTextLength() > radius * 1.8) {
          line.pop()
          tspan.text(line.join(" "))
          line = [word]
          lineNumber += 1
          tspan = textNode
            .append("tspan")
            .attr("x", 0)
            .attr("dy", `${lineHeight}em`)
            .attr("font-size", `${maxFontSize}px`)
            .text(word)
          tspans.push(tspan)
        }
      })

      if (line.length > 0) {
        tspans.push(tspan)
      }

      const totalTextHeight = (tspans.length - 1) * lineHeight * maxFontSize
      const offsetY = -(totalTextHeight / 2) - maxFontSize / 2

      textNode.selectAll("tspan").attr("dy", (d, i) => {
        if (i === 0) {
          return `${offsetY / maxFontSize}em`
        } else {
          return `${lineHeight}em`
        }
      })

      if (textNode.node().getBBox().height > radius * 1.8) {
        maxFontSize =
          (maxFontSize * (radius * 1.8)) / textNode.node().getBBox().height
        textNode.selectAll("tspan").attr("font-size", `${maxFontSize}px`)
      }
    }

    function ticked() {
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
}

export const transformNetworkData = (ecosystem) => {
  if (!ecosystem || typeof ecosystem !== "object") {
    console.error("Invalid ecosystem data provided.")
    return { nodes: [], links: [] }
  }

  const nodes = [
    {
      id: ecosystem.name,
      group: 1,
      fixed: true,
      title: ecosystem.name,
      radius: 70,
    },
  ]
  const links = []

  const addNodesAndLinks = (parentId, data, groupLevel) => {
    if (!data) return

    if (Array.isArray(data)) {
      data.forEach((item) => {
        const nodeId = item.name || item.title
        if (!nodeId) return

        const existingNode = nodes.find((node) => node.id === nodeId)
        if (!existingNode) {
          nodes.push({
            id: nodeId,
            group: groupLevel,
            title: item.title || item.name,
            radius: Math.max(20, 40 - groupLevel * 5),
          })
        }

        links.push({ source: parentId, target: nodeId })

        if (item.subnodes && Array.isArray(item.subnodes)) {
          addNodesAndLinks(nodeId, item.subnodes, groupLevel + 1)
        }
      })
    }
  }

  if (Array.isArray(ecosystem.nodes)) {
    addNodesAndLinks(ecosystem.name, ecosystem.nodes, 2)
  }

  return { nodes, links }
}
