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
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

      await Promise.all(
        lineItems.data.map(async (item) => {
          const email = item.metadata.email

          if (email) {
            const userId = await getAuth0UserIdByEmail(email)
            await updateUserMetadata(userId, { subscribed: true })
          }
        })
      )
    } catch (error) {
      return res.status(500).send("Failed to update user metadata.")
    }
  }

  res.status(200).json({ received: true })
}

async function getAuth0UserIdByEmail(email) {
  const token = await getManagementToken()

  const response = await fetch(
    `${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}users-by-email?email=${email}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  const users = await response.json()
  if (users.length === 0) {
    throw new Error(`No user found for email: ${email}`)
  }

  return users[0].user_id
}

async function updateUserMetadata(userId, metadata) {
  const token = await getManagementToken()

  await fetch(`${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}users/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ app_metadata: metadata }),
  })
}

async function getManagementToken() {
  const response = await fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.M2M_CLIENT_ID,
      client_secret: process.env.M2M_CLIENT_SECRET,
      audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE,
      grant_type: "client_credentials",
    }),
  })

  const data = await response.json()
  return data.access_token
}
