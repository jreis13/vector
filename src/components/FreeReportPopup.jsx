"use client"

import { DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Button from "./Button"

export default function FreeReportPopup() {
  const pathname = usePathname()
  const [shouldRender, setShouldRender] = useState(false)
  const [minimized, setMinimized] = useState(false)

  useEffect(() => {
    if (pathname !== "/") return

    const timer = setTimeout(() => {
      setShouldRender(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [pathname])

  if (pathname !== "/") return null

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 min-w-[320px]">
      <AnimatePresence mode="wait">
        {shouldRender && (
          <motion.div
            key={minimized ? "minimized" : "full"}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {minimized ? (
              <button
                onClick={() => setMinimized(false)}
                className="p-3 bg-[#6600cc] rounded-full shadow-xl hover:scale-105 transition absolute bottom-0 right-0"
                title="Show Free Report"
              >
                <DocumentTextIcon className="h-6 w-6 text-[#e8e8e8]" />
              </button>
            ) : (
              <div className="w-full p-6 bg-[#e8e8e8] border border-gray-300 rounded-xl shadow-2xl flex flex-col gap-4">
                <button
                  onClick={() => setMinimized(true)}
                  className="absolute top-2 left-2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <div className="flex gap-4 items-start">
                  <DocumentTextIcon className="h-16 w-16 text-[#6600cc]" />
                  <div>
                    <h3 className="font-bold text-sm text-gray-800">
                      Get a Free Sample of our Report!
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Check out the free version of our Global eVTOL Market
                      Review (Passenger Commercial Tracker) - Q1 2025
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-between mt-2">
                  <Button
                    onClick={() =>
                      window.open(
                        "/reports/global_evtol_market_review_commercial_tracker_q1_2025_free",
                        "_blank"
                      )
                    }
                  >
                    View Report
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
