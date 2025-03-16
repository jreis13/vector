import {
  faArrowAltCircleLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function CategoryFilter({
  categories,
  selectedCategories,
  onChange,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCategoryChange = (category) => {
    onChange(category)
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
    <motion.div className="relative flex justify-end  mb-4 w-full">
      {!isExpanded ? (
        <motion.button
          onClick={() => setIsExpanded(true)}
          className="bg-[#403f4c] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
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
              className="flex flex-col w-full max-w-[1100px] p-6"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={filterAnimation}
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-wrap gap-2 flex-grow">
                  {categories.map((category, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleCategoryChange(category.title)}
                      className={`px-4 py-2 rounded-lg ${
                        selectedCategories.includes(category.title)
                          ? "bg-[#403f4c]"
                          : "bg-gray-700"
                      } focus:outline-none`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {category.title}
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-center gap-2 min-w-[150px]">
                  <motion.button
                    onClick={() => setIsExpanded(false)}
                    className="text-[#e8e8e8] focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}
