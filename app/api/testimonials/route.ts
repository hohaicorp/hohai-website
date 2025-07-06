import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        position: true,
        company: true,
        photo: true,
        rating: true,
        testimonial: true,
        projectType: true,
        projectDuration: true,
        projectImprovement: true,
        projectFeatures: true
      }
    })

    return NextResponse.json(testimonials)

  } catch (error) {
    console.error('Get testimonials error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 