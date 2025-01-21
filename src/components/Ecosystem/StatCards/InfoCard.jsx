"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import icons from "src/common/icons/icons"
import PercentageChart from "./PercentageChart"

export default function InfoCard({ data }) {
  const isPercentage =
    typeof data.value === "string" && data.value.includes("%")
  const percentage = isPercentage
    ? parseFloat(data.value.match(/-?\d+/)?.[0]) || 0
    : null

  const isNumber = data.type === "number"
  const dynamicIconName = `fa${data.value}`
  const dynamicIcon = isNumber ? icons[dynamicIconName] : null

  return (
    <div className="flex items-center gap-4 p-4">
      {isPercentage && <PercentageChart percentage={percentage} />}
      {isNumber && dynamicIcon ? (
        <FontAwesomeIcon
          className="text-[#7032ff] text-4xl"
          icon={dynamicIcon}
        />
      ) : (
        <p>{data.value || "N/A"}</p>
      )}
    </div>
  )
}
