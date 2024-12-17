"use client"

import { useState } from "react"
import NodeGraph from "src/components/NodeGraph"
import CompaniesPage from "../Companies"
import EcosystemActiveInvestors from "./EcosystemActiveInvestors"
import EcosystemCountryProfiles from "./EcosystemCountryProfiles"
import EcosystemMap from "./EcosystemMap"
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
    { title: "Policy Making Tips", id: "policyMakingTips" },
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
          <div className="flex flex-col gap-8">
            <EcosystemCountryProfiles companies={ecosystem.companies} />
            <EcosystemMap companies={ecosystem.companies} />
          </div>
        )}
        {currentTab === "activeInvestors" && (
          <EcosystemActiveInvestors companies={ecosystem.companies} />
        )}
        {currentTab === "productComparison" && (
          <EcosystemProductComparison companies={ecosystem.companies} />
        )}
        {currentTab === "policyMakingTips" && (
          <div>Policy Making Tips Content Goes Here</div>
        )}
      </div>
    </div>
  )
}
