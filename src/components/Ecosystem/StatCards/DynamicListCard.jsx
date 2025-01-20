import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DynamicListCard({ title, data }) {
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

  const renderContent = (item, index, parentKey = "") => {
    if (typeof item === "object" && item.type === "percentage") {
      const percentage = parseFloat(item.description.match(/-?\d+/)?.[0]) || 0

      return (
        <div key={index} className="flex items-center justify-between gap-4">
          <div>
            <strong>{item.subtitle}:</strong> {item.description}
          </div>
          {renderChart(percentage)}
        </div>
      )
    } else if (typeof item === "object" && item.subtitle) {
      return (
        <div key={index}>
          <strong>{item.subtitle}:</strong> {item.description}
        </div>
      )
    } else if (Array.isArray(item)) {
      return (
        <ul key={index} className="list-disc ml-5">
          {item.map((nestedItem, nestedIndex) =>
            renderContent(nestedItem, nestedIndex, `${parentKey}-${index}`)
          )}
        </ul>
      )
    } else if (typeof item === "string") {
      return <li key={index}>{item}</li>
    }

    return null
  }

  return (
    <div>
      <div>
        {Array.isArray(data.value)
          ? data.value.map((item, index) => renderContent(item, index, title))
          : renderContent(data.value, 0, title)}
      </div>
    </div>
  )
}
