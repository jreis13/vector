"use client"

import { useRouter } from "next/navigation"

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
    <div className="mb-6 flex flex-col cursor-pointer rounded-lg border overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl lg:w-[600px] lg:h-auto">
      <div
        className="h-[250px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${ecosystem.logo})`,
        }}
      ></div>
      <div className="bg-[#e8e8e8] px-10 py-6 flex flex-col justify-between flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl text-[#403f4c] font-bold mb-2">
            {ecosystem.name}
          </h3>
          <p className="text-gray-700">{ecosystem.summary}</p>
        </div>
        <div className="flex gap-4">
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white shadow-md"
            onClick={handlePurchasePDF}
          >
            Purchase PDF
          </button>
          <button
            className="flex-grow rounded-lg bg-[#7032ff] px-4 py-2 font-bold text-white shadow-sm"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
