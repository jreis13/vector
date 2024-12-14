import { useEffect, useState } from "react"

export default function useEcosystemData() {
  const [ecosystems, setEcosystems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/ecosystems")
        if (!response.ok) {
          throw new Error("Failed to fetch ecosystem data")
        }
        const data = await response.json()
        setEcosystems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { ecosystems, loading, error }
}
