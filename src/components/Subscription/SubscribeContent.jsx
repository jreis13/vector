"use client"

import { useState } from "react"

import { faCcStripe } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Button from "../Button"

export default function SubscribeContent() {
  const [subscriptions, setSubscriptions] = useState([
    { email: "", quantity: 1 },
  ])
  const [error, setError] = useState("")

  const handleAddSubscription = () => {
    setSubscriptions([...subscriptions, { email: "", quantity: 1 }])
  }

  const handleChange = (index, field, value) => {
    const updatedSubscriptions = [...subscriptions]
    updatedSubscriptions[index][field] = value
    setSubscriptions(updatedSubscriptions)
  }

  const handleRemoveSubscription = (index) => {
    const updatedSubscriptions = subscriptions.filter((_, i) => i !== index)
    setSubscriptions(updatedSubscriptions)
  }

  const validateSubscriptions = () => {
    for (const sub of subscriptions) {
      if (!sub.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(sub.email)) {
        setError("Please enter valid email addresses for all subscriptions.")
        return false
      }
      if (
        !sub.quantity ||
        sub.quantity < 1 ||
        !Number.isInteger(sub.quantity)
      ) {
        setError(
          "Please enter valid quantities (positive integers) for all subscriptions."
        )
        return false
      }
    }
    setError("")
    return true
  }

  const handleSubscribe = async () => {
    if (!validateSubscriptions()) return

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptions }),
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
                className="mr-2 flex-grow rounded border px-2 py-1"
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
            className="mb-4 block rounded px-2 py-1 text-sm"
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
