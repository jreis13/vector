import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

const reportPriceMapping = {
  advancedairmobility_q1_2025: "price_1RFHJRH8mb7EVuIwaqP3I0I8",
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
    console.warn("⚠️ Invalid buyer payload:", subscriptions)
    return res.status(400).json({ error: "Invalid buyer payload." })
  }

  const buyer = subscriptions[0]
  const reportIds = buyer.reports

  try {
    const metadata = {
      email: buyer.email,
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      companyName: buyer.companyName,
      position: buyer.position,
      persona: buyer.persona,
      reports: reportIds.join(","),
      termsAgreed: "true",
    }

    console.log("📝 Stripe Metadata to send:", metadata)

    const existing = await stripe.customers.list({
      email: buyer.email,
      limit: 1,
    })

    let customer

    if (existing.data.length > 0) {
      customer = existing.data[0]
      console.log("👤 Existing customer found:", customer.id)
      await stripe.customers.update(customer.id, {
        name: `${buyer.firstName} ${buyer.lastName}`,
        metadata,
      })
    } else {
      customer = await stripe.customers.create({
        email: buyer.email,
        name: `${buyer.firstName} ${buyer.lastName}`,
        metadata,
      })
      console.log("🆕 Created new customer:", customer.id)
    }

    const lineItems = reportIds.map((reportId) => {
      const priceId = reportPriceMapping[reportId]
      if (!priceId) {
        throw new Error(`No price ID found for report: ${reportId}`)
      }
      return {
        price: priceId,
        quantity: 1,
      }
    })

    console.log("🧾 Line items:", lineItems)

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      metadata,
      success_url: `${process.env.AUTH0_BASE_URL}/report-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.AUTH0_BASE_URL}/cancel`,
    })

    console.log("✅ Stripe Checkout Session created:", session.id)

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error("❌ Stripe Report Checkout Error:", err)
    return res.status(500).json({ error: "Failed to create checkout session." })
  }
}
