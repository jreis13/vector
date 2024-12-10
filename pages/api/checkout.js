import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price: "price_1QUaDaH8mb7EVuIw4hSs0042",
            quantity: 1,
          },
        ],
        success_url:
          "https://exponentialvector.eu/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://exponentialvector.eu/cancel",
      })

      res.status(200).json({ url: session.url })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
