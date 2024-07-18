import AWS from "aws-sdk";
import csv from "csv-parser";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const KEY = process.env.S3_KEY;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: KEY,
      };
      const s3Stream = s3.getObject(params).createReadStream();

      const companies = [];
      await new Promise((resolve, reject) => {
        s3Stream
          .pipe(csv())
          .on("data", (row) => {
            const company = {
              id: parseInt(row.id),
              logo: row.logo,
              name: row.name,
              summary: row.summary,
              mainStats: [
                { label: "Industry", value: row.industry },
                { label: "Funding Amount", value: row.funding_amount },
                { label: "Funding Stage", value: row.funding_stage },
              ],
              stats: [
                { label: "Industry", value: row.industry },
                { label: "Funding Amount", value: row.funding_amount },
                { label: "Funding Stage", value: row.funding_stage },
                { label: "Last Valuation", value: row.last_valuation },
                { label: "HQ", value: row.hq },
                { label: "Employees", value: row.employees },
                { label: "Type", value: row.type },
                { label: "Website", value: row.website },
              ],
              foundingTeam: JSON.parse(row.founding_team),
              investors: JSON.parse(row.investors),
              marketSize: JSON.parse(row.market_size),
              customers: JSON.parse(row.customers),
              valueProposition: row.value_proposition,
              revenueStreams: JSON.parse(row.revenue_streams),
              costStructure: JSON.parse(row.cost_structure),
              customerGrowth: JSON.parse(row.customer_growth),
              patents: JSON.parse(row.patents),
              financials: JSON.parse(row.financials),
              products: JSON.parse(row.products),
              keyCompetitors: JSON.parse(row.key_competitors),
              comparison: JSON.parse(row.comparison),
              legal: row.legal,
              ecosystem: JSON.parse(row.ecosystem),
              vectorScore: parseInt(row.vector_score),
            };
            companies.push(company);
          })
          .on("end", () => {
            resolve();
          })
          .on("error", (error) => {
            reject(error);
          });
      });

      res.status(200).json(companies);
    } catch (error) {
      console.error("Error fetching data from S3:", error);
      res.status(500).json({ error: "Failed to fetch data from S3" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
