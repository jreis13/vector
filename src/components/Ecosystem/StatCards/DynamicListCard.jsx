"use client"

import Image from "next/image"
import icons from "src/common/icons/icons"
import PercentageChart from "./PercentageChart"

export default function DynamicListCard({ data }) {
  const renderContent = (item, index) => {
    if (typeof item === "object" && item.type === "percentage") {
      return (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 gap-4 h-fit"
        >
          <PercentageChart percentage={item.percentage} />
          <div className="flex flex-col gap-2">
            <p className="font-bold text-lg">{item.subtitle}</p>
            <p>{item.description}</p>
          </div>
        </div>
      )
    } else if (typeof item === "object" && item.type === "number") {
      return (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 h-fit"
        >
          <div className="flex flex-col items-center justify-center text-4xl mb-2">
            {icons[item.icon] ? (
              <Image
                src={icons[item.icon]}
                alt={item.subtitle || "icon"}
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />
            ) : item.logo ? (
              <Image
                src={item.logo}
                alt={item.subtitle}
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="font-bold text-lg">{item.subtitle}</p>
            <p className="text-3xl">{item.description}</p>
          </div>
        </div>
      )
    } else if (typeof item === "object" && item.subtitle) {
      return (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 w-full"
        >
          <div className="flex flex-col items-center justify-center text-4xl mb-2">
            {icons[item.icon] ? (
              <Image
                src={icons[item.icon] || "/public/icons/defaultIcon.svg"}
                alt={item.subtitle || "icon"}
                width={50}
                height={50}
              />
            ) : item.logo ? (
              <Image
                src={item.logo}
                alt={item.subtitle}
                width={50}
                height={50}
              />
            ) : null}
          </div>
          <h3 className="font-bold text-xl">{item.subtitle}</h3>
          {item.description && (
            <p className="text-sm text-gray-400 mt-2">{item.description}</p>
          )}
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
          key={index}
          className="flex flex-col items-center text-center py-4 h-fit w-fit"
        >
          <div className="flex flex-col items-center text-4xl text-[#6600cc]">
            {icons[data.icon] ? (
              <Image
                src={icons[data.icon]}
                alt={item}
                width={50}
                height={50}
                className="rounded"
              />
            ) : data.logo ? (
              <Image
                src={data.logo}
                alt={item}
                width={50}
                height={50}
                className="rounded"
              />
            ) : null}
          </div>
          <span>{item}</span>
        </li>
      )
    }

    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {Array.isArray(data.value)
        ? data.value.map((item, index) => renderContent(item, index))
        : renderContent(data.value, 0)}
    </div>
  )
}
