"use client"

import CompanyCard from "./CompanyCard"

export default function CompaniesPage({ companies }) {
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </div>
  )
}
