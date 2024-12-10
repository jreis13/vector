import axios from "axios"
import { getManagementToken } from "./getManagementToken"

export async function createAuth0User(email) {
  const token = await getManagementToken()

  const response = await axios.post(
    `${process.env.AUTH0_DOMAIN}/api/v2/users`,
    {
      email,
      connection: "email",
      app_metadata: { subscribed: true },
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return response.data
}
