"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { CheckIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FREE_REPORT_ID, REPORT_DISPLAY } from "src/common/data/reportData"
import LoadingLayout from "src/layouts/LoadingLayout"
import Button from "./Button"

export default function Reports() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [reports, setReports] = useState([])

  useEffect(() => {
    if (isLoading) return

    const purchased = user?.app_metadata?.purchasedReports || []

    let combined = [...purchased, FREE_REPORT_ID]

    if (
      purchased.includes(
        "global_evtol_market_review_commercial_tracker_q1_2025"
      )
    ) {
      combined = combined.filter(
        (id) =>
          id !== "global_evtol_market_review_commercial_tracker_q1_2025_free"
      )
    }

    const deduplicated = Array.from(new Set(combined))
    setReports(deduplicated)
  }, [user, isLoading])

  if (isLoading) return <LoadingLayout />

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Reports</h1>
      <div className="flex flex-wrap gap-6">
        {reports.map((id) => {
          const report = REPORT_DISPLAY[id]
          const isFreeReport = id === FREE_REPORT_ID
          const hasPurchased =
            user?.app_metadata?.purchasedReports?.includes(id)

          const showFreeButton = isFreeReport
          const showBuyButton = !isFreeReport && (!user || !hasPurchased)
          const showViewButton = !isFreeReport && user && hasPurchased

          return (
            <div
              key={id}
              className="rounded-xl overflow-hidden bg-[#1a1a1a] group transition-all duration-300 border border-[#34333d] w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <div className="w-full overflow-hidden">
                <Image
                  src={report?.image}
                  alt={report?.title}
                  width={800}
                  height={800}
                  className="w-full max-h-full object-cover transition-transform duration-300 group-hover:opacity-70"
                />
              </div>

              <div className="p-4 px-4">
                <h2 className="text-lg font-bold">{report?.title || id}</h2>
              </div>

              <div className="border-t border-[#e8e8e8] mx-4 my-2 opacity-50" />

              <div className="py-2 px-4">
                <p className="text-md">{report?.description || id}</p>
              </div>

              <div className="p-4 max-h-0 opacity-0 overflow-hidden group-hover:max-h-[400px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <ul className="text-md space-y-2 pb-4">
                  {(report?.features || []).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-white" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-center mb-4">
                  {showFreeButton && (
                    <div className="flex w-full justify-between gap-2">
                      <Button
                        alternative
                        onClick={() => window.open(`/reports/${id}`, "_blank")}
                      >
                        Open Free Report
                      </Button>
                      <Button
                        onClick={() => (window.location.href = "/subscribe")}
                      >
                        Buy Full Report
                      </Button>
                    </div>
                  )}
                  {showBuyButton && (
                    <Button
                      onClick={() => (window.location.href = "/subscribe")}
                    >
                      Buy Full Report
                    </Button>
                  )}
                  {showViewButton && (
                    <Button
                      alternative
                      onClick={() => window.open(`/reports/${id}`, "_blank")}
                    >
                      View Report
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
