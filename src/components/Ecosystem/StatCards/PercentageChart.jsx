"use client"

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PercentageChart({ percentage }) {
  const chartData = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#7032ff", "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    cutout: "70%",
    plugins: {
      tooltip: { enabled: false },
    },
  }

  return (
    <div className="w-16 h-16">
      <Doughnut data={chartData} options={options} />
    </div>
  )
}
