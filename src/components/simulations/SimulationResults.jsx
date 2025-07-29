"use client"

export default function SimulationResults({ results, onExport, onSave }) {
  if (!results) return null

  return (
    <section className="mb-16 rounded-lg bg-[#34333d] p-6 shadow">
      <h2 className="mb-4 text-lg font-semibold">Results</h2>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded bg-blue-50 p-4">
          <p className="text-xs text-blue-600">Total Distance</p>
          <p className="text-xl font-bold text-[#34333d]">
            {results.distance} km
          </p>
          <p className="text-xs text-gray-500">Estimated travel distance</p>
        </div>
        <div className="rounded bg-green-50 p-4">
          <p className="text-xs text-green-600">Total Cost</p>
          <p className="text-xl font-bold text-[#34333d]">€{results.cost}</p>
          <p className="text-xs text-gray-500">Estimated operational cost</p>
        </div>
        <div className="rounded bg-red-50 p-4">
          <p className="text-xs text-red-600">CO2 Emissions</p>
          <p className="text-xl font-bold text-[#34333d]">{results.co2} kg</p>
          <p className="text-xs text-gray-500">Total carbon footprint</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="h-24 rounded border p-2 text-center text-sm text-gray-400">
          Route Efficiency (Chart Placeholder)
        </div>
        <div className="h-24 rounded border p-2 text-center text-sm text-gray-400">
          Cost Breakdown (Chart Placeholder)
        </div>
        <div className="h-24 rounded border p-2 text-center text-sm text-gray-400">
          Environmental Impact (Chart Placeholder)
        </div>
        <div className="h-24 rounded border p-2 text-center text-sm text-gray-400">
          Risk Assessment (Chart Placeholder)
        </div>
      </div>

      <div className="mb-6 rounded bg-[#403f4c] p-4">
        <h3 className="mb-2 text-sm font-medium">
          Optimization Recommendations
        </h3>
        <ul className="list-disc pl-6 text-[#f5f5f5]">
          {results.recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={onExport}
          className="rounded border border-gray-300 px-4 py-2 text-sm text-[#f5f5f5]"
        >
          Export Report
        </button>
        <button
          onClick={onSave}
          className="rounded bg-[#6600cc] px-4 py-2 text-sm text-white"
        >
          Save Simulation
        </button>
      </div>
    </section>
  )
}
