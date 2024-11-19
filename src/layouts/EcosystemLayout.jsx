"use client"

import Header from "src/components/Header"
import Footer from "src/components/Footer"
import Ecosystem from "src/components/Ecosystem"

export default function EcosystemLayout({ user }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">
        <div id="Companies" className="py-12">
          <Ecosystem user={user} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
