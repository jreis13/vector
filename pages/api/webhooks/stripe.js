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
    console.error("Webhook signature verification failed:", err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const emails = session.metadata.emails.split(",")

    try {
      await Promise.all(
        emails.map(async (email) => {
          let userId

          try {
            userId = await getAuth0UserIdByEmail(email)
          } catch (err) {
            userId = await createAuth0User(email)
          }

          await updateUserMetadata(userId, { subscribed: true })
        })
      )

      console.log("All users updated successfully")
    } catch (error) {
      console.error("Error updating user metadata:", error.message)
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

async function createAuth0User(email) {
  const token = await getManagementToken()

  const response = await fetch(
    `${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}users`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        connection: "email",
        email_verified: true,
        app_metadata: { subscribed: false },
        verify_email: true,
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to create user: ${response.statusText}`)
  }

  const user = await response.json()
  return user.user_id
}

async function updateUserMetadata(userId, metadata) {
  const token = await getManagementToken()

  const response = await fetch(
    `${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}users/${userId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ app_metadata: metadata }),
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to update metadata: ${response.statusText}`)
  }

  console.log("Metadata update response:", await response.json())
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
