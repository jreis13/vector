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
