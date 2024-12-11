import axios from "axios"
import { getManagementToken } from "./getManagementToken"

export async function createAuth0User(email) {
  const token = await getManagementToken()

  try {
    const response = await axios.post(
      `${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}users`,
      {
        email,
        connection: "email",
        app_metadata: { subscribed: true },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    console.log(`User created successfully with metadata:`, response.data)
    return response.data
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error.message)
    throw new Error("Failed to create Auth0 user.")
  }
}

export async function getAuth0UserIdByEmail(email) {
  const token = await getManagementToken()

  const response = await axios.get(
    `${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}users-by-email`,
    {
      params: { email },
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  if (response.data.length === 0) {
    throw new Error(`No user found for email: ${email}`)
  }

  return response.data[0].user_id
}
