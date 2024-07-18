import { S3 } from "aws-sdk"
import Papa from "papaparse"

const s3 = new S3()

export const getCsvData = async (bucketName, key) => {
  try {
    const params = { Bucket: bucketName, Key: key }
    const data = await s3.getObject(params).promise()
    const csv = data.Body.toString("utf-8")

    return new Promise((resolve, reject) => {
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          const companies = aggregateCompanies(results.data)
          resolve(companies)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  } catch (error) {
    throw new Error("Error fetching or parsing CSV from S3: " + error.message)
  }
}

const aggregateCompanies = (data) => {
  return data
}
