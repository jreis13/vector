"use client"

import Button from "./Button"

export default function EcosystemButton({ ecosystem, user }) {
  const handleClick = () => {
    if (user) {
      const targetUrl = `/ecosystems/${ecosystem.name.replace(/\s+/g, "").toLowerCase()}?tab=overview`
      window.location.href = targetUrl
    } else {
      const currentPath = encodeURIComponent(window.location.pathname)
      window.location.href = `/api/auth/login?returnTo=${currentPath}`
    }
  }

  return (
    <Button onClick={handleClick}>
      {user ? "Go to Ecosystem" : "Login / Sign Up"}
    </Button>
  )
}
