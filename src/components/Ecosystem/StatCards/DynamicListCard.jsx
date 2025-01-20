"use client"

import {
  faFileInvoiceDollar,
  faHelicopter,
  faMobileAlt,
  faMoneyBill1Wave,
  faMoneyBillTransfer,
  faPlane,
  faRobot,
  faUser,
  faWifi,
} from "@fortawesome/free-solid-svg-icons"
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
            <p>{item.subtitle}</p>
            <p>{item.description}</p>
          </div>
        </div>
      )
    } else if (typeof item === "object" && item.subtitle) {
      return (
        <div
          key={index}
          className={`flex flex-col ${
            item.subtitle === "Mobile" ||
            item.subtitle === "Fixed Broadband" ||
            item.subtitle === "Visitors"
              ? "items-center justify-center"
              : ""
          } p-4 h-fit`}
        >
          <div
            className={`flex ${
              item.subtitle === "Mobile" ||
              item.subtitle === "Fixed Broadband" ||
              item.subtitle === "Visitors" ||
              item.subtitle.includes("Spending") ||
              item.subtitle.includes("Spent") ||
              item.subtitle.includes("Public")
                ? "items-center justify-center"
                : "items-start"
            } text-4xl`}
          >
            {item.subtitle === "Mobile" ? (
              <FontAwesomeIcon icon={faMobileAlt} />
            ) : item.subtitle === "Fixed Broadband" ? (
              <FontAwesomeIcon icon={faWifi} />
            ) : item.subtitle === "Visitors" ? (
              <FontAwesomeIcon icon={faUser} />
            ) : item.subtitle.includes("Spending") ? (
              <FontAwesomeIcon icon={faMoneyBill1Wave} />
            ) : item.subtitle.includes("Spent") ? (
              <FontAwesomeIcon icon={faMoneyBillTransfer} />
            ) : item.subtitle.includes("Public") ? (
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
            ) : null}
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <p className="font-bold text-xl">{item.subtitle}</p>
            <p
              className={`text-lg ${item.subtitle === "Mobile" || item.subtitle === "Fixed Broadband" || item.subtitle === "Visitors" ? "text-center" : ""}`}
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
        <li
          className="list-none flex flex-col items-center gap-2 p-4"
          key={index}
        >
          <div className="text-4xl">
            {item.includes("Airports") ? (
              <FontAwesomeIcon icon={faPlane} />
            ) : item.includes("Airfields") ? (
              <FontAwesomeIcon icon={faHelicopter} />
            ) : item.includes("estimation") ? (
              <FontAwesomeIcon icon={faRobot} />
            ) : null}
          </div>
          <span className="text-center">{item}</span>
        </li>
      )
    }

    return null
  }

  const getGridColumns = (length) => {
    if (length % 3 === 0) {
      return "lg:grid-cols-3"
    } else if (length % 2 === 0) {
      return "lg:grid-cols-2"
    } else {
      return "lg:grid-cols-3"
    }
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 text-center ${getGridColumns(data.value.length)}`}
    >
      {Array.isArray(data.value)
        ? data.value.map((item, index) => renderContent(item, index))
        : renderContent(data.value, 0)}
    </div>
  )
}
