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

export default function EcosystemCard({ ecosystem }) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(
      `/ecosystems/${ecosystem.name.replace(/\s+/g, "").toLowerCase()}?tab=overview`
    )
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

          {ecosystem.mainStats && (
            <div className="flex justify-center text-center">
              {ecosystem.mainStats.map((stat, index) => (
                <div key={index} className="p-4">
                  <p className="font-semibold text-2xl">{stat.name}</p>
                  <div className="mt-4 space-y-1">
                    {stat.data.map((item, itemIndex) => (
                      <div
                        className="flex gap-2 text-md items-center"
                        key={itemIndex}
                      >
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-[#7032ff]"
                        />
                        <p>{item.label}: </p>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {ecosystem.roadmap && (
            <div className="flex justify-center gap-2">
              <h4 className="mt-12 font-semibold">Key Features Roadmap:</h4>
              <div className="flex items-center justify-center gap-4">
                {ecosystem.roadmap.map((stat, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-md font-semibold">
                        {stat.label.includes("AI") ? (
                          <FontAwesomeIcon
                            icon={faBrain}
                            className="text-blue-500 w-6 h-6"
                          />
                        ) : stat.label.includes("News") ? (
                          <FontAwesomeIcon
                            icon={faNewspaper}
                            className="text-green-500 w-6 h-6"
                          />
                        ) : stat.label.includes("Deal") ? (
                          <FontAwesomeIcon
                            icon={faHandshake}
                            className="text-red-500 w-6 h-6"
                          />
                        ) : null}
                      </div>
                      <div className="rounded-lg p-4 text-center">
                        <p className="font-semibold text-md text-center">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ecosystem.expansions && (
            <div className="flex gap-4 w-full justify-center">
              <h4 className="mt-12 font-semibold self-start">
                Regional Add-ons:
              </h4>
              <div className="flex justify-end items-center">
                {ecosystem.expansions.map((expansion, index) => (
                  <div key={index} className="flex flex-col items-center px-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {expansion.label.includes("North America") ? (
                        <FontAwesomeIcon
                          icon={faEarthAmericas}
                          className="text-blue-500 w-6 h-6"
                        />
                      ) : expansion.label.includes("South America") ? (
                        <FontAwesomeIcon
                          icon={faEarthAmericas}
                          className="text-green-500 w-6 h-6"
                        />
                      ) : expansion.label.includes("Asia") ? (
                        <FontAwesomeIcon
                          icon={faEarthAsia}
                          className="text-red-500 w-6 h-6"
                        />
                      ) : expansion.label.includes("MENA") ? (
                        <FontAwesomeIcon
                          icon={faEarthAfrica}
                          className="text-yellow-500 w-6 h-6"
                        />
                      ) : null}
                    </div>
                    <p className="font-semibold text-md text-center">
                      {expansion.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ecosystem.disclaimers && (
            <div className="flex flex-col items-center justify-center text-center pt-8">
              {ecosystem.disclaimers.map((disclaimer, index) => (
                <div key={index}>
                  <p className="text-sm">{disclaimer.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
