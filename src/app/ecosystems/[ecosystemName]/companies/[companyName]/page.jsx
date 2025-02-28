"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchUserMetadata } from "src/common/utils/fetchUserMetadata"
import useCompanyByName from "src/hooks/useCompanyByName"
import CompanyLayout from "src/layouts/CompanyLayout"
import LoadingLayout from "src/layouts/LoadingLayout"

export default function CompanyPage({ params }) {
  const { ecosystemName, companyName } = params
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    async function checkAccess() {
      const metadata = await fetchUserMetadata()

      if (
        !metadata ||
        !metadata.subscribedTo ||
        !metadata.subscribedTo.includes(ecosystemName)
      ) {
        router.push("/api/auth/login")
      } else {
        setHasAccess(true)
      }
    }

    checkAccess()
  }, [ecosystemName, router])

  const { company, loading, error } = useCompanyByName(
    ecosystemName,
    companyName
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingLayout />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Error: {error}</p>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Company not found...</p>
      </div>
    )
  }

  return <CompanyLayout company={company} ecosystemName={ecosystemName} />
}
