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
      const metadata = {
        emails: subscriptions.map((sub) => sub.email).join(","),
        firstNames: subscriptions.map((sub) => sub.firstName).join(","),
        lastNames: subscriptions.map((sub) => sub.lastName).join(","),
        companyNames: subscriptions.map((sub) => sub.companyName).join(","),
        personas: subscriptions.map((sub) => sub.persona).join(","),
        roles: subscriptions.map((sub) => sub.role).join(","),
        ecosystems: subscriptions.flatMap((sub) => sub.ecosystems).join(","),
      }

      const lineItems = subscriptions.flatMap((sub) =>
        sub.ecosystems.map((ecosystemId) => ({
          price: `price_for_${ecosystemId}`,
          quantity: 1,
        }))
      )

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: lineItems,
        metadata,
        success_url: `${process.env.AUTH0_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.AUTH0_BASE_URL}/cancel`,
      })

      return res.status(200).json({ url: session.url })
    } catch (err) {
      console.error("Stripe session creation failed:", err)
      return res
        .status(500)
        .json({ error: "Failed to create Stripe Checkout session." })
    }
  } else {
    res.setHeader("Allow", "POST")
    return res.status(405).end("Method Not Allowed")
  }
}
