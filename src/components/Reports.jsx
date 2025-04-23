"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoadingLayout from "src/layouts/LoadingLayout"

const REPORT_DISPLAY_NAMES = {
  advancedairmobility_q1_2025: "Advanced Air Mobility Q1 2025",
}

export default function Reports() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [reports, setReports] = useState([])

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push("/api/auth/login?returnTo=/reports")
      return
    }

    const purchased = user?.app_metadata?.purchasedReports || []
    setReports(purchased)
  }, [user, isLoading, router])

  if (isLoading) return <LoadingLayout />

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">My Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((id) => (
          <div
            key={id}
            className="bg-[#1c1c1e] p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => router.push(`/reports/${id}`)}
          >
            <h2 className="text-xl font-bold">
              {REPORT_DISPLAY_NAMES[id] || id}
            </h2>
            <p className="text-gray-400 mt-2">Click to view this report</p>
          </div>
        ))}
      </div>
    </div>
  )
}
