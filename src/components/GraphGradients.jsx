"use client"

const GradientDefinitions = ({ svg }) => {
  const defs = svg.append("defs")

  const createGradient = (id, colorStart, colorEnd) => {
    const gradient = defs
      .append("radialGradient")
      .attr("id", id)
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%")
      .attr("fx", "50%")
      .attr("fy", "50%")

    gradient.append("stop").attr("offset", "50%").attr("stop-color", colorEnd)
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", colorStart)
  }

  createGradient(
    "gradientLevel0",
    "rgba(150, 50, 200, 1)",
    "rgba(187, 68, 240, 1)"
  )
  createGradient(
    "gradientLevel1",
    "rgba(200, 100, 200, 1)",
    "rgba(170, 85, 230, 1)"
  )
  createGradient(
    "gradientLevel2",
    "rgba(240, 130, 180, 1)",
    "rgba(200, 120, 220, 1)"
  )
  createGradient(
    "gradientLevel3",
    "rgba(255, 160, 130, 1)",
    "rgba(240, 150, 180, 1)"
  )
  createGradient(
    "gradientLevel4",
    "rgba(255, 200, 150, 1)",
    "rgba(255, 153, 102, 1)"
  )

  return null
}

export default GradientDefinitions
