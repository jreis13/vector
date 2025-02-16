import nodemailer from "nodemailer"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const { email } = req.body

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address" })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Exponential Vector Updates" <support@exponentialvector.eu>`,
      to: "updates@exponentialvector.eu",
      subject: "New Newsletter Subscription",
      text: `${email} subscribed to the newsletter.`,
    })

    return res.status(200).json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Email Sending Error:", error)
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message })
  }
}
