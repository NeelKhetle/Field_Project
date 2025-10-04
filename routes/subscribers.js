import express from "express"
import { body, validationResult } from "express-validator"
import Subscriber from "../models/Subscriber.js"

const router = express.Router()

// Validation rules
const subscriberValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("name").optional().trim(),
  body("interests").optional().isArray().withMessage("Interests must be an array"),
]

// POST /api/subscribers - Subscribe to newsletter
router.post("/", subscriberValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { email, name, interests } = req.body

    // Check if already subscribed
    let subscriber = await Subscriber.findOne({ email })

    if (subscriber) {
      if (subscriber.isActive) {
        return res.status(400).json({
          success: false,
          message: "This email is already subscribed",
        })
      }
      // Resubscribe if previously unsubscribed
      await subscriber.resubscribe()
      if (name) subscriber.name = name
      if (interests) subscriber.interests = interests
      await subscriber.save()
    } else {
      // Create new subscriber
      subscriber = new Subscriber({
        email,
        name,
        interests,
      })
      await subscriber.save()
    }

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: {
        email: subscriber.email,
      },
    })
  } catch (error) {
    console.error("Subscribe error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to subscribe. Please try again later.",
    })
  }
})

// POST /api/subscribers/unsubscribe - Unsubscribe from newsletter
router.post("/unsubscribe", async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      })
    }

    const subscriber = await Subscriber.findOne({ email })

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      })
    }

    await subscriber.unsubscribe()

    res.json({
      success: true,
      message: "Successfully unsubscribed from newsletter",
    })
  } catch (error) {
    console.error("Unsubscribe error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to unsubscribe. Please try again later.",
    })
  }
})

// GET /api/subscribers - Get all active subscribers (admin only)
router.get("/", async (req, res) => {
  try {
    const { interest } = req.query

    let subscribers
    if (interest) {
      subscribers = await Subscriber.getByInterest(interest)
    } else {
      subscribers = await Subscriber.getActive()
    }

    res.json({
      success: true,
      data: subscribers,
      count: subscribers.length,
    })
  } catch (error) {
    console.error("Get subscribers error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve subscribers",
    })
  }
})

export default router
