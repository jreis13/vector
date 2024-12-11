const axios = require("axios")

let cachedToken = null
let tokenExpiry = null

async function getManagementToken() {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken
  }

  const response = await axios.post(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
    client_id: process.env.M2M_CLIENT_ID,
    client_secret: process.env.M2M_CLIENT_SECRET,
    audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE,
    grant_type: "client_credentials",
  })

  cachedToken = response.data.access_token
  tokenExpiry = Date.now() + response.data.expires_in * 1000

  return cachedToken
}

module.exports = { getManagementToken }
