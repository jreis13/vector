"use client"

import Image from "next/image"
import { useState } from "react"
import Button from "./Button"
import mailIcon from "/public/icons/mailIcon.svg"

export default function CTA() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus({
          type: "success",
          message: "You’ve been added to the waitlist!",
        })
        setEmail("")
      } else {
        const errorData = await response.json()
        setStatus({
          type: "error",
          message: errorData.message || "Something went wrong.",
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Please try again later.",
      })
    }

    setLoading(false)
  }

  return (
    <section className="py-16 px-8 lg:py-28">
      <div className="container mx-auto grid items-center lg:grid-cols-2 gap-12">
        <div className="row-start-2 mt-12 lg:row-auto lg:mt-0 lg:pr-12">
          <h2 className="text-3xl md:text-5xl font-bold leading-snug">
            <span className="text-[#6600cc] caret">^</span> Help us shape the
            future of the eVTOL ecosystems.
          </h2>

          <p className="text-gray-400 mt-6 text-xl">
            Gain exclusive insights into cutting-edge industry trends and
            developments. Our intelligence solution provides deep analysis and
            market forecasting to help you stay ahead.
          </p>

          <div className="mt-8">
            <Button href="/api/auth/login">Join Us</Button>
          </div>

          <h3 className="text-2xl font-semibold mt-12">
            Coming Soon: Fintech Intelligence
          </h3>

          <p className="text-gray-400 mt-6 text-xl">
            Be among the first to access valuable fintech insights shaping the
            future of finance.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-4"
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
              {loading ? "Submitting..." : "Join the Waitlist"}
            </button>
          </form>

          {status && (
            <p
              className={`mt-4 text-lg ${status.type === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {status.message}
            </p>
          )}
        </div>

        <Image
          src={mailIcon}
          alt="Subscribe"
          className="w-full md:-ml-4 lg:-ml-0"
        />
      </div>
    </section>
  )
}
