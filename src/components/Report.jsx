"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoadingLayout from "src/layouts/LoadingLayout"

export default function ReportPage({ params }) {
  const { reportId } = params
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [reportUrl, setReportUrl] = useState(null)

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push(`/api/auth/login?returnTo=/reports/${reportId}`)
      return
    }

    const hasAccess =
      user.app_metadata?.purchasedReports?.includes(reportId) || false

    if (!hasAccess) {
      router.push("/unauthorized")
      return
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
      <h1 className="text-3xl font-bold mb-6">
        Viewing Report: {reportId.replace(/_/g, " ").toUpperCase()}
      </h1>
      <iframe
        src={reportUrl}
        className="w-full h-[90vh] rounded-xl border border-gray-700"
        allowFullScreen
      ></iframe>
    </div>
  )
}
