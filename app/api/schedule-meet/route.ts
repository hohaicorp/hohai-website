import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'
import { sendScheduleCallEmail } from '@/app/lib/email'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { name, phone, enquiry } = await request.json()

    if (!name || !phone || !enquiry) {
      return NextResponse.json(
        { error: 'Name, phone, and cause of enquiry are required' },
        { status: 400 }
      )
    }

    // Save call request to database
    const callRequest = await prisma.callRequest.create({
      data: { name, phone, enquiry }
    })

    // Send email to admin
    const emailResult = await sendScheduleCallEmail({ name, phone, enquiry })
    console.log('Schedule call email result:', emailResult)

    return NextResponse.json({
      message: 'Call request sent successfully',
      id: callRequest.id,
      emailSent: emailResult.success
    }, { status: 201 })
  } catch (error) {
    console.error('Schedule call error:', error)
    return NextResponse.json(
      { error: 'Failed to send call request' },
      { status: 500 }
    )
  }
} 