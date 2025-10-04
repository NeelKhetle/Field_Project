// API Configuration
const API_BASE_URL = window.location.origin + "/api"

// API Helper Functions
const api = {
  // Contact Form
  async submitContact(data) {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // Programs
  async getPrograms(level = null) {
    const url = level ? `${API_BASE_URL}/programs?level=${level}` : `${API_BASE_URL}/programs`
    const response = await fetch(url)
    return response.json()
  },

  async getProgram(slug) {
    const response = await fetch(`${API_BASE_URL}/programs/${slug}`)
    return response.json()
  },

  async enrollProgram(programId) {
    const response = await fetch(`${API_BASE_URL}/programs/${programId}/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.json()
  },

  // Newsletter Subscription
  async subscribe(data) {
    const response = await fetch(`${API_BASE_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async unsubscribe(email) {
    const response = await fetch(`${API_BASE_URL}/subscribers/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    return response.json()
  },

  // Health Check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`)
    return response.json()
  },
}

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = api
}
