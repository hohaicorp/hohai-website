import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// POST - Process payment/enrollment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseId, studentId, amount, paymentMethod } = body

    // Create enrollment
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        courseId: parseInt(courseId),
        studentId: parseInt(studentId)
      }
    })

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        enrollmentId: enrollment.id,
        studentId: parseInt(studentId),
        amount,
        paymentMethod: paymentMethod || 'RAZORPAY',
        status: 'PENDING',
        transactionId: `TXN-${Date.now()}`
      }
    })

    // In production, integrate with Razorpay or Stripe here
    // For now, we'll just mark it as completed for demo

    return NextResponse.json(
      { 
        data: { enrollment, payment },
        message: 'Payment initiated successfully'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Payment POST error:', error)
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    )
  }
}

// GET - Get payments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const status = searchParams.get('status')

    let whereClause: any = {}
    if (studentId) whereClause.studentId = parseInt(studentId)
    if (status) whereClause.status = status

    const payments = await prisma.payment.findMany({
      where: whereClause,
      include: { student: true, enrollment: { include: { course: true } } },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ data: payments }, { status: 200 })
  } catch (error) {
    console.error('Payment GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

// PUT - Update payment status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, transactionId } = body

    const payment = await prisma.payment.update({
      where: { id: parseInt(id) },
      data: { 
        status,
        ...(transactionId && { transactionId }),
        ...(status === 'COMPLETED' && { paidAt: new Date() })
      }
    })

    return NextResponse.json({ data: payment }, { status: 200 })
  } catch (error) {
    console.error('Payment PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    )
  }
}
