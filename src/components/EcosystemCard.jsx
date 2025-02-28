"use client"

import {
  faBrain,
  faCheckCircle,
  faEarthAfrica,
  faEarthAmericas,
  faEarthAsia,
  faHandshake,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useState } from "react"
import LoadingLayout from "src/layouts/LoadingLayout"

export default function EcosystemCard({ ecosystem }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCardClick = () => {
    setLoading(true)
    router.push(
      `/ecosystems/${ecosystem.name.replace(/\s+/g, "").toLowerCase()}?tab=overview`
    )
  }

  if (loading) {
    return <LoadingLayout />
  }

  return (
    <div
      className="mb-6 flex flex-col cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl lg:w-full lg:h-[80vh]"
      onClick={handleCardClick}
    >
      <div
        className="h-full relative flex flex-col justify-between"
        style={{
          backgroundImage: `url(${ecosystem.logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        <div className="relative z-10 px-10 py-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-2xl text-center font-bold">{ecosystem.name}</h3>
            <p className="text-center mt-2">{ecosystem.summary}</p>
          </div>

          {Array.isArray(ecosystem.mainStats) && (
            <div className="flex flex-col mx-auto items-start">
              <h4 className="font-semibold text-2xl p-4 mx-auto text-center">
                Passenger eVTOL
              </h4>
              {ecosystem.mainStats.map((stat, index) => {
                const [title, value] = stat.split(":")
                return (
                  <div
                    key={index}
                    className="flex items-center py-1 text-left gap-4"
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-[#6600cc]"
                    />
                    <p className="font-semibold">{title.trim()}:</p>
                    <p>{value ? value.trim() : ""}</p>
                  </div>
                )
              })}
            </div>
          )}

          {Array.isArray(ecosystem.roadmap) && (
            <div className="flex justify-center items-center text-center gap-8">
              <h4 className="mt-12 font-semibold">Key Features Roadmap:</h4>
              <div className="flex flex-wrap justify-center gap-6">
                {ecosystem.roadmap.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {stat.includes("AI") ? (
                        <FontAwesomeIcon
                          icon={faBrain}
                          className="text-blue-500 w-6 h-6"
                        />
                      ) : stat.includes("News") ? (
                        <FontAwesomeIcon
                          icon={faNewspaper}
                          className="text-green-500 w-6 h-6"
                        />
                      ) : stat.includes("Deal") ? (
                        <FontAwesomeIcon
                          icon={faHandshake}
                          className="text-red-500 w-6 h-6"
                        />
                      ) : null}
                    </div>
                    <p className="font-semibold">{stat}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {Array.isArray(ecosystem.expansions) && (
            <div className="flex justify-center items-center text-center gap-8">
              <h4 className="mt-12 font-semibold">Regional Add-ons:</h4>
              <div className="flex flex-wrap justify-center gap-6">
                {ecosystem.expansions.map((expansion, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {expansion.includes("North America") ? (
                        <FontAwesomeIcon
                          icon={faEarthAmericas}
                          className="text-blue-500 w-6 h-6"
                        />
                      ) : expansion.includes("South America") ? (
                        <FontAwesomeIcon
                          icon={faEarthAmericas}
                          className="text-green-500 w-6 h-6"
                        />
                      ) : expansion.includes("Asia") ? (
                        <FontAwesomeIcon
                          icon={faEarthAsia}
                          className="text-red-500 w-6 h-6"
                        />
                      ) : expansion.includes("MENA") ? (
                        <FontAwesomeIcon
                          icon={faEarthAfrica}
                          className="text-yellow-500 w-6 h-6"
                        />
                      ) : null}
                    </div>
                    <p className="font-semibold">{expansion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {Array.isArray(ecosystem.disclaimers) &&
            ecosystem.disclaimers.length > 0 && (
              <div className="flex flex-col items-center justify-center text-center pt-8">
                {ecosystem.disclaimers.map((disclaimer, index) => (
                  <div key={index}>
                    <p className="text-sm">{disclaimer}</p>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
