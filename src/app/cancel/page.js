import "../../common/styles/_reset.css"

import SubscriptionLayout from "src/layouts/SubscriptionLayout"
import CancelContent from "src/components/Subscription/CancelContent"

export default function CancelPage() {
  return (
    <SubscriptionLayout>
      <CancelContent />
    </SubscriptionLayout>
  )
}
