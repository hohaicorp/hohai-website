import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Middleware to verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, JWT_SECRET) as any
  } catch (error) {
    return null
  }
}

// GET all testimonials
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
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

// POST new testimonial
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      name, 
      position, 
      company, 
      rating, 
      testimonial, 
      projectType,
      photo = '',
      projectDuration = '',
      projectImprovement = '',
      projectFeatures = ''
    } = await request.json()

    if (!name || !position || !company || !rating || !testimonial || !projectType) {
      return NextResponse.json(
        { error: 'Name, position, company, rating, testimonial, and projectType are required' },
        { status: 400 }
      )
    }

    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        position,
        company,
        photo,
        rating: parseInt(rating),
        testimonial,
        projectType,
        projectDuration,
        projectImprovement,
        projectFeatures
      }
    })

    return NextResponse.json(newTestimonial, { status: 201 })

  } catch (error) {
    console.error('Create testimonial error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 