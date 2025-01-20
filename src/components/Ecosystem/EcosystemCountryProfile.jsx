"use client"

import {
  faAward,
  faBook,
  faBus,
  faCircleArrowLeft,
  faCircleNodes,
  faFilePen,
  faHandHoldingDollar,
  faHashtag,
  faListCheck,
  faMedal,
  faMoneyBill1Wave,
  faPeopleRoof,
  faPersonWalkingDashedLineArrowRight,
  faPlaneCircleCheck,
  faRocket,
  faScaleBalanced,
  faScrewdriverWrench,
  faTowerCell,
  faTrophy,
  faVolumeXmark,
  faWifi,
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
    if (normalizedTitle.includes("tourism")) {
      return faPersonWalkingDashedLineArrowRight
    }
    if (normalizedTitle.includes("population")) {
      return faPeopleRoof
    }
    if (normalizedTitle.includes("public transport")) {
      return faBus
    }
    if (normalizedTitle.includes("number")) {
      return faHashtag
    }
    if (normalizedTitle.includes("internet")) {
      return faWifi
    }
    if (normalizedTitle.includes("repair")) {
      return faScrewdriverWrench
    }
    if (normalizedTitle.includes("research")) {
      return faBook
    }
    if (normalizedTitle.includes("spend")) {
      return faMoneyBill1Wave
    }
    if (normalizedTitle.includes("patent")) {
      return faMedal
    }
    if (normalizedTitle.includes("publication")) {
      return faFilePen
    }
    if (normalizedTitle.includes("startup")) {
      return faRocket
    }
    if (normalizedTitle.includes("aviation")) {
      return faPlaneCircleCheck
    }
    if (normalizedTitle.includes("incentive")) {
      return faHandHoldingDollar
    }
    if (normalizedTitle.includes("air traffic")) {
      return faTowerCell
    }

    return null
  }

  const hasHtmlType = (details) => {
    return Object.values(details).some((detail) => detail.type === "html")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-16">{countryName}</h1>

      <div className="space-y-16">
        {reports.map((report, reportIndex) => (
          <div key={reportIndex}>
            <h2 className="mb-8">{report.title}</h2>
            {hasHtmlType(report.details) ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-6">
                  {Object.entries(report.details)
                    .filter(([key, value]) => value.type !== "html")
                    .map(([key, value], idx) => {
                      const icon = determineTitleIcon(key, value?.value || "")

                      return (
                        <div key={idx} className="flex items-start gap-4 p-4">
                          {icon && (
                            <div className="flex-shrink-0">
                              <FontAwesomeIcon
                                icon={icon}
                                className="text-4xl"
                              />
                            </div>
                          )}
                          <div className="w-full">
                            <h3 className="mb-2 text-2xl">{key}</h3>
                            {value.type === "list" ||
                            value.type === "nested-list" ? (
                              <DynamicListCard data={value} />
                            ) : (
                              <InfoCard data={value} />
                            )}
                          </div>
                        </div>
                      )
                    })}
                </div>

                <div className="relative">
                  {Object.entries(report.details)
                    .filter(([key, value]) => value.type === "html")
                    .map(([key, value], idx) => (
                      <iframe
                        key={idx}
                        className="w-full h-[calc(100vh-100px)] border-none"
                        src={value.value}
                        allowFullScreen
                      ></iframe>
                    ))}
                </div>
              </div>
            ) : (
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
                        <h3 className="mb-2 text-2xl">{key}</h3>
                        {(() => {
                          switch (value.type) {
                            case "list":
                            case "nested-list":
                              return <DynamicListCard data={value} />
                            case "html":
                              return (
                                <div className="relative">
                                  <iframe
                                    className="w-full h-full border-none"
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
            )}
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
