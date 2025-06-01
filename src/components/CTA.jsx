"use client"

import Image from "next/image"
import Link from "./Link"

export default function CTA() {
  return (
    <section className="relative w-full overflow-hidden px-8 py-16 lg:py-28">
      <div className="container mx-auto grid items-center justify-center gap-12 lg:grid-cols-2">
        <div className="row-start-2 mt-12 flex flex-col items-center lg:row-auto lg:mt-0 lg:pr-12">
          <h2 className="px-8 text-3xl font-bold leading-snug lg:px-0 lg:text-5xl">
            <span className="caret text-[#6600cc]">^</span>Still curious about
            what we do?
          </h2>

          <p className="mt-6 px-8 text-xl text-gray-400 lg:px-0">
            Take the Portal to navigate to our latest tool -{" "}
            <Link to="https://evtolportal.com" blank>
              <span className="font-semibold text-[#6600cc] underline">
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
            className="w-full px-8 lg:-ml-0 lg:-ml-4 lg:px-0"
          />
        </Link>
      </div>
    </section>
  )
}
