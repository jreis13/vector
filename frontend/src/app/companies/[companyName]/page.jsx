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
        .then((response) => response.json())
        .then((data) => {
          const foundCompany = data.find(
            (company) =>
              company.name.replace(/\s+/g, "").toLowerCase() ===
              companyName.toLowerCase()
          )
          setCompany(foundCompany)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching company data:", error)
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
