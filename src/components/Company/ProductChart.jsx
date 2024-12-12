import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function ProductChart({ products }) {
  const colors = ["#7032ff", "#FF5733", "#33FF57", "#3357FF", "#F0BB44"]

  const getRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    return randomColor.length === 7 ? randomColor : getRandomColor()
  }

  const labels = products && products.map((product) => product.name)

  const parseValue = (value) => {
    if (typeof value === "string") {
      const numericPart = value.match(/\d+/)
      return numericPart ? parseInt(numericPart[0]) : NaN
    }
    return value
  }

  const numericAttributes = Object.keys(products[0]).filter((key) =>
    products.every((product) => !isNaN(parseValue(product[key])))
  )

  const datasets = numericAttributes.map((attr, index) => {
    const data =
      products &&
      products.map((product) => ({
        numeric: parseValue(product[attr]),
        original: product[attr],
      }))

    const color = index < colors.length ? colors[index] : getRandomColor()
    const backgroundColor = color.replace("0.2", "0.2")
    const borderColor = color.replace("0.2", "1")

    return {
      label: attr.charAt(0).toUpperCase() + attr.slice(1),
      data: data && data.map((d) => d.numeric),
      backgroundColor: color + "33",
      borderColor: color,
      borderWidth: 1,
      originalData: data && data.map((d) => d.original),
    }
  })

  const data = {
    labels,
    datasets,
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = datasets[tooltipItem.datasetIndex]
            const originalValue = dataset.originalData[tooltipItem.dataIndex]
            return `${dataset.label}: ${originalValue}`
          },
        },
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default ProductChart
