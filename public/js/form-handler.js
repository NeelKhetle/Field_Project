// Form Validation and Submission Handler

class FormHandler {
  constructor(formId, apiMethod) {
    this.form = document.getElementById(formId)
    this.apiMethod = apiMethod
    this.submitButton = null
    this.init()
  }

  init() {
    if (!this.form) return

    this.submitButton = this.form.querySelector('button[type="submit"]')
    this.form.addEventListener("submit", this.handleSubmit.bind(this))

    // Add real-time validation
    const inputs = this.form.querySelectorAll("input, textarea, select")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input))
      input.addEventListener("input", () => this.clearFieldError(input))
    })
  }

  validateField(field) {
    const value = field.value.trim()
    const fieldName = field.name
    let error = ""

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      error = `${this.getFieldLabel(field)} is required`
    }

    // Email validation
    if (fieldName === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address"
      }
    }

    // Phone validation
    if (fieldName === "phone" && value) {
      const phoneRegex = /^[\d\s+\-()]+$/
      if (!phoneRegex.test(value)) {
        error = "Please enter a valid phone number"
      }
    }

    // Message length validation
    if (fieldName === "message" && value) {
      if (value.length < 10) {
        error = "Message must be at least 10 characters"
      } else if (value.length > 1000) {
        error = "Message cannot exceed 1000 characters"
      }
    }

    // Name length validation
    if (fieldName === "name" && value) {
      if (value.length < 2) {
        error = "Name must be at least 2 characters"
      } else if (value.length > 100) {
        error = "Name cannot exceed 100 characters"
      }
    }

    if (error) {
      this.showFieldError(field, error)
      return false
    }

    this.clearFieldError(field)
    return true
  }

  validateForm() {
    const inputs = this.form.querySelectorAll("input, textarea, select")
    let isValid = true

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false
      }
    })

    return isValid
  }

  showFieldError(field, message) {
    this.clearFieldError(field)

    field.classList.add("error")
    const errorDiv = document.createElement("div")
    errorDiv.className = "field-error"
    errorDiv.textContent = message
    field.parentNode.appendChild(errorDiv)
  }

  clearFieldError(field) {
    field.classList.remove("error")
    const errorDiv = field.parentNode.querySelector(".field-error")
    if (errorDiv) {
      errorDiv.remove()
    }
  }

  getFieldLabel(field) {
    const label = this.form.querySelector(`label[for="${field.id}"]`)
    return label ? label.textContent.replace("*", "").trim() : field.name
  }

  async handleSubmit(e) {
    e.preventDefault()

    // Validate form
    if (!this.validateForm()) {
      this.showMessage("Please fix the errors before submitting", "error")
      return
    }

    // Get form data
    const formData = new FormData(this.form)
    const data = Object.fromEntries(formData.entries())

    // Disable submit button
    this.setLoading(true)

    try {
      // Call API method
      const response = await this.apiMethod(data)

      if (response.success) {
        this.showMessage(response.message || "Form submitted successfully!", "success")
        this.form.reset()

        // Scroll to success message
        setTimeout(() => {
          const messageEl = this.form.querySelector(".form-message")
          if (messageEl) {
            messageEl.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        }, 100)
      } else {
        this.showMessage(response.message || "Something went wrong. Please try again.", "error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      this.showMessage("Failed to submit form. Please check your connection and try again.", "error")
    } finally {
      this.setLoading(false)
    }
  }

  setLoading(isLoading) {
    if (!this.submitButton) return

    if (isLoading) {
      this.submitButton.disabled = true
      this.submitButton.dataset.originalText = this.submitButton.textContent
      this.submitButton.textContent = "Submitting..."
      this.submitButton.classList.add("loading")
    } else {
      this.submitButton.disabled = false
      this.submitButton.textContent = this.submitButton.dataset.originalText || "Submit"
      this.submitButton.classList.remove("loading")
    }
  }

  showMessage(message, type = "info") {
    // Remove existing message
    const existingMessage = this.form.querySelector(".form-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    // Create new message
    const messageDiv = document.createElement("div")
    messageDiv.className = `form-message form-message-${type}`
    messageDiv.textContent = message

    // Insert at the top of the form
    this.form.insertBefore(messageDiv, this.form.firstChild)

    // Auto-remove after 5 seconds for success messages
    if (type === "success") {
      setTimeout(() => {
        messageDiv.style.opacity = "0"
        setTimeout(() => messageDiv.remove(), 300)
      }, 5000)
    }
  }
}

// Initialize forms when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Contact Form
  if (document.getElementById("contact-form")) {
    new FormHandler("contact-form", window.api.submitContact)
  }

  // Newsletter Form
  if (document.getElementById("newsletter-form")) {
    new FormHandler("newsletter-form", window.api.subscribe)
  }
})
