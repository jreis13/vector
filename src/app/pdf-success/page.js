"use client"

import { useEffect, useState } from "react"

import SubscriptionLayout from "src/layouts/SubscriptionLayout"

export default function PdfSuccessPage() {
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const sessionId = query.get("session_id")
    if (!sessionId) {
      setError("Missing session ID")
      return
    }

    const getDownloadLink = async () => {
      try {
        const res = await fetch(`/api/get-pdf-download?session_id=${sessionId}`)
        if (!res.ok) {
          const { error } = await res.json()
          throw new Error(error || "Unable to verify payment.")
        }

        const { url } = await res.json()
        setDownloadUrl(url)
        window.location.href = url
      } catch (err) {
        setError(err.message)
      }
    }

    getDownloadLink()
  }, [])

  return (
    <SubscriptionLayout>
      <div className="p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Thanks for your purchase!
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        {downloadUrl && (
          <p>
            If your download didn’t start automatically,{" "}
            <a href={downloadUrl} className="text-blue-600 underline">
              click here
            </a>
          </p>
        )}
      </div>
    </SubscriptionLayout>
  )
}
