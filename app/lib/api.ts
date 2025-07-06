const API_BASE = '/api'

interface ApiResponse<T> {
  data?: T
  error?: string
}

class Api {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, config)
      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || 'Request failed' }
      }

      return { data }
    } catch (error) {
      return { error: 'Network error' }
    }
  }

  // Contact form submission
  async submitContact(formData: {
    name: string
    email: string
    message: string
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  }

  // Get testimonials for public display
  async getTestimonials() {
    return this.request('/testimonials')
  }

  // Get testimonials for admin (protected)
  async getAdminTestimonials() {
    return this.request('/admin/testimonials')
  }
}

export const api = new Api() 