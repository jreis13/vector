"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchUserMetadata } from "src/common/utils/fetchUserMetadata"
import EcosystemCountryLayout from "src/layouts/EcosystemCountryLayout"
import LoadingLayout from "src/layouts/LoadingLayout"

export default function CountryPage({ params = {} }) {
  const { ecosystemName, country } = params
  const decodedCountry = decodeURIComponent(country)
  const router = useRouter()

  const [countryDetails, setCountryDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function checkAccess() {
      const metadata = await fetchUserMetadata()

      if (
        !metadata ||
        !metadata.subscribedTo ||
        !metadata.subscribedTo.includes(ecosystemName)
      ) {
        router.push("/api/auth/login")
        return
      }

      fetchData()
    }

    async function fetchData() {
      try {
        const response = await fetch(
          `/api/ecosystems/${encodeURIComponent(ecosystemName)}/countries/${encodeURIComponent(decodedCountry)}`
        )

        if (!response.ok) throw new Error(`Error: ${response.statusText}`)

        const data = await response.json()
        setCountryDetails(data)
      } catch (error) {
        console.error("❌ Fetch failed:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [ecosystemName, decodedCountry, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingLayout />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>
  }

  return (
    <EcosystemCountryLayout
      countryName={countryDetails?.countryName || "Unknown"}
      reports={countryDetails?.subcategories || []}
      perceptionData={countryDetails?.perceptionOfPublicTransport || null}
      ecosystemName={ecosystemName}
      lastUpdated={countryDetails?.lastUpdated}
    />
  )
}
