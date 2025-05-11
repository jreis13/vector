"use client"

import {
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import Loading from "./Loading"

const statusMap = {
  Live: {
    label: "Live",
    icon: <CheckCircleIcon className="w-4 h-4 text-green-600" />,
    color: "bg-green-100 text-green-800",
  },
  "In Progress": {
    label: "In Progress",
    icon: <ClockIcon className="w-4 h-4 text-yellow-600" />,
    color: "bg-yellow-100 text-yellow-800",
  },
  Planned: {
    label: "Planned",
    icon: <SparklesIcon className="w-4 h-4 text-blue-600" />,
    color: "bg-blue-100 text-blue-800",
  },
}

export default function Roadmap() {
  const [roadmapData, setRoadmapData] = useState(null)

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        const res = await fetch("/api/roadmap")
        const data = await res.json()
        setRoadmapData(data.roadmap?.[0])
      } catch (err) {
        console.error("Error fetching roadmap data", err)
      }
    }

    fetchRoadmap()
  }, [])

  if (!roadmapData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
          {roadmapData.title}
        </h2>

        <div className="relative">
          <div className="absolute top-2 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full z-0" />
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {roadmapData.items.map((quarter, index) => {
              const allLive = quarter.items.every((i) => i.status === "Live")
              const anyPlanned = quarter.items.some(
                (i) => i.status === "Planned"
              )
              const markerColor = allLive
                ? "bg-green-500"
                : anyPlanned
                  ? "bg-blue-400"
                  : "bg-orange-400"

              return (
                <div
                  key={index}
                  className="flex flex-col items-center relative"
                >
                  <div
                    className={`w-5 h-5 border-4 border-white rounded-full ${markerColor}`}
                    style={{
                      marginBottom: "6px",
                      position: "relative",
                      top: 0,
                    }}
                  />
                  <div className="text-sm font-semibold text-white">
                    {quarter.title.split(" ")[0]}
                  </div>
                  <div className="text-xs text-gray-300 -mt-1">
                    {quarter.title.split("(")[1]?.replace(")", "")}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapData.items.map((quarter, qIndex) => (
            <div key={qIndex} className="p-4">
              <h3 className="text-xl font-semibold mb-4 text-white">
                {quarter.title}
              </h3>
              <div className="flex flex-col gap-4">
                {quarter.items.map((item, iIndex) => {
                  const status = statusMap[item.status] || {}
                  return (
                    <div
                      key={iIndex}
                      className="border border-gray-300 rounded-lg p-4 bg-[#e8e8e8]"
                    >
                      <h4 className="text-lg font-semibold text-[#34333d] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.description}
                      </p>
                      <div
                        className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${status.color}`}
                      >
                        {status.icon}
                        {status.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
