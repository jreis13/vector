"use client"

import Image from "next/image"

import arrowEndDown from "public/icons/arrowEndDown.svg"
import arrowEndUp from "public/icons/arrowEndUp.svg"
import europeIcon from "public/icons/europeIcon.svg"

import { useState } from "react"

export default function EcosystemCountryProfiles({ companies }) {
  const [expandedCountries, setExpandedCountries] = useState({})

  const toggleCountry = (country) => {
    setExpandedCountries((prev) => ({
      ...prev,
      [country]: !prev[country],
    }))
  }

  const countryImages = {}

  companies.forEach((company) => {
    const { country, countryImage } = company
    if (country && countryImage) {
      if (!countryImages[country]) {
        countryImages[country] = countryImage
      }
    }
  })

  const groupedCompaniesByCountry = Object.entries(
    companies.reduce((acc, company) => {
      const { country } = company
      if (country === "Japan" || country === "China") return acc
      if (!acc[country]) {
        acc[country] = []
      }
      acc[country].push(company)
      return acc
    }, {})
  ).sort((a, b) => b[1].length - a[1].length)

  return (
    <div className="px-6 py-8 lg:px-16 lg:py-16">
      <div className="flex items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold">Europe</h1>
        <Image
          src={europeIcon}
          alt="Europe map"
          width={60}
          height={60}
          className="mr-4"
        />
      </div>
      {groupedCompaniesByCountry.map(([country, countryCompanies]) => (
        <div key={country} className="mb-8">
          <div
            className="flex items-center justify-between cursor-pointer mb-4 gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300"
            onClick={() => toggleCountry(country)}
          >
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">{country}</h2>
              {countryImages[country] && (
                <Image
                  src={countryImages[country]}
                  alt={`${country} map`}
                  width={60}
                  height={60}
                  className="rounded-md"
                />
              )}
            </div>
            <Image
              src={expandedCountries[country] ? arrowEndUp : arrowEndDown}
              alt="Toggle Arrow"
              width={20}
              height={20}
              className="transition-transform duration-300"
            />
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              expandedCountries[country] ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="space-y-6 px-4">
              {countryCompanies.map((company) => (
                <div key={company.id} className="flex items-start space-x-4">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <div className="text-lg font-semibold">{company.name}</div>
                    <p className="text-gray-300 text-sm mt-1">
                      {company.summary}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">Final Considerations</h3>
                <p className="text-gray-300 text-sm">
                  This country has shown significant innovation and development
                  in its aerospace ecosystem, highlighting key companies and
                  opportunities for sustainable growth and advancements in
                  technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
