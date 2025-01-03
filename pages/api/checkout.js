import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { subscriptions } = req.body

    if (
      !subscriptions ||
      !Array.isArray(subscriptions) ||
      subscriptions.length === 0
    ) {
      return res.status(400).json({ error: "Invalid subscriptions payload." })
    }

    try {
      const lineItems = subscriptions.map((subscription) => ({
        price: "price_1QUdY7H8mb7EVuIwB4Y5Q87V", // Replace with your actual price ID
        quantity: 1,
      }))

      console.log("Line items:", lineItems)

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: lineItems,
        metadata: {
          emails: subscriptions.map((sub) => sub.email).join(","),
        },
        success_url: `${process.env.AUTH0_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.AUTH0_BASE_URL}/cancel`,
      })

      console.log("Checkout session created:", session.url)

      return res.status(200).json({ url: session.url })
    } catch (err) {
      console.error("Stripe session creation failed:", err.message)
      return res
        .status(500)
        .json({ error: "Failed to create Stripe Checkout session." })
    }
  } else {
    res.setHeader("Allow", "POST")
    return res.status(405).end("Method Not Allowed")
  }
}
