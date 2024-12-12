"use client"

import { useRouter } from "next/router"

export default function SuccessPage() {
  const router = useRouter()

  const handleRedirect = () => {
    router.push("/api/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <h1 className="text-2xl font-bold">Thank You for Subscribing!</h1>
      <p className="mt-4 text-lg text-gray-600">
        Please click below to go to the Login page.
      </p>
      <button
        onClick={handleRedirect}
        className="mt-8 rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
      >
        Go to Login
      </button>
    </div>
  )
}
