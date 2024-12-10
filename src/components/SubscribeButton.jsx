export default function SubscribeButton({ email }) {
  const handleSubscribe = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const { url } = await response.json()
    window.location.href = url
  }

  return <button onClick={handleSubscribe}>Subscribe Now</button>
}
