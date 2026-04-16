export interface ContactFormEmailData {
  name: string
  email: string
  phone?: string
  institute?: string
  message?: string
  company?: string
  projectType?: string
  budget?: string
  timeline?: string
}

export async function sendContactFormEmail(data: ContactFormEmailData) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        institute: data.institute || data.company || '',
        message: data.message || ''
      })
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to submit contact request'
      }
    }

    return {
      success: true,
      admin: { status: 200, text: 'Server email sent' },
      customer: { status: 200, text: 'Server email sent' }
    }
  } catch (error) {
    console.error('Contact form send failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Contact form send failed'
    }
  }
}
