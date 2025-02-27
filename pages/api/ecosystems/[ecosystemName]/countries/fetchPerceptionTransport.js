import AWS from "aws-sdk"

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const S3_ECOSYSTEMS_KEY = process.env.S3_ECOSYSTEMS_KEY

export async function fetchPerceptionOfPublicTransport(countryName) {
  try {
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

    if (!countryName) {
      console.warn("⚠️ countryName is undefined!")
      return null
    }

    const countryReports = ecosystems
      .map((e) => e.countryReports)
      .find((reports) => reports?.[countryName])

    if (!countryReports) {
      console.warn(`⚠️ No country reports found for '${countryName}'.`)
      return null
    }

    const perceptionReport = countryReports[countryName]?.find(
      (report) =>
        report.details && report.details["Perception of Public Transport"]
    )

    return perceptionReport
      ? perceptionReport.details["Perception of Public Transport"]
      : null
  } catch (error) {
    console.error(
      "❌ Error fetching Perception of Public Transport from S3:",
      error.message
    )
    return null
  }
}
