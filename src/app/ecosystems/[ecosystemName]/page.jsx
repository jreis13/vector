"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import EcosystemLayout from "src/layouts/EcosystemLayout"

export default function EcosystemPage({ params }) {
  const ecosystemName = params.ecosystemName
  const router = useRouter()
  const [ecosystem, setEcosystem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEcosystem() {
      try {
        const response = await fetch(`/api/ecosystems/${ecosystemName}`)

        if (!response.ok) {
          throw new Error("Failed to fetch ecosystem data")
        }

        const data = await response.json()

        setEcosystem(data)
      } catch (err) {
        console.error("Error fetching ecosystem:", err.message)
        setError("Failed to load ecosystem data.")
      } finally {
        setLoading(false)
      }
    }

    fetchEcosystem()
  }, [ecosystemName])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading ecosystem data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>{error}</p>
      </div>
    )
  }

  return <EcosystemLayout ecosystem={ecosystem} />
}
