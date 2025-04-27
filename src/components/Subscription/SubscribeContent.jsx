"use client"

import { useEffect, useRef, useState } from "react"
import { ProductSection } from "./ProductSection"
import ReportForm from "./ReportForm"
import SubscriptionForm from "./SubscriptionForm"

export default function SubscribeContent() {
  const [selectedProductType, setSelectedProductType] = useState(null)
  const [subscribers, setSubscribers] = useState([
    {
      email: "",
      firstName: "",
      lastName: "",
      companyName: "",
      persona: "",
      ecosystems: [],
    },
  ])
  const [reportBuyer, setReportBuyer] = useState({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    persona: "",
    ecosystems: [],
  })
  const [emailWarnings, setEmailWarnings] = useState({})
  const [reportEmailWarning, setReportEmailWarning] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState("")
  const formRef = useRef(null)

  const ecosystemsOptions = [
    {
      id: "global_evtol_market_review_commercial_tracker_q1_2025",
      name: "AAM - Global eVTOL Market Review (Passenger Commercial Tracker) - Q1 2025",
    },
  ]
  const restrictedDomains = [
    "@gmail.com",
    "@outlook.com",
    "@hotmail.com",
    "@yahoo.com",
    "@icloud.com",
  ]
  const pricingTiers = [
    { quantity: 1, price: 3500 },
    { quantity: 2, price: 3000 },
    { quantity: 3, price: 2800 },
    { quantity: 4, price: 2650 },
    { quantity: 5, price: 2500 },
  ]

  useEffect(() => {
    if (
      selectedProductType === "paid" ||
      selectedProductType === "subscription"
    ) {
      formRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedProductType])

  const handleAddSubscriber = () => {
    if (subscribers.length >= 5) {
      setError("You can only add up to 5 subscribers.")
      return
    }
    setSubscribers([
      ...subscribers,
      {
        email: "",
        firstName: "",
        lastName: "",
        companyName: "",
        persona: "",
        ecosystems: [],
      },
    ])
    setError("")
  }

  const handleRemoveSubscriber = (index) => {
    setSubscribers(subscribers.filter((_, i) => i !== index))
  }

  const handleChange = (index, field, value) => {
    const updated = [...subscribers]
    updated[index][field] = value
    setSubscribers(updated)
    if (field === "email") {
      const isRestricted = restrictedDomains.some((dom) => value.includes(dom))
      setEmailWarnings((prev) => ({
        ...prev,
        [index]: isRestricted
          ? "Exponential Vector only assigns licenses to company emails. Contact us for further questions."
          : "",
      }))
    }
  }

  const handleReportChange = (field, value) => {
    const updated = { ...reportBuyer, [field]: value }
    setReportBuyer(updated)
    if (field === "email") {
      const isRestricted = restrictedDomains.some((dom) => value.includes(dom))
      setReportEmailWarning(
        isRestricted
          ? "Exponential Vector only assigns licenses to company emails. Contact us for further questions."
          : ""
      )
    }
  }

  const calculateTotalPrice = () => {
    const total = subscribers.length
    const tier =
      pricingTiers.find((t) => total <= t.quantity) ||
      pricingTiers[pricingTiers.length - 1]
    return total * tier.price
  }

  const containsRestrictedEmail = subscribers.some((sub) =>
    restrictedDomains.some((dom) => sub.email.includes(dom))
  )

  const validateSubscribers = () => {
    for (const s of subscribers) {
      if (
        !s.email ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(s.email) ||
        !s.firstName ||
        !s.lastName ||
        !s.companyName ||
        !s.persona ||
        s.ecosystems.length === 0
      ) {
        setError("Please fill in all fields and select at least one ecosystem.")
        return false
      }
    }
    setError("")
    return true
  }

  const validateReportBuyer = () => {
    const s = reportBuyer
    if (
      !s.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(s.email) ||
      !s.firstName ||
      !s.lastName ||
      !s.companyName ||
      !s.persona ||
      s.ecosystems.length === 0
    ) {
      setError("Please fill in all fields and select at least one ecosystem.")
      return false
    }
    setError("")
    return true
  }

  const handleSubscribe = async () => {
    if (!validateSubscribers()) return
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptions: subscribers }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        setError(error || "Failed to create checkout session.")
        return
      }
      const { url } = await res.json()
      window.location.href = url
    } catch {
      setError("Something went wrong while processing the subscriptions.")
    }
  }

  const handleReportPurchase = async () => {
    if (!validateReportBuyer()) return

    const selectedReports = reportBuyer.ecosystems

    try {
      const payload = { ...reportBuyer, reports: selectedReports }

      const res = await fetch("/api/reportcheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptions: [payload] }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        setError(error || "Failed to create checkout session.")
        return
      }

      const { url } = await res.json()
      window.location.href = url
    } catch {
      setError("Something went wrong while processing the purchase.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-8 py-8 text-center">
      <div className="max-w-6xl">
        <ProductSection onSelectProduct={setSelectedProductType} />

        {selectedProductType === "subscription" && (
          <div ref={formRef}>
            <SubscriptionForm
              subscribers={subscribers}
              setSubscribers={setSubscribers}
              ecosystemsOptions={ecosystemsOptions}
              emailWarnings={emailWarnings}
              handleChange={handleChange}
              handleAddSubscriber={handleAddSubscriber}
              handleRemoveSubscriber={handleRemoveSubscriber}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              containsRestrictedEmail={containsRestrictedEmail}
              error={error}
              calculateTotalPrice={calculateTotalPrice}
              handleSubscribe={handleSubscribe}
            />
          </div>
        )}

        {selectedProductType === "paid" && (
          <div ref={formRef}>
            <ReportForm
              subscriber={reportBuyer}
              setSubscriber={setReportBuyer}
              ecosystemsOptions={ecosystemsOptions}
              emailWarning={reportEmailWarning}
              handleChange={handleReportChange}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              handlePurchase={handleReportPurchase}
            />
          </div>
        )}
      </div>
    </div>
  )
}
