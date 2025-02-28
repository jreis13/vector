"use client"

import Loading from "src/components/Loading"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function LoadingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-grow">
        <div id="Loading" className="py-12">
          <Loading />
        </div>
      </div>

      <div id="footer" className="pt-12">
        <Footer />
      </div>
    </div>
  )
}
