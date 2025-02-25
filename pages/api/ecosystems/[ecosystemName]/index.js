import AWS from "aws-sdk"

const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
const AIRTABLE_ECOSYSTEMS_BASE_ID = process.env.AIRTABLE_ECOSYSTEMS_BASE_ID
const AIRTABLE_COMPANIES_BASE_ID = process.env.AIRTABLE_COMPANIES_BASE_ID
const AIRTABLE_ACTIVE_INVESTORS_BASE_ID =
  process.env.AIRTABLE_ACTIVE_INVESTORS_BASE_ID
const AIRTABLE_COUNTRIES_BASE_ID = process.env.AIRTABLE_COUNTRIES_BASE_ID

const AIRTABLE_COUNTRIES_TABLE = process.env.AIRTABLE_COUNTRIES_TABLE
const AIRTABLE_METRIC_VALUES_TABLE = process.env.AIRTABLE_METRIC_VALUES_TABLE

const AIRTABLE_COMPANIES_TABLE = process.env.AIRTABLE_COMPANIES_TABLE
const AIRTABLE_ACTIVE_INVESTORS_TABLE =
  process.env.AIRTABLE_ACTIVE_INVESTORS_TABLE
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

    let url = `https://api.airtable.com/v0/${baseId}/${table}?filterByFormula={Ecosystem ID}="${ecosystemId}"`

    if (table === AIRTABLE_COMPANIES_TABLE) {
      url += `&sort[0][field]=Company ID&sort[0][direction]=asc`
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

    const airtableCompanies = await fetchFromAirtable(
      AIRTABLE_COMPANIES_TABLE,
      AIRTABLE_COMPANIES_BASE_ID,
      ecosystemId
    )

    const keyInvestors = await fetchFromAirtable(
      AIRTABLE_KEY_INVESTORS_TABLE,
      AIRTABLE_ACTIVE_INVESTORS_BASE_ID,
      ecosystemId
    )

    const activeInvestors = await fetchFromAirtable(
      AIRTABLE_ACTIVE_INVESTORS_TABLE,
      AIRTABLE_ACTIVE_INVESTORS_BASE_ID,
      ecosystemId
    )

    const countryProfiles = await fetchFromAirtable(
      AIRTABLE_COUNTRIES_TABLE,
      AIRTABLE_COUNTRIES_BASE_ID,
      ecosystemId
    )

    const metricValues = await fetchFromAirtable(
      AIRTABLE_METRIC_VALUES_TABLE,
      AIRTABLE_COUNTRIES_BASE_ID,
      ecosystemId
    )

    const formattedAirtableCompanies = airtableCompanies.map((company) => ({
      id: company["Company ID"] || "Unknown",
      name: company["Company Name"] || "Unknown",
      summary: company["Company Summary"] || "No summary available",
      logo: company["Logo"]
        ? Array.isArray(company["Logo"])
          ? company["Logo"][0].url
          : company["Logo"]
        : "/placeholder.png",
      type: company["Type"] || "N/A",
      industry: company["Industry"] || "N/A",
      fundingStage: company["Funding Round (from Funding Stage)"] || "N/A",
      keyInvestors: company["Key Investors"] || [],
    }))

    const formattedKeyInvestors = keyInvestors.map((investor) => ({
      name: investor["Name"] || "Unknown",
      logo: investor["Logo"] || "/placeholder.png",
      description: investor["Description"] || "No description available",
      type: investor["Type"] || "N/A",
      stages: investor["Stages"] || "N/A",
      link: investor["Link"] || "#",
    }))

    const formattedActiveInvestors = activeInvestors.map((investor) => ({
      company: investor["Company"] || "Unknown",
      name: investor["Name"] || "Unknown",
      fundingRound: investor["Funding Round"] || "N/A",
      leadInvestor: investor["Lead Investor"] || "N/A",
      amount: investor["Text Amount"] || "N/A",
      date: investor["Date"] || "N/A",
      comments: investor["Comments"] || "N/A",
    }))

    const companiesWithProducts = ecosystemData.companies || []

    const products = companiesWithProducts.flatMap(
      (company) => company.products?.data || []
    )

    const formattedCountryProfiles = countryProfiles.map((profile) => ({
      countryName: profile["Country Name"] || "Unknown",
    }))

    const formattedMetricValues = metricValues
      .filter((metric) => metric["Value"])
      .map((metric) => ({
        metricName: metric["Metric Name (from Metrics Linked)"] || "Unknown",
        value: metric["Value"] || "N/A",
        unit: metric["Unit"] || "",
        country: metric["Country Name (from Label)"] || "Unknown",
        icon: metric["Icon (from Metrics Linked)"] || "questionIcon",
      }))

    const selectedMetrics = []
    const seenMetrics = new Set()

    while (selectedMetrics.length < 4 && formattedMetricValues.length > 0) {
      const metric =
        formattedMetricValues[
          Math.floor(Math.random() * formattedMetricValues.length)
        ]

      if (!seenMetrics.has(metric.metricName)) {
        seenMetrics.add(metric.metricName)
        selectedMetrics.push(metric)
      }
    }

    return res.status(200).json({
      ...ecosystemData,
      companies: companiesWithProducts,
      airtableCompanies: formattedAirtableCompanies,
      keyInvestors: formattedKeyInvestors,
      activeInvestors: formattedActiveInvestors,
      products,
      countryProfiles: formattedCountryProfiles,
      metricRankings: selectedMetrics,
    })
  } catch (error) {
    console.error("❌ Error fetching ecosystem:", error.message)
    return res.status(500).json({ error: "Failed to fetch ecosystem data" })
  }
}
