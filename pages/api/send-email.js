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
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "support@exponentialvector.eu",
      subject: "New Waitlist Signup - Fintech Ecosystem",
      text: `${email} joined the waitlist for the Fintech Ecosystem.`,
    }

    await transporter.sendMail(mailOptions)

    return res.status(200).json({ message: "Email sent successfully" })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message })
  }
}
