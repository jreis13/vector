"use client"

import PercentageChart from "./PercentageChart"

export default function InfoCard({ data }) {
  const isPercentage =
    typeof data.value === "string" && data.value.includes("%")
  const percentage = isPercentage
    ? parseFloat(data.value.match(/-?\d+/)?.[0]) || 0
    : null

  return (
    <div className="flex items-center gap-4">
      {isPercentage && <PercentageChart percentage={percentage} />}
      <p>{data.value || "N/A"}</p>
    </div>
  )
}
