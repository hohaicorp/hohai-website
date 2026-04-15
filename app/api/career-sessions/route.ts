import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// POST - Book career session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      studentId,
      counsellorName,
      sessionDate,
      duration,
      topic,
      counsellingType,
      meetingLink
    } = body

    const session = await prisma.careerSession.create({
      data: {
        studentId: parseInt(studentId),
        counsellorName,
        sessionDate: new Date(sessionDate),
        duration,
        topic,
        counsellingType: counsellingType || "CAREER_PATH",
        meetingLink: meetingLink || ""
      }
    })

    return NextResponse.json({ data: session }, { status: 201 })
  } catch (error) {
    console.error('Career Session POST error:', error)
    return NextResponse.json(
      { error: 'Failed to book career session' },
      { status: 500 }
    )
  }
}

// GET - Get career sessions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const counsellorName = searchParams.get('counsellorName')

    let whereClause: any = {}
    if (studentId) whereClause.studentId = parseInt(studentId)
    if (counsellorName) whereClause.counsellorName = counsellorName

    const sessions = await prisma.careerSession.findMany({
      where: whereClause,
      include: { student: true },
      orderBy: { sessionDate: 'desc' }
    })

    return NextResponse.json({ data: sessions }, { status: 200 })
  } catch (error) {
    console.error('Career Session GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch career sessions' },
      { status: 500 }
    )
  }
}

// PUT - Update session
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, feedback, meetingLink } = body

    const session = await prisma.careerSession.update({
      where: { id: parseInt(id) },
      data: {
        status,
        feedback,
        ...(meetingLink && { meetingLink })
      }
    })

    return NextResponse.json({ data: session }, { status: 200 })
  } catch (error) {
    console.error('Career Session PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update career session' },
      { status: 500 }
    )
  }
}

// DELETE - Cancel session
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    await prisma.careerSession.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json(
      { message: 'Career session deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Career Session DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete career session' },
      { status: 500 }
    )
  }
}
