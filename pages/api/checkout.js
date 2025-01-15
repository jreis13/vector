import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

const ecosystemPriceMapping = {
  evtolandvtolaircrafts: "price_1QcxMjH8mb7EVuIwUchyBOKp",
}

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

      const priceQuantities = subscriptions.flatMap((sub) =>
        sub.ecosystems.map((ecosystemId) => {
          const priceId = ecosystemPriceMapping[ecosystemId]
          if (!priceId) {
            throw new Error(`No price ID found for ecosystem: ${ecosystemId}`)
          }
          return priceId
        })
      )

      const lineItems = Object.entries(
        priceQuantities.reduce((acc, priceId) => {
          acc[priceId] = (acc[priceId] || 0) + 1
          return acc
        }, {})
      ).map(([price, quantity]) => ({
        price,
        quantity,
      }))

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: lineItems,
        metadata,
        success_url: `${process.env.AUTH0_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.AUTH0_BASE_URL}/cancel`,
      })

      console.log("Stripe Session Created:", session.id)
      return res.status(200).json({ url: session.url })
    } catch (err) {
      console.error("Stripe Session Creation Error:", err)
      return res
        .status(500)
        .json({ error: "Failed to create Stripe Checkout session." })
    }
  } else {
    res.setHeader("Allow", "POST")
    return res.status(405).end("Method Not Allowed")
  }
}
