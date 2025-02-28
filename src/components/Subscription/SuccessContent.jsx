"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Loading from "../Loading"

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
    <div className="flex flex-grow items-center justify-center py-8 text-center">
      <div>
        <h2 className="text-3xl font-bold">Thank you for subscribing!</h2>
        <p className="mt-4 text-lg">
          Please wait while we redirect you to the main page.
        </p>
        {loading && <Loading />}
      </div>
    </div>
  )
}
