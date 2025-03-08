import AWS from "aws-sdk"

const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
const AIRTABLE_COMPANIES_BASE_ID = process.env.AIRTABLE_COMPANIES_BASE_ID
const AIRTABLE_COMPANIES_TABLE = process.env.AIRTABLE_COMPANIES_TABLE
const AIRTABLE_FINANCIALS_TABLE = process.env.AIRTABLE_FINANCIALS_TABLE
const AIRTABLE_CUSTOMERS_TABLE = process.env.AIRTABLE_CUSTOMERS_TABLE

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const S3_ECOSYSTEMS_KEY = process.env.S3_ECOSYSTEMS_KEY

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

      if (typeof financialData === "string") {
        try {
          financialData = JSON.parse(financialData)
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

async function fetchCustomerGrowth(companyName) {
  if (!companyName) return []

  const url = `https://api.airtable.com/v0/${AIRTABLE_COMPANIES_BASE_ID}/${AIRTABLE_CUSTOMERS_TABLE}?filterByFormula=LOWER({Companies})="${companyName.toLowerCase()}"`

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
    })

    const data = await response.json()

    if (!response.ok || !data.records.length) {
      console.warn("⚠️ No Customer Growth Data Found for:", companyName)
      return []
    }

    const formattedData = data.records.map((record) => ({
      company: record.fields["Company Name (from Company)"] || "Unknown",
      model: record.fields["Aircraft Model"] || "N/A",
      type: record.fields["Type"] || "N/A",
      numberOfOrders: record.fields["Number of Orders"] || "N/A",
      buyer: record.fields.Buyer || "N/A",
      orderDate: record.fields["Order Date"] || "N/A",
    }))

    return formattedData
  } catch (error) {
    console.error("❌ Error fetching Customer Growth:", error.message)
    return []
  }
}

async function fetchProducts(companyName) {
  try {
    if (!companyName) {
      console.warn("⚠️ companyName is undefined!")
      return []
    }

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: S3_ECOSYSTEMS_KEY,
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    })

    const data = await s3.getObject(params).promise()
    const ecosystems = JSON.parse(data.Body.toString("utf-8"))

    if (!Array.isArray(ecosystems)) {
      console.error("❌ 'ecosystems' is not an array or missing.")
      return []
    }

    for (const ecosystem of ecosystems) {
      if (!Array.isArray(ecosystem.companies)) continue

      const company = ecosystem.companies.find(
        (c) => c.name?.toLowerCase() === companyName.toLowerCase()
      )

      if (company) {
        return company.products?.data || []
      }
    }

    console.warn(`⚠️ No company found for '${companyName}' in any ecosystem.`)
    return []
  } catch (error) {
    console.error("❌ Error fetching products from S3:", error.message)
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
      console.warn("⚠️ No matching company found in Airtable!")
      return null
    }

    let company = data.records[0].fields
    company.id = data.records[0].id

    if (company.Financials && Array.isArray(company.Financials)) {
      company.Financials = await fetchFinancials(company.Financials)
    }

    company.CustomerGrowth = await fetchCustomerGrowth(company["Company Name"])
    company.Products = await fetchProducts(company["Company Name"])

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
