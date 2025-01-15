"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import EcosystemLayout from "src/layouts/EcosystemLayout"
import "../../../common/styles/_reset.css"

export default function EcosystemPage({ params }) {
  const { ecosystemName } = params
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [ecosystem, setEcosystem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          const currentPath = encodeURIComponent(window.location.pathname)
          router.replace(`/api/auth/login?returnTo=${currentPath}`)
        }
      } catch (err) {
        console.error("Error fetching user:", err.message)
        const currentPath = encodeURIComponent(window.location.pathname)
        router.replace(`/api/auth/login?returnTo=${currentPath}`)
      }
    }

    fetchUser()
  }, [router])

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
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      // Check if the user is subscribed to this ecosystem
      if (
        !user.app_metadata?.subscribed ||
        !user.app_metadata.subscribed.includes(ecosystemName)
      ) {
        setAccessDenied(true)
        setLoading(false)
      } else {
        fetchEcosystem()
      }
    }
  }, [user, ecosystemName])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#7032ff] border-t-transparent"></div>
      </div>
    )
  }

  if (accessDenied) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>You do not have access to this ecosystem. Please subscribe.</p>
      </div>
    )
  }

  if (!ecosystem) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Ecosystem not found...</p>
      </div>
    )
  }

  return <EcosystemLayout ecosystem={ecosystem} />
}
