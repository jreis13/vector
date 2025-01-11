"use client"

import { useRouter } from "next/navigation"

export default function EcosystemCard({ ecosystem }) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(
      `/ecosystems/${ecosystem.name.replace(/\s+/g, "").toLowerCase()}?tab=overview`
    )
  }

  return (
    <div
      className="mb-6 flex flex-col cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl lg:w-[600px] lg:h-auto"
      onClick={handleCardClick}
    >
      <div
        className="h-[250px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${ecosystem.logo})`,
        }}
      ></div>
      <div className="bg-[#34333d] px-10 py-6 flex flex-col justify-between flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl text-[#e8e8e8] font-bold mb-2">
            {ecosystem.name}
          </h3>
          <p className="text-gray-400">{ecosystem.summary}</p>
        </div>
        {ecosystem.mainStats && (
          <div className="text-gray-900">
            {ecosystem.mainStats.map((stat, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-x-4 py-1 items-center"
              >
                <span className="text-gray-300">{stat.label}:</span>
                <span className="text-gray-300 text-right">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
