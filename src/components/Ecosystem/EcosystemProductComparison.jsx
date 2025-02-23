import { useEffect, useMemo, useState } from "react"
import Dropdown from "../Dropdown"
import EcosystemProductChart from "./EcosystemProductChart"
import EcosystemProductTable from "./EcosystemProductTable"

export default function EcosystemProductComparison({ companies }) {
  const [xAttribute, setXAttribute] = useState("")
  const [yAttribute, setYAttribute] = useState("")
  const [graphType, setGraphType] = useState("")

  const graphTypesSingle = useMemo(
    () => ["Bar", "Line", "Doughnut", "Polar Area"],
    []
  )
  const graphTypesDouble = useMemo(() => ["Scatter", "Bubble"], [])

  const groupedProducts =
    companies
      ?.filter(
        (company) =>
          company.products &&
          Array.isArray(company.products.data) &&
          company.products.data.length > 0
      )
      .map((company) => ({
        companyName: company.name,
        products: company.products.data,
      })) || []

  const allAttributes = new Set()
  groupedProducts.forEach((group) => {
    group.products.forEach((product) => {
      Object.keys(product).forEach((key) => {
        if (key !== "image") {
          allAttributes.add(key)
        }
      })
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
    if (!graphType) {
      if (!yAttribute) {
        setGraphType(graphTypesSingle[0])
      } else {
        setGraphType(graphTypesDouble[0])
      }
    }
  }, [
    numericAttributes,
    xAttribute,
    yAttribute,
    graphType,
    graphTypesSingle,
    graphTypesDouble,
  ])

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
    console.warn("⚠️ No products available for comparison!")
    return <div>No products available for comparison</div>
  }

  const availableGraphTypes = yAttribute ? graphTypesDouble : graphTypesSingle

  const handleXChange = (value) => {
    if (value === yAttribute) setYAttribute("")
    setXAttribute(value)
  }

  const handleYChange = (value) => {
    if (value === xAttribute) return
    setYAttribute(value)
    setGraphType(value === "" ? graphTypesSingle[0] : graphTypesDouble[0])
  }

  const handleGraphTypeChange = (value) => {
    setGraphType(value)
  }

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16">
      <div className="mb-16">
        <div className="mb-8 flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <div>
            <Dropdown
              attributes={numericAttributes}
              selectedValue={xAttribute}
              onChange={handleXChange}
            />
          </div>

          <div>
            <Dropdown
              attributes={[
                "None",
                ...numericAttributes.filter((attr) => attr !== xAttribute),
              ]}
              selectedValue={yAttribute || "None"}
              onChange={(value) => handleYChange(value === "None" ? "" : value)}
            />
          </div>

          <div className="ml-auto">
            <Dropdown
              attributes={availableGraphTypes}
              selectedValue={graphType}
              onChange={handleGraphTypeChange}
            />
          </div>
        </div>
        <div>
          {xData.length > 0 && (
            <EcosystemProductChart
              labels={labels}
              xData={xData}
              yData={yData}
              xLabel={xAttribute.charAt(0).toUpperCase() + xAttribute.slice(1)}
              yLabel={
                yAttribute &&
                yAttribute.charAt(0).toUpperCase() + yAttribute.slice(1)
              }
              graphType={graphType}
            />
          )}
        </div>
      </div>
      <div>
        <EcosystemProductTable
          groupedProducts={groupedProducts}
          attributes={attributesArray}
        />
      </div>
    </div>
  )
}
