"use client"

import { useEffect, useState } from "react"
import CompanyLayout from "src/layouts/CompanyLayout"

export default function CompanyPage({ params }) {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const { companyName } = params

  useEffect(() => {
    if (companyName) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          console.log("Fetched Data:", data) // Add this line to log fetched data
          const foundCompany = data.find(
            (company) =>
              company.name.replace(/\s+/g, "").toLowerCase() ===
              companyName.toLowerCase()
          )
          console.log("Found Company:", foundCompany) // Add this line to log found company
          setCompany(foundCompany)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching data:", error) // Add this line to log any errors
          setLoading(false)
        })
    }
  }, [companyName])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Company not found</p>
      </div>
    )
  }

  return (
    <div>
      <CompanyLayout company={company} />
    </div>
  )
}
