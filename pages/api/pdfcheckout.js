import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

const ecosystemPriceMapping = {
  advancedairmobility: "price_1RFHJRH8mb7EVuIwaqP3I0I8",
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).end("Method Not Allowed")
  }

  const { subscriptions } = req.body

  if (
    !subscriptions ||
    !Array.isArray(subscriptions) ||
    subscriptions.length !== 1
  ) {
    return res.status(400).json({ error: "Invalid buyer payload." })
  }

  const buyer = subscriptions[0]

  try {
    const metadata = {
      email: buyer.email,
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      companyName: buyer.companyName,
      persona: buyer.persona,
      ecosystems: buyer.ecosystems.join(","),
    }

    const lineItems = buyer.ecosystems.map((ecosystemId) => {
      const priceId = ecosystemPriceMapping[ecosystemId]
      if (!priceId) {
        throw new Error(`No price ID found for ecosystem: ${ecosystemId}`)
      }
      return {
        price: priceId,
        quantity: 1,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      metadata,
      success_url: `${process.env.AUTH0_BASE_URL}/pdf-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.AUTH0_BASE_URL}/cancel`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error("Stripe PDF Checkout Error:", err)
    return res.status(500).json({ error: "Failed to create checkout session." })
  }
}
