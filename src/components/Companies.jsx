"use client"

import useCompanyData from "src/hooks/useCompanyData"
import CompanyCard from "./CompanyCard"

export default function CompaniesPage() {
  const { companies, loading, error } = useCompanyData()

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
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (!companies || companies.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No companies found</p>
      </div>
    )
  }

  return (
    <div
      id="Companies"
      className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16"
    >
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Companies</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </div>
  )
}
