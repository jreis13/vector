"use client"

import { Card, CardBody, Typography } from "@material-tailwind/react"
import Image from "next/image"
import { useState } from "react"
import Button from "./Button"
import Logo from "./Logo"
import mailIcon from "/public/icons/mailIcon.svg"

function Popup({ onClose }) {
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
            Successfully Joined!
          </Typography>
          <Typography className="text-gray-500 text-lg leading-6">
            You have been added to the Fintech Intelligence waitlist! <br />{" "}
            Stay tuned for updates.
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

export default function CTA() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/send-email", {
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
    <section className="py-16 px-8 lg:py-28 w-full">
      <div className="container mx-auto grid justify-center items-center lg:grid-cols-2 gap-12">
        <div className="row-start-2 mt-12 lg:row-auto lg:mt-0 lg:pr-12">
          <h2 className="text-3xl md:text-5xl font-bold leading-snug">
            <span className="text-[#6600cc] caret">^</span> Help us shape the
            future of the eVTOL ecosystems.
          </h2>

          <p className="text-gray-400 mt-6 text-xl">
            Gain exclusive insights into cutting-edge industry trends and
            developments.
          </p>

          <div className="mt-8">
            <Button href="/api/auth/login">Join Us</Button>
          </div>

          <h3 className="text-2xl font-semibold mt-12">
            Coming Soon: Fintech Intelligence
          </h3>
          <p className="text-gray-400 mt-6 text-xl">
            Be among the first to access valuable fintech insights.
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

          {errorMessage && (
            <p className="mt-4 text-lg text-red-500">{errorMessage}</p>
          )}
        </div>

        <Image
          src={mailIcon}
          alt="Subscribe"
          className="w-full md:-ml-4 lg:-ml-0"
        />
      </div>

      {popupVisible && <Popup onClose={() => setPopupVisible(false)} />}
    </section>
  )
}
