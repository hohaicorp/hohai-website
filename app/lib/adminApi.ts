const API_BASE = '/api/admin'

interface ApiResponse<T> {
  data?: T
  error?: string
}

class AdminApi {
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminToken')
    }
    return null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken()
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
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

  // Authentication
  async login(email: string, password: string) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  // Dashboard
  async getDashboardData() {
    return this.request('/dashboard')
  }

  // Testimonials
  async getTestimonials() {
    return this.request('/testimonials')
  }

  async createTestimonial(testimonial: {
    name: string
    position: string
    company: string
    rating: number
    testimonial: string
    projectType: string
    projectDuration: string
    projectImprovement: string
    projectFeatures: string
    photo: string
  }) {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonial),
    })
  }

  async updateTestimonial(
    id: number,
    testimonial: {
      name: string
      position: string
      company: string
      rating: number
      testimonial: string
      projectType: string
    }
  ) {
    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonial),
    })
  }

  async deleteTestimonial(id: number) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    })
  }

  // Messages
  async getMessages(page: number = 1, limit: number = 10) {
    return this.request(`/messages?page=${page}&limit=${limit}`)
  }

  async deleteMessage(id: number) {
    return this.request('/messages', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
  }

  // Scheduled Calls
  async getCallRequests() {
    return this.request('/scheduled-meets')
  }
}

export const adminApi = new AdminApi() 