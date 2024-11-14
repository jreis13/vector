"use client"

import Header from "src/components/Header"
import Footer from "src/components/Footer"
import Ecosystem from "src/components/Ecosystem"

function EcosystemLayout({ user }) {
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-grow">
          <div className="flex w-1/2 items-center justify-center bg-gray-100 p-8">
            <button
              className="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-md"
              onClick={() => {
                window.location.href = "/path-to-file/file.pdf"
              }}
            >
              Download File
            </button>
          </div>
          <div className="flex w-1/2 items-center justify-center bg-white p-8">
            <button
              className="rounded-lg bg-green-500 px-6 py-3 text-white shadow-md"
              onClick={() => {
                const currentPath = encodeURIComponent(window.location.pathname)
                window.location.href = `/api/auth/login?returnTo=${currentPath}`
              }}
            >
              Log In
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">
        <Ecosystem />
      </div>
      <Footer />
    </div>
  )
}

export default EcosystemLayout
