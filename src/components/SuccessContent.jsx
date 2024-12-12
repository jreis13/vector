"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SuccessContent() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      router.push("/api/auth/login")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">Thank you for subscribing!</h1>
      <p className="mt-4 text-lg text-gray-600">
        Please wait while we redirect you to the Login page.
      </p>
      {loading && (
        <div className="mt-6 flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
