"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect, useState } from "react"

export default function Profile() {
  const { user, error: authError, isLoading } = useUser()
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUserInfo() {
      if (!user) return

      try {
        const response = await fetch(`/api/user/info?email=${user.email}`)
        if (!response.ok) {
          throw new Error("Failed to fetch user information")
        }
        const data = await response.json()
        setUserInfo(data)
      } catch (err) {
        console.error("Error fetching user information:", err.message)
        setError(err.message)
      }
    }

    fetchUserInfo()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#7032ff] border-t-transparent"></div>
      </div>
    )
  }

  if (authError || error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{authError || error}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col px-6 py-8 lg:px-16 lg:py-16">
      <h2 className="text-3xl font-bold">Profile</h2>
      {user && userInfo && (
        <div className="py-4">
          <p>
            <strong>Name:</strong> {userInfo.customer.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.customer.email}
          </p>
          {userInfo.subscription && (
            <div className="py-4">
              <p>
                <strong>Subscription Status: </strong>
                <span className="text-[#00FF00]">
                  {userInfo.subscription.status.charAt(0).toUpperCase() +
                    userInfo.subscription.status.slice(1)}
                </span>
              </p>
              <p>
                <strong>Subscription Ends: </strong>
                {new Date(
                  userInfo.subscription.current_period_end * 1000
                ).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
