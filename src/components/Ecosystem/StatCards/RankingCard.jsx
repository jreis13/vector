"use client"

import { faTrophy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function RankingCard({ title, data }) {
  return (
    <div className="flex flex-col items-center">
      <FontAwesomeIcon icon={faTrophy} className="text-4xl text-yellow-500" />
      <p className="text-xl font-bold mt-4">{data.value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  )
}
