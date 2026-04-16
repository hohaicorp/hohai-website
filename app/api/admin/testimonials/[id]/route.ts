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

// GET single testimonial
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = verifyToken(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(testimonial)

  } catch (error) {
    console.error('Get testimonial error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT update testimonial
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      company,
      institutionType,
      contactPerson,
      position,
      rating,
      testimonial,
      email,
      productsUsed = [],
      photo = ''
    } = await request.json()

    if (!name || !company || !contactPerson || !position || !rating || !testimonial) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        name,
        company,
        institutionType,
        contactPerson,
        position,
        email,
        photo,
        rating: parseInt(rating),
        testimonial,
        productsUsed: Array.isArray(productsUsed) ? productsUsed.join(',') : productsUsed
      }
    })

    return NextResponse.json(updatedTestimonial)

  } catch (error) {
    console.error('Update testimonial error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE testimonial
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = verifyToken(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.testimonial.delete({
      where: {
        id: parseInt(params.id)
      }
    })

    return NextResponse.json({ message: 'Testimonial deleted successfully' })

  } catch (error) {
    console.error('Delete testimonial error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 