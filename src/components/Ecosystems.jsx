"use client"

import { useEffect, useState } from "react"
import EcosystemCard from "./EcosystemCard"
import Overlay from "./Overlay"
import PublicEcosystemCard from "./PublicEcosystemCard"

export default function EcosystemsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const text = await response.text()
          const userData = text ? JSON.parse(text) : null
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (err) {
        setError(err.message)
        setUser(null)
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
        setFilteredData(ecosystemsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
    fetchEcosystems()
  }, [])

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const filtered = data.filter(
        (ecosystem) =>
          ecosystem.categories &&
          ecosystem.categories.some((category) =>
            selectedCategories.includes(category.name.toLowerCase())
          )
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [selectedCategories, data])

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#7032ff] border-t-transparent"></div>
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
      {showOverlay && <Overlay onDismiss={() => setShowOverlay(false)} />}
      {!showOverlay && (
        <>
          <div>
            <div className="flex justify-between">
              <div className="mb-8">
                <h2 className="text-3xl font-bold">Ecosystems</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((ecosystem) =>
                user ? (
                  <EcosystemCard key={ecosystem.id} ecosystem={ecosystem} />
                ) : (
                  <PublicEcosystemCard
                    key={ecosystem.id}
                    ecosystem={ecosystem}
                  />
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
