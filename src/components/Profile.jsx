"use client"

import { useUser } from "@auth0/nextjs-auth0/client"

export default function Profile() {
  const { user, error, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#7032ff] border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center my-12 text-[#403f4c]">
      {user && (
        <div className="bg-[#e8e8e8] shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mt-4">
              {user.app_metadata?.firstName && user.app_metadata?.lastName
                ? `${user.app_metadata.firstName} ${user.app_metadata.lastName}`
                : "N/A"}
            </h2>
            <p className=" text-sm">{user.email || "N/A"}</p>
          </div>
          <div className="mt-6">
            <div className="flex justify-between py-2">
              <span>Company:</span>
              <span>{user.app_metadata?.companyName || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Persona:</span>
              <span>{user.app_metadata?.persona || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Subscription:</span>
              <span
                className={`${
                  user.app_metadata?.subscribed
                    ? "text-green-500"
                    : "text-red-500"
                } font-semibold`}
              >
                {user.app_metadata?.subscribed ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span>Subscription Expires:</span>
              <span>
                {user.created_at
                  ? new Date(
                      new Date(user.created_at).setFullYear(
                        new Date(user.created_at).getFullYear() + 1
                      )
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className="text-gray-500 text-center">No user data available.</div>
      )}
    </div>
  )
}
