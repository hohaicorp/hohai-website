import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// GET all subscription plans
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const institutionId = searchParams.get('institutionId')

    if (institutionId) {
      const subscription = await prisma.subscription.findFirst({
        where: { institutionId: parseInt(institutionId) },
        include: { 
          institution: true,
          plan: true
        }
      })

      return NextResponse.json({ data: subscription }, { status: 200 })
    }

    const plans = await prisma.subscriptionPlan.findMany()
    return NextResponse.json({ data: plans }, { status: 200 })
  } catch (error) {
    console.error('Subscription GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}

// POST - Create subscription
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { institutionId, planId } = body

    // Get the plan to determine duration
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: parseInt(planId) }
    })

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      )
    }

    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + plan.duration)

    const subscription = await prisma.subscription.create({
      data: {
        institutionId: parseInt(institutionId),
        planId: parseInt(planId),
        endDate
      }
    })

    return NextResponse.json({ data: subscription }, { status: 201 })
  } catch (error) {
    console.error('Subscription POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}

// PUT - Update subscription
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, endDate } = body

    const subscription = await prisma.subscription.update({
      where: { id: parseInt(id) },
      data: { 
        status,
        ...(endDate && { endDate: new Date(endDate) })
      }
    })

    return NextResponse.json({ data: subscription }, { status: 200 })
  } catch (error) {
    console.error('Subscription PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    )
  }
}
