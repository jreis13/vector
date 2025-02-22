"use client"

import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import placeholder from "public/icons/avatarIcon.svg"
import { useState } from "react"
import {
  investorCountryOptions,
  investorStageOptions,
  investorTypeOptions,
} from "../../common/data/investorsFilterData"
import InvestorCard from "../InvestorCard"
import EcosystemActiveInvestorsFilter from "./EcosystemActiveInvestorsFilter"
import EcosystemActiveInvestorsTable from "./EcosystemActiveInvestorsTable"

export default function EcosystemActiveInvestors({ keyInvestors, data }) {
  const allInvestors = keyInvestors.map((investor) => ({
    name: investor.name || investor["Name"] || "Unknown",
    logo: investor.logo || investor["Logo"] || placeholder,
    description:
      investor.description ||
      investor["Description"] ||
      "No description available",
    type: investor.type || investor["Type"] || "N/A",
    stages: investor.stages || investor["Stages"] || "N/A",
    link: investor.link || investor["Link"] || "#",
  }))

  console.log("🔥 All Investors Before Filtering:", allInvestors)

  const [filters, setFilters] = useState({ type: "", stages: "", country: "" })

  const filteredInvestors = allInvestors.filter((investor) => {
    const matchesType =
      !filters.type ||
      investor.type.some((t) => t.toLowerCase() === filters.type.toLowerCase())

    const matchesStages =
      !filters.stages ||
      investor.stages.some(
        (t) => t.toLowerCase() === filters.stages.toLowerCase()
      )

    const matchesCountry =
      !filters.country ||
      investor.description.toLowerCase().includes(filters.country.toLowerCase())

    return matchesType && matchesStages && matchesCountry
  })

  console.log("✅ Filtered Investors:", filteredInvestors)

  const [currentPage, setCurrentPage] = useState(0)
  const investorsPerPage = 9
  const totalPages = Math.ceil(filteredInvestors.length / investorsPerPage)

  const handleNext = () =>
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
  const handlePrev = () =>
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev))

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
      <EcosystemActiveInvestorsFilter
        filters={filters}
        setFilters={setFilters}
        investorTypeOptions={investorTypeOptions}
        investorStageOptions={investorStageOptions}
        investorCountryOptions={investorCountryOptions}
      />

      <div className="mb-16">
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
              key={`${currentPage}-${filters.type}-${filters.stages}-${filters.country}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              style={{ minHeight: "450px" }}
            >
              {filteredInvestors
                .slice(
                  currentPage * investorsPerPage,
                  (currentPage + 1) * investorsPerPage
                )
                .map((investor, index) => (
                  <InvestorCard
                    key={`${investor.name}-${index}`}
                    investor={investor}
                  />
                ))}
            </motion.div>
          </AnimatePresence>
          {currentPage < totalPages - 1 && (
            <div className="flex flex-col justify-center items-center">
              <button onClick={handleNext} className="py-2 ml-4 text-3xl">
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Page {currentPage + 1} of {totalPages}
          </p>
        </div>
      </div>

      <EcosystemActiveInvestorsTable data={data} />
    </div>
  )
}
