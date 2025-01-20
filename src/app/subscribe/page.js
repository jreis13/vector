import "src/common/styles/_reset.css"

import SubscribeContent from "src/components/Subscription/SubscribeContent"
import SubscriptionLayout from "src/layouts/SubscriptionLayout"

export default function SubscribePage() {
  return (
    <SubscriptionLayout>
      <SubscribeContent />
    </SubscriptionLayout>
  )
}
