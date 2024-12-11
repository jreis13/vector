import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  const rawBody = await new Promise((resolve, reject) => {
    let data = ""
    req.on("data", (chunk) => (data += chunk))
    req.on("end", () => resolve(Buffer.from(data)))
    req.on("error", (err) => reject(err))
  })

  const sig = req.headers["stripe-signature"]

  let event
  try {
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
    console.log("Session completed:", session)
  }

  res.status(200).json({ received: true })
}
