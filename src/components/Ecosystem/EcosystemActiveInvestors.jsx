"use client"

import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import placeholder from "public/icons/avatarIcon.svg"
import { useState } from "react"
import InvestorCard from "../InvestorCard"

export default function ActiveInvestors({ companies }) {
  const allInvestors = companies
    .flatMap((company) => company.investors?.data || [])
    .filter(
      (investor, index, self) =>
        index === self.findIndex((t) => t.value === investor.value)
    )
    .map((investor) => ({
      name: investor.value,
      logo: investor.logo || placeholder,
    }))

  const [currentPage, setCurrentPage] = useState(0)
  const investorsPerPage = 9
  const totalPages = Math.ceil(allInvestors.length / investorsPerPage)

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
  }

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev))
  }

  const currentInvestors = allInvestors.slice(
    currentPage * investorsPerPage,
    currentPage * investorsPerPage + investorsPerPage
  )

  if (!allInvestors.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No active investors found</p>
      </div>
    )
  }

  return (
    <div
      id="ActiveInvestors"
      className="flex flex-col px-6 py-8 lg:px-16 lg:py-16 min-h-screen"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ minHeight: "450px" }}
        >
          {currentInvestors.map((investor, index) => (
            <InvestorCard key={index} investor={investor} />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center mt-8">
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
    </div>
  )
}
