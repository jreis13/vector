"use client"

import Image from "next/image"
import closeIconDark from "public/icons/closeIconDark.svg"
import europeGeoUrl from "public/maps/europe.json"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

export default function EcosystemCountryProfiles({
  companies,
  countryReports,
}) {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countryPages, setCountryPages] = useState([])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const appRoot = document.getElementById("__next")
    if (appRoot) {
      Modal.setAppElement("#__next")
    }
  }, [])

  const groupedCompaniesByCountry = (companies || []).reduce((acc, company) => {
    const country = company.country.toLowerCase().trim()
    if (!acc[country]) {
      acc[country] = []
    }
    acc[country].push(company)
    return acc
  }, {})

  const getCountryReports = (country) => {
    const normalizedCountry = country.toLowerCase().trim()
    return countryReports?.[normalizedCountry] || []
  }

  const openModal = (country) => {
    const normalizedCountry = country.toLowerCase().trim()
    const reports = getCountryReports(normalizedCountry)
    const companies = groupedCompaniesByCountry[normalizedCountry] || []

    setCountryPages([
      { type: "companies", data: companies },
      ...reports.map((report) => ({ type: "report", data: report })),
    ])
    setSelectedCountry(country)
    setCurrentPageIndex(0)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedCountry(null)
    setCountryPages([])
    setCurrentPageIndex(0)
    setIsModalOpen(false)
  }

  const handleNextPage = () => {
    if (currentPageIndex < countryPages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1)
    }
  }

  const renderContent = (data) => {
    if (typeof data === "string") {
      return <span>{data}</span>
    }
    if (Array.isArray(data)) {
      return (
        <ul className="ml-4 list-disc">
          {data.map((item, idx) => (
            <li key={idx}>
              {typeof item === "string" ? item : renderContent(item)}
            </li>
          ))}
        </ul>
      )
    }
    if (typeof data === "object" && data !== null) {
      if (data.type === "graph" && data.content) {
        return (
          <div className="graph-container" key={data.content}>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        )
      }
      return (
        <div className="ml-4">
          {Object.entries(data).map(([key, value]) => {
            if (key === "subtitle") {
              return (
                <h4 key={key} className="font-semibold mt-2">
                  {value}
                </h4>
              )
            }
            if (key === "description") {
              return <p key={key}>{value}</p>
            }
            if (key === "details") {
              return renderContent(value)
            }
            if (key === "type" || key === "content") {
              return null // Skip rendering "type" and "content"
            }
            return (
              <div key={key} className="mt-2">
                <strong>{key}:</strong> {renderContent(value)}
              </div>
            )
          })}
        </div>
      )
    }
    return null
  }

  const renderPageContent = (page) => {
    if (page.type === "companies") {
      return (
        <div>
          <div className="flex flex-col gap-6">
            {page.data.map((company) => (
              <div key={company.id} className="flex items-start gap-4">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  height={64}
                  width={64}
                  className="shrink-0"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
                <div>
                  <h3 className="text-xl font-semibold">{company.name}</h3>
                  <p className="text-gray-600 mt-1">{company.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    } else if (page.type === "report") {
      return (
        <div>
          <h3 className="text-2xl font-bold">{page.data.title}</h3>
          {renderContent(page.data.details)}
        </div>
      )
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-[90vw] h-[80vh] mx-auto">
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{ rotate: [-10, -52, 0], scale: 800 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={europeGeoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const country = geo.properties.name
                const countryHasCompanies =
                  groupedCompaniesByCountry[country.toLowerCase()]

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => countryHasCompanies && openModal(country)}
                    className={
                      countryHasCompanies ? "cursor-pointer" : "cursor-default"
                    }
                    style={{
                      default: {
                        fill: countryHasCompanies ? "#7032ff" : "#D6D6DA",
                        stroke: "#e8e8e8",
                        outline: "none",
                      },
                      hover: {
                        fill: countryHasCompanies ? "#330066" : "#D6D6DA",
                        stroke: "#e8e8e8",
                        outline: "none",
                      },
                      pressed: {
                        fill: countryHasCompanies ? "#7032ff" : "#D6D6DA",
                        stroke: "#e8e8e8",
                        outline: "none",
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Country Details"
        className="bg-[#e8e8e8] text-[#403f4c] p-8 rounded-lg shadow-lg max-w-5xl w-full h-[90vh] mx-auto overflow-y-auto relative"
        overlayClassName="fixed inset-0 bg-[#403f4c] bg-opacity-50 flex items-center justify-center"
      >
        {selectedCountry && (
          <div className="relative w-full h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8"
              aria-label="Close Modal"
            >
              <Image
                src={closeIconDark}
                alt="Close"
                className="cursor-pointer stroke-[#403f4c]"
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </button>
            <div className="p-4">
              <h2 className="text-3xl font-bold mb-6">{selectedCountry}</h2>
              {renderPageContent(countryPages[currentPageIndex])}
              <div className="mt-10 flex justify-between">
                <button
                  disabled={currentPageIndex === 0}
                  onClick={handlePrevPage}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={currentPageIndex >= countryPages.length - 1}
                  onClick={handleNextPage}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
