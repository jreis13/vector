"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoadingLayout from "src/layouts/LoadingLayout"

import { FREE_REPORT_ID } from "src/common/data/reportData"

export default function ReportPage({ reportId }) {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [reportUrl, setReportUrl] = useState(null)

  useEffect(() => {
    if (isLoading) return

    const isFreeReport = reportId === FREE_REPORT_ID

    if (!user && !isFreeReport) {
      router.push(`/api/auth/login?returnTo=/reports/${reportId}`)
      return
    }

    if (user && !isFreeReport) {
      const hasAccess =
        user.app_metadata?.purchasedReports?.includes(reportId) || false

      if (!hasAccess) {
        router.push("/unauthorized")
        return
      }
    }

    const fetchLink = async () => {
      try {
        const res = await fetch(`/api/get-report-link?reportId=${reportId}`)
        const data = await res.json()
        if (res.ok) {
          setReportUrl(data.link)
          setAuthorized(true)
        } else {
          throw new Error(data.error)
        }
      } catch (err) {
        console.error("Failed to load report link:", err)
        router.push("/unauthorized")
      }
    }

    fetchLink()
  }, [user, isLoading, reportId, router])

  if (isLoading || !authorized || !reportUrl) return <LoadingLayout />

  return (
    <div className="p-8">
      <iframe
        src={reportUrl}
        className="w-full h-[90vh] rounded-xl border border-gray-700"
        allowFullScreen
      />
    </div>
  )
}
