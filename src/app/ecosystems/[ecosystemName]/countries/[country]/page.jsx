"use client"

import { useEffect, useState } from "react"
import "src/common/styles/_reset.css"
import EcosystemCountryLayout from "src/layouts/EcosystemCountryLayout"

export default function CountryPage({ params }) {
  const { ecosystemName, country } = params
  const [countryDetails, setCountryDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/ecosystems/${ecosystemName}/countries/${country}`
        )
        if (!response.ok) throw new Error("Data not found")
        const data = await response.json()
        setCountryDetails(data)
      } catch (error) {
        console.error(error)
        setCountryDetails({ error: error.message })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [ecosystemName, country])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#6600cc] border-t-transparent"></div>
      </div>
    )
  }

  if (countryDetails?.error) {
    return <div>Error: {countryDetails.error}</div>
  }

  return (
    <EcosystemCountryLayout
      countryName={countryDetails.Country}
      reports={countryDetails.Reports}
    />
  )
}
