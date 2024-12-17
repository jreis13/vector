"use client"

import Image from "next/image"
import closeIcon from "public/icons/closeIcon.svg"
import europeGeoUrl from "public/maps/europe.json"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

export default function EcosystemCountryProfiles({ companies }) {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countryCompanies, setCountryCompanies] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const appRoot = document.getElementById("__next")
    if (appRoot) {
      Modal.setAppElement("#__next")
    }
  }, [])

  const groupedCompaniesByCountry = companies.reduce((acc, company) => {
    const country = company.country.toLowerCase().trim()
    if (!acc[country]) {
      acc[country] = []
    }
    acc[country].push(company)
    return acc
  }, {})

  const openModal = (country) => {
    const normalizedCountry = country.toLowerCase().trim()
    if (groupedCompaniesByCountry[normalizedCountry]) {
      setCountryCompanies(groupedCompaniesByCountry[normalizedCountry])
      setSelectedCountry(country)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setSelectedCountry(null)
    setCountryCompanies([])
    setIsModalOpen(false)
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  const hasCompanies = (countryName) => {
    return groupedCompaniesByCountry[countryName.toLowerCase().trim()]
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
                const countryHasCompanies = hasCompanies(country)

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => countryHasCompanies && openModal(country)}
                    className="cursor-pointer"
                    style={{
                      default: {
                        fill: countryHasCompanies ? "#7032ff" : "#D6D6DA",
                        stroke: "#e8e8e8",
                        outline: "none",
                      },
                      hover: {
                        fill: countryHasCompanies ? "#7032ff" : "#D6D6DA",
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
        shouldFocusAfterRender={false}
        className="bg-white text-[#403f4c] p-8 rounded-lg shadow-lg max-w-5xl w-full h-[90vh] mx-auto overflow-y-auto relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedCountry && (
          <div className="relative w-full h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8"
              aria-label="Close Modal"
            >
              <Image
                src={closeIcon}
                alt="Close"
                layout="responsive"
                className="cursor-pointer"
              />
            </button>
            <div className="p-4">
              <h2 className="text-3xl font-bold mb-6 text-center">
                {selectedCountry}
              </h2>
              {countryCompanies.length > 0 ? (
                <div>
                  {countryCompanies.map((company) => (
                    <div key={company.id} className="mb-6 flex items-center">
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        height={64}
                        width={64}
                        className="mr-6"
                      />
                      <div>
                        <div className="text-xl font-semibold">
                          {company.name}
                        </div>
                        <p className="text-gray-600">{company.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No companies available for this country.
                </p>
              )}
              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">
                  Final Considerations
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  This country has shown significant innovation and development
                  in its aerospace ecosystem, highlighting key companies and
                  opportunities for sustainable growth and advancements in
                  technology.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
