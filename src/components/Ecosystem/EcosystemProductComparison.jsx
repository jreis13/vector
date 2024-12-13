import React, { useState, useEffect } from "react"
import EcosystemProductTable from "./EcosystemProductTable"
import EcosystemProductChart from "./EcosystemProductChart"

export default function EcosystemProductComparison({ companies }) {
  const [xAttribute, setXAttribute] = useState("")
  const [yAttribute, setYAttribute] = useState("")
  const [numericAttributes, setNumericAttributes] = useState([])

  const groupedProducts =
    companies
      ?.filter((company) => company.products?.data?.length > 0)
      .map((company) => ({
        companyName: company.name,
        products: company.products.data,
      })) || []

  const allAttributes = new Set()
  groupedProducts.forEach((group) => {
    group.products.forEach((product) => {
      Object.keys(product).forEach((key) => allAttributes.add(key))
    })
  })

  const isNumericAttribute = (attribute) =>
    groupedProducts
      .flatMap((group) =>
        group.products.map((product) => {
          const value = product[attribute]
          if (typeof value === "string") {
            return parseFloat(value.replace(/[^0-9.]/g, ""))
          } else if (typeof value === "number") {
            return value
          } else {
            return NaN
          }
        })
      )
      .every((value) => !isNaN(value))

  const attributesArray = Array.from(allAttributes)
  const filteredNumericAttributes = attributesArray.filter(isNumericAttribute)

  useEffect(() => {
    setNumericAttributes(filteredNumericAttributes)

    if (filteredNumericAttributes.length > 0) {
      setXAttribute((prev) => prev || filteredNumericAttributes[0])
      setYAttribute(
        (prev) =>
          prev || filteredNumericAttributes[1] || filteredNumericAttributes[0]
      )
    }
  }, [filteredNumericAttributes])

  const labels = groupedProducts.flatMap((group) =>
    group.products.map((product) => `${group.companyName} - ${product.name}`)
  )

  const extractNumericData = (attribute) =>
    groupedProducts.flatMap((group) =>
      group.products.map((product) => {
        const value = product[attribute]
        if (typeof value === "string") {
          return parseFloat(value.replace(/[^0-9.]/g, ""))
        } else if (typeof value === "number") {
          return value
        } else {
          return NaN
        }
      })
    )

  const xData = xAttribute ? extractNumericData(xAttribute) : []
  const yData = yAttribute ? extractNumericData(yAttribute) : []

  if (!companies || companies.length === 0 || groupedProducts.length === 0) {
    return <div>No products available for comparison</div>
  }

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16">
      <div className="mb-16">
        <EcosystemProductTable
          groupedProducts={groupedProducts}
          attributes={attributesArray}
        />
      </div>
      <div className="mb-8 flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <div>
          <select
            className="w-full rounded-lg border border-gray-700 bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={xAttribute}
            onChange={(e) => setXAttribute(e.target.value)}
          >
            {numericAttributes.map((attr) => (
              <option key={attr} value={attr}>
                {attr}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            className="w-full rounded-lg border border-gray-700 bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={yAttribute}
            onChange={(e) => setYAttribute(e.target.value)}
          >
            {numericAttributes.map((attr) => (
              <option key={attr} value={attr}>
                {attr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {xData.length > 0 && yData.length > 0 && (
          <EcosystemProductChart
            labels={labels}
            xData={xData}
            yData={yData}
            xLabel={xAttribute.charAt(0).toUpperCase() + xAttribute.slice(1)}
            yLabel={yAttribute.charAt(0).toUpperCase() + yAttribute.slice(1)}
          />
        )}
      </div>
    </div>
  )
}
