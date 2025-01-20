"use client"

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DashboardGrid({ data }) {
  const renderChart = (percentage) => {
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

    return <Doughnut data={chartData} options={options} />
  }

  const renderItem = (item, index) => {
    if (typeof item === "object" && item.type === "percentage") {
      const percentage = parseFloat(item.description.match(/-?\d+/)?.[0]) || 0
      return (
        <div
          key={index}
          className="flex flex-col items-center text-center gap-2 bg-white p-4 shadow rounded"
        >
          <div className="w-24 h-24">{renderChart(percentage)}</div>
          <div>
            <strong>{item.subtitle}</strong>
          </div>
          <div>{item.description}</div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(data.value) &&
        data.value.map((item, index) => renderItem(item, index))}
    </div>
  )
}
