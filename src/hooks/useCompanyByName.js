"use client"

import { useEffect, useState } from "react"

const useCompanyByName = (ecosystemName, companyName) => {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCompany = async () => {
      if (!ecosystemName || !companyName) {
        console.warn("Missing ecosystemName or companyName.")
        return
      }

      console.log("Fetching company details:", { ecosystemName, companyName })

      setLoading(true)
      setError(null)

      try {
        const normalizedEcosystemName = encodeURIComponent(ecosystemName)
        const normalizedCompanyName = encodeURIComponent(companyName)

        const response = await fetch(
          `/api/ecosystems/${normalizedEcosystemName}/companies/${normalizedCompanyName}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch company: ${response.statusText}`)
        }

        const data = await response.json()
        setCompany(data)
      } catch (err) {
        console.error("Error fetching company data:", err.message)
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [ecosystemName, companyName])

  return { company, loading, error }
}

export default useCompanyByName
