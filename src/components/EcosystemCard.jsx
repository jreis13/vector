"use client"

import { useRouter } from "next/navigation"
import HoverScale from "src/animations/HoverScale"

export default function EcosystemCard({ ecosystem }) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(
      `/ecosystems/${ecosystem.name.replace(/\s+/g, "").toLowerCase()}?tab=overview`
    )
  }

  return (
    <HoverScale
      className="mb-6 flex flex-col cursor-pointer rounded-lg border overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl lg:w-[600px] lg:h-auto"
      onClick={handleCardClick}
    >
      <div
        className="h-[250px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${ecosystem.logo})`,
        }}
      ></div>
      <div className="bg-[#e8e8e8] px-10 py-6 flex flex-col justify-between flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl text-[#403f4c] font-bold mb-2">
            {ecosystem.name}
          </h3>
          <p className="text-gray-700">{ecosystem.summary}</p>
        </div>
        {ecosystem.mainStats && (
          <div className="text-gray-900">
            {ecosystem.mainStats.map((stat, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-x-4 py-1 items-center"
              >
                <span className="text-gray-600">{stat.label}:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </HoverScale>
  )
}
