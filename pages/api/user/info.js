import { getSession } from "@auth0/nextjs-auth0"

export default async function handler(req, res) {
  const session = getSession(req, res)

  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" })
  }

  try {
    const email = req.query.email
    const userData = await fetchUserFromAuth0(email)

    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" })
  }
}

async function fetchUserFromAuth0(email) {
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

  const user = users[0]
  return {
    customer: {
      name: user.name || "N/A",
      email: user.email,
    },
    subscription: user.app_metadata?.subscribed
      ? {
          status: "active",
          current_period_end: user.app_metadata?.current_period_end || null,
        }
      : null,
    associatedEmails: user.app_metadata?.associatedEmails || [],
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
