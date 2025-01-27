"use client"

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PercentageChart({ percentage }) {
  const chartData = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#d87103", "#e8e8e8"],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    cutout: "70%",
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  }

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const { width, height } = chart
      const ctx = chart.ctx
      ctx.save()
      ctx.font = `bold ${Math.min(width, height) / 5}px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "#d87103"
      ctx.fillText(`${percentage}%`, width / 2, height / 2)
      ctx.restore()
    },
  }

  return (
    <div className="w-16 h-16">
      <Doughnut
        data={chartData}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  )
}
