"use client"

import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ScrollReveal from "src/animations/ScrollReveal"
import icons from "src/common/icons/icons"
import DynamicListCard from "./StatCards/DynamicListCard"
import DynamicTransportTable from "./StatCards/DynamicTransportTable"
import InfoCard from "./StatCards/InfoCard"

export default function EcosystemCountryProfilesDetails({ countryDetails }) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  if (!countryDetails || !countryDetails.subcategories) {
    console.warn("⚠️ No valid data available yet")
    return <div className="text-yellow-500 font-bold">No data available.</div>
  }
  return (
    <div className="container mx-auto py-16 relative min-h-screen">
      <div className="flex justify-between items-top">
        <h1 className="text-4xl font-bold mb-16">
          {countryDetails.countryName || "Unknown Country"}
        </h1>
        <h3>
          Last Updated:{" "}
          <span className="font-semibold mx-2">
            {countryDetails.lastUpdated}
          </span>
        </h3>
      </div>

      <div className="space-y-16 pb-20">
        {countryDetails.subcategories.map((sub, subIndex) => (
          <ScrollReveal key={subIndex}>
            <div
              key={subIndex}
              id={sub.name?.toLowerCase()?.replace(/ /g, "-") || ""}
            >
              <h2 className="mb-8">{sub.name || "Unknown Subcategory"}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {sub.metrics.map((metric, metricIndex) => {
                  const validValues = metric.values.filter(
                    (val) => val.value !== ""
                  )

                  const isLastOddMetric =
                    sub.metrics.length % 2 !== 0 &&
                    metricIndex === sub.metrics.length - 1

                  return (
                    <div
                      key={metricIndex}
                      className={`relative flex flex-col h-full items-start gap-4 p-4 bg-[#34333d] rounded-lg ${
                        isLastOddMetric ? "md:col-span-2" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4 w-full">
                        {metric.icon && (
                          <Image
                            src={icons[metric.icon] || ""}
                            alt={metric.name || "Unknown Metric"}
                            height={64}
                            width={64}
                          />
                        )}
                        <h3 className="mb-2 text-3xl">
                          {metric.name || "Unknown Metric"}
                        </h3>
                      </div>

                      <div className="w-full">
                        {metric.name === "Perception of Public Transport" &&
                        metric.perceptionDetails ? (
                          <DynamicTransportTable
                            perceptionData={metric.perceptionDetails}
                          />
                        ) : validValues.length > 0 ? (
                          validValues.some((val) => val.value.includes(";")) ? (
                            <DynamicListCard
                              title={metric.name}
                              data={validValues.flatMap((val) =>
                                val.value.split(";")
                              )}
                              icon={icons[metric.icon]}
                            />
                          ) : (
                            <div
                              className={`grid ${
                                validValues.length % 3 === 0
                                  ? "grid-cols-3"
                                  : validValues.length % 2 === 0
                                    ? "grid-cols-2"
                                    : "grid-cols-1"
                              } gap-4`}
                            >
                              {validValues.map((val, valIndex) => (
                                <InfoCard
                                  key={valIndex}
                                  data={{
                                    ...metric,
                                    value: val.value,
                                    unit: val.unit,
                                    notes: val.notes,
                                    subtitle:
                                      val.subtitle !== metric.name
                                        ? val.subtitle
                                        : "",
                                  }}
                                />
                              ))}
                            </div>
                          )
                        ) : (
                          <p className="text-3xl px-2">No data available.</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <button
        onClick={() =>
          router.push(
            `/ecosystems/${countryDetails.ecosystemName}?tab=countryProfiles`
          )
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-32 left-4 flex items-center gap-2 text-lg font-semibold text-[#6600cc] rounded-full overflow-hidden px-3 py-2"
      >
        <motion.div
          initial={{ width: "2.5rem" }}
          animate={{ width: isHovered ? "16rem" : "2.5rem" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`absolute inset-0  rounded-full z-0 ${isHovered ? "bg-[#e8e8e8]" : ""}`}
        />

        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full z-10  ${isHovered ? "text-[#6600cc]" : "text-[#e8e8e8]"}`}
        >
          <FontAwesomeIcon icon={faCircleArrowLeft} className="text-3xl" />
        </div>

        <span
          className={`whitespace-nowrap transition-all duration-300 ease-in-out z-10 ${
            isHovered
              ? "opacity-100 scale-100 ml-2 text-[#6600cc]"
              : "opacity-0 scale-0"
          }`}
        >
          Back to Ecosystem
        </span>
      </button>
    </div>
  )
}
