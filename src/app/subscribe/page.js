"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SubscribePage() {
  const router = useRouter()
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
    <div>
      <h1>Subscribe to Exponential Vector</h1>
      <p>Complete your subscription to access the platform.</p>
      <input type="email" value={email} readOnly />
      <button onClick={handleSubscribe}>Subscribe Now</button>
    </div>
  )
}
