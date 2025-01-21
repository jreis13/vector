import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"

export default function EcosystemProductTable({ groupedProducts, attributes }) {
  const [visibleCompanies, setVisibleCompanies] = useState(
    groupedProducts.map((group) => group.companyName)
  )

  const toggleCompanyVisibility = (companyName) => {
    setVisibleCompanies((prev) =>
      prev.includes(companyName)
        ? prev.filter((name) => name !== companyName)
        : [...prev, companyName]
    )
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

  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 pb-4">
      <table className="w-full min-w-max table-auto text-left text-[#e8e8e8]">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b text-lg font-semibold text-[#e8e8e8]">
              Company
            </th>
            {attributes
              .filter((attr) => attr !== "description")
              .map((attr) => (
                <th
                  key={attr}
                  className="px-6 border-b py-3 text-lg font-semibold text-[#e8e8e8] capitalize"
                >
                  {attr}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {groupedProducts.map((group, groupIndex) => (
            <React.Fragment key={group.companyName}>
              <tr
                className={`${
                  groupIndex % 2 === 0 ? "bg-transparent" : "bg-[#34333d]"
                }`}
              >
                <td
                  className="px-6 py-4 text-[#e8e8e8] text-lg font-semibold"
                  rowSpan={
                    visibleCompanies.includes(group.companyName)
                      ? group.products.length + 1
                      : 1
                  }
                >
                  <div className="flex items-center justify-between">
                    {group.companyName}
                    <button
                      className="ml-4 text-[#7032ff] hover:text-[#6600cc]"
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
                  group.products.map((product, productIndex) => (
                    <motion.tr
                      key={`${group.companyName}-${product.name || productIndex}`}
                      {...rowAnimation}
                      className={`${
                        groupIndex % 2 === 0 ? "bg-transparent" : "bg-[#34333d]"
                      } `}
                    >
                      {attributes
                        .filter((attr) => attr !== "description")
                        .map((attr) => (
                          <td
                            key={`${product.name || productIndex}-${attr}`}
                            className="px-6 py-4 text-[#e8e8e8] text-lg"
                          >
                            {product[attr] || "N/A"}
                          </td>
                        ))}
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
