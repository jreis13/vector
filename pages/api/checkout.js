import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer_email: email,
        line_items: [
          {
            price: "price_1QUaDaH8mb7EVuIw4hSs0042",
            quantity: 1,
          },
        ],
        success_url: `${process.env.AUTH0_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.AUTH0_BASE_URL}/cancel`,
      })

      res.status(200).json({ url: session.url })
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({ error: "Failed to create Stripe Checkout session" })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
