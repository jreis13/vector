"use client"

import { faRulerCombined, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function QuantityCard({ title, data }) {
  const isKm2 = data.description?.includes("km²")
  const icon = isKm2 ? faRulerCombined : faUsers

  return (
    <div className="flex items-center space-x-4">
      <FontAwesomeIcon icon={icon} className="text-4xl text-blue-500" />
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-xl font-semibold">{data.description}</p>
      </div>
    </div>
  )
}
