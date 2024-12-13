"use client"

import { useRouter } from "next/navigation"

function PublicEcosystemCard({ ecosystem }) {
  const router = useRouter()

  const handlePurchasePDF = () => {
    window.location.href = `/purchase/${ecosystem.name.replace(/\s+/g, "").toLowerCase()}`
  }

  const handleSubscribe = () => {
    const currentPath = encodeURIComponent(window.location.pathname)
    router.push(`/api/auth/login?returnTo=${currentPath}`)
  }

  return (
    <div className="mb-6 flex h-full flex-col justify-between rounded-lg border p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div>
        <h3 className="text-xl font-bold">{ecosystem.name}</h3>
        <p>{ecosystem.summary}</p>
      </div>
      <div className="mt-4 flex gap-4">
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-[#e8e8e8] shadow-md"
          onClick={handlePurchasePDF}
        >
          Purchase PDF
        </button>
        <button
          className="flex-grow rounded-lg bg-[#7032ff] px-4 py-2 font-bold shadow-sm"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default PublicEcosystemCard
