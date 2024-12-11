import axios from "axios"

export async function updateUserMetadata(userId, metadata) {
  const token = await getManagementToken()

  console.log(`Updating metadata for user ${userId}`)
  console.log(`Metadata payload:`, { app_metadata: metadata })

  try {
    const response = await axios.patch(
      `${process.env.AUTH0_MANAGEMENT_API_AUDIENCE}users/${userId}`,
      { app_metadata: metadata },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    console.log(`Update response:`, response.data)
    return response.data
  } catch (error) {
    console.error(
      `Error updating metadata for user ${userId}:`,
      error.response?.data || error.message
    )
    throw error
  }
}
