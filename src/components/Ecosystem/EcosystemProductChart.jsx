import React from "react"
import { Scatter } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
)

export default function EcosystemProductChart({
  labels,
  xData,
  yData,
  xLabel,
  yLabel,
}) {
  const generateColor = (index) => {
    const hue = (index * 137.5) % 360
    return `hsl(${hue}, 70%, 60%)`
  }

  const companies = [...new Set(labels.map((label) => label.split(" - ")[0]))]
  const companyColors = companies.reduce((acc, company, index) => {
    acc[company] = generateColor(index)
    return acc
  }, {})

  const combinedData = xData.map((x, i) => {
    const [company] = labels[i].split(" - ")
    return {
      x,
      y: yData[i],
      label: labels[i],
      company,
      color: companyColors[company],
    }
  })

  const detectOverlaps = (data) => {
    const seen = {}
    return data.map((point) => {
      const key = `${point.x}-${point.y}`
      if (seen[key]) {
        seen[key] += 1
        return { ...point, overlap: true }
      }
      seen[key] = 1
      return { ...point, overlap: false }
    })
  }

  const processedData = detectOverlaps(combinedData)

  const graphData = {
    datasets: [
      {
        label: `${xLabel} vs ${yLabel}`,
        data: processedData,
        backgroundColor: processedData.map((point) => point.color),
        pointRadius: processedData.map((point) => (point.overlap ? 16 : 10)),
        pointHoverRadius: processedData.map((point) =>
          point.overlap ? 16 : 10
        ),
        pointBorderWidth: processedData.map((point) => (point.overlap ? 3 : 0)),
        pointBorderColor: processedData.map((point) =>
          point.overlap ? "#ffffff" : "transparent"
        ),
      },
    ],
  }

  const calculatePadding = (data) => {
    const validData = data.filter((value) => !isNaN(value) && value >= 0) // Only consider non-negative values
    if (validData.length === 0) return { min: 0, max: 1 } // Default range for empty data
    const min = Math.min(...validData)
    const max = Math.max(...validData)
    const range = max - min
    return { min: Math.max(0, min - range * 0.1), max: max + range * 0.1 } // Enforce min >= 0
  }

  const xPadding = calculatePadding(xData)
  const yPadding = calculatePadding(yData)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${xLabel} vs ${yLabel}`,
      },
      tooltip: {
        callbacks: {
          title: () => "",
          label: (context) => {
            const label = context.raw.label || "Unknown"
            const xValue = context.raw.x
            const yValue = context.raw.y
            return `${label}: (${xValue}, ${yValue})`
          },
        },
      },
    },
    animation: false,
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
        },
        min: xPadding.min,
        max: xPadding.max,
      },
      y: {
        title: {
          display: true,
          text: yLabel,
        },
        min: yPadding.min,
        max: yPadding.max,
      },
    },
  }

  return <Scatter data={graphData} options={options} />
}
