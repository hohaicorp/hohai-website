import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature') || ''

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      console.warn('Invalid webhook signature')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const event = JSON.parse(body)

    if (event.event === 'payment.authorized' || event.event === 'payment.captured') {
      const paymentData = event.payload.payment.entity

      // Find and update payment in database
      const payment = await prisma.payment.update({
        where: { transactionId: paymentData.id },
        data: {
          status: 'COMPLETED',
          paidAt: new Date(),
          transactionId: paymentData.id
        }
      })

      // Update enrollment as paid
      await prisma.courseEnrollment.update({
        where: { id: payment.enrollmentId },
        data: {
          completionPercentage: 0 // Student can now access course
        }
      })

      console.log('Payment verified:', paymentData.id)
    }

    if (event.event === 'payment.failed') {
      const paymentData = event.payload.payment.entity

      await prisma.payment.update({
        where: { transactionId: paymentData.id },
        data: {
          status: 'FAILED'
        }
      })

      console.log('Payment failed:', paymentData.id)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
