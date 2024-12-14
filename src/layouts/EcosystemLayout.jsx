"use client"

import EcosystemDetails from "src/components/Ecosystem/EcosystemDetails"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

function EcosystemLayout({ ecosystem }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-grow">
        <div id="Ecosystem" className="py-12">
          <EcosystemDetails ecosystem={ecosystem} />
        </div>
      </div>

      <div id="footer" className="pt-12">
        <Footer />
      </div>
    </div>
  )
}

export default EcosystemLayout
