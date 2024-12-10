import { useRouter } from "next/router"

export default function SubscribePage() {
  const router = useRouter()
  const { email } = router.query

  const handleSubscribe = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const { url } = await response.json()
    window.location.href = url
  }

  return (
    <div>
      <h1>Subscribe to Exponential Vector</h1>
      <p>Complete your subscription to access the platform.</p>
      <input type="email" value={email} readOnly />
      <button onClick={handleSubscribe}>Subscribe Now</button>
    </div>
  )
}
