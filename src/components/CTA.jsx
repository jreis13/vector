"use client"

import Image from "next/image"
import Link from "./Link"

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-16 px-8 lg:py-28 w-full">
      <div className="container mx-auto grid justify-center items-center lg:grid-cols-2 gap-12">
        <div className="row-start-2 mt-12 flex flex-col items-center lg:row-auto lg:mt-0 lg:pr-12">
          <h2 className="text-3xl lg:text-5xl px-8 lg:px-0 font-bold leading-snug">
            <span className="text-[#6600cc] caret">^</span>Still curious about
            what we do?
          </h2>

          <p className="text-gray-400 mt-6 text-xl px-8 lg:px-0">
            Take the Portal to navigate to our latest tool -{" "}
            <Link to="https://evtolportal.com" blank>
              <span className="underline text-[#6600cc] font-semibold">
                eVTOL Portal
              </span>
            </Link>{" "}
            - and get access to the latest developments in the eVTOL space.
          </p>
        </div>

        <Link to="https://evtolportal.com" blank>
          <Image
            src="/portal.png"
            alt="eVTOL Portal"
            width={10000}
            height={10000}
            priority
            className="w-full lg:-ml-4 lg:-ml-0 px-8 lg:px-0"
          />
        </Link>
      </div>
    </section>
  )
}
