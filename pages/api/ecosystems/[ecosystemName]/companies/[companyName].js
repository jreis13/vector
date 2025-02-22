const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
const AIRTABLE_COMPANIES_BASE_ID = process.env.AIRTABLE_COMPANIES_BASE_ID
const AIRTABLE_COMPANIES_TABLE = process.env.AIRTABLE_COMPANIES_TABLE

async function fetchCompany(companyName) {
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_COMPANIES_BASE_ID}/${AIRTABLE_COMPANIES_TABLE}?filterByFormula=LOWER({Company Name})="${companyName.toLowerCase()}"`

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
    })

    const data = await response.json()

    if (!response.ok || !data.records.length) {
      console.warn("⚠️ No matching company found")
      return null
    }

    return data.records[0].fields
  } catch (error) {
    console.error("❌ Error fetching company:", error.message)
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  const { companyName } = req.query

  if (!companyName) {
    return res.status(400).json({ error: "Company name is required" })
  }

  try {
    const decodedCompanyName = decodeURIComponent(companyName)

    const companyData = await fetchCompany(decodedCompanyName)
    if (!companyData) {
      return res.status(404).json({ error: "Company not found" })
    }

    return res.status(200).json(companyData)
  } catch (error) {
    console.error("❌ Error fetching company:", error.message)
    return res
      .status(500)
      .json({ error: "Failed to fetch company from Airtable" })
  }
}
