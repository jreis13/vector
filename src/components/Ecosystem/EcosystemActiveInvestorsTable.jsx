import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"

export default function EcosystemActiveInvestorsTable({ attributes, data }) {
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

  const [visibleCompanies, setVisibleCompanies] = useState(
    data.map((group) => group.companyName)
  )

  const toggleCompanyVisibility = (companyName) => {
    if (visibleCompanies.includes(companyName)) {
      setVisibleCompanies(
        visibleCompanies.filter((name) => name !== companyName)
      )
    } else {
      setVisibleCompanies([...visibleCompanies, companyName])
    }
  }

  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
      <div className="flex items-center gap-4">
        <h2>Active Investors</h2>
        <span className="text-md text-gray-400">(Past 13 months)</span>
      </div>
      <table className="w-full min-w-max table-auto text-left text-[#e8e8e8] rounded-lg mt-4">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
              Company
            </th>
            {attributes.map((attr) => (
              <th
                key={attr}
                className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8] capitalize"
              >
                {attr}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((group, groupIndex) => (
            <React.Fragment key={group.companyName}>
              <tr
                className={
                  groupIndex % 2 === 0 ? "bg-transparent" : "bg-[#34333d]"
                }
              >
                <td
                  className="px-6 py-4 text-[#e8e8e8] text-lg font-semibold"
                  rowSpan={
                    visibleCompanies.includes(group.companyName)
                      ? group.investors.length + 1
                      : 1
                  }
                >
                  <div className="flex items-center justify-between">
                    {group.companyName}
                    <button
                      className="ml-4 text-[#6600cc] hover:text-[#6600cc]"
                      onClick={() => toggleCompanyVisibility(group.companyName)}
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
                      className={
                        groupIndex % 2 === 0 ? "bg-transparent" : "bg-[#34333d]"
                      }
                    >
                      <td className="px-6 py-4">{investor.name || "N/A"}</td>
                      <td className="px-6 py-4">
                        {investor.fundingRound || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {investor.leadInvestor || "N/A"}
                      </td>
                      <td className="px-6 py-4">{investor.amount || "N/A"}</td>
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
  )
}
