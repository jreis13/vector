"use client"

import { useRouter } from "next/navigation"

import { motion } from "framer-motion"

export default function PublicEcosystemCard({ ecosystem }) {
  const router = useRouter()

  const handlePurchasePDF = () => {
    window.location.href = `/purchase/${ecosystem.name.replace(/\s+/g, "").toLowerCase()}`
  }

  const handleSubscribe = () => {
    const currentPath = encodeURIComponent(window.location.pathname)
    router.push(`/api/auth/login?returnTo=${currentPath}`)
  }

  return (
    <div className="mb-6 flex flex-col rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl lg:w-[600px] lg:h-auto">
      <div
        className="h-[250px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${ecosystem.logo})`,
        }}
      ></div>
      <div className="bg-[#34333d] px-10 py-6 flex flex-col justify-between flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl text-[#e8e8e8] font-bold mb-2">
            {ecosystem.name}
          </h3>
          <p className="text-gray-400">{ecosystem.summary}</p>
        </div>
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex w-full hover:bg-[#7032ff] hover:text-[#e8e8e8] max-w-full justify-center rounded-full border p-4 uppercase transition-colors duration-300 font-medium"
            onClick={handleSubscribe}
          >
            <p>Subscribe</p>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
