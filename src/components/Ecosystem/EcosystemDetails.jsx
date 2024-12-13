"use client"

import React, { useState } from "react"
import EcosystemTabs from "./EcosystemTabs"
import NodeGraph from "src/components/NodeGraph"
import CompaniesPage from "../Companies"
import EcosystemProductComparison from "./EcosystemProductComparison"

function EcosystemDetails({ ecosystem }) {
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
          <div>Country Profiles Content Goes Here</div>
        )}
        {currentTab === "activeInvestors" && (
          <div>Active Investors Content Goes Here</div>
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

export default EcosystemDetails
