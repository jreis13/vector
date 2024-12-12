"use client"

import EcosystemCard from "./EcosystemCard"
import PublicEcosystemCard from "./PublicEcosystemCard"
import { useState, useEffect } from "react"

export default function EcosystemsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      } catch (err) {
        console.log("User not logged in:", err.message)
      }
    }

    async function fetchEcosystems() {
      try {
        const response = await fetch("/api/ecosystems")
        if (!response.ok) {
          throw new Error("Failed to fetch ecosystems")
        }
        const ecosystemsData = await response.json()
        setData(ecosystemsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
    fetchEcosystems()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div
      id="Ecosystems"
      className="flex min-h-screen flex-col px-6 py-8 lg:px-16 lg:py-16"
    >
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Ecosystems</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data &&
            data.map((ecosystem) =>
              user ? (
                <EcosystemCard key={ecosystem.id} ecosystem={ecosystem} />
              ) : (
                <PublicEcosystemCard key={ecosystem.id} ecosystem={ecosystem} />
              )
            )}
        </div>
      </div>
    </div>
  )
}
