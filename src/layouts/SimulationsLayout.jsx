"use client"

import { useState } from "react"
import Footer from "src/components/structure/Footer"
import Header from "src/components/structure/Header"
import RouteSelection from "../components/simulations/RouteSelection"
import SimulationResults from "../components/simulations/SimulationResults"
import SimulationSettings from "../components/simulations/SimulationSettings"

export default function SimulationsLayout() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRunSimulation = () => {
    setLoading(true)

    setTimeout(() => {
      setResults({
        distance: 1247,
        cost: 4320,
        co2: 875,
        recommendations: [
          "Consider alternative route through Vienna to reduce distance by 85km",
          "Increasing vehicle capacity by 15% would improve cost efficiency",
          "Switching to rail for middle segment reduces CO2 emissions by 32%",
          "Optimizing loading procedures could save 45 minutes per trip",
        ],
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="relative flex w-full flex-col overflow-x-hidden">
      <Header />
      <div className="container mx-auto mt-16 flex flex-col justify-start px-6 py-14 text-[#f5f5f5] lg:p-20">
        <h1 className="mb-2 text-2xl font-bold">Route Simulation Dashboard</h1>
        <p className="mb-6 text-gray-500">
          Configure routes, adjust simulation parameters, and analyze results
        </p>

        <RouteSelection />
        <SimulationSettings
          onRunSimulation={handleRunSimulation}
          loading={loading}
        />

        <div className="relative mt-8">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 font-medium text-blue-600">
                <span className="size-20 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></span>
              </div>
            </div>
          )}
          <div
            className={`transition-all duration-300 ${
              loading ? "opacity-60" : "opacity-100"
            }`}
          >
            <SimulationResults
              results={results}
              onExport={() => alert("Exporting report...")}
              onSave={() => alert("Simulation saved!")}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
