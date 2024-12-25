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
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">
              Company
            </th>
            {attributes
              .filter((attr) => attr !== "description")
              .map((attr) => (
                <th
                  key={attr}
                  className="border border-gray-300 px-4 py-2 capitalize min-w-[150px]"
                >
                  {attr}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {groupedProducts.map((group) => (
            <React.Fragment key={group.companyName}>
              {visibleCompanies.includes(group.companyName) ? (
                group.products.map((product, productIndex) => (
                  <tr
                    key={`${group.companyName}-${product.name || productIndex}`}
                  >
                    {productIndex === 0 && (
                      <td
                        className="border border-gray-300 px-4 py-2 text-center font-bold min-w-[150px]"
                        rowSpan={group.products.length}
                      >
                        <div className="flex items-center justify-between min-w-full">
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
                    {attributes
                      .filter((attr) => attr !== "description")
                      .map((attr) => (
                        <td
                          key={`${product.name || productIndex}-${attr}`}
                          className="border border-gray-300 px-4 py-2 min-w-[150px]"
                        >
                          {product[attr] || "N/A"}
                        </td>
                      ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-300 px-4 py-2 text-center font-bold min-w-[150px]"
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
                    colSpan={
                      attributes.filter((attr) => attr !== "description").length
                    }
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
