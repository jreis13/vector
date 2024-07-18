import AWS from "aws-sdk";
import cors from "cors";

const corsMiddleware = cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const KEY = process.env.S3_KEY;

export default async function handler(req, res) {
  await runMiddleware(req, res, corsMiddleware);

  if (req.method === "GET") {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: KEY,
      };
      const data = await s3.getObject(params).promise();
      const companies = JSON.parse(data.Body.toString("utf-8"));

      res.status(200).json(companies);
    } catch (error) {
      console.error("Error fetching or parsing data from S3:", error);
      res.status(500).json({ error: "Failed to fetch or parse data from S3" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
