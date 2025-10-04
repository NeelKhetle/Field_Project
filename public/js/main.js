// Navbar scroll effect
const header = document.getElementById("header")
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Mobile menu toggle
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Scroll animations using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all elements with scroll-animate class
document.querySelectorAll(".scroll-animate").forEach((el) => {
  observer.observe(el)
})

// Animated counter for impact stats
const animateCounter = (element, target, duration = 2000) => {
  const start = 0
  const increment = target / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target.toLocaleString()
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current).toLocaleString()
    }
  }, 16)
}

// Trigger counter animation when impact section is visible
const impactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number")
        statNumbers.forEach((stat) => {
          const target = Number.parseInt(stat.getAttribute("data-target"))
          animateCounter(stat, target)
        })
        impactObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const impactSection = document.querySelector(".impact")
if (impactSection) {
  impactObserver.observe(impactSection)
}

// Form validation and submission
const contactForm = document.getElementById("contactForm")
const submitBtn = document.getElementById("submitBtn")
const formMessage = document.getElementById("formMessage")

// Validation functions
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePhone = (phone) => {
  if (!phone) return true // Phone is optional
  const re = /^[\d\s+\-$$$$]+$/
  return re.test(phone) && phone.replace(/\D/g, "").length >= 10
}

const showError = (inputId, message) => {
  const input = document.getElementById(inputId)
  const error = document.getElementById(`${inputId}Error`)
  input.classList.add("error")
  error.textContent = message
}

const clearError = (inputId) => {
  const input = document.getElementById(inputId)
  const error = document.getElementById(`${inputId}Error`)
  input.classList.remove("error")
  error.textContent = ""
}

const clearAllErrors = () => {
  ;["name", "email", "phone", "message"].forEach(clearError)
}

const showFormMessage = (message, type) => {
  formMessage.textContent = message
  formMessage.className = `form-message ${type}`
  setTimeout(() => {
    formMessage.className = "form-message"
  }, 5000)
}

// Real-time validation
document.getElementById("email").addEventListener("blur", (e) => {
  const email = e.target.value.trim()
  if (email && !validateEmail(email)) {
    showError("email", "Please enter a valid email address")
  } else {
    clearError("email")
  }
})

document.getElementById("phone").addEventListener("blur", (e) => {
  const phone = e.target.value.trim()
  if (phone && !validatePhone(phone)) {
    showError("phone", "Please enter a valid phone number")
  } else {
    clearError("phone")
  }
})

// Form submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  clearAllErrors()

  // Get form values
  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    program: document.getElementById("program").value,
    message: document.getElementById("message").value.trim(),
  }

  // Validate
  let isValid = true

  if (!formData.name) {
    showError("name", "Name is required")
    isValid = false
  }

  if (!formData.email) {
    showError("email", "Email is required")
    isValid = false
  } else if (!validateEmail(formData.email)) {
    showError("email", "Please enter a valid email address")
    isValid = false
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    showError("phone", "Please enter a valid phone number")
    isValid = false
  }

  if (!formData.message) {
    showError("message", "Message is required")
    isValid = false
  }

  if (!isValid) return

  // Show loading state
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoader = submitBtn.querySelector(".btn-loader")
  btnText.style.display = "none"
  btnLoader.style.display = "inline-flex"
  submitBtn.disabled = true

  try {
    // Send to backend API
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      showFormMessage("Thank you! Your message has been sent successfully. We'll get back to you soon.", "success")
      contactForm.reset()
    } else {
      showFormMessage(data.message || "Something went wrong. Please try again.", "error")
    }
  } catch (error) {
    console.error("Form submission error:", error)
    showFormMessage("Unable to send message. Please check your connection and try again.", "error")
  } finally {
    // Reset button state
    btnText.style.display = "inline"
    btnLoader.style.display = "none"
    submitBtn.disabled = false
  }
})

// Add floating animation to hero cards with mouse parallax
const heroVisual = document.querySelector(".hero-visual")
if (heroVisual) {
  document.addEventListener("mousemove", (e) => {
    const cards = heroVisual.querySelectorAll(".floating-card")
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window

    cards.forEach((card, index) => {
      const speed = (index + 1) * 0.02
      const x = (clientX - innerWidth / 2) * speed
      const y = (clientY - innerHeight / 2) * speed

      card.style.transform = `translate(${x}px, ${y}px)`
    })
  })
}
