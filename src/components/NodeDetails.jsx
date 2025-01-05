"use client"

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function NodeDetails({ nodes }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleNode = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="mt-16">
      <div className="px-16 flex justify-center">
        <div className="container">
          <div className="w-full grid gap-10">
            {nodes.map((node, index) => (
              <div key={node.name}>
                <div
                  className="flex items-center justify-between pb-6 font-bold cursor-pointer"
                  onClick={() => toggleNode(index)}
                >
                  <span>{node.name}</span>
                  <FontAwesomeIcon
                    icon={expandedIndex === index ? faChevronUp : faChevronDown}
                  />
                </div>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 pt-4 overflow-hidden"
                    >
                      <div className="font-normal text-left">{node.data}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
