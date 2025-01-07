"use client"

import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import {
  fundingAmountRanges,
  fundingStageOptions,
  industryOptions,
} from "../../common/data/filterData"
import { filterCompanies } from "../../common/utils/filterUtils"
import CompanyCard from "../CompanyCard"
import EcosystemCompaniesFilter from "./EcosystemCompaniesFilter"

export default function EcosystemCompanies({ companies = [], ecosystemName }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [filters, setFilters] = useState({
    industry: "",
    fundingStage: "",
    fundingAmount: "",
  })

  const companiesPerPage = 6

  const filteredCompanies = filterCompanies(companies, filters, {
    industryOptions,
    fundingStageOptions,
    fundingAmountRanges,
  })

  const totalFilteredPages = Math.ceil(
    filteredCompanies.length / companiesPerPage
  )

  const currentCompanies = filteredCompanies.slice(
    currentPage * companiesPerPage,
    currentPage * companiesPerPage + companiesPerPage
  )

  const [direction, setDirection] = useState(1)

  const handleNext = () => {
    setDirection(1)
    setCurrentPage((prev) => (prev + 1 < totalFilteredPages ? prev + 1 : prev))
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev))
  }

  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16">
      <EcosystemCompaniesFilter
        filters={filters}
        setFilters={setFilters}
        industryOptions={industryOptions}
        fundingStageOptions={fundingStageOptions}
        fundingAmountRanges={fundingAmountRanges}
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${currentPage}-${filters.industry}-${filters.fundingStage}-${filters.fundingAmount}`}
          variants={pageVariants}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, type: "tween" }}
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

      {filteredCompanies.length > 0 && (
        <div className="flex justify-between items-center mt-8">
          {currentPage > 0 && (
            <button onClick={handlePrev} className="py-2 text-3xl">
              <FontAwesomeIcon icon={faArrowCircleLeft} />
            </button>
          )}
          <p className="text-gray-400 text-center w-full">
            Page {currentPage + 1} of {totalFilteredPages}
          </p>
          {currentPage < totalFilteredPages - 1 && (
            <button onClick={handleNext} className="py-2 text-3xl">
              <FontAwesomeIcon icon={faArrowCircleRight} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
