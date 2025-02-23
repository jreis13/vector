import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import placeholder from "public/icons/avatarIcon.svg"
import { useEffect, useRef, useState } from "react"
import icons from "src/common/icons/icons"

export default function CompanyCard({ title, data }) {
  const hasData = data && data.length > 0

  return (
    <div className="flex flex-col py-8 lg:py-16">
      <h2 className="mb-8">{title}</h2>
      <div className="grid place-items-center gap-y-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {hasData ? (
          data.map((item, index) => (
            <div key={index} className="w-[400px] h-full relative">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col"
                >
                  <CardContent item={item} title={title} />
                </a>
              ) : (
                <div className="flex flex-col">
                  <CardContent item={item} title={title} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="w-[400px] h-full flex flex-col">
            <CardContent
              item={{
                name: "No data available",
                title: "Undisclosed",
                icon: "questionIcon",
              }}
              title={title}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function CardContent({ item, title }) {
  const rawName = item.name || "Unknown"
  const parts = rawName.split("_")
  const displayName = parts[0].trim()
  const iconKey = parts[1] ? parts[1].trim() : "questionIcon"

  const finalIcon =
    title === "Founding Team"
      ? "personIcon"
      : title === "Patents"
        ? "patentIcon"
        : iconKey

  const [label, value] = displayName.includes(" - ")
    ? displayName.split(" - ").map((s) => s.trim())
    : [displayName, ""]

  const IconComponent = icons[finalIcon] || icons["questionIcon"]

  const [showSource, setShowSource] = useState(false)
  const sourceRef = useRef(null)

  const toggleSource = () => {
    setShowSource(!showSource)
  }

  const closeSourceOnOutsideClick = (e) => {
    if (sourceRef.current && !sourceRef.current.contains(e.target)) {
      setShowSource(false)
    }
  }

  useEffect(() => {
    if (showSource) {
      document.addEventListener("mousedown", closeSourceOnOutsideClick)
    } else {
      document.removeEventListener("mousedown", closeSourceOnOutsideClick)
    }
    return () => {
      document.removeEventListener("mousedown", closeSourceOnOutsideClick)
    }
  }, [showSource])

  return (
    <a
      href={title === "Key Investors" && item.link ? item.link : undefined}
      target={title === "Key Investors" && item.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`group w-full h-[250px] relative flex flex-col items-center bg-[#34333d] rounded-lg p-4 ${
        title === "Key Investors" && item.link ? "cursor-pointer" : ""
      }`}
    >
      <div className="absolute top-2 right-2 flex space-x-2">
        {item.source && (
          <div className="relative group">
            <button
              className="text-[#e8e8e8] p-1 rounded-full focus:outline-none"
              aria-label="Source Info"
            >
              <FontAwesomeIcon icon={faCircleInfo} size="sm" />
            </button>
            <div
              ref={sourceRef}
              className="absolute top-8 right-0 bg-[#444] text-sm text-[#e8e8e8] p-2 rounded shadow-lg w-64 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <p className="block text-xs break-words">{item.source}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mb-4 flex h-24 w-24 items-center justify-center">
        {title === "Key Investors" && item.logo ? (
          <Image
            src={item.logo}
            alt={label}
            width={80} // Set a larger fixed width
            height={80} // Set a larger fixed height
            className="w-20 h-20 object-contain rounded-md" // Maintain aspect ratio
          />
        ) : (
          <Image
            src={IconComponent ? IconComponent : placeholder}
            alt={label}
            width={80}
            height={80}
            className="w-20 h-20 object-contain"
          />
        )}
      </div>
      <div className="text-center">
        <span className="block font-semibold text-xl">
          {title === "Patents"
            ? "Number of Patents"
            : title === "Key Investors"
              ? item.name
              : label}
        </span>
        <p className="text-[#b8b8b8] text-lg font-medium">
          {title === "Patents"
            ? label
            : title === "Key Investors"
              ? item.description || ""
              : value}
        </p>
      </div>
    </a>
  )
}
