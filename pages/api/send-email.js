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
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    await transporter.sendMail({
      from: `"Fintech Ecosystem" <${process.env.EMAIL_USER}>`,
      to: "enquiries@exponentialvector.eu",
      subject: "New Waitlist Signup",
      text: `${email} joined the waitlist.`,
    })

    return res.status(200).json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Email Sending Error:", error)
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message })
  }
}
