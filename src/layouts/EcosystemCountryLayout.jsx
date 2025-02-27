"use client"

import EcosystemCountryProfilesDetails from "src/components/Ecosystem/EcosystemCountryProfilesDetails"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function EcosystemCountryLayout({
  countryName,
  reports,
  perceptionData,
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">
        <div className="py-12">
          <EcosystemCountryProfilesDetails
            countryDetails={{
              countryName,
              subcategories: reports,
              perceptionOfPublicTransport: perceptionData,
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}
