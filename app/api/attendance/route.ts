import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// POST - Record attendance
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentId, date, status, remarks } = body

    if (!studentId || !date || !status) {
      return NextResponse.json(
        { error: 'Student ID, date, and status are required' },
        { status: 400 }
      )
    }

    const attendance = await prisma.attendance.create({
      data: {
        studentId: parseInt(studentId),
        date: new Date(date),
        status,
        remarks
      }
    })

    return NextResponse.json({ data: attendance }, { status: 201 })
  } catch (error) {
    console.error('Attendance POST error:', error)
    return NextResponse.json(
      { error: 'Failed to record attendance' },
      { status: 500 }
    )
  }
}

// GET - Get attendance records
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const fromDate = searchParams.get('fromDate')
    const toDate = searchParams.get('toDate')

    let whereClause: any = {}

    if (studentId) {
      whereClause.studentId = parseInt(studentId)
    }

    if (fromDate || toDate) {
      whereClause.date = {}
      if (fromDate) whereClause.date.gte = new Date(fromDate)
      if (toDate) whereClause.date.lte = new Date(toDate)
    }

    const attendance = await prisma.attendance.findMany({
      where: whereClause,
      include: { student: true },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json({ data: attendance }, { status: 200 })
  } catch (error) {
    console.error('Attendance GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attendance' },
      { status: 500 }
    )
  }
}

// PUT - Update attendance
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, remarks } = body

    const attendance = await prisma.attendance.update({
      where: { id: parseInt(id) },
      data: { status, remarks }
    })

    return NextResponse.json({ data: attendance }, { status: 200 })
  } catch (error) {
    console.error('Attendance PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update attendance' },
      { status: 500 }
    )
  }
}

// DELETE - Remove attendance record
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    await prisma.attendance.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json(
      { message: 'Attendance record deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Attendance DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete attendance record' },
      { status: 500 }
    )
  }
}
