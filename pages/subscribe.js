import { useRouter } from "next/router"
import SubscribeButton from "../src/components/SubscribeButton"

export default function SubscribePage() {
  const router = useRouter()
  const email = router.query.email || ""

  return (
    <div>
      <h1>Subscribe to Our Service</h1>
      <p>Enter your email to continue:</p>
      <input type="email" value={email} readOnly />
      <SubscribeButton email={email} />
    </div>
  )
}
