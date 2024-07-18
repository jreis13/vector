import pool from "../config/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM companies");
      client.release();
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching data from PostgreSQL", error);
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
