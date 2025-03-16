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
  regionOptions,
  typeOptions,
} from "../../common/data/companiesFilterData"
import { filterCompanies } from "../../common/utils/filterUtils"
import CompanyCard from "../CompanyCard"
import EcosystemCompaniesFilter from "./EcosystemCompaniesFilter"

export default function EcosystemCompanies({ companies = [], ecosystemName }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [filters, setFilters] = useState({
    fundingStage: "",
    fundingAmount: "",
  })

  const companiesPerPage = 6

  const filteredCompanies = filterCompanies(
    companies || [],
    filters,
    fundingAmountRanges
  )

  const totalFilteredPages = Math.ceil(
    filteredCompanies.length / companiesPerPage
  )

  const currentCompanies = filteredCompanies.slice(
    currentPage * companiesPerPage,
    currentPage * companiesPerPage + companiesPerPage
  )

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1 < totalFilteredPages ? prev + 1 : prev))
  }

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev))
  }

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16">
      <EcosystemCompaniesFilter
        filters={filters}
        setFilters={setFilters}
        fundingStageOptions={fundingStageOptions}
        fundingAmountRanges={fundingAmountRanges}
        typeOptions={typeOptions}
        regionOptions={regionOptions}
        industryOptions={industryOptions}
      />

      {filteredCompanies.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-400 text-lg">No companies found.</p>
        </div>
      ) : (
        <div className="flex h-full">
          {currentPage > 0 && (
            <div className="flex flex-col justify-center items-center">
              <button onClick={handlePrev} className="py-2 mr-4 text-3xl">
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPage}-${filters.fundingStage}-${filters.fundingAmount}-${filters.region}-${filters.type}-${filters.industry}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
          {currentPage < totalFilteredPages - 1 && (
            <div className="flex flex-col justify-center items-center">
              <button onClick={handleNext} className="py-2 ml-4 text-3xl">
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </button>
            </div>
          )}
        </div>
      )}
      {filteredCompanies.length > 0 && (
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Page {currentPage + 1} of {totalFilteredPages}
          </p>
        </div>
      )}
    </div>
  )
}
