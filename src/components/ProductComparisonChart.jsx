import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  ScatterController,
  Title,
  Tooltip,
} from "chart.js"
import { useEffect, useState } from "react"
import { Scatter } from "react-chartjs-2"

ChartJS.register(
  ScatterController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
)

function ProductComparisonChart({ comparison }) {
  const [maxSpeed, setMaxSpeed] = useState(0)
  const [maxRange, setMaxRange] = useState(0)

  useEffect(() => {
    let maxSpeedValue = 0
    let maxRangeValue = 0

    comparison.forEach((competitor) => {
      competitor.products.forEach((product) => {
        const speedValue = parseFloat(product.speed)
        const rangeValue = parseFloat(product.range)

        if (!isNaN(speedValue) && speedValue > maxSpeedValue) {
          maxSpeedValue = speedValue
        }

        if (!isNaN(rangeValue) && rangeValue > maxRangeValue) {
          maxRangeValue = rangeValue
        }
      })
    })

    setMaxSpeed(Math.ceil(maxSpeedValue / 100) * 100 + 50)
    setMaxRange(Math.ceil(maxRangeValue / 100) * 100 + 200)
  }, [comparison])

  const colors = ["#BB44F0", "#FF5733", "#33FF57", "#3357FF", "#F0BB44"]

  const generateChartData = () => {
    const datasets = comparison.map((competitor, index) => {
      const data = competitor.products.map((product) => ({
        x: parseFloat(product.speed),
        y: parseFloat(product.range),
        label: product.name,
      }))

      return {
        label: competitor.name,
        data,
        backgroundColor: colors[index % colors.length],
        borderColor: "transparent",
        borderWidth: 1,
        pointRadius: 8,
        pointHoverRadius: 10,
      }
    })

    return {
      datasets,
    }
  }

  const chartOptions = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: 0,
        max: maxSpeed,
        grid: {
          display: true,
          drawBorder: true,
        },
        title: {
          display: true,
          text: "Speed (KM/h)",
          font: {
            size: 14,
          },
        },
      },
      y: {
        type: "linear",
        position: "left",
        min: 0,
        max: maxRange,
        grid: {
          display: true,
          drawBorder: true,
        },
        title: {
          display: true,
          text: "Range (KM)",
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let label = tooltipItem.label || ""
            if (tooltipItem.raw.label) {
              label += ` - ${tooltipItem.raw.label}`
            }
            return label
          },
        },
      },
    },
  }

  return (
    <div className="product-comparison-scatter-chart">
      <Scatter data={generateChartData()} options={chartOptions} />
    </div>
  )
}

export default ProductComparisonChart
