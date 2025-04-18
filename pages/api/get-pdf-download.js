import AWS from "aws-sdk"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const S3_PDF_KEY = process.env.S3_PDF_KEY

export default async function handler(req, res) {
  const { session_id } = req.query

  if (!session_id) {
    return res.status(400).json({ error: "Missing session ID" })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (!session || session.payment_status !== "paid") {
      return res.status(403).json({ error: "Payment not verified" })
    }

    const url = await s3.getSignedUrlPromise("getObject", {
      Bucket: S3_BUCKET_NAME,
      Key: S3_PDF_KEY,
      Expires: 300,
      ResponseContentDisposition: "attachment; filename=paid-report.pdf",
    })

    return res.status(200).json({ url })
  } catch (err) {
    console.error("Download Error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
