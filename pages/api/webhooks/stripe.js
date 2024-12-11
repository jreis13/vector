import Stripe from "stripe"
import {
  updateUserMetadata,
  getAuth0UserIdByEmail,
} from "../../../lib/auth0Api"

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"]
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message)
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const email = session.customer_email

    console.log(`Processing Stripe webhook for email: ${email}`)

    try {
      const userId = await getAuth0UserIdByEmail(email)
      console.log(`Fetched user ID from Auth0: ${userId}`)

      const updateResponse = await updateUserMetadata(userId, {
        subscribed: true,
      })
      console.log(
        `User metadata updated successfully for ${userId}:`,
        updateResponse
      )

      res.status(200).json({ received: true })
    } catch (err) {
      console.error("Error updating user metadata:", err.message)

      res.status(500).send({
        error: "Auth0 Error",
        message: err.response?.data || err.message,
      })
      return
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`)
    res.status(400).json({ error: `Unhandled event type: ${event.type}` })
  }
}
