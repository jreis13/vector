export default function SubscribeButton() {
  const handleSubscribe = async () => {
    const response = await fetch("/api/checkout", { method: "POST" })
    const { url } = await response.json()
    window.location.href = url
  }

  return <button onClick={handleSubscribe}>Subscribe Now</button>
}
