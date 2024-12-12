"use client"

import { useEffect, useState } from "react"

export default function SubscribeContent() {
  const [email, setEmail] = useState("")

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    setEmail(query.get("email") || "")
  }, [])

  if (!email) {
    return <p>Error: Email is missing in the URL.</p>
  }

  const handleSubscribe = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const { url } = await response.json()
    window.location.href = url
  }

  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">Subscribe to Exponential Vector</h1>
      <p className="mt-4 text-lg text-gray-600">
        Complete your subscription to access the platform.
      </p>
      <input
        className="mx-auto mt-6 block w-full max-w-md rounded border px-4 py-2"
        type="email"
        value={email}
        readOnly
      />
      <button
        className="mt-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-500"
        onClick={handleSubscribe}
      >
        Subscribe Now
      </button>
    </div>
  )
}
