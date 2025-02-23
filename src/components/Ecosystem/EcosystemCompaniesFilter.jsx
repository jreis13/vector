import {
  faArrowAltCircleLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useState } from "react"

export default function EcosystemCompaniesFilter({
  filters,
  setFilters,
  fundingStageOptions,
  fundingAmountRanges,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      fundingStage: "",
      fundingAmount: "",
    })
  }

  return (
    <motion.div className="relative flex justify-end ml-4 mb-4">
      {!isExpanded ? (
        <motion.button
          onClick={() => setIsExpanded(true)}
          className="bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            Filters
          </div>
        </motion.button>
      ) : (
        <motion.div className="flex gap-4 items-center">
          <div className="flex gap-4 items-center">
            <h3>Funding Stage:</h3>
            <motion.select
              whileHover={{ scale: 1.05 }}
              onChange={(e) =>
                handleFilterChange("fundingStage", e.target.value)
              }
              value={filters.fundingStage}
              className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
            >
              <option value="">All Stages</option>
              {fundingStageOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </motion.select>
          </div>

          <div className="flex gap-4 items-center">
            <h3>Funding Amount:</h3>
            <motion.select
              whileHover={{ scale: 1.05 }}
              onChange={(e) =>
                handleFilterChange("fundingAmount", e.target.value)
              }
              value={filters.fundingAmount}
              className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
            >
              <option value="">Any</option>
              {fundingAmountRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </motion.select>
          </div>

          <motion.button
            onClick={clearFilters}
            className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
            whileHover={{ scale: 1.05 }}
          >
            Clear Filters
          </motion.button>
          <motion.button
            onClick={() => setIsExpanded(false)}
            className="text-[#e8e8e8] focus:outline-none h-fit"
            whileHover={{ scale: 1.05 }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
