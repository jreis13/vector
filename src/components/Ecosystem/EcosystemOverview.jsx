"use client"

import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import NodeDetails from "../NodeDetails"
import NodeGraph from "../NodeGraph"

export default function EcosystemOverview({ ecosystem }) {
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = ecosystem.overview.length

  const currentGroup = ecosystem.overview[currentPage]

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
  }

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev))
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-center mt-8">
            {currentGroup.name}
          </h1>
          <NodeGraph nodeGroup={currentGroup} />
          <div className="flex justify-between items-center mt-8 px-16">
            {currentPage > 0 && (
              <button onClick={handlePrev} className="py-2 text-3xl">
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
            )}
            <p className="text-gray-400 text-center w-full">
              Page {currentPage + 1} of {totalPages}
            </p>
            {currentPage < totalPages - 1 && (
              <button onClick={handleNext} className="py-2 text-3xl">
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </button>
            )}
          </div>
          <NodeDetails nodes={currentGroup.nodes} nodeGroup={currentGroup} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
