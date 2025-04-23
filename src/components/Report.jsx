"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoadingLayout from "src/layouts/LoadingLayout"

const CANVA_LINKS = {
  advancedairmobility_q1_2025:
    "https://www.canva.com/design/your-canva-id/embed",
}

export default function ReportPage({ params }) {
  const { reportId } = params
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push(`/api/auth/login?returnTo=/reports/${reportId}`)
      return
    }

    const hasAccess =
      user.app_metadata?.purchasedReports?.includes(reportId) || false

    if (hasAccess) {
      setAuthorized(true)
    } else {
      router.push("/unauthorized")
    }
  }, [user, isLoading, reportId, router])

  if (isLoading) return <LoadingLayout />
  if (!authorized) return null

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Viewing Report: {reportId.replace(/_/g, " ").toUpperCase()}
      </h1>
      <iframe
        src={CANVA_LINKS[reportId]}
        className="w-full h-[90vh] rounded-xl border border-gray-700"
        allowFullScreen
      ></iframe>
    </div>
  )
}
