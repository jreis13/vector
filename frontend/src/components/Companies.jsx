"use client"

import { useEffect, useState } from "react"
import CompanyCard from "./CompanyCard"

function Companies() {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`)
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data)
      })
      .catch((error) => {
        console.error("Error fetching companies data:", error)
      })
  }, [])

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

export default Companies
