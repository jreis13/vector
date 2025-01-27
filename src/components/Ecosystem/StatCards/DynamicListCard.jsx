"use client"

import Image from "next/image"
import icons from "src/common/icons/icons"
import PercentageChart from "./PercentageChart"

export default function DynamicListCard({ data }) {
  const renderContent = (item, index) => {
    if (typeof item === "object" && item.type === "percentage") {
      const percentage = parseFloat(item.description.match(/-?\d+/)?.[0]) || 0

      return (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 h-fit"
        >
          <PercentageChart percentage={percentage} />
          <div className="flex flex-col gap-2">
            <p className="font-bold text-lg">{item.subtitle}</p>
            <p>{item.description}</p>
          </div>
        </div>
      )
    } else if (typeof item === "object" && item.type === "number") {
      const iconSrc = icons[item.icon]

      return (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 h-fit"
        >
          <div className="flex items-center justify-center text-4xl mb-2">
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
          <div className="flex flex-col gap-2">
            <p className="font-bold text-lg">{item.subtitle}</p>
            <p className="text-3xl number">{item.description}</p>
          </div>
        </div>
      )
    } else if (typeof item === "object" && item.subtitle) {
      const iconSrc = icons[item.icon]

      return (
        <div
          key={index}
          className="flex flex-col items-center text-center py-4 h-fit w-fit"
        >
          <div className="flex items-center justify-center text-4xl mb-2">
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
          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">{item.subtitle}</p>
            <p>{item.description || ""}</p>
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
      const iconSrc = icons[data.icon]

      return (
        <li
          className="flex flex-col items-center text-center py-4 h-fit w-fit"
          key={index}
        >
          <div className="text-4xl text-[#7032ff]">
            {iconSrc ? (
              <Image
                src={iconSrc}
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
    <div
      className={`grid grid-cols-1 lg:grid-cols-3 gap-4 justify-start text-center`}
    >
      {Array.isArray(data.value)
        ? data.value.map((item, index) => renderContent(item, index))
        : renderContent(data.value, 0)}
    </div>
  )
}
