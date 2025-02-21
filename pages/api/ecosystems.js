const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
const AIRTABLE_ECOSYSTEMS_BASE_ID = process.env.AIRTABLE_ECOSYSTEMS_BASE_ID
const AIRTABLE_ECOSYSTEMS_TABLE = process.env.AIRTABLE_ECOSYSTEMS_TABLE

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_ECOSYSTEMS_BASE_ID}/${AIRTABLE_ECOSYSTEMS_TABLE}`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
      }
    )

    if (!response.ok)
      throw new Error("Failed to fetch ecosystems from Airtable")

    const { records } = await response.json()
    const ecosystems = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }))

    return res.status(200).json(ecosystems)
  } catch (error) {
    console.error("Error fetching ecosystems:", error.message)
    return res
      .status(500)
      .json({ error: "Failed to fetch ecosystems from Airtable" })
  }
}
