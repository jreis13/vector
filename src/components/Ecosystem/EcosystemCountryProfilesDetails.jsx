"use client"

import Image from "next/image"
import ScrollReveal from "src/animations/ScrollReveal"
import icons from "src/common/icons/icons"
import DynamicListCard from "./StatCards/DynamicListCard"
import DynamicTransportTable from "./StatCards/DynamicTransportTable"
import InfoCard from "./StatCards/InfoCard"

export default function EcosystemCountryProfilesDetails({ countryDetails }) {
  if (!countryDetails || !countryDetails.subcategories) {
    console.warn("⚠️ No valid data available yet")
    return <div className="text-yellow-500 font-bold">No data available.</div>
  }

  return (
    <div className="container mx-auto py-16 relative">
      <h1 className="text-4xl font-bold mb-16">
        {countryDetails.countryName || "Unknown Country"}
      </h1>

      <div className="space-y-16">
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
                        {/* Handle Perception of Public Transport */}
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
    </div>
  )
}
