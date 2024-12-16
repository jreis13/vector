"use client"

import placeholder from "public/icons/avatarIcon.svg"

import CompanyCard from "../CompanyCard"

export default function ActiveInvestors({ companies }) {
  const allInvestors = companies
    .flatMap((company) => company.investors?.data || [])
    .filter(
      (investor, index, self) =>
        index === self.findIndex((t) => t.value === investor.value)
    )
    .map((investor) => ({
      name: investor.value,
      logo: investor.logo || placeholder,
    }))

  if (!allInvestors.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No active investors found</p>
      </div>
    )
  }

  return (
    <div
      id="ActiveInvestors"
      className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allInvestors.map((investor, index) => (
          <CompanyCard key={index} company={investor} isClickable={false} />
        ))}
      </div>
    </div>
  )
}
