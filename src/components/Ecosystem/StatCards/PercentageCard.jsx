"use client"

import { Doughnut } from "react-chartjs-2"

export default function PercentageCard({ title, data }) {
  const chartData = {
    datasets: [
      {
        data: [parseFloat(data.value), 100 - parseFloat(data.value)],
        backgroundColor: ["#4caf50", "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24">
        <Doughnut
          data={chartData}
          options={{
            cutout: "75%",
            plugins: { tooltip: { enabled: false } },
          }}
        />
      </div>
      <p className="text-xl font-semibold mt-4">{data.value}%</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  )
}
