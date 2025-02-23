const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
const AIRTABLE_COMPANIES_BASE_ID = process.env.AIRTABLE_COMPANIES_BASE_ID
const AIRTABLE_COMPANIES_TABLE = process.env.AIRTABLE_COMPANIES_TABLE
const AIRTABLE_FINANCIALS_TABLE = process.env.AIRTABLE_FINANCIALS_TABLE // Financials table

async function fetchFinancials(financialIds) {
  if (!financialIds || financialIds.length === 0) return []

  const recordsQuery = financialIds
    .map((id) => `RECORD_ID()='${id}'`)
    .join(", ")
  const url = `https://api.airtable.com/v0/${AIRTABLE_COMPANIES_BASE_ID}/${AIRTABLE_FINANCIALS_TABLE}?filterByFormula=OR(${recordsQuery})`

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
    })

    const data = await response.json()

    return data.records.map((record) => {
      let financialData = {
        metric: record.fields.Metric || "Unknown Metric",
        year: record.fields.Year || "N/A",
        value: record.fields.Value || "N/A",
        icon: record.fields.Icon || "questionIcon",
        textValue: record.fields.TextValue || "N/A",
      }

      // ✅ Ensure financialData is not a stringified JSON object
      if (typeof financialData === "string") {
        try {
          financialData = JSON.parse(financialData) // Attempt to parse if needed
        } catch (error) {
          console.error("❌ Error parsing financial data:", error)
        }
      }

      return financialData
    })
  } catch (error) {
    console.error("❌ Error fetching financials:", error.message)
    return []
  }
}

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

    let company = data.records[0].fields

    if (company.Financials && Array.isArray(company.Financials)) {
      company.Financials = await fetchFinancials(company.Financials)
    }

    return company
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
