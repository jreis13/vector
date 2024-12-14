import { useEffect, useState } from "react"
import Dropdown from "../Dropdown"
import EcosystemProductChart from "./EcosystemProductChart"
import EcosystemProductTable from "./EcosystemProductTable"

export default function EcosystemProductComparison({ companies }) {
  const [xAttribute, setXAttribute] = useState("")
  const [yAttribute, setYAttribute] = useState("")

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
  const numericAttributes = attributesArray.filter(isNumericAttribute)

  useEffect(() => {
    if (!xAttribute && numericAttributes.length > 0) {
      setXAttribute(numericAttributes[0])
    }
    if (!yAttribute && numericAttributes.length > 1) {
      setYAttribute(numericAttributes[1] || numericAttributes[0])
    }
  }, [numericAttributes, xAttribute, yAttribute])

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
          <Dropdown
            attributes={numericAttributes}
            selectedValue={xAttribute}
            onChange={setXAttribute}
          />
        </div>

        <div>
          <Dropdown
            attributes={numericAttributes}
            selectedValue={yAttribute}
            onChange={setYAttribute}
          />
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
