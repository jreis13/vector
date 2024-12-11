import axios from "axios"

async function getManagementToken() {
  const response = await axios.post(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
    client_id: process.env.M2M_CLIENT_ID,
    client_secret: process.env.M2M_CLIENT_SECRET,
    audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE,
    grant_type: "client_credentials",
  })

  return response.data.access_token
}

export async function updateUserMetadata(userId, metadata) {
  const token = await getManagementToken()

  const response = await axios.patch(
    `${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}users/${userId}`,
    { app_metadata: metadata },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}
