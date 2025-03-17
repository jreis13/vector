"use client"

import { useEffect, useState } from "react"
import LoadingLayout from "src/layouts/LoadingLayout"
import EcosystemButton from "./EcosystemButton"

export default function EcosystemsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedCategories, setSelectedCategories] = useState(["mobility"])
  const [isNavigating, setIsNavigating] = useState(false)

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
      const filtered = data.filter((ecosystem) => {
        let categories = ecosystem.categories

        if (!Array.isArray(categories)) {
          categories =
            typeof categories === "string" ? categories.split(",") : []
        }

        return categories.some((category) =>
          selectedCategories.includes(category.trim().toLowerCase())
        )
      })

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

  const handleCardClick = () => {
    setIsNavigating(true)
    setLoading(true)
  }

  if (loading || isNavigating) {
    return <LoadingLayout />
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
      className="flex flex-col items-center px-6 py-8 lg:px-16 lg:py-16"
    >
      {filteredData.map((ecosystem) => (
        <EcosystemButton
          key={ecosystem.id}
          ecosystem={ecosystem}
          user={user}
          setIsNavigating={setIsNavigating}
        />
      ))}
    </div>
  )
}
