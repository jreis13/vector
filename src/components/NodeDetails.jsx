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

  const otherNodes = nodes.filter((node) => node.group !== 1)

  return (
    <div className="mt-16">
      <div className="px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto grid gap-10">
            {otherNodes.map((node, index) => (
              <div key={node.id}>
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
                      <div className="font-normal text-left">
                        {node.data || "No description available."}
                      </div>
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
