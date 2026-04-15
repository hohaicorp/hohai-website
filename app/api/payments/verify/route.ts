import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'
import { verifyPaymentSignature, fetchPaymentDetails } from '@/app/lib/razorpay'

const prisma = new PrismaClient()

/**
 * Verify payment and complete enrollment
 */
export async function POST(request: NextRequest) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await request.json()

    // Verify signature
    const isSignatureValid = verifyPaymentSignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    })

    if (!isSignatureValid) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }

    // Fetch payment details
    const paymentDetails = await fetchPaymentDetails(razorpayPaymentId)

    // Update payment status in database
    const payment = await prisma.payment.update({
      where: { transactionId: razorpayPaymentId },
      data: {
        status: 'COMPLETED',
        paidAt: new Date()
      }
    })

    // Update enrollment
    await prisma.courseEnrollment.update({
      where: { id: payment.enrollmentId },
      data: {
        completionPercentage: 0 // 0 means they can access, will track actual completion
      }
    })

    return NextResponse.json(
      {
        message: 'Payment verified successfully',
        paymentId: razorpayPaymentId,
        orderId: razorpayOrderId
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
