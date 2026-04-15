/**
 * Razorpay Payment Integration Service
 * Handles payment processing and verification
 */

interface CreateOrderParams {
  amount: number // in paise
  currency: string
  receipt: string
  customerName: string
  customerEmail: string
  customerPhone: string
}

interface VerifyPaymentParams {
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
}

/**
 * Create a Razorpay order
 */
export async function createRazorpayOrder(params: CreateOrderParams) {
  const auth = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString('base64')

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: Math.round(params.amount * 100), // Convert to paise
      currency: params.currency || 'INR',
      receipt: params.receipt,
      customer_notify: 1,
      notes: {
        customerName: params.customerName,
        customerEmail: params.customerEmail,
        customerPhone: params.customerPhone
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Razorpay API error: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Verify payment signature
 */
export function verifyPaymentSignature(params: VerifyPaymentParams): boolean {
  const crypto = require('crypto')
  
  const message = `${params.razorpayOrderId}|${params.razorpayPaymentId}`
  
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(message)
    .digest('hex')

  return expectedSignature === params.razorpaySignature
}

/**
 * Fetch payment details from Razorpay
 */
export async function fetchPaymentDetails(paymentId: string) {
  const auth = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString('base64')

  const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Basic ${auth}`
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch payment details: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Refund a payment
 */
export async function refundPayment(paymentId: string, amount?: number) {
  const auth = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString('base64')

  const body: any = {}
  if (amount) {
    body.amount = Math.round(amount * 100) // Convert to paise
  }

  const response = await fetch(
    `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  )

  if (!response.ok) {
    throw new Error(`Refund failed: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Get payment page URL
 */
export function getRazorpayPaymentPageUrl(
  orderId: string,
  amount: number,
  customerEmail: string,
  courseTitle: string
): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  const params = new URLSearchParams({
    order_id: orderId,
    amount: (amount * 100).toString(),
    email: customerEmail,
    course: courseTitle,
    key_id: process.env.RAZORPAY_KEY_ID || '',
    callback_url: `${baseUrl}/api/payments/verify`
  })

  return `https://checkout.razorpay.com/v1/checkout.js?${params.toString()}`
}
