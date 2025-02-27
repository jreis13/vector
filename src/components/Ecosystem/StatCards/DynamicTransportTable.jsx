"use client"

import { useEffect, useState } from "react"
import TableCategoryFilter from "./TableCategoryFilter"

export default function DynamicTransportTable({ perceptionData }) {
  const defaultSubCategory = "Public Transport Satisfaction"

  const [selectedCategory, setSelectedCategory] = useState(defaultSubCategory)
  const [tableData, setTableData] = useState([])
  const [columns, setColumns] = useState([])

  useEffect(() => {
    if (!perceptionData) return

    const availableCategories = Object.keys(perceptionData).filter(
      (key) => key !== "type" && key !== "icon" && key !== "source"
    )

    if (!availableCategories.includes(selectedCategory)) {
      console.warn(
        `⚠️ Selected category '${selectedCategory}' not found, using first available category`
      )
      setSelectedCategory(availableCategories[0] || defaultSubCategory)
      return
    }

    const categoryData = perceptionData[selectedCategory]

    if (categoryData?.data?.length > 0) {
      const formattedData = categoryData.data.map((entry) => ({
        city: entry.city ?? "Unknown",
        ...entry.values,
      }))

      setTableData(formattedData)
      setColumns(["city", ...Object.keys(categoryData.data[0]?.values || {})])
    } else {
      console.warn("⚠️ No data found for selected category:", selectedCategory)
      setTableData([])
      setColumns([])
    }
  }, [selectedCategory, perceptionData])

  if (!perceptionData) {
    console.warn("⚠️ No Perception of Public Transport data found!")
    return (
      <p className="text-center text-gray-400">No report data available.</p>
    )
  }

  return (
    <div className="flex flex-col py-8 px-6">
      <TableCategoryFilter
        categories={Object.keys(perceptionData || {})
          .filter((key) => key !== "type" && key !== "icon" && key !== "source")
          .map((category) => ({ title: category }))}
        selectedCategories={[selectedCategory]}
        onChange={(newCategory) => setSelectedCategory(newCategory)}
        defaultCategory={defaultSubCategory}
      />

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-white">{selectedCategory}</h3>

        {tableData.length > 0 ? (
          <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  {columns.map((key, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-center uppercase tracking-wider border-b border-gray-600"
                    >
                      {key === "city"
                        ? "City"
                        : key.replace(/([A-Z])/g, " $1").trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-750 transition duration-200"
                  >
                    {columns.map((col, idx) => (
                      <td
                        key={idx}
                        className="px-6 py-3 text-center border-b border-gray-700"
                      >
                        {col === "city" ? row.city : (row[col] ?? "N/A")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-4">No data available.</p>
        )}
      </div>
    </div>
  )
}
