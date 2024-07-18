"use client"

import { useEffect, useState } from "react"
import { companiesData } from "src/common/data/companiesData"
import CompanyLayout from "src/layouts/CompanyLayout"

export default function CompanyPage({ params }) {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const { companyName } = params

  useEffect(() => {
    if (companyName) {
      const foundCompany = companiesData.find(
        (company) =>
          company.name.replace(/\s+/g, "").toLowerCase() ===
          companyName.toLowerCase()
      )
      setCompany(foundCompany)
      setLoading(false)
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
