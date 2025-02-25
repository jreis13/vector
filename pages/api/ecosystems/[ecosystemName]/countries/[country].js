const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
const AIRTABLE_COUNTRIES_BASE_ID = process.env.AIRTABLE_COUNTRIES_BASE_ID
const AIRTABLE_COUNTRIES_TABLE = process.env.AIRTABLE_COUNTRIES_TABLE
const AIRTABLE_SUBCATEGORIES_TABLE = process.env.AIRTABLE_SUBCATEGORIES_TABLE
const AIRTABLE_METRICS_TABLE = process.env.AIRTABLE_METRICS_TABLE
const AIRTABLE_METRIC_VALUES_TABLE = process.env.AIRTABLE_METRIC_VALUES_TABLE
const AIRTABLE_CITIES_TABLE = process.env.AIRTABLE_CITIES_TABLE

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

    const subcategoriesResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_SUBCATEGORIES_TABLE}?filterByFormula=FIND("${countryRecord["Country Name"]}", {Country Linked})`,
      { headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` } }
    )

    const { records: subcategories } = await subcategoriesResponse.json()

    const metricsResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_METRICS_TABLE}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` } }
    )

    const { records: metrics } = await metricsResponse.json()

    const metricValuesResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_METRIC_VALUES_TABLE}?filterByFormula=AND(
        FIND("${countryRecord["Country Name"]}", {Country Name (from Label)}),
        {Metrics Linked} != ""
      )`,
      { headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` } }
    )

    const { records: metricValues } = await metricValuesResponse.json()

    const citiesResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_CITIES_TABLE}?filterByFormula=FIND("${countryRecord["Country Name"]}", {Country})`,
      { headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` } }
    )

    const { records: cities } = await citiesResponse.json()

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
          ) // 👈 Ensure the metric belongs to this subcategory
          .map((metric) => {
            const values = metricValues
              .filter((mv) =>
                mv.fields["Metric Name (from Metrics Linked)"]?.includes(
                  metric.fields["Metric Name"]
                )
              )
              .map((mv) => ({
                value: mv.fields["Value"] || "N/A",
                unit: mv.fields["Unit"] || "",
              }))

            return {
              name: metric.fields["Metric Name"],
              type: metric.fields["Type"],
              values, // Attach value & unit properly
            }
          }),
      })),
      cities: cities.map((city) => city.fields["Cities"]),
    }

    return res.status(200).json(formattedCountryData)
  } catch (error) {
    console.error("❌ Error fetching country reports:", error.message)
    return res
      .status(500)
      .json({ error: "Failed to fetch country reports from Airtable" })
  }
}
