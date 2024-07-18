import AWS from "aws-sdk";
import Papa from "papaparse";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const KEY = process.env.S3_KEY;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { name } = req.query;

    try {
      console.log("Company name from query:", name);

      const params = {
        Bucket: BUCKET_NAME,
        Key: KEY,
      };
      const s3Object = await s3.getObject(params).promise();
      const csv = s3Object.Body.toString("utf-8");

      const result = await new Promise((resolve, reject) => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            console.log("Parsed CSV results:", results.data);

            const foundCompany = results.data.find((company) => {
              console.log("Company name in loop:", company.name);
              if (!company.name) return false;
              return (
                company.name.replace(/\s+/g, "").toLowerCase() ===
                name.replace(/\s+/g, "").toLowerCase()
              );
            });
            resolve(foundCompany);
          },
          error: (error) => {
            reject(error);
          },
        });
      });

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "Company not found" });
      }
    } catch (error) {
      console.error("Error fetching data from S3:", error);
      res.status(500).json({ error: "Failed to fetch data from S3" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
