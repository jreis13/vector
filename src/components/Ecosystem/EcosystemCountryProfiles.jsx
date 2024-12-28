"use client"

import Image from "next/image"
import closeIconDark from "public/icons/closeIconDark.svg"
import europeGeoUrl from "public/maps/europe.json"
import { useEffect, useState } from "react"
import Masonry from "react-masonry-css"
import Modal from "react-modal"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import EcosystemStatCard from "./EcosystemStatCard"

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
    if (appRoot) Modal.setAppElement("#__next")
  }, [])

  const groupedCompaniesByCountry = (companies || []).reduce((acc, company) => {
    const country = company.country.toLowerCase().trim()
    if (!acc[country]) acc[country] = []
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

  const renderPageContent = (page) => {
    const breakpointColumns = {
      default: 3,
      1100: 2,
      700: 1,
    }

    if (page.type === "companies") {
      return (
        <div>
          <h3 className="text-2xl font-bold mb-4">Companies</h3>
          <div className="-m-4">
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex w-full gap-4"
              columnClassName="masonry-column"
            >
              {page.data.map((company) => (
                <div
                  key={company.id}
                  className="m-4 bg-gray-800 text-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      height={50}
                      width={50}
                    />
                    <h3 className="text-lg font-bold">{company.name}</h3>
                  </div>
                  <p className="text-sm text-gray-300">
                    {company.summary || "No description available"}
                  </p>
                </div>
              ))}
            </Masonry>
          </div>
        </div>
      )
    } else if (page.type === "report") {
      return (
        <div>
          <h3 className="text-2xl font-bold mb-4">{page.data.title}</h3>
          <div className="-m-4">
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex w-full gap-4"
              columnClassName="masonry-column"
            >
              {Object.entries(page.data.details).map(([key, detail]) => (
                <div key={key} className="m-4">
                  {typeof detail === "object" && detail.type === "graph" ? (
                    <EcosystemStatCard
                      title={key}
                      value={
                        <div
                          dangerouslySetInnerHTML={{ __html: detail.content }}
                        />
                      }
                    />
                  ) : (
                    <EcosystemStatCard title={key} value={detail} />
                  )}
                </div>
              ))}
            </Masonry>
          </div>
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
        className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-5xl w-full h-[90vh] mx-auto flex flex-col z-[1050]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1040]"
      >
        {selectedCountry && (
          <div className="flex flex-col h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8"
              aria-label="Close Modal"
            >
              <Image
                src={closeIconDark}
                alt="Close"
                className="cursor-pointer"
                style={{ width: "100%", height: "auto" }}
              />
            </button>
            <div className="flex-grow overflow-y-auto p-4">
              <h2 className="text-3xl font-bold mb-6">{selectedCountry}</h2>
              {renderPageContent(countryPages[currentPageIndex])}
            </div>
            <div className="mt-4 flex justify-between">
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
        )}
      </Modal>
    </div>
  )
}
