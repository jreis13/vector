"use client"

import { useRouter } from "next/navigation"

function CompetitorCard({ competitor }) {
  const router = useRouter()

  const handleCardClick = () => {
    window.open(competitor.website, "_blank")
  }

  return (
    <div
      className="mb-6 flex h-full cursor-pointer flex-col justify-between rounded-lg border p-4 transition-all duration-300 hover:bg-[#e8e8e8] hover:text-[#403f4c] hover:shadow-lg"
      onClick={handleCardClick}
    >
      <div>
        <div className="mb-4 flex items-center">
          <div>
            <h3 className="text-xl font-bold">{competitor.name}</h3>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm">
            <strong>Year Founded:</strong> {competitor.yearFounded}
          </p>
          <p className="text-sm">
            <strong>HQ:</strong> {competitor.HQ}
          </p>
          <p className="text-sm">
            <strong># of Employees:</strong> {competitor.employees}
          </p>
          <p className="text-sm">
            <strong>Funding Amount (est):</strong> {competitor.funding}
          </p>
          <p className="text-sm">
            <strong># of Products:</strong> {competitor.products}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CompetitorCard
