"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoadingLayout from "src/layouts/LoadingLayout"
import Button from "./Button"

import { CheckIcon } from "@heroicons/react/24/outline"

import { FREE_REPORT_ID, REPORT_DISPLAY } from "src/common/data/reportData"

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
      <div className="flex gap-6">
        {reports.map((id) => {
          const report = REPORT_DISPLAY[id]

          return (
            <div
              key={id}
              className="rounded-xl overflow-hidden bg-[#1a1a1a] group transition-all duration-300"
            >
              <div className="w-full overflow-hidden">
                <Image
                  src={report?.image}
                  alt={report?.title}
                  width={800}
                  height={800}
                  className="w-full max-h-full object-fit transition-transform duration-300 bg:[#34333d] hover:bg-[#1a1a1a] group-hover:opacity-70"
                />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">
                  {report?.title || id}
                </h2>
              </div>

              <div className="px-4 max-h-0 opacity-0 overflow-hidden group-hover:max-h-[400px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <ul className="text-md space-y-2 pb-4">
                  {(report?.features || []).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-white" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center gap-4 mb-4">
                  <Button
                    alternative
                    onClick={() => window.open(`/reports/${id}`, "_blank")}
                  >
                    Open Free Report
                  </Button>
                  <Button onClick={() => (window.location.href = "/subscribe")}>
                    Buy Full Report
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
