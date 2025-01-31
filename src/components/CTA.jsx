"use client"

import Image from "next/image"
import Button from "./Button" // Using your original button
import mailIcon from "/public/icons/mailIcon.svg"

export default function CTA() {
  return (
    <section className="py-16 px-8 lg:py-28">
      <div className="container mx-auto grid items-center lg:grid-cols-2 gap-12">
        <div className="row-start-2 mt-12 lg:row-auto lg:mt-0 lg:pr-12">
          <h2 className="text-3xl md:text-5xl font-bold leading-snug">
            <span className="text-[#6600cc] caret">^</span> Help us shape the
            future of the eVTOL ecosytems.
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
