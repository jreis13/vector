"use client"

import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

export default function Ecosystem({ user }) {
  const tooltipStyles =
    "rounded-md border bg-gray-100 p-4 text-sm shadow-md z-[9999]"

  if (!user) {
    return (
      <div
        id="Ecosystem"
        className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16"
      >
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Ecosystem</h2>
            <p className="mt-4">
              Here you will find our deep-dives and overviews of our ecosystem
              reports. You can purchase the PDF version or acquire a yearly
              subscription.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="relative z-10 flex h-60 w-full max-w-md flex-col justify-between rounded-lg border p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div>
                <h3 className="mb-4 flex items-center justify-between text-lg font-semibold">
                  Purchase PDF Version
                  <Tippy
                    content={
                      <div className="text-left">
                        <ul className="mt-2 list-inside list-disc space-y-2">
                          <li>
                            Buying a PDF separately allows you to view all
                            information updated as of the last update.
                          </li>
                          <li>
                            It is a one-time payment, and you won’t receive
                            further updates.
                          </li>
                          <li>
                            For ongoing updates, consider opting for the
                            subscription instead.
                          </li>
                        </ul>
                      </div>
                    }
                    placement="top"
                    interactive={true}
                    delay={[0, 200]}
                    className={tooltipStyles}
                  >
                    <span className="cursor-pointer rounded-full bg-gray-300 px-2 py-1 text-xs text-[#34333d]">
                      ?
                    </span>
                  </Tippy>
                </h3>
                <p className="mb-6 text-sm">
                  Purchase a full PDF report or a get a sample version to know
                  what to expect.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  className="flex-grow rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md transition-all"
                  onClick={() => {
                    window.location.href = "/path-to-file/full-report.pdf"
                  }}
                >
                  Purchase Full PDF
                </button>
                <button
                  className="rounded-lg bg-gray-300 px-4 py-2 text-black shadow-sm transition-all"
                  onClick={() => {
                    window.location.href = "/path-to-file/sample-report.pdf"
                  }}
                >
                  Download Sample
                </button>
              </div>
            </div>

            <div className="relative flex h-60 w-full max-w-md flex-col justify-between rounded-lg border p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div>
                <h3 className="mb-4 flex items-center justify-between text-lg font-semibold">
                  Subscribe
                  <Tippy
                    content={
                      <div className="text-left">
                        <ul className="mt-2 list-inside list-disc space-y-2">
                          <li>
                            Have full access to our Exp Vector platform, where
                            you can analyze all information interactively.
                          </li>
                          <li>
                            Receive Quarterly follow-ups on the latest news and
                            trends.
                          </li>
                          <li>
                            Stay up to date with the latest updates throughout
                            the year.
                          </li>
                        </ul>
                      </div>
                    }
                    placement="top"
                    interactive={true}
                    delay={[0, 200]}
                    className={tooltipStyles}
                  >
                    <span className="cursor-pointer rounded-full bg-gray-300 px-2 py-1 text-xs text-[#34333d]">
                      ?
                    </span>
                  </Tippy>
                </h3>
                <p className="mb-6 text-sm">
                  Gain full access to all our interactive features with a yearly
                  subscription.
                </p>
              </div>
              <button
                className="w-full rounded-lg bg-[#BB44F0] px-6 py-3 text-white shadow-md transition-all"
                onClick={() => {
                  const currentPath = encodeURIComponent(
                    window.location.pathname
                  )
                  window.location.href = `/api/auth/login?returnTo=${currentPath}`
                }}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      id="Ecosystem"
      className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16"
    >
      <div className="text-center">
        <h2 className="mb-8 text-3xl font-bold">Ecosystem</h2>
        <p className="mt-4">
          Explore all features and services available to you.
        </p>
      </div>
    </div>
  )
}
