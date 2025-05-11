import {
  ArrowsRightLeftIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  GlobeEuropeAfricaIcon,
  PaperAirplaneIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import Button from "./Button"
import Loading from "./Loading"

const iconMap = {
  "Companies Tracked": (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
      <BuildingOffice2Icon className="w-6 h-6 text-blue-500" />
    </div>
  ),
  "Reports Published": (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
      <ChartBarIcon className="w-6 h-6 text-green-500" />
    </div>
  ),
  "# of commercial transactions tracked": (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
      <ArrowsRightLeftIcon className="w-6 h-6 text-purple-500" />
    </div>
  ),
  "eVTOL Aircrafts": (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100">
      <PaperAirplaneIcon className="w-6 h-6 text-orange-500" />
    </div>
  ),
  "Country Reports": (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100">
      <GlobeEuropeAfricaIcon className="w-6 h-6 text-red-500" />
    </div>
  ),
  "# of  Agentic simulations ran": (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100">
      <RocketLaunchIcon className="w-6 h-6 text-indigo-500" />
    </div>
  ),
}

export default function MainHero({ buttonText }) {
  const [dashboardInfo, setDashboardInfo] = useState(null)

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard")
        const data = await res.json()
        setDashboardInfo(data.dashboardInfo)
      } catch (err) {
        console.error("Error fetching dashboard data", err)
      }
    }

    fetchDashboard()
  }, [])

  if (!Array.isArray(dashboardInfo)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="relative pb-24 px-6 md:min-h-[calc(100vh-64px)] w-full text-[#e8e8e8] flex flex-col justify-center items-center">
      <div className="absolute left-0 right-0 inset-0 -z-10 pointer-events-none">
        <Image
          src="/haikei/layered-waves-haikei.svg"
          alt="Haikei background"
          fill
          className="w-full h-auto object-cover opacity-40"
        />
      </div>
      <div className="max-w-6xl w-full text-left mb-6 mt-12">
        <h3 className="text-[#e8e8e8] font-bold text-3xl">
          Advanced Air Mobility Ecosystem Overview
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-4">
        {dashboardInfo.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[#e8e8e8] text-gray-800 p-6 rounded-xl shadow-md flex items-center justify-between min-h-[120px]"
          >
            <div className="flex flex-col">
              <p className="text-md font-medium text-[#403f4c] number">
                {item.title}
              </p>
              <h4 className="text-2xl font-bold text-[#34333d] number">
                {item.value}
              </h4>
            </div>
            <div className="ml-4">{iconMap[item.title]}</div>
          </motion.div>
        ))}
      </div>
      {buttonText && (
        <div className="my-6 w-full flex justify-center items-center">
          <Button href="/api/auth/login">{buttonText}</Button>
        </div>
      )}
    </div>
  )
}
