export async function fetchUserMetadata() {
  try {
    const response = await fetch("/api/auth/me")
    if (!response.ok) throw new Error("Failed to fetch user metadata")

    const user = await response.json()
    return user.app_metadata || {}
  } catch (error) {
    console.error("Error fetching user metadata:", error)
    return null
  }
}
