"use client"

import { useEffect, useState } from "react"
import "src/common/styles/_reset.css"
import EcosystemCountryLayout from "src/layouts/EcosystemCountryLayout"

export default function CountryPage({ params = {} }) {
  const { ecosystemName, country } = params
  const decodedCountry = decodeURIComponent(country)

  const [countryDetails, setCountryDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/ecosystems/${encodeURIComponent(ecosystemName)}/countries/${encodeURIComponent(decodedCountry)}`
        )

        if (!response.ok) throw new Error(`Error: ${response.statusText}`)

        const data = await response.json()

        setCountryDetails(data)
      } catch (error) {
        console.error("❌ Fetch failed:", error)
        setCountryDetails({ error: error.message })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [ecosystemName, decodedCountry])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#6600cc] border-t-transparent"></div>
      </div>
    )
  }

  if (error || !countryDetails) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error || "Data not found"}
      </div>
    )
  }

  return (
    <EcosystemCountryLayout
      countryName={countryDetails?.countryName || "Unknown"}
      reports={countryDetails?.subcategories || []}
      perceptionData={countryDetails?.perceptionOfPublicTransport || null}
      ecosystemName={ecosystemName}
    />
  )
}
