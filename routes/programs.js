import express from "express"
import Program from "../models/Program.js"

const router = express.Router()

// GET /api/programs - Get all active programs
router.get("/", async (req, res) => {
  try {
    const { level } = req.query

    const query = { isActive: true }
    if (level) {
      query.level = level
    }

    const programs = await Program.find(query).sort({ title: 1 })

    res.json({
      success: true,
      data: programs,
      count: programs.length,
    })
  } catch (error) {
    console.error("Get programs error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve programs",
    })
  }
})

// GET /api/programs/:slug - Get single program by slug
router.get("/:slug", async (req, res) => {
  try {
    const program = await Program.findOne({
      slug: req.params.slug,
      isActive: true,
    })

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      })
    }

    res.json({
      success: true,
      data: program,
    })
  } catch (error) {
    console.error("Get program error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve program",
    })
  }
})

// POST /api/programs/:id/enroll - Enroll in a program
router.post("/:id/enroll", async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      })
    }

    if (!program.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Program is not available for enrollment",
      })
    }

    await program.enrollStudent()

    res.json({
      success: true,
      message: "Successfully enrolled in program",
      data: program,
    })
  } catch (error) {
    console.error("Enroll program error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Failed to enroll in program",
    })
  }
})

export default router
