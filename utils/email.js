import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

// Send contact form notification email
export const sendContactNotification = async (contact) => {
  try {
    const transporter = createTransporter()

    const programNames = {
      "ai-fundamentals": "AI Fundamentals",
      robotics: "Robotics Engineering",
      programming: "Advanced Programming",
      general: "General Inquiry",
    }

    const programName = programNames[contact.program] || "Not specified"

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission - ${contact.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
            ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ""}
            <p><strong>Program Interest:</strong> ${programName}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${contact.message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            Submitted on: ${new Date(contact.createdAt).toLocaleString()}<br>
            IP Address: ${contact.ipAddress}
          </p>
        </div>
      `,
    }

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: contact.email,
      subject: "Thank you for contacting Abhijeet Rane Youth Foundation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Thank You for Reaching Out!</h2>
          <p>Dear ${contact.name},</p>
          <p>We have received your message and appreciate your interest in the Abhijeet Rane Youth Foundation.</p>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="white-space: pre-wrap;">${contact.message}</p>
          </div>
          <p>Our team will review your inquiry and get back to you within 24-48 hours.</p>
          <p>In the meantime, feel free to explore our programs and learn more about how we're shaping young minds for the age of AI and robotics.</p>
          <p>Best regards,<br>
          <strong>Abhijeet Rane Youth Foundation Team</strong></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            If you did not submit this form, please ignore this email.
          </p>
        </div>
      `,
    }

    // Send both emails
    await Promise.all([transporter.sendMail(adminMailOptions), transporter.sendMail(userMailOptions)])

    console.log("✅ Contact notification emails sent successfully")
  } catch (error) {
    console.error("❌ Error sending contact notification:", error)
    throw error
  }
}

// Send welcome email to new subscriber
export const sendWelcomeEmail = async (subscriber) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: subscriber.email,
      subject: "Welcome to Abhijeet Rane Youth Foundation Newsletter",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Welcome to Our Community!</h2>
          <p>Dear ${subscriber.name || "Friend"},</p>
          <p>Thank you for subscribing to the Abhijeet Rane Youth Foundation newsletter!</p>
          <p>You'll now receive updates about:</p>
          <ul>
            <li>New program launches and course offerings</li>
            <li>Success stories from our students</li>
            <li>AI and robotics industry insights</li>
            <li>Exclusive events and workshops</li>
          </ul>
          <p>We're excited to have you on this journey of empowering young minds with cutting-edge technology education.</p>
          <p>Best regards,<br>
          <strong>Abhijeet Rane Youth Foundation Team</strong></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            You can unsubscribe at any time by clicking <a href="${process.env.WEBSITE_URL}/unsubscribe?email=${subscriber.email}">here</a>.
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("✅ Welcome email sent successfully")
  } catch (error) {
    console.error("❌ Error sending welcome email:", error)
    throw error
  }
}
