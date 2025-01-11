"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import EcosystemActiveInvestors from "./EcosystemActiveInvestors"
import EcosystemCompanies from "./EcosystemCompanies"
import EcosystemCountryProfiles from "./EcosystemCountryProfiles"
import EcosystemInfrastructure from "./EcosystemInfrastructure"
import EcosystemMarketResearch from "./EcosystemMarketResearch"
import EcosystemOverview from "./EcosystemOverview"
import EcosystemProductComparison from "./EcosystemProductComparison"
import EcosystemRoutes from "./EcosystemRoutes"
import EcosystemTabs from "./EcosystemTabs"

export default function EcosystemDetails({ ecosystem }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "overview"
  const [currentTab, setCurrentTab] = useState(initialTab)

  const sections = [
    { title: "Overview", id: "overview" },
    { title: "Companies", id: "companies" },
    { title: "Country Profiles", id: "countryProfiles" },
    { title: "Active Investors", id: "activeInvestors" },
    { title: "Product Comparison", id: "productComparison" },
    { title: "Infrastructure", id: "infrastructure" },
    { title: "Routes", id: "routes", info: "(Coming Soon)" },
    { title: "Market Research", id: "marketResearch", info: "(Coming Soon)" },
  ]

  const handleTabChange = (newTab) => {
    setCurrentTab(newTab)
    const url = `/ecosystems/${ecosystem.name.replace(/\s+/g, "").toLowerCase()}?tab=${newTab}`
    router.push(url, { shallow: true })
  }

  useEffect(() => {
    setCurrentTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    setCurrentTab(initialTab)
  }, [initialTab])

  return (
    <div>
      <EcosystemTabs
        sections={sections}
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
      />

      <div className="mt-4 p-8">
        {currentTab === "overview" && (
          <EcosystemOverview ecosystem={ecosystem} />
        )}
        {currentTab === "companies" && (
          <EcosystemCompanies
            companies={ecosystem.companies}
            ecosystemName={ecosystem.name}
          />
        )}
        {currentTab === "countryProfiles" && (
          <EcosystemCountryProfiles
            companies={ecosystem?.companies || []}
            countryReports={ecosystem?.countryReports || {}}
          />
        )}
        {currentTab === "activeInvestors" && (
          <EcosystemActiveInvestors
            companies={ecosystem.companies}
            data={ecosystem.activeInvestors}
          />
        )}
        {currentTab === "productComparison" && (
          <EcosystemProductComparison companies={ecosystem.companies} />
        )}
        {currentTab === "infrastructure" && (
          <EcosystemInfrastructure ecosystem={ecosystem} />
        )}
        {currentTab === "routes" && <EcosystemRoutes />}
        {currentTab === "marketResearch" && <EcosystemMarketResearch />}
      </div>
    </div>
  )
}
