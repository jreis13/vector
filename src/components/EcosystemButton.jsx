"use client"

import { useRouter } from "next/navigation"
import Button from "./Button"

export default function EcosystemButton({ ecosystem, user, setIsNavigating }) {
  const router = useRouter()

  const handleClick = () => {
    setIsNavigating(true)

    if (user) {
      router.push(
        `/ecosystems/${ecosystem.name.replace(/\s+/g, "").toLowerCase()}?tab=overview`
      )
    } else {
      const currentPath = encodeURIComponent(window.location.pathname)
      router.push(`/api/auth/login?returnTo=${currentPath}`)
    }
  }

  return (
    <Button onClick={handleClick}>
      {user ? "Go to Ecosystem" : "Login / Sign Up"}
    </Button>
  )
}
