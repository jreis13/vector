"use client"

import {
  faDollarSign,
  faEuroSign,
  faPoundSign,
  faRulerCombined,
  faTrophy,
  faUsers,
  faYenSign,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function InfoCard({ title, data }) {
  const determineIcon = () => {
    switch (data.type) {
      case "ranking":
        return faTrophy
      case "quantity":
        return data.value?.includes("km²") ? faRulerCombined : faUsers
      case "currency":
        if (typeof data.value === "string") {
          if (data.value.includes("$") || data.value.includes("USD"))
            return faDollarSign
          if (data.value.includes("€") || data.value.includes("EUR"))
            return faEuroSign
          if (data.value.includes("£") || data.value.includes("GBP"))
            return faPoundSign
          if (data.value.includes("¥")) return faYenSign
        }
        break
      default:
        return null
    }
  }

  const icon = determineIcon()

  return (
    <div className="flex items-center gap-4">
      {icon && <FontAwesomeIcon icon={icon} className="text-4xl" />}
      <div>
        <p>{data.value || "N/A"}</p>
      </div>
    </div>
  )
}
