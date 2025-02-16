"use client"

import { Card, CardBody, Typography } from "@material-tailwind/react"
import { useState } from "react"
import Logo from "./Logo"

function NewsletterPopup({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center"
      onClick={onClose}
    >
      <Card
        className="max-w-xl bg-[#34333d] p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <CardBody className="w-full text-center">
          <div className="flex justify-center">
            <i className="fa-solid fa-check text-3xl text-gray-900"></i>
          </div>
          <Logo />
          <Typography color="white" className="mb-6 mt-10" variant="h4">
            Successfully Subscribed!
          </Typography>
          <Typography className="text-gray-500 text-lg leading-6">
            You have been added to our newsletter! <br /> Stay updated with the
            latest insights.
          </Typography>
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#d87103] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setEmail("")
        setPopupVisible(true)
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || "Something went wrong.")
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.")
    }

    setLoading(false)
  }

  return (
    <section className="py-16 px-8 lg:py-20 w-full flex flex-col items-center text-center">
      <div className="container mx-auto flex flex-col items-center">
        <h3 className="text-2xl font-semibold">Subscribe to Our Newsletter</h3>
        <p className="text-gray-400 mt-4 text-lg max-w-xl">
          Stay informed with the latest trends and industry updates.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-4 items-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg w-[300px] border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
            required
          />
          <button
            type="submit"
            className={`px-6 py-3 bg-[#d87103] text-[#403f4c] text-lg font-semibold rounded-lg transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Subscribe"}
          </button>
        </form>
        {errorMessage && (
          <p className="mt-4 text-lg text-red-500">{errorMessage}</p>
        )}
      </div>
      {popupVisible && (
        <NewsletterPopup onClose={() => setPopupVisible(false)} />
      )}
    </section>
  )
}
