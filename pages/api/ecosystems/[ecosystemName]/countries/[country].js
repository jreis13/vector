const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
const AIRTABLE_COUNTRIES_BASE_ID = process.env.AIRTABLE_COUNTRIES_BASE_ID
const AIRTABLE_COUNTRIES_TABLE = process.env.AIRTABLE_COUNTRIES_TABLE

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  const { ecosystemName, country } = req.query
  if (!ecosystemName || !country) {
    return res
      .status(400)
      .json({ error: "Ecosystem name and country are required" })
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_COUNTRIES_TABLE}?filterByFormula=AND({ecosystem}="${decodeURIComponent(ecosystemName)}",{country}="${decodeURIComponent(country)}")`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
      }
    )

    if (!response.ok)
      throw new Error("Failed to fetch country reports from Airtable")

    const { records } = await response.json()
    if (records.length === 0)
      return res.status(404).json({ error: "Country reports not found" })

    return res.status(200).json({ id: records[0].id, ...records[0].fields })
  } catch (error) {
    console.error("Error fetching country reports:", error.message)
    return res
      .status(500)
      .json({ error: "Failed to fetch country reports from Airtable" })
  }
}
