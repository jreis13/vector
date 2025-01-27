"use client"

import icons from "src/common/icons/icons"
import PercentageChart from "./PercentageChart"

export default function InfoCard({ data }) {
  const iconSrc = icons[data.icon] // Get the image source (URL)

  const isPercentage =
    typeof data.value === "string" && data.value.includes("%")
  const percentage = isPercentage
    ? parseFloat(data.value.match(/-?\d+/)?.[0]) || 0
    : null

  const isNumber = data.type === "number"

  return (
    <div className="flex items-center gap-4 p-4">
      {isPercentage && <PercentageChart percentage={percentage} />}
      {isNumber ? (
        <p className="text-5xl number">{data.value || "N/A"}</p>
      ) : (
        <p className="text-xl">{data.value || "N/A"}</p>
      )}
    </div>
  )
}
