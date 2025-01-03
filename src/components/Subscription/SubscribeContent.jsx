"use client"

import { useState } from "react"

import { faCcStripe } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Button from "../Button"

export default function SubscribeContent() {
  const [emails, setEmails] = useState([""])
  const [error, setError] = useState("")

  const handleAddEmail = () => {
    setEmails([...emails, ""])
  }

  const handleChange = (index, value) => {
    const updatedEmails = [...emails]
    updatedEmails[index] = value
    setEmails(updatedEmails)
  }

  const handleRemoveEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index)
    setEmails(updatedEmails)
  }

  const validateEmails = () => {
    for (const email of emails) {
      if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setError("Please enter valid email addresses.")
        return false
      }
    }
    setError("")
    return true
  }

  const handleSubscribe = async () => {
    if (!validateEmails()) return

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptions: emails.map((email) => ({ email })),
        }),
      })

      if (!response.ok) {
        const { error } = await response.json()
        setError(error || "Failed to create checkout session.")
        return
      }

      const { url } = await response.json()
      if (!url) {
        setError("No URL returned from the server.")
        return
      }

      window.location.href = url
    } catch (err) {
      console.error("Checkout request failed:", err)
      setError("Something went wrong while processing the subscription.")
    }
  }

  if (typeof window === "undefined") {
    return null
  }

  return (
    <div className="flex flex-grow items-center justify-center py-8 text-center">
      <div>
        <h2 className="text-3xl font-bold">Subscribe to Exponential Vector</h2>
        <p className="mt-4 text-lg">
          Complete your subscription to access the platform.
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-6">
          {emails.map((email, index) => (
            <div key={index} className="mb-4 flex items-center">
              <input
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => handleChange(index, e.target.value)}
                className="mr-2 flex-grow rounded border px-2 py-1 bg-[#e8e8e8] text-[#34333d]"
              />
              <button
                onClick={() => handleRemoveEmail(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddEmail}
            className="mb-4 block rounded bg-gray-200 px-2 py-1 text-sm bg-[#e8e8e8] text-[#34333d]"
          >
            Add Another Email
          </button>
          <Button onClick={handleSubscribe}>
            Subscribe with{" "}
            <FontAwesomeIcon aria-hidden="true" icon={faCcStripe} />
          </Button>
        </div>
      </div>
    </div>
  )
}
