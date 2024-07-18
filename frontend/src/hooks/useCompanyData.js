import { useEffect, useState } from "react"

const useCompanyData = () => {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/companies`
        )
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format")
        }
        setCompanies(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  return { companies, loading, error }
}

export default useCompanyData
