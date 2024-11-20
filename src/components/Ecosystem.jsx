"use client"

import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

export default function Ecosystem() {
  const tooltipStyles =
    "rounded-md bg-gray-100 p-4 text-sm shadow-md z-[9999] max-w-[250px]"

  const themes = [
    {
      title: "EVTOL and VTOL Aircrafts",
      description:
        "Explore the latest trends, market insights, and technology advancements in EVTOL and VTOL Aircrafts.",
      pdfLink: "/path-to-file/full-report-evtol.pdf",
    },
    {
      title: "Fintech",
      description:
        "Explore how innovative financial technologies are reshaping banking, payments, lending, and wealth management.",
      pdfLink: "/path-to-file/full-report-fintech.pdf",
    },
  ]

  return (
    <div
      id="Ecosystem"
      className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16"
    >
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Ecosystem</h2>
          <p className="mt-4">
            Explore our deep-dives and overviews of various ecosystem reports.
            Select a theme to learn more.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {themes.map((theme, index) => (
          <div
            key={index}
            className="relative flex h-auto w-full max-w-md flex-col justify-between rounded-lg border p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <h3 className="mb-4 text-lg font-semibold">{theme.title}</h3>
            <p className="mb-6 text-sm">{theme.description}</p>
            <div className="mt-auto flex gap-4">
              <Tippy
                content={
                  <div className="text-left">
                    <ul className="mt-2 list-inside space-y-2">
                      <li>
                        Buying a PDF allows you to access the latest report
                        update.
                      </li>
                      <li>
                        It&apos;s a one-time purchase, no future updates
                        included.
                      </li>
                    </ul>
                  </div>
                }
                placement="top"
                interactive={true}
                delay={[0, 200]}
                appendTo={document.body}
                className={`${tooltipStyles}`}
              >
                <button
                  className="flex-grow rounded-lg bg-[#FFA500] px-4 py-2 text-[#403f4c] shadow-md transition-all"
                  onClick={() => {
                    window.location.href = theme.pdfLink
                  }}
                >
                  Purchase PDF
                </button>
              </Tippy>

              <Tippy
                content={
                  <div className="text-left">
                    <ul className="mt-2 list-inside space-y-2">
                      <li>
                        Full access to the interactive platform with ongoing
                        updates.
                      </li>
                      <li>Receive quarterly follow-ups and latest trends.</li>
                    </ul>
                  </div>
                }
                placement="top"
                interactive={true}
                delay={[0, 200]}
                appendTo={document.body}
                className={`${tooltipStyles}`}
              >
                <button
                  className="rounded-lg bg-[#BB44F0] px-4 py-2 text-white shadow-md transition-all"
                  onClick={() => {
                    const currentPath = encodeURIComponent(
                      window.location.pathname
                    )
                    window.location.href = `/api/auth/login?returnTo=${currentPath}`
                  }}
                >
                  Subscribe
                </button>
              </Tippy>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
