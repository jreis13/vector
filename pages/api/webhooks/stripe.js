import { buffer } from "micro"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed")
  }

  let event

  try {
    const rawBody = await buffer(req)
    const signature = req.headers["stripe-signature"]

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    console.log("✅ Stripe webhook verified:", event.type)
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    if (session.mode === "subscription" && session.metadata.emails) {
      const emails = session.metadata.emails.split(",")
      const firstNames = session.metadata.firstNames.split(",")
      const lastNames = session.metadata.lastNames.split(",")
      const companyNames = session.metadata.companyNames.split(",")
      const personas = session.metadata.personas.split(",")
      const roles = session.metadata.roles.split(",")
      const ecosystems = session.metadata.ecosystems.split(",")

      try {
        await Promise.all(
          emails.map(async (email, index) => {
            let userId
            try {
              userId = await getAuth0UserIdByEmail(email)
            } catch {
              userId = await createAuth0User(email)
            }

            const existingMetadata = await fetchUserMetadata(userId)

            const updatedSubscribedTo = [
              ...(existingMetadata.subscribedTo || []),
              ...ecosystems,
            ].filter((value, idx, self) => self.indexOf(value) === idx)

            const metadata = {
              ...existingMetadata,
              subscribed: true,
              subscribedTo: updatedSubscribedTo,
              firstName: firstNames[index],
              lastName: lastNames[index],
              companyName: companyNames[index],
              persona: personas[index],
              role: roles[index],
            }

            await updateUserMetadata(userId, metadata)
          })
        )
      } catch (error) {
        console.error(
          "Error updating user metadata (subscription):",
          error.message
        )
        return res.status(500).send("Failed to update user metadata.")
      }
    }

    if (
      session.mode === "payment" &&
      session.metadata.reports &&
      session.metadata.email
    ) {
      const email = session.metadata.email
      const reportIds = session.metadata.reports.split(",")

      console.log("📦 Handling report purchase")
      console.log("📧 Email:", email)
      console.log("🧾 Reports:", reportIds)

      try {
        let userId
        try {
          userId = await getAuth0UserIdByEmail(email)
          console.log("✅ Found existing Auth0 user:", userId)
        } catch {
          console.log("⚠️ User not found in Auth0, creating new one...")
          userId = await createAuth0User(email)
          console.log("✅ Created new user:", userId)
        }

        const existingMetadata = await fetchUserMetadata(userId)
        console.log("📂 Existing metadata:", existingMetadata)

        const updatedPurchasedReports = [
          ...(existingMetadata.purchasedReports || []),
          ...reportIds,
        ].filter((value, idx, self) => self.indexOf(value) === idx)

        const metadata = {
          ...existingMetadata,
          purchasedReports: updatedPurchasedReports,
        }

        await updateUserMetadata(userId, metadata)
        console.log(
          "✅ Updated user metadata with purchasedReports:",
          updatedPurchasedReports
        )
      } catch (error) {
        console.error(
          "Error updating user metadata (report purchase):",
          error.message
        )
        return res
          .status(500)
          .send("Failed to update report purchase metadata.")
      }
    }
  }

  res.status(200).json({ received: true })
}

async function fetchUserMetadata(userId) {
  const token = await getManagementToken()

  const response = await fetch(
    `${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}users/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch user metadata: ${response.statusText}`)
  }

  const user = await response.json()
  return user.app_metadata || {}
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
        app_metadata: {
          subscribed: false,
          subscribedTo: [],
          purchasedReports: [],
        },
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
