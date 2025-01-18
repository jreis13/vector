"use client"

import EcosystemCountryProfile from "src/components/Ecosystem/EcosystemCountryProfile"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function EcosystemCountryLayout({ countryName, reports }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-grow">
        <div className="py-12">
          <EcosystemCountryProfile
            countryName={countryName}
            reports={reports}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}
