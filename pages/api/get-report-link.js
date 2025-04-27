export default async function handler(req, res) {
  const { reportId } = req.query

  if (!reportId) {
    return res.status(400).json({ error: "Missing reportId" })
  }

  const envKey = `REPORT_LINK_${reportId}`
  const link = process.env[envKey]

  if (!link) {
    return res.status(404).json({ error: "Report link not found" })
  }

  return res.status(200).json({ link })
}
