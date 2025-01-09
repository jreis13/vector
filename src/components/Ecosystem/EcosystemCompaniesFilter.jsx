import {
  faArrowAltCircleLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function EcosystemCompaniesFilter({
  filters,
  setFilters,
  industryOptions,
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

  const filterAnimation = {
    hidden: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  }

  return (
    <motion.div
      className="relative flex justify-end ml-4 mb-4"
      initial="minimized"
      animate={isExpanded ? "expanded" : "minimized"}
    >
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
              className="flex justify-end items-center gap-8"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={filterAnimation}
            >
              <motion.div
                className="flex gap-4 items-center"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={filterAnimation}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3>Industry:</h3>
                <motion.select
                  onChange={(e) =>
                    handleFilterChange("industry", e.target.value)
                  }
                  value={filters.industry}
                  className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  whileFocus={{ scale: 1.05 }}
                >
                  <option value="">All Industries</option>
                  {industryOptions.map((option) => (
                    <motion.option
                      key={option.label}
                      value={option.label}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {option.label}
                    </motion.option>
                  ))}
                </motion.select>
              </motion.div>

              <motion.div
                className="flex gap-4 items-center"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={filterAnimation}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3>Funding Stage:</h3>
                <motion.select
                  onChange={(e) =>
                    handleFilterChange("fundingStage", e.target.value)
                  }
                  value={filters.fundingStage}
                  className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  whileFocus={{ scale: 1.05 }}
                >
                  <option value="">All Stages</option>
                  {fundingStageOptions.map((option) => (
                    <motion.option
                      key={option.label}
                      value={option.label}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {option.label}
                    </motion.option>
                  ))}
                </motion.select>
              </motion.div>

              <motion.div
                className="flex gap-4 items-center"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={filterAnimation}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h3>Funding Amount:</h3>
                <motion.select
                  onChange={(e) =>
                    handleFilterChange("fundingAmount", e.target.value)
                  }
                  value={filters.fundingAmount}
                  className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  whileFocus={{ scale: 1.05 }}
                >
                  <option value="">Any</option>
                  {fundingAmountRanges.map((range) => (
                    <motion.option
                      key={range.label}
                      value={range.label}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {range.label}
                    </motion.option>
                  ))}
                </motion.select>
              </motion.div>

              <motion.button
                onClick={() => setIsExpanded(false)}
                className="text-[#e8e8e8] focus:outline-none h-fit"
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
