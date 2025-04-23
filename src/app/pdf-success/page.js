"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import SubscriptionLayout from "src/layouts/SubscriptionLayout"

export default function PdfSuccessPage() {
  const router = useRouter()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push("/api/auth/login?returnTo=/reports")
    } else {
      router.push("/reports")
    }
  }, [user, isLoading, router])

  return (
    <SubscriptionLayout>
      <div className="p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Redirecting you to your reports...
        </h1>
      </div>
    </SubscriptionLayout>
  )
}
