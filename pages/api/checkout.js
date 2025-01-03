import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { subscriptions } = req.body

    try {
      const lineItems = subscriptions.map((subscription) => ({
        price: "price_1QUdY7H8mb7EVuIwB4Y5Q87V",
        quantity: subscription.quantity,
      }))

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

      res.status(200).json({ url: session.url })
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to create Stripe Checkout session" })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
