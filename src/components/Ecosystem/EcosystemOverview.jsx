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
    <div className="flex flex-col my-4">
      <h3 className="px-6 lg:px-16 mb-16">
        {ecosystem.overview[0].description}
      </h3>
      <div className="flex h-[70vh]">
        {currentPage > 0 && (
          <div className="flex flex-col justify-center items-center">
            <button onClick={handlePrev} className="py-2 ml-16 text-3xl">
              <FontAwesomeIcon icon={faArrowCircleLeft} />
            </button>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 flex-1 px-6 lg:px-16"
          >
            <NodeGraph nodeGroup={currentGroup} />
            <NodeDetails nodes={currentGroup.nodes} nodeGroup={currentGroup} />
          </motion.div>
        </AnimatePresence>
        {currentPage < totalPages - 1 && (
          <div className="flex flex-col justify-center items-center">
            <button onClick={handleNext} className="py-2 mr-16 text-3xl">
              <FontAwesomeIcon icon={faArrowCircleRight} />
            </button>
          </div>
        )}
      </div>
      <div className="text-center mt-4 px-16">
        <p className="text-gray-400">
          Page {currentPage + 1} of {totalPages}
        </p>
      </div>
    </div>
  )
}
