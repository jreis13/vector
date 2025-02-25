"use client"

import InfoCard from "./StatCards/InfoCard"

export default function EcosystemCountryProfilesDetails({ countryDetails }) {
  if (!countryDetails || !countryDetails.subcategories) {
    console.warn("⚠️ No valid data available yet")
    return <div className="text-yellow-500 font-bold">No data available.</div>
  }

  return (
    <div className="container mx-auto py-8 relative">
      <h1 className="text-4xl font-bold mb-16">
        {countryDetails.countryName || "Unknown Country"}
      </h1>

      <div className="space-y-16">
        {countryDetails.subcategories.map((sub, subIndex) => (
          <div
            key={subIndex}
            id={sub.name?.toLowerCase()?.replace(/ /g, "-") || ""}
          >
            <h2 className="mb-8">{sub.name || "Unknown Subcategory"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {sub.metrics.map((metric, metricIndex) => (
                <div
                  key={metricIndex}
                  className="relative flex flex-col h-full items-start gap-4 p-4 bg-[#34333d] rounded-lg"
                >
                  <div className="flex items-center justify-between w-full">
                    <h3 className="mb-2 text-3xl">
                      {metric.name || "Unknown Metric"}
                    </h3>
                  </div>

                  <div className="w-full">
                    {metric.values.length > 0 ? (
                      metric.values.map((val, valIndex) => (
                        <InfoCard
                          key={valIndex}
                          data={{
                            ...metric,
                            value: val.value,
                            unit: val.unit,
                          }}
                        />
                      ))
                    ) : (
                      <p className="text-gray-400">No data available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* <div className="bg-[#222] p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Public Transport</h2>
          <DynamicTransportTable
            reports={countryDetails.publicTransport || []}
          />
        </div> */}
      </div>
    </div>
  )
}
