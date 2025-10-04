import express from "express"
import { body, validationResult } from "express-validator"
import Contact from "../models/Contact.js"
import { sendContactNotification } from "../utils/email.js"

const router = express.Router()

// Validation rules
const contactValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("phone")
    .optional()
    .trim()
    .matches(/^[\d\s+\-()]+$/)
    .withMessage("Please provide a valid phone number"),
  body("program")
    .optional()
    .isIn(["ai-fundamentals", "robotics", "programming", "general", ""])
    .withMessage("Invalid program selection"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters"),
]

// POST /api/contact - Submit contact form
router.post("/", contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { name, email, phone, program, message } = req.body

    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress
    const userAgent = req.get("user-agent")

    // Create new contact submission
    const contact = new Contact({
      name,
      email,
      phone,
      program,
      message,
      ipAddress,
      userAgent,
    })

    await contact.save()

    // Send email notification (async, don't wait)
    sendContactNotification(contact).catch((err) => {
      console.error("Failed to send email notification:", err)
    })

    res.status(201).json({
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
      },
    })
  } catch (error) {
    console.error("Contact form error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form. Please try again later.",
    })
  }
})

// GET /api/contact - Get all contacts (admin only - add auth middleware in production)
router.get("/", async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query

    const query = status ? { status } : {}
    const skip = (page - 1) * limit

    const contacts = await Contact.find(query).sort({ createdAt: -1 }).limit(Number.parseInt(limit)).skip(skip)

    const total = await Contact.countDocuments(query)

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get contacts error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve contacts",
    })
  }
})

// GET /api/contact/:id - Get single contact
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      })
    }

    res.json({
      success: true,
      data: contact,
    })
  } catch (error) {
    console.error("Get contact error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve contact",
    })
  }
})

// PATCH /api/contact/:id/status - Update contact status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body

    if (!["new", "read", "replied", "archived"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      })
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true })

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      })
    }

    res.json({
      success: true,
      message: "Contact status updated",
      data: contact,
    })
  } catch (error) {
    console.error("Update contact status error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update contact status",
    })
  }
})

// DELETE /api/contact/:id - Delete contact
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      })
    }

    res.json({
      success: true,
      message: "Contact deleted successfully",
    })
  } catch (error) {
    console.error("Delete contact error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
    })
  }
})

export default router
