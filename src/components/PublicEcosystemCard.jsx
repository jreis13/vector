"use client"

import {
  faEarthAfrica,
  faEarthAmericas,
  faEarthAsia,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"

export default function PublicEcosystemCard({ ecosystem }) {
  const router = useRouter()

  const handleSubscribe = () => {
    const currentPath = encodeURIComponent(window.location.pathname)
    router.push(`/api/auth/login?returnTo=${currentPath}`)
  }

  return (
    <div className="mb-6 flex flex-col rounded-lg overflow-hidden shadow-lg lg:w-full lg:h-[80vh]">
      <div
        className="h-full relative flex flex-col justify-between"
        style={{
          backgroundImage: `url(${ecosystem.logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className="relative z-10 px-10 py-6 flex flex-col justify-between flex-grow">
          <div className="mb-4">
            <h3 className="text-2xl text-center text-[#e8e8e8] font-bold mb-2">
              {ecosystem.name}
            </h3>
            <p className="text-center">{ecosystem.summary}</p>
          </div>

          {ecosystem.mainStats && (
            <div className="grid grid-cols-3 gap-4 text-center">
              {ecosystem.mainStats.map((stat, index) => (
                <div key={index} className="p-4">
                  <p className="font-semibold text-sm">{stat.name}</p>
                  <div className="mt-2 space-y-1">
                    {stat.data.map((item, itemIndex) => (
                      <p key={itemIndex} className="text-sm">
                        {item.label}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {ecosystem.roadmap && (
            <div className="flex flex-col gap-8">
              <h4 className="text-center font-semibold text-white">
                Key Features Roadmap:
              </h4>
              <div className="flex items-center justify-center gap-4">
                {ecosystem.roadmap.map((stat, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#7032ff] flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="rounded-lg p-4 text-center mt-2">
                        <p className="font-semibold text-sm text-center text-white">
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
            <div className="flex items-center justify-center">
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
                  <p className="font-semibold text-sm text-center text-white">
                    {expansion.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {ecosystem.disclaimers && (
            <div className="flex flex-col items-center justify-center text-center pt-8">
              {ecosystem.disclaimers.map((disclaimer, index) => (
                <div key={index} className="p-2">
                  <p className="font-semibold text-sm text-white">
                    {disclaimer.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <button
              className="inline-flex w-full max-w-[250px] justify-center rounded-full bg-[#7032ff] p-4 text-white uppercase transition-transform transform hover:scale-105"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
