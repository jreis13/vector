"use client"

import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import CompanyCard from "./CompanyCard"

export default function CompaniesPage({ companies, ecosystemName }) {
  const [currentPage, setCurrentPage] = useState(0)
  const companiesPerPage = 3

  const totalPages = Math.ceil(companies.length / companiesPerPage)

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
  }

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev))
  }

  const currentCompanies = companies.slice(
    currentPage * companiesPerPage,
    currentPage * companiesPerPage + companiesPerPage
  )

  if (!companies || companies.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No companies found</p>
      </div>
    )
  }

  return (
    <div
      id="Companies"
      className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {currentCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              ecosystemName={ecosystemName}
            />
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
