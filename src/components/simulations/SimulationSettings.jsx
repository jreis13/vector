"use client"
import { useState } from "react"

export default function SimulationSettings({ onRunSimulation, loading }) {
  const [categories, setCategories] = useState({
    environmental: true,
    economic: true,
    operational: true,
    risk: true,
  })
  const [rules, setRules] = useState([
    {
      month: "January",
      parameter: "CO2 Emissions",
      change: "Set to value",
      value: "20",
    },
  ])
  const [simulationTime, setSimulationTime] = useState(12)
  const [agents, setAgents] = useState(100)

  const toggleCategory = (key) => {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleRuleChange = (index, field, value) => {
    const updated = [...rules]
    updated[index][field] = value
    setRules(updated)
  }

  const addRule = () => {
    setRules([...rules, { month: "", parameter: "", change: "", value: "" }])
  }

  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index))
  }

  return (
    <section className="mt-8 rounded-lg bg-[#34333d] p-6 shadow">
      <h2 className="mb-4 text-lg font-semibold">Simulation Settings</h2>

      <div className="mb-6 flex items-center gap-4">
        {Object.keys(categories).map((cat) => (
          <label
            key={cat}
            className={`cursor-pointer rounded px-3 py-1 text-sm font-medium ${
              categories[cat]
                ? "bg-[#6600cc] text-[#f5f5f5]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <input
              type="checkbox"
              checked={categories[cat]}
              onChange={() => toggleCategory(cat)}
              className="mr-2"
            />
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </label>
        ))}
        <div className="ml-auto flex size-16 items-center justify-center rounded-lg bg-[#6600cc] text-2xl font-bold text-[#f5f5f5]">
          87
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          "CO2 Emissions (kg/km)",
          "Fuel Efficiency",
          "Renewable Energy Use (%)",
          "Water Usage",
          "Waste Generation",
          "Noise Pollution",
          "Biodiversity Impact",
          "Land Use Efficiency",
          "Air Quality Impact",
          "Water Pollution",
        ].map((param) => (
          <div key={param} className="flex flex-col">
            <label className="mb-2 text-sm">{param}</label>
            <input type="range" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-2 mt-8 font-medium">Simulation Rules</h3>
      {rules.map((rule, i) => (
        <div key={i} className="mb-3 grid grid-cols-4 gap-3">
          <select
            value={rule.month}
            onChange={(e) => handleRuleChange(i, "month", e.target.value)}
            className="rounded border p-2 text-[#34333d]"
          >
            <option>January</option>
            <option>February</option>
          </select>
          <select
            value={rule.parameter}
            onChange={(e) => handleRuleChange(i, "parameter", e.target.value)}
            className="rounded border p-2 text-[#34333d]"
          >
            <option>CO2 Emissions</option>
            <option>Fuel Efficiency</option>
          </select>
          <select
            value={rule.change}
            onChange={(e) => handleRuleChange(i, "change", e.target.value)}
            className="rounded border p-2 text-[#34333d]"
          >
            <option>Set to value</option>
            <option>Increase by %</option>
            <option>Decrease by %</option>
          </select>
          <div className="flex gap-2">
            <input
              type="number"
              value={rule.value}
              onChange={(e) => handleRuleChange(i, "value", e.target.value)}
              className="w-full rounded border p-2 text-[#34333d]"
            />
            <button
              onClick={() => removeRule(i)}
              className="rounded bg-red-100 px-2 text-red-600"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
      <button onClick={addRule} className="mb-8 text-[#6600cc] hover:underline">
        + Add Another Rule
      </button>

      <h3 className="mb-2 font-medium">Simulation Configuration</h3>
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm">Simulation Time (months)</label>
          <input
            type="range"
            min="1"
            max="60"
            value={simulationTime}
            onChange={(e) => setSimulationTime(e.target.value)}
            className="w-full"
          />
          <div className="text-xs text-gray-500">{simulationTime}</div>
        </div>
        <div>
          <label className="mb-2 block text-sm">Number of Agents</label>
          <input
            type="range"
            min="1"
            max="1000"
            value={agents}
            onChange={(e) => setAgents(e.target.value)}
            className="w-full"
          />
          <div className="text-xs text-gray-500">{agents}</div>
        </div>
      </div>

      <div className="mb-6 rounded bg-[#403f4c] p-4">
        <p className="mb-2 font-medium">Active Configuration</p>
        <p>Categories:</p>
        <ul className="list-disc pl-6">
          {Object.keys(categories)
            .filter((key) => categories[key])
            .map((key) => (
              <li key={key}>{key[0].toUpperCase() + key.slice(1)}</li>
            ))}
        </ul>
        <p className="mt-2">Rules:</p>
        <ul className="list-disc pl-6">
          {rules.map((rule, i) => (
            <li key={i}>
              From {rule.month}: <br />
              {rule.parameter} {rule.change} {rule.value}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onRunSimulation}
        disabled={loading}
        className={`flex w-full items-center justify-center gap-2 rounded py-2 text-white ${
          loading ? "bg-gray-400" : "bg-[#6600cc]"
        }`}
      >
        {loading && (
          <span className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        )}
        {loading ? "Running..." : "Run Simulation"}
      </button>
    </section>
  )
}
