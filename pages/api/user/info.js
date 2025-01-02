import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { email } = req.query

    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }

    try {
      const customers = await stripe.customers.list({
        email,
      })

      if (customers.data.length === 0) {
        return res.status(404).json({ error: "Customer not found" })
      }

      const customer = customers.data[0]

      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
      })

      const subscription =
        subscriptions.data.length > 0 ? subscriptions.data[0] : null

      res.status(200).json({
        customer: {
          name: customer.name,
          email: customer.email,
        },
        subscription: subscription
          ? {
              current_period_end: subscription.current_period_end,
              status: subscription.status,
              plan: subscription.items.data[0].price.nickname,
            }
          : null,
      })
    } catch (error) {
      console.error(
        "Error fetching user information from Stripe:",
        error.message
      )
      res.status(500).json({ error: "Failed to fetch user information" })
    }
  } else {
    res.setHeader("Allow", "GET")
    res.status(405).end("Method Not Allowed")
  }
}
