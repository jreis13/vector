"use client"

import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import placeholder from "public/icons/avatarIcon.svg"
import React, { useState } from "react"
import InvestorCard from "../InvestorCard"

export default function ActiveInvestors({ companies, data }) {
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

  const [visibleCompanies, setVisibleCompanies] = useState([])

  if (!allInvestors.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No active investors found</p>
      </div>
    )
  }

  const toggleCompanyVisibility = (companyName) => {
    if (visibleCompanies.includes(companyName)) {
      setVisibleCompanies(
        visibleCompanies.filter((name) => name !== companyName)
      )
    } else {
      setVisibleCompanies([...visibleCompanies, companyName])
    }
  }

  const rowAnimation = {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: {
      opacity: 1,
      height: "auto",
      overflow: "hidden",
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      height: 0,
      overflow: "hidden",
      transition: { duration: 0 },
    },
  }

  const attributes = [
    "Investor",
    "Funding Round",
    "Lead Investor",
    "Amount",
    "Date",
    "Comments",
  ]

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

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
        <div className="flex items-center gap-4">
          <h2>Active Investors</h2>
          <span className="text-md text-gray-400">(Past 13 months)</span>
        </div>
        <table className="w-full min-w-max table-auto text-left text-[#e8e8e8] rounded-lg mt-4">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-[#e8e8e8] text-lg font-semibold text-[#e8e8e8]">
                Company
              </th>
              {attributes.map((attr) => (
                <th
                  key={attr}
                  className="px-6 py-3 border-b border-[#e8e8e8] text-lg font-semibold text-[#e8e8e8] capitalize"
                >
                  {attr}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((group) => (
              <React.Fragment key={group.companyName}>
                <tr>
                  <td
                    className="px-6 py-4 border-b border-[#e8e8e8] text-[#e8e8e8] text-lg font-semibold"
                    rowSpan={
                      visibleCompanies.includes(group.companyName)
                        ? group.investors.length + 1
                        : 1
                    }
                  >
                    <div className="flex items-center justify-between">
                      {group.companyName}
                      <button
                        className="ml-4 text-[#7032ff] hover:text-[#6600cc]"
                        onClick={() =>
                          toggleCompanyVisibility(group.companyName)
                        }
                      >
                        <FontAwesomeIcon
                          icon={
                            visibleCompanies.includes(group.companyName)
                              ? faEye
                              : faEyeSlash
                          }
                        />
                      </button>
                    </div>
                  </td>
                </tr>
                <AnimatePresence initial={false}>
                  {visibleCompanies.includes(group.companyName) &&
                    group.investors.map((investor, index) => (
                      <motion.tr
                        key={`${group.companyName}-${index}`}
                        {...rowAnimation}
                        className="border-b border-[#e8e8e8]"
                      >
                        <td className="px-6 py-4">{investor.name || "N/A"}</td>
                        <td className="px-6 py-4">
                          {investor.fundingRound || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          {investor.leadInvestor || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          {investor.amount || "N/A"}
                        </td>
                        <td className="px-6 py-4">{investor.date || "N/A"}</td>
                        <td className="px-6 py-4">
                          {investor.comments || "N/A"}
                        </td>
                      </motion.tr>
                    ))}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
