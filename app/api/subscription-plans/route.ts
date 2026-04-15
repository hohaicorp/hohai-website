import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// GET all subscription plans
export async function GET() {
  try {
    let plans = await prisma.subscriptionPlan.findMany({
      orderBy: { price: 'asc' }
    })

    // If no plans exist, create default ones
    if (plans.length === 0) {
      plans = await Promise.all([
        prisma.subscriptionPlan.create({
          data: {
            name: "STARTER",
            price: 15000,
            duration: 12,
            features: [
              "Student ERP System",
              "Attendance Management",
              "Basic Payment Gateway",
              "Up to 500 Students",
              "Email Support"
            ],
            maxStudents: 500,
            erpAccess: true,
            attendanceAccess: true,
            paymentGateway: true,
            coursesAccess: false
          }
        }),
        prisma.subscriptionPlan.create({
          data: {
            name: "PROFESSIONAL",
            price: 35000,
            duration: 12,
            features: [
              "All Starter Features",
              "Library Management",
              "Facility Management",
              "Up to 2000 Students",
              "Priority Email Support",
              "Monthly Analytics"
            ],
            maxStudents: 2000,
            erpAccess: true,
            attendanceAccess: true,
            paymentGateway: true,
            coursesAccess: true
          }
        }),
        prisma.subscriptionPlan.create({
          data: {
            name: "ENTERPRISE",
            price: 65000,
            duration: 12,
            features: [
              "All Features Included",
              "Webinars & Courses Platform",
              "Career Counselling Module",
              "Unlimited Students",
              "24/7 Priority Support",
              "Custom Integration",
              "Dedicated Account Manager"
            ],
            maxStudents: null,
            erpAccess: true,
            attendanceAccess: true,
            paymentGateway: true,
            coursesAccess: true
          }
        })
      ])
    }

    return NextResponse.json({ data: plans }, { status: 200 })
  } catch (error) {
    console.error('Subscription Plans GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription plans' },
      { status: 500 }
    )
  }
}

// POST - Create custom plan (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, price, duration, features, maxStudents } = body

    const plan = await prisma.subscriptionPlan.create({
      data: {
        name,
        price,
        duration,
        features,
        maxStudents,
        erpAccess: features?.includes("Student ERP") || false,
        attendanceAccess: features?.includes("Attendance") || false,
        paymentGateway: features?.includes("Payment") || false,
        coursesAccess: features?.includes("Courses") || false
      }
    })

    return NextResponse.json({ data: plan }, { status: 201 })
  } catch (error) {
    console.error('Subscription Plan POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription plan' },
      { status: 500 }
    )
  }
}

// PUT - Update plan
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    const plan = await prisma.subscriptionPlan.update({
      where: { id: parseInt(id) },
      data: updateData
    })

    return NextResponse.json({ data: plan }, { status: 200 })
  } catch (error) {
    console.error('Subscription Plan PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update subscription plan' },
      { status: 500 }
    )
  }
}
