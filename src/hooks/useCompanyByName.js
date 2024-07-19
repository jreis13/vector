import { useEffect, useState } from "react"

const useCompanyByName = (companyName) => {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCompany = async () => {
      if (!companyName) return

      try {
        const encodedName = encodeURIComponent(companyName)
        const response = await fetch(`/api/companies/${encodedName}`)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setCompany(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [companyName])

  return { company, loading, error }
}

export default useCompanyByName
