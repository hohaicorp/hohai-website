import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// GET all courses or featured ones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'

    const courses = await prisma.course.findMany({
      where: featured ? { isFeatured: true } : {},
      include: { 
        enrollments: true,
        sessionLinks: true,
        resources: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({ data: courses }, { status: 200 })
  } catch (error) {
    console.error('Courses GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

// POST - Create new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      category, 
      duration, 
      level, 
      price,
      instructorName,
      instructorQualification,
      startDate,
      isWebinar
    } = body

    const course = await prisma.course.create({
      data: {
        title,
        description,
        category,
        duration,
        level,
        price,
        instructorName,
        instructorQualification,
        startDate: new Date(startDate),
        isWebinar: isWebinar || false
      }
    })

    return NextResponse.json({ data: course }, { status: 201 })
  } catch (error) {
    console.error('Courses POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}

// PUT - Update course
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    // Convert dates if needed
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate)
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate)
    }

    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: updateData
    })

    return NextResponse.json({ data: course }, { status: 200 })
  } catch (error) {
    console.error('Courses PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

// DELETE - Remove course
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    await prisma.course.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json(
      { message: 'Course deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Courses DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}
