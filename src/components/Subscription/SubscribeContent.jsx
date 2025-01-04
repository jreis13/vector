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
    },
  ])
  const [error, setError] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  const pricingTiers = [
    { quantity: 1, price: 3000 },
    { quantity: 2, price: 2900 },
    { quantity: 3, price: 2800 },
    { quantity: 4, price: 2750 },
    { quantity: 5, price: 2500 },
  ]

  const faqs = [
    {
      title: "What is included with this Subscription?",
      desc: "This subscription grants full access for 365 days to the product that you are purchasing. Exponential Vector fully commits to maintaining the product updated in the specified timeframe. For more information on what features are currently available for each ecosystem, please check the designated website page.",
    },
    {
      title: "Why are some personas restricted to access all features?",
      desc: "Some of the features are explicitly developed for specific stakeholders and require a degree of confidentially to be used. Given this, we restrict these features to pre selected organizations. For more information, please consult the product overview brochure.",
    },
    {
      title: "I’m unsure about this subscription, can I request a free trial?",
      desc: "We usually only issue free trials to pre selected companies that we designate as COI (Company of interest) for our products. However, feel free to email us at enquiries@exponentialvector.eu your use case and the reasons why you are unsure about subscribing and we will decide on the case by case basis.",
    },
  ]

  const info = [
    {
      title:
        "Licenses are issued per email (per person). Each company personal email you add, we will issue a license for the given email.",
    },
    {
      title:
        "The first email provided will be considered the Title holder of the license. This user can manage subsequent licences issued to the same organization.",
    },
    {
      title:
        "Generic company emails without any employee directly mentioned in the email domain will be suspended. If you have a specific case of such instance, please emails us the details at support@exponentialvector.eu",
    },
  ]

  const getTierPrice = (quantity) => {
    const tier = pricingTiers.find((tier) => quantity <= tier.quantity)
    return tier ? tier.price : pricingTiers[pricingTiers.length - 1].price
  }

  const calculateTotalPrice = () => {
    const unitPrice = getTierPrice(subscribers.length)
    return unitPrice * subscribers.length
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
      },
    ])
    setError("")
  }

  const handleChange = (index, field, value) => {
    const updatedSubscribers = [...subscribers]
    updatedSubscribers[index][field] = value
    setSubscribers(updatedSubscribers)
  }

  const handleRemoveSubscriber = (index) => {
    const updatedSubscribers = subscribers.filter((_, i) => i !== index)
    setSubscribers(updatedSubscribers)
    setError("")
  }

  const validateSubscribers = () => {
    for (const sub of subscribers) {
      if (
        !sub.email ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(sub.email) ||
        !sub.firstName ||
        !sub.lastName ||
        !sub.companyName ||
        !sub.persona
      ) {
        setError(
          "Please fill in all fields and provide valid data for each subscriber."
        )
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
      console.error("Checkout request failed:", err)
      setError("Something went wrong while processing the subscriptions.")
    }
  }

  const toggleFAQ = (index) => {
    setExpandedFAQ((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div className="flex flex-grow flex-col items-center justify-center py-8 text-center">
      <div>
        <h2 className="text-3xl font-bold">Subscribe to Exponential Vector</h2>
        <p className="mt-4 text-lg">
          Complete your subscription to access the platform.
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-6">
          {subscribers.map((subscriber, index) => (
            <div key={index} className="mb-6 px-4">
              <div className="grid gap-2 grid-cols-2">
                <input
                  type="text"
                  value={subscriber.firstName}
                  placeholder="First Name"
                  onChange={(e) =>
                    handleChange(index, "firstName", e.target.value)
                  }
                  className="rounded border text-[#403f4c] bg-[#e8e8e8] px-2 py-1"
                />
                <input
                  type="text"
                  value={subscriber.lastName}
                  placeholder="Last Name"
                  onChange={(e) =>
                    handleChange(index, "lastName", e.target.value)
                  }
                  className="rounded border text-[#403f4c] bg-[#e8e8e8] px-2 py-1"
                />
              </div>
              <input
                type="email"
                value={subscriber.email}
                placeholder="Email"
                onChange={(e) => handleChange(index, "email", e.target.value)}
                className="mt-2 w-full rounded border text-[#403f4c] bg-[#e8e8e8] px-2 py-1"
              />
              <div className="mt-2 grid gap-2 grid-cols-2">
                <input
                  type="text"
                  value={subscriber.companyName}
                  placeholder="Company"
                  onChange={(e) =>
                    handleChange(index, "companyName", e.target.value)
                  }
                  className="rounded border text-[#403f4c] bg-[#e8e8e8] px-2 py-1"
                />
                <select
                  value={subscriber.persona}
                  onChange={(e) =>
                    handleChange(index, "persona", e.target.value)
                  }
                  className="rounded border text-[#403f4c] bg-[#e8e8e8] px-2 py-1"
                >
                  <option value="">Select Persona</option>
                  <option value="Manufacturer">
                    Manufacturer - Select if you represent a company that
                    manufactures Advanced Air Mobility aircraft.
                  </option>
                  <option value="Supplier">
                    Supplier - Select if you represent a company that supplies
                    parts to AAM manufacturers.
                  </option>
                  <option value="Edifice">
                    Edifice - Select if you represent a company building
                    infrastructure for AAM aircraft.
                  </option>
                  <option value="Investor">
                    Investor - Select if you represent an investment entity.
                  </option>
                  <option value="Government official">
                    Government official - Select if you represent a government
                    body.
                  </option>
                  <option value="Enthusiast">
                    Enthusiast - Select if you don’t fall into any of the above
                    categories.
                  </option>
                </select>
              </div>
              <div className="flex flex-col items-center justify-center mt-2 space-y-1">
                {subscribers.length > 1 && (
                  <button
                    onClick={() => handleRemoveSubscriber(index)}
                    className="text-red-500 w-fit"
                  >
                    <FontAwesomeIcon aria-hidden="true" icon={faCircleXmark} />
                  </button>
                )}
                {subscribers.length < 5 && (
                  <button
                    onClick={handleAddSubscriber}
                    className="text-[#e8e8e8] w-fit"
                  >
                    <FontAwesomeIcon aria-hidden="true" icon={faPlus} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="mb-4">
            <p className="text-lg">
              Total Price: €{calculateTotalPrice().toFixed(2)}
            </p>
            <p className="text-sm">
              {" "}
              (Prices displayed don’t include VAT or additional fees.)
            </p>
          </div>
          <Button onClick={handleSubscribe}>
            Subscribe with{" "}
            <FontAwesomeIcon aria-hidden="true" icon={faCcStripe} />
          </Button>
        </div>
        <div className="mt-16">
          <div className="px-8">
            <div className="container mx-auto">
              <div className="mb-8 text-center ">
                <div className="mb-4 text-4xl">Important Info</div>
              </div>
              <div className="max-w-3xl mx-auto grid gap-10">
                {info.map(({ title }) => (
                  <div key={title}>
                    <div className="pb-6 font-bold">{title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="px-8">
            <div className="container mx-auto">
              <div className="mb-8 text-center ">
                <div className="mb-4 text-4xl">FAQ</div>
              </div>
              <div className="max-w-3xl mx-auto grid gap-10">
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
                    <AnimatePresence>
                      {expandedFAQ === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-200 pt-4 overflow-hidden"
                        >
                          <div className="font-normal text-left">{desc}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
