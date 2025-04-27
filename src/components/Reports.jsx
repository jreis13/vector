"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoadingLayout from "src/layouts/LoadingLayout"

const FREE_REPORT_ID = "advancedairmobility_q1_2025"

const REPORT_DISPLAY = {
  advancedairmobility_q1_2025: {
    title:
      "AAM - Global eVTOL Market Review (Passenger Commercial Tracker) - Q1 2025",
    image:
      "https://expvector.s3.eu-north-1.amazonaws.com/images/reportCovers/advancedairmobility_q1_2025_cover.png",
  },
}

export default function Reports() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [reports, setReports] = useState([])

  useEffect(() => {
    if (isLoading) return

    const purchased = user?.app_metadata?.purchasedReports || []
    const combined = [...purchased, FREE_REPORT_ID]
    const deduplicated = Array.from(new Set(combined))

    setReports(deduplicated)
  }, [user, isLoading, router])

  if (isLoading) return <LoadingLayout />

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((id) => (
          <div
            key={id}
            className="relative h-60 rounded-xl shadow-md hover:shadow-lg cursor-pointer overflow-hidden group"
            onClick={() => window.open(`/reports/${id}`, "_blank")}
          >
            <div
              className="absolute inset-0 bg-cover transition-transform scale-100 group-hover:scale-105 duration-300"
              style={{ backgroundImage: `url(${REPORT_DISPLAY[id]?.image})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 p-6 flex flex-col justify-end">
              <h2 className="text-xl font-bold text-white">
                {REPORT_DISPLAY[id]?.title || id}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
