import Stripe from "stripe"
import { buffer } from "micro"
import {
  getAuth0UserIdByEmail,
  updateUserMetadata,
} from "../../../lib/auth0Api"

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  let event

  try {
    const rawBody = await buffer(req)
    const sig = req.headers["stripe-signature"]
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Process the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const email = session.customer_email
    const subscriptionId = session.subscription

    try {
      const userId = await getAuth0UserIdByEmail(email)
      await updateUserMetadata(userId, {
        subscribed: true,
        stripe_subscription_id: subscriptionId,
      })
      console.log(`Successfully updated metadata for user: ${userId}`)
    } catch (err) {
      console.error("Error updating user metadata:", err.message)
      return res.status(500).send(`Auth0 Error: ${err.message}`)
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`)
  }

  res.status(200).json({ received: true })
}
