"use client"

import useCompanyByName from "src/hooks/useCompanyByName"
import CompanyLayout from "src/layouts/CompanyLayout"

export default function CompanyPage({ params }) {
  const { ecosystemName, companyName } = params

  const { company, loading, error } = useCompanyByName(
    ecosystemName,
    companyName
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#7032ff] border-t-transparent"></div>
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
