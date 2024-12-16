"use client"

import Image from "next/image"

import europeIcon from "public/icons/europeIcon.svg"

export default function EcosystemCountryProfiles({ companies }) {
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
        <div key={country} className="mb-12">
          <div className="flex items-center mb-4 gap-4">
            <h2 className="text-3xl font-bold">{country}</h2>
            {countryImages[country] && (
              <Image
                src={countryImages[country]}
                alt={`${country} map`}
                width={60}
                height={60}
                className="mr-4"
              />
            )}
          </div>
          <div className="space-y-6">
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
                  <p className="text-gray-500 text-sm">{company.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
