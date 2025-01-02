"use client"

import { useState } from "react"
import NodeGraph from "src/components/NodeGraph"
import CompaniesPage from "../Companies"
import EcosystemActiveInvestors from "./EcosystemActiveInvestors"
import EcosystemCountryProfiles from "./EcosystemCountryProfiles"
import EcosystemInfrastructure from "./EcosystemInfrastructure"
import EcosystemProductComparison from "./EcosystemProductComparison"
import EcosystemTabs from "./EcosystemTabs"

export default function EcosystemDetails({ ecosystem }) {
  const [currentTab, setCurrentTab] = useState("overview")

  const sections = [
    { title: "Overview", id: "overview" },
    { title: "Companies", id: "companies" },
    { title: "Country Profiles", id: "countryProfiles" },
    { title: "Active Investors", id: "activeInvestors" },
    { title: "Product Comparison", id: "productComparison" },
    { title: "Infrastructure", id: "infrastructure" },
    { title: "Routes", id: "routes" },
    { title: "Market Research", id: "marketResearch" },
  ]

  return (
    <div>
      <EcosystemTabs
        sections={sections}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <div className="mt-4 p-8">
        {currentTab === "overview" && <NodeGraph ecosystem={ecosystem} />}
        {currentTab === "companies" && (
          <CompaniesPage
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
          <EcosystemActiveInvestors companies={ecosystem.companies} />
        )}
        {currentTab === "productComparison" && (
          <EcosystemProductComparison companies={ecosystem.companies} />
        )}
        {currentTab === "infrastructure" && (
          <EcosystemInfrastructure ecosystem={ecosystem} />
        )}
        {currentTab === "routes" && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-center">Coming Soon</h3>
            <p className="font-bold text-center">
              Information about Routes will be available soon.
            </p>
          </div>
        )}
        {currentTab === "marketResearch" && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-center">Coming Soon</h3>
            <p className="font-bold text-center">
              Information about Market Research will be available soon.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
