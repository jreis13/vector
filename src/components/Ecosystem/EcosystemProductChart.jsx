import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js"
import {
  Bar,
  Bubble,
  Doughnut,
  Line,
  PolarArea,
  Scatter,
} from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  RadialLinearScale,
  Tooltip,
  Title,
  LineElement
)

export default function EcosystemProductChart({
  labels,
  xData,
  yData,
  xLabel,
  yLabel,
  graphType,
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
      y: yData ? yData[i] : null,
      label: labels[i],
      company,
      color: companyColors[company],
      r: Math.random() * 15 + 5,
    }
  })

  const scatterData = {
    labels,
    datasets: [
      {
        label: yLabel ? `${xLabel} vs ${yLabel}` : `${xLabel}`,
        data: combinedData,
        backgroundColor: combinedData.map((point) => point.color),
        pointRadius: 10,
        pointHoverRadius: 12,
      },
    ],
  }

  const bubbleData = {
    labels,
    datasets: [
      {
        label: yLabel ? `${xLabel} vs ${yLabel}` : `${xLabel}`,
        data: combinedData.map((point) => ({
          x: point.x,
          y: point.y,
          r: point.r,
        })),
        backgroundColor: combinedData.map((point) => point.color),
      },
    ],
  }

  const generalData = {
    labels,
    datasets: [
      {
        label: yLabel ? `${xLabel} vs ${yLabel}` : `${xLabel}`,
        data: xData,
        backgroundColor: Object.values(companyColors),
        borderRadius: graphType === "Bar" ? 10 : undefined,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: yLabel ? `${xLabel} vs ${yLabel}` : `${xLabel}`,
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            if (context[0]?.raw?.label) {
              return context[0].raw.label
            }
            const dataIndex = context[0].dataIndex
            return labels[dataIndex] || "Unknown"
          },
          label: (context) => {
            const dataIndex = context.dataIndex
            const datasetLabel = context.dataset.label || xLabel
            const value = context.raw

            if (graphType === "Scatter" || graphType === "Bubble") {
              const xValue = context.raw.x
              const yValue = context.raw.y
              const xText = `${xLabel}: ${xValue}`
              const yText = yLabel ? `${yLabel}: ${yValue}` : null
              return yText ? `${xText}, ${yText}` : xText
            }

            return `${datasetLabel}: ${value}`
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: xLabel },
      },
      y: yLabel ? { title: { display: true, text: yLabel } } : undefined,
    },
  }

  switch (graphType) {
    case "Scatter":
      return <Scatter data={scatterData} options={chartOptions} />
    case "Bubble":
      return <Bubble data={bubbleData} options={chartOptions} />
    case "Bar":
      return <Bar data={generalData} options={chartOptions} />
    case "Line":
      return <Line data={generalData} options={chartOptions} />
    case "Doughnut":
      return <Doughnut data={generalData} />
    case "Polar Area":
      return <PolarArea data={generalData} />
    default:
      return null
  }
}
