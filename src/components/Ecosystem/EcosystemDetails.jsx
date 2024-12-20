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
          <EcosystemCountryProfiles companies={ecosystem.companies} />
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
      </div>
    </div>
  )
}
