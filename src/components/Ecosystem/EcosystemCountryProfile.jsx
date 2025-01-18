"use client"

import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CurrencyCard from "./StatCards/CurrencyCard"
import NestedListCard from "./StatCards/NestedListCard"
import PercentageCard from "./StatCards/PercentageCard"
import QuantityCard from "./StatCards/QuantityCard"
import RankingCard from "./StatCards/RankingCard"
import TextCard from "./StatCards/TextCard"

export default function EcosystemCountryProfile({ countryName, reports }) {
  const handleBackClick = () => {
    window.open(
      `/ecosystems/evtolandvtolaircrafts?tab=countryProfiles`,
      "_self"
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-16">
        {countryName} - Country Profile
      </h1>

      <div className="space-y-16">
        {reports.map((report, reportIndex) => (
          <div key={reportIndex} className="p-6">
            <h2 className="text-3xl font-semibold mb-8">{report.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(report.details).map(([key, value], idx) => {
                switch (value.type) {
                  case "percentage":
                    return <PercentageCard key={idx} title={key} data={value} />
                  case "number":
                    return <QuantityCard key={idx} title={key} data={value} />
                  case "ordinal":
                    return <RankingCard key={idx} title={key} data={value} />
                  case "text":
                    return <TextCard key={idx} title={key} data={value} />
                  case "list":
                  case "nested-list":
                    return <NestedListCard key={idx} title={key} data={value} />
                  case "html":
                    return (
                      <div key={idx} className="p-4">
                        <h3 className="text-lg font-bold mb-4">{key}:</h3>
                        <div
                          dangerouslySetInnerHTML={{ __html: value.value }}
                          className="w-full"
                        />
                      </div>
                    )
                  case "currency":
                    return <CurrencyCard key={idx} title={key} data={value} />
                  default:
                    return (
                      <div key={idx} className="p-4 bg-red-100">
                        <strong>{key}:</strong> Unsupported data type
                      </div>
                    )
                }
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
