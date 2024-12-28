import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function EcosystemStatCard({ title, value }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isExpandable, setIsExpandable] = useState(false)
  const contentRef = useRef(null)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      setIsExpandable(contentHeight > 200)
    }
  }, [value])

  return (
    <motion.div
      layout
      className={`bg-[#34333d] text-[#e8e8e8] p-4 rounded-lg shadow relative ${
        isExpanded ? "h-auto" : "overflow-hidden"
      }`}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {isExpandable && (
        <button
          onClick={toggleExpand}
          className="absolute top-2 right-2 text-[#e8e8e8] p-1 rounded-full focus:outline-none"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          <FontAwesomeIcon
            icon={isExpanded ? faCompress : faExpand}
            size="sm"
          />
        </button>
      )}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div
        ref={contentRef}
        className={`text-md text-[#e8e8e8] ${
          !isExpanded && isExpandable ? "max-h-[200px]" : "h-auto"
        }`}
      >
        {typeof value === "string" ? (
          <p>{value}</p>
        ) : Array.isArray(value) ? (
          <ul className="text-sm text-[#e8e8e8] mt-2 list-none space-y-2">
            {value.map((item, idx) => (
              <li key={idx}>
                {typeof item === "string" ? (
                  item
                ) : (
                  <>
                    {item.subtitle && (
                      <h4 className="text-md font-semibold text-gray-200">
                        {item.subtitle}
                      </h4>
                    )}
                    {item.description && (
                      <p className="mt-1 text-[#e8e8e8]">{item.description}</p>
                    )}
                    {item.details && (
                      <ul className="list-none space-y-1 ml-4">
                        {Object.entries(item.details).map(([key, val]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {val}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : typeof value === "object" ? (
          <div className="text-sm text-[#e8e8e8] mt-2">
            {value.subtitle && (
              <h4 className="text-md font-semibold text-gray-200">
                {value.subtitle}
              </h4>
            )}
            {value.description && (
              <p className="mt-1 text-[#e8e8e8]">{value.description}</p>
            )}
            {value.details && (
              <ul className="list-none space-y-1 ml-4">
                {Object.entries(value.details).map(([key, val]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {val}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}
