import AWS from "aws-sdk"
import cors from "cors"

const corsMiddleware = cors({
  methods: ["GET", "HEAD"],
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const BUCKET_NAME = process.env.S3_BUCKET_NAME
const ECOSYSTEMS_KEY = process.env.S3_ECOSYSTEMS_KEY

function normalizeName(name) {
  return name.replace(/\s+/g, "").toLowerCase();
}

export default async function handler(req, res) {
  await runMiddleware(req, res, corsMiddleware)

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: ECOSYSTEMS_KEY,
    }

    const data = await s3.getObject(params).promise()
    const ecosystems = JSON.parse(data.Body.toString("utf-8"))

    const { ecosystemName, companyName } = req.query

    if (!ecosystemName || !companyName) {
      return res
        .status(400)
        .json({ error: "Ecosystem name and company name are required" })
    }

    const normalizedEcosystemName = normalizeName(
      decodeURIComponent(ecosystemName)
    )
    const normalizedCompanyName = normalizeName(decodeURIComponent(companyName))

    const ecosystem = ecosystems.find(
      (e) => normalizeName(e.name) === normalizedEcosystemName
    )

    if (!ecosystem) {
      return res.status(404).json({ error: "Ecosystem not found" })
    }

    const company = ecosystem.companies.find(
      (c) => normalizeName(c.name) === normalizedCompanyName
    )

    if (!company) {
      return res.status(404).json({ error: "Company not found" })
    }

    return res.status(200).json(company)
  } catch (error) {
    console.error("Error fetching company data:", error.message)
    return res.status(500).json({ error: "Failed to fetch company data" })
  }
}
