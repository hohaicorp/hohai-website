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

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get statistics
    const [totalUsers, totalTestimonials, totalMessages, recentMessages] = await Promise.all([
      prisma.user.count(),
      prisma.testimonial.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      })
    ])

    // Get recent messages
    const recentMessagesData = await prisma.contactMessage.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        message: true,
        createdAt: true
      }
    })

    // Get recent testimonials
    const recentTestimonials = await prisma.testimonial.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        position: true,
        company: true,
        rating: true,
        testimonial: true,
        projectType: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      stats: {
        totalUsers,
        totalTestimonials,
        totalMessages,
        recentMessages
      },
      recentMessages: recentMessagesData,
      recentTestimonials
    })

  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 