"use client"

import icons from "src/common/icons/icons"
import PercentageChart from "./PercentageChart"

export default function InfoCard({ data }) {
  const iconSrc = icons[data.icon]
  const isPercentage = data.type === "percentage"
  const isNumber = data.type === "number"

  return (
    <div className="flex items-center gap-4 p-4">
      {isPercentage && <PercentageChart percentage={data.percentage} />}
      {isNumber ? (
        <p className="text-5xl number">{data.value || ""}</p>
      ) : (
        <p className="text-xl">{data.value || ""}</p>
      )}
    </div>
  )
}
