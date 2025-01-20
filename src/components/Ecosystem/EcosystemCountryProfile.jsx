"use client"

import {
  faAward,
  faCircleArrowLeft,
  faCircleNodes,
  faListCheck,
  faScaleBalanced,
  faTrophy,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DynamicListCard from "./StatCards/DynamicListCard"
import InfoCard from "./StatCards/InfoCard"

export default function EcosystemCountryProfile({ countryName, reports }) {
  const handleBackClick = () => {
    window.open(
      `/ecosystems/evtolandvtolaircrafts?tab=countryProfiles`,
      "_self"
    )
  }

  const determineTitleIcon = (title, value) => {
    const normalizedTitle = title.toLowerCase()
    const normalizedData =
      value && typeof value === "string" ? value.toLowerCase() : ""

    if (
      normalizedTitle.includes("regulator") ||
      normalizedTitle.includes("regulation")
    ) {
      return faScaleBalanced
    }
    if (normalizedTitle.includes("certification")) {
      return faAward
    }
    if (normalizedTitle.includes("plan")) {
      return faListCheck
    }
    if (normalizedTitle.includes("framework")) {
      return faCircleNodes
    }
    if (normalizedTitle.includes("noise")) {
      return faVolumeXmark
    }
    if (
      normalizedData.includes("ˢᵗ") ||
      normalizedData.includes("ⁿᵈ") ||
      normalizedData.includes("ʳᵈ") ||
      normalizedData.includes("ᵗʰ")
    ) {
      return faTrophy
    }

    return null
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-16">{countryName}</h1>

      <div className="space-y-16">
        {reports.map((report, reportIndex) => (
          <div key={reportIndex}>
            <h2 className="mb-8">{report.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {Object.entries(report.details).map(([key, value], idx) => {
                const icon = determineTitleIcon(key, value?.value || "")

                return (
                  <div key={idx} className="flex items-start gap-4 p-4">
                    {icon && (
                      <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={icon} className="text-4xl" />
                      </div>
                    )}
                    <div className="w-full">
                      <h3 className="mb-2">{key}</h3>
                      {(() => {
                        switch (value.type) {
                          case "list":
                          case "nested-list":
                            return <DynamicListCard data={value} />
                          case "html":
                            return (
                              <div className="relative">
                                <iframe
                                  className="w-full h-[calc(100vh-100px)] border-none"
                                  src={value.value}
                                  allowFullScreen
                                ></iframe>
                              </div>
                            )
                          default:
                            return <InfoCard data={value} />
                        }
                      })()}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleBackClick}
        className="text-4xl fixed bottom-20 p-8 left-4"
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
    </div>
  )
}
