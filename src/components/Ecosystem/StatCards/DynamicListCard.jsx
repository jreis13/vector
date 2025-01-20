"use client"

import { faMobileAlt, faWifi } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PercentageChart from "./PercentageChart"

export default function DynamicListCard({ data }) {
  const renderContent = (item, index) => {
    if (typeof item === "object" && item.type === "percentage") {
      const percentage = parseFloat(item.description.match(/-?\d+/)?.[0]) || 0

      return (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-2 p-4 h-fit"
        >
          <PercentageChart percentage={percentage} />
          <div className="text-center flex flex-col gap-2">
            <p>{item.subtitle}:</p>
            <p>{item.description}</p>
          </div>
        </div>
      )
    } else if (typeof item === "object" && item.subtitle) {
      return (
        <div
          key={index}
          className={`flex flex-col ${
            item.subtitle === "Mobile" || item.subtitle === "Fixed Broadband"
              ? "items-center justify-center"
              : ""
          } p-4 h-fit`}
        >
          <div
            className={`flex ${
              item.subtitle === "Mobile" || item.subtitle === "Fixed Broadband"
                ? "items-center justify-center"
                : "items-start"
            } text-4xl`}
          >
            {item.subtitle === "Mobile" ? (
              <FontAwesomeIcon icon={faMobileAlt} />
            ) : item.subtitle === "Fixed Broadband" ? (
              <FontAwesomeIcon icon={faWifi} />
            ) : null}
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <p className="font-bold text-xl">{item.subtitle}:</p>
            <p
              className={`text-lg ${item.subtitle === "Mobile" || item.subtitle === "Fixed Broadband" ? "text-center" : ""}`}
            >
              {item.description || "N/A"}
            </p>
          </div>
        </div>
      )
    } else if (Array.isArray(item)) {
      return (
        <ul key={index} className="list-disc pl-5">
          {item.map((nestedItem, nestedIndex) =>
            renderContent(nestedItem, nestedIndex)
          )}
        </ul>
      )
    } else if (typeof item === "string") {
      return (
        <li className="list-none" key={index}>
          {item}
        </li>
      )
    }

    return null
  }

  const hasPercentage = data.value.some((item) => item.type === "percentage")
  const hasFontAwesomeIcon = data.value.some(
    (item) => item.subtitle === "Mobile" || item.subtitle === "Fixed Broadband"
  )

  return (
    <div
      className={`grid grid-cols-1 gap-4 ${
        hasPercentage ? "lg:grid-cols-3" : "grid-cols-2"
      }`}
    >
      {Array.isArray(data.value)
        ? data.value.map((item, index) => renderContent(item, index))
        : renderContent(data.value, 0)}
    </div>
  )
}
