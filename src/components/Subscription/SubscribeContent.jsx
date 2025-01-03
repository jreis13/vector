"use client"

import { faCcStripe } from "@fortawesome/free-brands-svg-icons"
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Button from "../Button"

export default function SubscribeContent() {
  const [emails, setEmails] = useState([""])
  const [error, setError] = useState("")

  const pricingTiers = [
    { quantity: 1, price: 3000 },
    { quantity: 2, price: 2900 },
    { quantity: 3, price: 2800 },
    { quantity: 4, price: 2750 },
    { quantity: 5, price: 2500 },
  ]

  const getTierPrice = (quantity) => {
    const tier = pricingTiers.find((tier) => quantity <= tier.quantity)
    return tier ? tier.price : pricingTiers[pricingTiers.length - 1].price
  }

  const calculateTotalPrice = () => {
    const unitPrice = getTierPrice(emails.length)
    return unitPrice * emails.length
  }

  const handleAddEmail = () => {
    if (emails.length >= 5) {
      setError("You can only add up to 5 emails.")
      return
    }
    setEmails([...emails, ""])
    setError("")
  }

  const handleChange = (index, value) => {
    const updatedEmails = [...emails]
    updatedEmails[index] = value
    setEmails(updatedEmails)
  }

  const handleRemoveEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index)
    setEmails(updatedEmails)
    setError("")
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
      window.location.href = url
    } catch (err) {
      console.error("Checkout request failed:", err)
      setError("Something went wrong while processing the subscriptions.")
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
                className="mr-2 flex-grow rounded border text-[#403f4c] bg-[#e8e8e8] px-2 py-1"
              />
              <button
                onClick={() => handleRemoveEmail(index)}
                className="text-red-500"
              >
                <FontAwesomeIcon aria-hidden="true" icon={faCircleXmark} />
              </button>
            </div>
          ))}
          {emails.length < 5 && (
            <button
              onClick={handleAddEmail}
              className="mb-4 block rounded text-[#e8e8e8] px-2 py-1 text-sm"
            >
              <FontAwesomeIcon aria-hidden="true" icon={faPlus} />
            </button>
          )}
          <div className="mb-4">
            <p className="text-lg">
              Total Price: €{calculateTotalPrice().toFixed(2)}
            </p>
          </div>
          <Button onClick={handleSubscribe}>
            Subscribe with{" "}
            <FontAwesomeIcon aria-hidden="true" icon={faCcStripe} />
          </Button>
        </div>
      </div>
    </div>
  )
}
