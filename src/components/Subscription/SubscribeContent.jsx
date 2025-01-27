"use client"

import { faCcStripe } from "@fortawesome/free-brands-svg-icons"
import {
  faChevronDown,
  faChevronUp,
  faCircleXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Button from "../Button"

export default function SubscribeContent() {
  const [subscribers, setSubscribers] = useState([
    {
      email: "",
      firstName: "",
      lastName: "",
      companyName: "",
      persona: "",
      role: "",
      ecosystems: [],
    },
  ])
  const [error, setError] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  const ecosystemsOptions = [
    {
      id: "evtolandvtolaircrafts",
      name: "EVTOL and VTOL Aircrafts",
    },
  ]

  const faqs = [
    {
      title: "What is included with this Subscription?",
      desc: "This subscription grants full access for 365 days to the product that you are purchasing. Exponential Vector fully commits to maintaining the product updated in the specified timeframe. For more information on what features are currently available for each ecosystem, please check the designated website page.",
    },
    {
      title: "Why are some personas restricted to access all features?",
      desc: "Some of the features are explicitly developed for specific stakeholders and require a degree of confidentiality to be used. Given this, we restrict these features to pre-selected organizations. For more information, please consult the product overview brochure.",
    },
    {
      title: "I’m unsure about this subscription, can I request a free trial?",
      desc: "We usually only issue free trials to pre-selected companies that we designate as COI (Company of Interest) for our products. However, feel free to email us at enquiries@exponentialvector.eu your use case and the reasons why you are unsure about subscribing, and we will decide on a case-by-case basis.",
    },
  ]

  const info = [
    {
      title:
        "Licenses are issued per email (per person). Each corporate email you add, we will issue licenses for the provided email(s).",
    },
    {
      title:
        "The first email provided will be considered the Title holder of the license. This user can manage subsequent licenses issued to the same organization.",
    },
    {
      title:
        "Generic company emails without any employee directly mentioned in the email domain will be suspended. If you have a specific case of such an instance, please email us the details at support@exponentialvector.eu",
    },
  ]

  const pricingTiers = [
    { quantity: 1, price: 3000 },
    { quantity: 2, price: 2900 },
    { quantity: 3, price: 2800 },
    { quantity: 4, price: 2750 },
    { quantity: 5, price: 2500 },
  ]

  const calculateTotalPrice = () => {
    const totalSubscriptions = subscribers.length
    const tier = pricingTiers.find(
      (tier) => totalSubscriptions <= tier.quantity
    )
    const basePricePerSubscriber = tier
      ? tier.price
      : pricingTiers[pricingTiers.length - 1].price

    return totalSubscriptions * basePricePerSubscriber
  }

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
        role: "",
        ecosystems: [],
      },
    ])
    setError("")
  }

  const handleChange = (index, field, value) => {
    const updatedSubscribers = [...subscribers]
    updatedSubscribers[index][field] = value
    setSubscribers(updatedSubscribers)
  }

  const handleEcosystemChange = (index, ecosystemId) => {
    const updatedSubscribers = [...subscribers]
    const subscriber = updatedSubscribers[index]
    if (subscriber.ecosystems.includes(ecosystemId)) {
      subscriber.ecosystems = subscriber.ecosystems.filter(
        (id) => id !== ecosystemId
      )
    } else {
      subscriber.ecosystems.push(ecosystemId)
    }
    setSubscribers(updatedSubscribers)
  }

  const validateSubscribers = () => {
    for (const sub of subscribers) {
      if (
        !sub.email ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(sub.email) ||
        !sub.firstName ||
        !sub.lastName ||
        !sub.companyName ||
        !sub.persona ||
        sub.ecosystems.length === 0
      ) {
        setError("Please fill in all fields and select at least one ecosystem.")
        return false
      }
    }
    setError("")
    return true
  }

  const handleSubscribe = async () => {
    if (!validateSubscribers()) return

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptions: subscribers,
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
      setError("Something went wrong while processing the subscriptions.")
    }
  }

  const toggleFAQ = (index) => {
    setExpandedFAQ((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div className="flex flex-grow flex-col items-center justify-center py-8 text-center">
      <div>
        <h2>Subscribe to Exponential Vector</h2>
        <p className="mt-4">
          Complete your subscription to access the platform.
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-6 w-full max-w-3xl">
          <AnimatePresence>
            {subscribers.map((subscriber, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="grid gap-4 grid-cols-2">
                  <input
                    type="text"
                    value={subscriber.firstName}
                    placeholder="First Name"
                    onChange={(e) =>
                      handleChange(index, "firstName", e.target.value)
                    }
                    className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={subscriber.lastName}
                    placeholder="Last Name"
                    onChange={(e) =>
                      handleChange(index, "lastName", e.target.value)
                    }
                    className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  value={subscriber.email}
                  placeholder="Email"
                  onChange={(e) => handleChange(index, "email", e.target.value)}
                  className="mt-4 w-full rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
                />
                <div className="mt-4 grid gap-4 grid-cols-2">
                  <input
                    type="text"
                    value={subscriber.companyName}
                    placeholder="Company"
                    onChange={(e) =>
                      handleChange(index, "companyName", e.target.value)
                    }
                    className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
                  />
                  <select
                    value={subscriber.persona}
                    onChange={(e) =>
                      handleChange(index, "persona", e.target.value)
                    }
                    className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
                  >
                    <option value="">Select Persona</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Edifice">Edifice</option>
                    <option value="Investor">Investor</option>
                    <option value="Government official">
                      Government Official
                    </option>
                    <option value="Enthusiast">Enthusiast</option>
                  </select>
                </div>
                <div className="mt-4">
                  <select
                    value={subscriber.ecosystems[0] || ""}
                    onChange={(e) =>
                      handleChange(index, "ecosystems", [e.target.value])
                    }
                    className="w-full rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
                  >
                    <option value="">Select Ecosystem</option>
                    {ecosystemsOptions.map((eco) => (
                      <option key={eco.id} value={eco.id}>
                        {eco.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-end mt-4 space-x-4">
                  {subscribers.length > 1 && (
                    <button
                      onClick={() =>
                        setSubscribers(
                          subscribers.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-500"
                    >
                      <FontAwesomeIcon
                        aria-hidden="true"
                        icon={faCircleXmark}
                      />
                    </button>
                  )}
                  {index === subscribers.length - 1 && (
                    <button
                      onClick={handleAddSubscriber}
                      className="text-[#e8e8e8]"
                    >
                      <div className="flex items-center gap-2">
                        Add another user
                        <FontAwesomeIcon aria-hidden="true" icon={faPlus} />
                      </div>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="mb-4">
            <div className="flex items-center justify-center gap-4">
              <p className="text-lg">
                Monthly Price: €{(calculateTotalPrice() / 12).toFixed(2)}
                <span className="text-sm text-gray-400">*</span>
              </p>
              <span className="text-gray-400">|</span>
              <div>
                <p className="text-lg">Total Price: €{calculateTotalPrice()}</p>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              (Prices displayed don’t include VAT or additional fees.)
            </p>
            <p className="text-sm text-gray-400">
              *Each license requires a minimum commitment of 12 months.
            </p>
          </div>
          <Button
            onClick={handleSubscribe}
            className="bg-[#34333d] rounded-lg px-4 py-2 focus:outline-none"
          >
            <div className="flex items-center gap-2">
              Subscribe with
              <FontAwesomeIcon
                className="text-3xl"
                aria-hidden="true"
                icon={faCcStripe}
              />
            </div>
          </Button>
          <div>
            <div className="m-8 text-center">
              <p className="mb-4 ">
                If you wish to proceed with the checkout using alternative
                payment methods, we also accept bank transfers and
                cryptocurrencies. <br />
                Please email us at{" "}
                <a
                  href="mailto:enquiries@exponentialvector.eu"
                  className="text-[#7032ff]"
                >
                  enquiries@exponentialvector.eu
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="px-8 md:px-0">
            <div>
              <div className="mb-8 text-center">
                <h2 className="mb-4">Important Info</h2>
              </div>
              <div className="max-w-3xl grid gap-10">
                {info.map(({ title }) => (
                  <div key={title}>
                    <div className="pb-6">{title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="px-8">
            <div>
              <div className="mb-8 text-center">
                <h2 className="mb-4">FAQ</h2>
              </div>
              <div className="max-w-3xl w-full mx-auto space-y-4">
                {faqs.map(({ title, desc }, index) => (
                  <div key={title}>
                    <div
                      className="flex items-center justify-between pb-6 font-bold cursor-pointer"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span>{title}</span>
                      <FontAwesomeIcon
                        icon={
                          expandedFAQ === index ? faChevronUp : faChevronDown
                        }
                      />
                    </div>
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        expandedFAQ === index
                          ? "max-h-screen opacity-100"
                          : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      <div className="font-normal text-left">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
