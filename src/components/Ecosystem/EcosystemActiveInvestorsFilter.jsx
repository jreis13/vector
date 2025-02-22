import {
  faArrowAltCircleLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function EcosystemActiveInvestorsFilter({
  filters,
  setFilters,
  investorTypeOptions,
  investorStageOptions,
  investorCountryOptions,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value, // ✅ Always update the value (not toggle)
    }))
  }

  const clearFilters = () => {
    setFilters({
      type: "",
      stages: "",
      country: "",
    })
    setIsExpanded(false) // ✅ Close filters after clearing
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
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="filter-panel"
              className="flex flex-wrap justify-end items-center gap-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              {/* ✅ Type Filter */}
              <motion.div className="flex gap-4 items-center">
                <h3>Type:</h3>
                <select
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  value={filters.type}
                  className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                >
                  <option value="">All Types</option>
                  {investorTypeOptions.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div className="flex gap-4 items-center">
                <h3>Stage:</h3>
                <select
                  onChange={(e) => handleFilterChange("stages", e.target.value)}
                  value={filters.stages}
                  className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                >
                  <option value="">All Stages</option>
                  {investorStageOptions.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div className="flex gap-4 items-center">
                <h3>Country:</h3>
                <select
                  onChange={(e) =>
                    handleFilterChange("country", e.target.value)
                  }
                  value={filters.country}
                  className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                >
                  <option value="">All Countries</option>
                  {investorCountryOptions.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.button
                onClick={clearFilters}
                className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                whileHover={{ scale: 1.05 }}
              >
                Clear Filters
              </motion.button>

              <motion.button
                onClick={() => setIsExpanded(false)}
                className="text-[#e8e8e8] focus:outline-none"
                whileHover={{ scale: 1.05 }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}
