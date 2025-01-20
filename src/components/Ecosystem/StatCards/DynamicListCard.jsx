"use client"

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DynamicListCard({ data }) {
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

    return (
      <div className="w-16 h-16">
        <Doughnut data={chartData} options={options} />
      </div>
    )
  }

  const renderContent = (item, index) => {
    console.log(item.details)
    if (typeof item === "object" && item.type === "percentage") {
      const percentage = parseFloat(item.description.match(/-?\d+/)?.[0]) || 0

      return (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-2 p-4 h-fit"
        >
          {renderChart(percentage)}
          <div className="text-center flex flex-col gap-2">
            <p>{item.subtitle}:</p>
            <p>{item.description}</p>
          </div>
        </div>
      )
    } else if (typeof item === "object" && item.subtitle) {
      return (
        <div key={index} className="mb-2 flex">
          <p>{item.subtitle}:</p> {item.description || "N/A"}
        </div>
      )
    } else if (typeof item === "object" && item.details) {
      return (
        <div key={index} className="ml-4 mb-4">
          <p>{item.subtitle || "Details"}:</p>
          <ul className="list-disc pl-5">
            {Object.entries(item.details).map(([key, detail], detailIndex) => (
              <li key={detailIndex}>
                <p>{key}:</p> {detail.value || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      )
    } else if (Array.isArray(item)) {
      return (
        <ul key={index} className="list-disc pl-5">
          {item.map((nestedItem, nestedIndex) =>
            renderContent(nestedItem, nestedIndex)
          )}
        </ul>
      )
    } else if (typeof item === "string") {
      return (
        <li className="list-none" key={index}>
          {item}
        </li>
      )
    }

    return null
  }

  const hasPercentage = data.value.some((item) => item.type === "percentage")

  return (
    <div
      className={`grid grid-cols-1 gap-4 ${hasPercentage ? "lg:grid-cols-3" : ""}`}
    >
      {Array.isArray(data.value)
        ? data.value.map((item, index) => renderContent(item, index))
        : renderContent(data.value, 0)}
    </div>
  )
}
