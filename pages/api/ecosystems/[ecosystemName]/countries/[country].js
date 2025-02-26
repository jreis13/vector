const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
const AIRTABLE_COUNTRIES_BASE_ID = process.env.AIRTABLE_COUNTRIES_BASE_ID
const AIRTABLE_COUNTRIES_TABLE = process.env.AIRTABLE_COUNTRIES_TABLE
const AIRTABLE_SUBCATEGORIES_TABLE = process.env.AIRTABLE_SUBCATEGORIES_TABLE
const AIRTABLE_METRICS_TABLE = process.env.AIRTABLE_METRICS_TABLE
const AIRTABLE_METRIC_VALUES_TABLE = process.env.AIRTABLE_METRIC_VALUES_TABLE

async function fetchSubcategories(countryName) {
  try {
    // Fetch all subcategories for the given country, sorted by RECORD_ID()
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_SUBCATEGORIES_TABLE}?filterByFormula=FIND("${countryName}", {Country Linked})&sort[0][field]=Subcategory ID&sort[0][direction]=asc`,
      { headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` } }
    )

    const { records: subcategories } = await response.json()
    return subcategories || []
  } catch (error) {
    console.error("❌ Error fetching subcategories:", error.message)
    return []
  }
}

async function fetchMetrics(subcategories) {
  try {
    if (!subcategories.length) return []

    // Get IDs of subcategories
    const subcategoryNames = subcategories.map(
      (sub) => `"${sub.fields["Subcategory Name"]}"`
    )

    const filterFormula = `OR(${subcategoryNames
      .map((name) => `{Subcategory Linked}=${name}`)
      .join(", ")})`

    // Fetch only metrics linked to these subcategories, sorted by "Metric ID"
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_METRICS_TABLE}?filterByFormula=${encodeURIComponent(
        filterFormula
      )}&sort[0][field]=Metric ID&sort[0][direction]=asc`,
      { headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` } }
    )

    const { records: metrics } = await response.json()
    return metrics || []
  } catch (error) {
    console.error("❌ Error fetching metrics:", error.message)
    return []
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  const { ecosystemName, country } = req.query

  if (!ecosystemName || !country || country === "undefined") {
    console.error("❌ Missing or Invalid Parameters:", {
      ecosystemName,
      country,
    })
    return res
      .status(400)
      .json({ error: "Valid ecosystem name and country are required" })
  }

  try {
    const decodedCountry = decodeURIComponent(country)

    // Fetch country record
    const countryResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_COUNTRIES_TABLE}?filterByFormula=LOWER({Country Name})=LOWER("${decodedCountry}")`,
      { headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` } }
    )

    const { records: countryRecords } = await countryResponse.json()
    if (!countryRecords.length) {
      console.error("❌ Country profile not found in Airtable.")
      return res.status(404).json({ error: "Country profile not found" })
    }

    const countryRecord = countryRecords[0].fields

    // Fetch & sort subcategories
    const subcategories = await fetchSubcategories(
      countryRecord["Country Name"]
    )

    // Fetch & sort metrics
    const metrics = await fetchMetrics(subcategories)

    // Fetch metric values (for the country only)
    const metricValuesResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_METRIC_VALUES_TABLE}?filterByFormula=AND(
        FIND("${countryRecord["Country Name"]}", {Country Name (from Label)}),
        {Metrics Linked} != ""
      )`,
      { headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` } }
    )

    const { records: metricValues } = await metricValuesResponse.json()

    // Include `Metric Name copy` and subtitle logic
    const formattedCountryData = {
      id: countryRecords[0]?.id || "Unknown",
      countryName: countryRecord?.["Country Name"] || "Unknown",
      region: countryRecord?.["Region"] || "Unknown",
      subcategories: subcategories.map((sub) => ({
        name: sub.fields["Subcategory Name"],
        metrics: metrics
          .filter((metric) =>
            metric.fields["Subcategory Linked"]?.includes(
              sub.fields["Subcategory Name"]
            )
          )
          .map((metric) => {
            const values = metricValues
              .filter((mv) =>
                mv.fields["Metric Name (from Metrics Linked)"]?.includes(
                  metric.fields["Metric Name"]
                )
              )
              .map((mv) => ({
                value: mv.fields["Value"] || "",
                unit: mv.fields["Unit"] || "",
                notes: mv.fields["Notes"] || "",
                subtitle:
                  mv.fields["Metrics copy"] &&
                  mv.fields["Metrics copy"] !==
                    mv.fields["Metric Name (from Metrics Linked)"]
                    ? mv.fields["Metrics copy"]
                    : "",
              }))

            return {
              id: metric.id,
              name: metric.fields["Metric Name"],
              filterName: metric.fields["Metric Name copy"],
              type: metric.fields["Type"],
              icon: metric.fields["Icon"],
              values,
            }
          })
          .filter(
            (metric) =>
              metric.filterName !== "Perception of Public Transport" ||
              metric.filterName === metric.name
          ),
      })),
    }

    return res.status(200).json(formattedCountryData)
  } catch (error) {
    console.error("❌ Error fetching country reports:", error.message)
    return res
      .status(500)
      .json({ error: "Failed to fetch country reports from Airtable" })
  }
}
