"use client"

import useCompanyByName from "src/hooks/useCompanyByName"
import CompanyLayout from "src/layouts/CompanyLayout"

export default function CompanyPage({ params }) {
  const { companyName } = params
  const { company, loading, error } = useCompanyByName(companyName)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Error: {error}</p>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Company not found...</p>
      </div>
    )
  }

  return (
    <div>
      <CompanyLayout company={company} />
    </div>
  )
}
