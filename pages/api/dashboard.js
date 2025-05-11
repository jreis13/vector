import AWS from "aws-sdk"

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const S3_ECOSYSTEMS_KEY = process.env.S3_ECOSYSTEMS_KEY

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  try {
    const params = { Bucket: S3_BUCKET_NAME, Key: S3_ECOSYSTEMS_KEY }
    const data = await s3.getObject(params).promise()
    const ecosystems = JSON.parse(data.Body.toString("utf-8"))

    const ecosystem = ecosystems.find((e) => e.name === "Advanced Air Mobility")

    if (!ecosystem || !Array.isArray(ecosystem.dashboardInfo)) {
      return res.status(404).json({ error: "dashboardInfo not found" })
    }

    return res.status(200).json({ dashboardInfo: ecosystem.dashboardInfo })
  } catch (error) {
    console.error("❌ Error fetching dashboard info:", error.message)
    return res.status(500).json({ error: "Failed to load dashboard data" })
  }
}
