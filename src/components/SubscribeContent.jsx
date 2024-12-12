"use client"

import { useEffect, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCcStripe } from "@fortawesome/free-brands-svg-icons"

import Button from "./Button"

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
    <div className="flex flex-grow flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold">Subscribe to Exponential Vector</h1>
      <p className="mt-4 text-lg">
        Complete your subscription to access the platform.
      </p>
      <div className="mt-8">
        <Button onClick={handleSubscribe}>
          Subscribe with <FontAwesomeIcon icon={faCcStripe} />
        </Button>
      </div>
    </div>
  )
}
