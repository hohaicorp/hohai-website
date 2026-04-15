import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// GET all students by institution
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const institutionId = searchParams.get('institutionId')

    if (!institutionId) {
      return NextResponse.json(
        { error: 'Institution ID is required' },
        { status: 400 }
      )
    }

    const students = await prisma.institutionStudent.findMany({
      where: { institutionId: parseInt(institutionId) },
      include: {
        attendance: true,
        enrollments: true,
        payments: true
      }
    })
    
    return NextResponse.json({ data: students }, { status: 200 })
  } catch (error) {
    console.error('Students GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

// POST - Add new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      institutionId,
      enrollmentId,
      name,
      email,
      phone,
      class: studentClass,
      fatherName,
      motherName
    } = body

    const student = await prisma.institutionStudent.create({
      data: {
        institutionId: parseInt(institutionId),
        enrollmentId: enrollmentId || `STU-${Date.now()}`,
        name,
        email,
        phone,
        class: studentClass,
        fatherName,
        motherName
      }
    })

    return NextResponse.json({ data: student }, { status: 201 })
  } catch (error) {
    console.error('Students POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
}

// PUT - Update student
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    const student = await prisma.institutionStudent.update({
      where: { id: parseInt(id) },
      data: updateData
    })

    return NextResponse.json({ data: student }, { status: 200 })
  } catch (error) {
    console.error('Students PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    )
  }
}

// DELETE - Remove student
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    await prisma.institutionStudent.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json(
      { message: 'Student deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Students DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}
