import AWS from "aws-sdk"

const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
const AIRTABLE_ECOSYSTEMS_BASE_ID = process.env.AIRTABLE_ECOSYSTEMS_BASE_ID
const AIRTABLE_COMPANIES_BASE_ID = process.env.AIRTABLE_COMPANIES_BASE_ID
const AIRTABLE_COUNTRIES_BASE_ID = process.env.AIRTABLE_COUNTRIES_BASE_ID
const AIRTABLE_ACTIVE_INVESTORS_BASE_ID =
  process.env.AIRTABLE_ACTIVE_INVESTORS_BASE_ID
const AIRTABLE_KEY_INVESTORS_BASE_ID =
  process.env.AIRTABLE_KEY_INVESTORS_BASE_ID

const AIRTABLE_COMPANIES_TABLE = process.env.AIRTABLE_COMPANIES_TABLE
const AIRTABLE_ACTIVE_INVESTORS_TABLE =
  process.env.AIRTABLE_ACTIVE_INVESTORS_TABLE
const AIRTABLE_COUNTRY_PROFILES_TABLE =
  process.env.AIRTABLE_COUNTRY_PROFILES_TABLE
const AIRTABLE_KEY_INVESTORS_TABLE = process.env.AIRTABLE_KEY_INVESTORS_TABLE

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const S3_ECOSYSTEMS_KEY = process.env.S3_ECOSYSTEMS_KEY

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

async function fetchFromAirtable(table, baseId, ecosystemId) {
  try {
    if (!baseId) throw new Error(`Base ID missing for table: ${table}`)
    if (!table) throw new Error(`Table name missing for base: ${baseId}`)

    let filterFormula = `{Ecosystem ID}="${ecosystemId}"`

    if (table === AIRTABLE_ACTIVE_INVESTORS_TABLE) {
      filterFormula = `SEARCH("${ecosystemId}", {Ecosystem ID})`
    }

    let url = `https://api.airtable.com/v0/${baseId}/${table}?filterByFormula=${encodeURIComponent(filterFormula)}`

    if (table === AIRTABLE_COMPANIES_TABLE) {
      url += `&sort[0][field]=Company ID&sort[0][direction]=asc`
    }

    if (table === AIRTABLE_ACTIVE_INVESTORS_TABLE) {
      url += `&sort[0][field]=Date&sort[0][direction]=desc`
    }

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
    })

    const errorText = await response.text()

    if (!response.ok) {
      throw new Error(
        `Failed to fetch from Airtable (${table}): ${response.statusText} - ${errorText}`
      )
    }

    const { records } = JSON.parse(errorText)
    return records.length > 0 ? records.map((r) => r.fields) : []
  } catch (error) {
    console.error(`❌ Error fetching ${table} from Airtable:`, error.message)
    return []
  }
}

async function fetchFromS3() {
  try {
    const params = { Bucket: S3_BUCKET_NAME, Key: S3_ECOSYSTEMS_KEY }
    const data = await s3.getObject(params).promise()

    return JSON.parse(data.Body.toString("utf-8"))
  } catch (error) {
    console.error("❌ Error fetching from S3:", error.message)
    return []
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  const { ecosystemName } = req.query
  if (!ecosystemName) {
    return res.status(400).json({ error: "Ecosystem name is required" })
  }

  const normalizedEcosystemName = decodeURIComponent(ecosystemName)
    .trim()
    .toLowerCase()

  try {
    const s3Data = await fetchFromS3()

    const ecosystemData = s3Data.find(
      (e) =>
        e.name &&
        e.name.trim().replace(/\s+/g, "").toLowerCase() ===
          normalizedEcosystemName
    )

    if (!ecosystemData) {
      return res.status(404).json({ error: "Ecosystem not found in S3" })
    }

    const ecosystemId = ecosystemData.id.toString()

    const [companies, countryProfiles, activeInvestors, keyInvestors] =
      await Promise.all([
        fetchFromAirtable(
          AIRTABLE_COMPANIES_TABLE,
          AIRTABLE_COMPANIES_BASE_ID,
          ecosystemId
        ),
        fetchFromAirtable(
          AIRTABLE_COUNTRY_PROFILES_TABLE,
          AIRTABLE_COUNTRIES_BASE_ID,
          ecosystemId
        ),
        fetchFromAirtable(
          AIRTABLE_ACTIVE_INVESTORS_TABLE,
          AIRTABLE_ACTIVE_INVESTORS_BASE_ID,
          ecosystemId
        ),
        fetchFromAirtable(
          AIRTABLE_KEY_INVESTORS_TABLE,
          AIRTABLE_KEY_INVESTORS_BASE_ID,
          ecosystemId
        ),
      ])

    const formattedCompanies = companies.map((company) => ({
      id: company["Company ID"] || "Unknown",
      name: company["Company Name"] || "Unknown",
      summary: company["Company Summary"] || "No summary available",
      logo: company["Logo"]
        ? Array.isArray(company["Logo"])
          ? company["Logo"][0].url
          : company["Logo"]
        : "/placeholder.png",
      industry: company["Industry"] || "Not specified",
      fundingAmount: company["Funding Amount"] || "Not available",
      fundingStage: company["Funding Stage"] || "Not specified",
      keyInvestors: company["Key Investors"] || [],
    }))

    const formattedActiveInvestors = activeInvestors.map((investor) => ({
      companyName: investor["Company"] || "Unknown",
      name: investor["Name"] || "Unknown",
      fundingRound: investor["Funding Round"] || "Not specified",
      leadInvestor: investor["Lead Investor"] || "N/A",
      amount: investor["Text Amount"] || "N/A",
      date: investor["Date"] || "N/A",
      comments: investor["Comments"] || "N/A",
    }))

    const formattedKeyInvestors = keyInvestors.map((investor) => ({
      name: investor["Name"] || "Unknown",
      logo: investor["Logo"] || "/placeholder.png",
      description: investor["Description"] || "No description available",
      type: investor["Type"] || "N/A",
      stages: investor["Stages"] || "N/A",
      link: investor["Link"] || "#",
    }))

    return res.status(200).json({
      ...ecosystemData,
      companies: formattedCompanies,
      countryProfiles,
      activeInvestors: formattedActiveInvestors,
      keyInvestors: formattedKeyInvestors,
    })
  } catch (error) {
    console.error("❌ Error fetching ecosystem:", error.message)
    return res.status(500).json({ error: "Failed to fetch ecosystem data" })
  }
}
