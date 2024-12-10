import Stripe from "stripe"
import { createAuth0User } from "../../../lib/auth0Api"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const email = session.customer_email

    try {
      await createAuth0User(email)
    } catch (err) {
      res.status(500).send(`Auth0 Error: ${err.message}`)
      return
    }
  }

  res.status(200).json({ received: true })
}
