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
  const data = {
    labels: products.map((product) => product.model),
    datasets: [
      {
        label: "Speed (KM/h)",
        data: products.map((product) => parseInt(product.speed.split(" ")[0])),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Range (KM)",
        data: products.map((product) => parseInt(product.range.split(" ")[0])),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default ProductChart
