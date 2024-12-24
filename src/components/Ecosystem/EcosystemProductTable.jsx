import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"

export default function EcosystemProductTable({ groupedProducts, attributes }) {
  const [visibleCompanies, setVisibleCompanies] = useState([])

  const toggleCompanyVisibility = (companyName) => {
    setVisibleCompanies((prev) =>
      prev.includes(companyName)
        ? prev.filter((name) => name !== companyName)
        : [...prev, companyName]
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Company</th>
            {attributes.map((attr) => (
              <th
                key={attr}
                className="border border-gray-300 px-4 py-2 capitalize"
              >
                {attr}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groupedProducts.map((group) => (
            <React.Fragment key={group.companyName}>
              {/* Company Row */}
              {visibleCompanies.includes(group.companyName) ? (
                group.products.map((product, productIndex) => (
                  <tr
                    key={`${group.companyName}-${product.name || productIndex}`}
                  >
                    {productIndex === 0 && (
                      <td
                        className="border border-gray-300 px-4 py-2 text-center font-bold"
                        rowSpan={group.products.length}
                      >
                        <div className="flex items-center justify-center">
                          {group.companyName}
                          <button
                            className="ml-4 text-[#7032ff] hover:text-[#6600cc]"
                            onClick={() =>
                              toggleCompanyVisibility(group.companyName)
                            }
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </div>
                      </td>
                    )}
                    {attributes.map((attr) => (
                      <td
                        key={`${product.name || productIndex}-${attr}`}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {product[attr] || "N/A"}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-300 px-4 py-2 text-center font-bold"
                    rowSpan={1}
                  >
                    <div className="flex items-center justify-between">
                      {group.companyName}
                      <button
                        className="ml-4 text-[#7032ff] hover:text-[#6600cc]"
                        onClick={() =>
                          toggleCompanyVisibility(group.companyName)
                        }
                      >
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </button>
                    </div>
                  </td>
                  <td
                    colSpan={attributes.length}
                    className="border border-gray-300 px-4 py-2 text-center"
                  ></td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
