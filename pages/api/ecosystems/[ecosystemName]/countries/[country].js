const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN
const AIRTABLE_COUNTRIES_BASE_ID = process.env.AIRTABLE_COUNTRIES_BASE_ID
const AIRTABLE_COUNTRIES_TABLE = process.env.AIRTABLE_COUNTRIES_TABLE
const AIRTABLE_SUBCATEGORIES_TABLE = process.env.AIRTABLE_SUBCATEGORIES_TABLE
const AIRTABLE_METRICS_TABLE = process.env.AIRTABLE_METRICS_TABLE
const AIRTABLE_METRIC_VALUES_TABLE = process.env.AIRTABLE_METRIC_VALUES_TABLE
const AIRTABLE_CITIES_TABLE = process.env.AIRTABLE_CITIES_TABLE
const AIRTABLE_PUBLIC_TRANSPORT_TABLE =
  process.env.AIRTABLE_PUBLIC_TRANSPORT_TABLE

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
    console.log(
      `🔍 Fetching country profile for: ${country} in ecosystem: ${ecosystemName}`
    )

    const countryResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_COUNTRIES_TABLE}?filterByFormula={Country Name}="${decodeURIComponent(
        country
      )}"`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
      }
    )

    const { records: countryRecords } = await countryResponse.json()
    console.log(
      "✅ Country records fetched:",
      JSON.stringify(countryRecords, null, 2)
    )

    if (!countryRecords || countryRecords.length === 0) {
      console.warn("⚠️ No country profile found for:", country)
      return res.status(404).json({ error: "Country profile not found" })
    }

    const countryRecord = countryRecords[0].fields

    const subcategoriesResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_SUBCATEGORIES_TABLE}?filterByFormula=FIND("${countryRecord["Country Name"]}", {Country (Linked)})`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
      }
    )

    const { records: subcategories } = await subcategoriesResponse.json()
    console.log(
      "✅ Subcategories fetched:",
      JSON.stringify(subcategories, null, 2)
    )

    const metricIds = subcategories.flatMap(
      (sub) => sub.fields["Metrics (Linked)"] || []
    )
    const metricsQuery = metricIds.map((id) => `RECORD_ID()='${id}'`).join(",")

    if (!metricsQuery) {
      console.warn("⚠️ No metrics linked to subcategories.")
    }

    const metricsResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_METRICS_TABLE}?filterByFormula=OR(${metricsQuery})`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
      }
    )

    const { records: metrics } = await metricsResponse.json()
    console.log("✅ Metrics fetched:", JSON.stringify(metrics, null, 2))

    const metricValuesQuery = metrics
      .map((metric) => `RECORD_ID()='${metric.id}'`)
      .join(",")
    const metricValuesResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_METRIC_VALUES_TABLE}?filterByFormula=OR(${metricValuesQuery})`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
      }
    )

    const { records: metricValues } = await metricValuesResponse.json()
    console.log(
      "✅ Metric Values fetched:",
      JSON.stringify(metricValues, null, 2)
    )

    const citiesResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_CITIES_TABLE}?filterByFormula=FIND("${countryRecord["Country Name"]}", {Country})`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
      }
    )

    const { records: cities } = await citiesResponse.json()
    console.log("✅ Cities fetched:", JSON.stringify(cities, null, 2))

    const publicTransportResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_COUNTRIES_BASE_ID}/${AIRTABLE_PUBLIC_TRANSPORT_TABLE}?filterByFormula=FIND("${countryRecord["Country Name"]}", {Country Name (from Cities)})`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}` },
      }
    )

    const { records: publicTransport } = await publicTransportResponse.json()
    console.log(
      "✅ Public Transport fetched:",
      JSON.stringify(publicTransport, null, 2)
    )

    const formattedCountryData = {
      id: countryRecords[0].id,
      countryName: countryRecord["Country Name"],
      region: countryRecord["Region"],
      subcategories: subcategories.map((sub) => ({
        name: sub.fields["Subcategory Name"],
        metrics: (sub.fields["Metrics (Linked)"] || [])
          .map((metricId) => {
            const metric = metrics.find((m) => m.id === metricId)
            if (!metric) return null

            const values = metricValues.filter(
              (mv) => mv.fields["Metrics Linked"] === metricId
            )
            return {
              name: metric.fields["Metric Name"],
              type: metric.fields["Type"],
              values: values.map((mv) => ({
                value: mv.fields["Value"],
                unit: mv.fields["Unit"] || "",
                outcome: mv.fields["Outcome Name"] || "",
                notes: mv.fields["Notes"] || "",
              })),
            }
          })
          .filter(Boolean),
      })),
      cities: cities.map((city) => city.fields["Cities"]),
      publicTransport: publicTransport.map((transport) => ({
        city: transport.fields["City"],
        surveyQuestion: transport.fields["Survey Question"],
        metricName: transport.fields["Metric Name (from Survey)"],
        answerOption: transport.fields["Answer Option"],
        percentage: transport.fields["Percentage"],
        year: transport.fields["Year"],
      })),
    }

    console.log(
      "🚀 Final Country Data:",
      JSON.stringify(formattedCountryData, null, 2)
    )

    return res.status(200).json(formattedCountryData)
  } catch (error) {
    console.error("❌ Error fetching country reports:", error.message)
    return res
      .status(500)
      .json({ error: "Failed to fetch country reports from Airtable" })
  }
}
