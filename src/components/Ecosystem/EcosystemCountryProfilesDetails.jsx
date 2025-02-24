"use client"

import {
  faCircleArrowLeft,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState } from "react"
import ScrollReveal from "src/animations/ScrollReveal"
import icons from "src/common/icons/icons"
import Breadcrumb from "../Breadcrumb"
import DynamicListCard from "./StatCards/DynamicListCard"
import DynamicTransportTable from "./StatCards/DynamicTable"
import InfoCard from "./StatCards/InfoCard"

export default function EcosystemCountryProfilesDetails({
  ecosystemName,
  country,
}) {
  const [countryDetails, setCountryDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/ecosystems/${ecosystemName}/countries/${country}`
        )
        if (!response.ok) throw new Error("Data not found")
        const data = await response.json()
        setCountryDetails(data)
      } catch (error) {
        console.error(error)
        setCountryDetails({ error: error.message })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [ecosystemName, country])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#6600cc] border-t-transparent"></div>
      </div>
    )
  }

  if (countryDetails?.error) {
    return <div>Error: {countryDetails.error}</div>
  }

  const handleBackClick = () => {
    window.open(`/ecosystems/advancedairmobility?tab=countryProfiles`, "_self")
  }

  const breadcrumbSections = countryDetails.subcategories.map((sub) => ({
    title: sub.name,
    icon: icons[sub.icon] || "/public/icons/defaultIcon.svg",
    id: sub.name.toLowerCase().replace(/ /g, "-"),
  }))

  return (
    <div className="container mx-auto py-8 relative">
      <Breadcrumb sections={breadcrumbSections} />
      <h1 className="text-4xl font-bold mb-16">{countryDetails.countryName}</h1>

      <div className="space-y-16">
        {countryDetails.subcategories.map((sub, subIndex) => (
          <ScrollReveal
            key={subIndex}
            id={breadcrumbSections[subIndex].id}
            isFirst={subIndex === 0}
            isLast={subIndex === countryDetails.subcategories.length - 1}
          >
            <div id={breadcrumbSections[subIndex].id}>
              <h2 className="mb-8">{sub.name}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {sub.metrics.map((metric, metricIndex) => (
                  <div
                    key={metricIndex}
                    className="relative flex flex-col h-full items-start gap-4 p-4 bg-[#34333d] rounded-lg"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {metric.icon ? (
                            <Image
                              src={icons[metric.icon]}
                              alt={metric.name || "icon"}
                              width={80}
                              height={80}
                              className="w-20 h-20 object-contain"
                            />
                          ) : null}
                        </div>
                        <h3 className="mb-2 text-3xl">{metric.name}</h3>
                      </div>
                      {metric.source && (
                        <div className="relative group">
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            size="lg"
                            className="text-[#e8e8e8] cursor-pointer"
                          />
                          <div className="absolute top-6 right-0 bg-[#444] text-sm text-[#e8e8e8] p-2 rounded shadow-lg w-64 z-50 hidden group-hover:block">
                            <p className="block text-xs break-words">
                              {metric.source}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      {(() => {
                        switch (metric.type) {
                          case "list":
                          case "nested-list":
                            return <DynamicListCard data={metric} />
                          case "html":
                            return (
                              <div className="relative">
                                <iframe
                                  className="w-full h-full border-none"
                                  src={metric.value}
                                  allowFullScreen
                                ></iframe>
                              </div>
                            )
                          case "number":
                            return <InfoCard data={metric} />
                          case "table":
                            return (
                              <DynamicTransportTable
                                reports={countryDetails.publicTransport}
                              />
                            )
                          default:
                            return <InfoCard data={metric} />
                        }
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}

        <div className="bg-[#222] p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Public Transport</h2>
          <DynamicTransportTable reports={countryDetails.publicTransport} />
        </div>

        <div className="bg-[#222] p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Cities</h2>
          <ul className="list-disc list-inside text-lg">
            {countryDetails.cities.map((city, cityIndex) => (
              <li key={cityIndex}>{city}</li>
            ))}
          </ul>
        </div>
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
