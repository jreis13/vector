import React, { useEffect, useState } from "react"
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
  const [maxX, setMaxX] = useState(0)
  const [maxY, setMaxY] = useState(0)
  const [xAttribute, setXAttribute] = useState("")
  const [yAttribute, setYAttribute] = useState("")
  const [numericAttributes, setNumericAttributes] = useState([])
  const [units, setUnits] = useState({})

  useEffect(() => {
    const allAttributes = comparison.flatMap((competitor) =>
      competitor.products.flatMap((product) =>
        Object.keys(product).filter((key) => !isNaN(parseFloat(product[key])))
      )
    )
    const uniqueAttributes = [...new Set(allAttributes)]
    setNumericAttributes(uniqueAttributes)

    if (uniqueAttributes.length >= 2) {
      setXAttribute(uniqueAttributes[0])
      setYAttribute(uniqueAttributes[1])
    }
  }, [comparison])

  useEffect(() => {
    if (xAttribute && yAttribute) {
      let maxXValue = 0
      let maxYValue = 0

      comparison.forEach((competitor) => {
        competitor.products.forEach((product) => {
          const xValue = parseFloat(product[xAttribute])
          const yValue = parseFloat(product[yAttribute])

          if (!isNaN(xValue) && xValue > maxXValue) {
            maxXValue = xValue
          }

          if (!isNaN(yValue) && yValue > maxYValue) {
            maxYValue = yValue
          }
        })
      })

      setMaxX(Math.ceil(maxXValue / 100) * 100 + 50)
      setMaxY(Math.ceil(maxYValue / 100) * 100 + 50)
    }
  }, [comparison, xAttribute, yAttribute])

  useEffect(() => {
    const extractUnits = (attribute) => {
      const sampleProduct = comparison
        .flatMap((competitor) => competitor.products)
        .find((product) => product[attribute] != null)
      if (!sampleProduct) return ""

      const value = sampleProduct[attribute]
      const unitMatch = value.match(/[^\d\s]+$/)
      return unitMatch ? unitMatch[0] : ""
    }

    const attributeUnits = {
      [xAttribute]: extractUnits(xAttribute),
      [yAttribute]: extractUnits(yAttribute),
    }

    setUnits(attributeUnits)
  }, [xAttribute, yAttribute, comparison])

  const colors = ["#7032ff", "#FF5733", "#33FF57", "#3357FF", "#F0BB44"]

  const generateChartData = () => {
    const datasets =
      comparison &&
      comparison.map((competitor, index) => {
        const data =
          competitor.products &&
          competitor.products.map((product) => ({
            x: parseFloat(product[xAttribute]),
            y: parseFloat(product[yAttribute]),
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

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  const chartOptions = {
    responsive: true,
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
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: `${capitalize(xAttribute)} (${units[xAttribute] || ""})`,
        },
        min: 0,
        max: maxX,
      },
      y: {
        title: {
          display: true,
          text: `${capitalize(yAttribute)} (${units[yAttribute] || ""})`,
        },
        min: 0,
        max: maxY,
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <div>
          <label htmlFor="x-attribute" className="mr-2">
            X-Axis:
          </label>
          <select
            id="x-attribute"
            value={xAttribute}
            onChange={(e) => setXAttribute(e.target.value)}
          >
            {numericAttributes.map((attr, index) => (
              <option key={index} value={attr}>
                {capitalize(attr)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="y-attribute" className="mr-2">
            Y-Axis:
          </label>
          <select
            id="y-attribute"
            value={yAttribute}
            onChange={(e) => setYAttribute(e.target.value)}
          >
            {numericAttributes.map((attr, index) => (
              <option key={index} value={attr}>
                {capitalize(attr)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="product-comparison-scatter-chart"
        style={{
          height: "500px",
          position: "relative",
        }}
      >
        {xAttribute && yAttribute && (
          <Scatter data={generateChartData()} options={chartOptions} />
        )}
      </div>
    </div>
  )
}

export default ProductComparisonChart
