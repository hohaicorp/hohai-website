import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'
import { sendContactFormEmails } from '@/app/lib/email'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, institute, message } = await request.json()

    if (!name || !email || !phone || !institute) {
      return NextResponse.json(
        { error: 'Name, email, phone, and institute are required' },
        { status: 400 }
      )
    }

    // Save contact message to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || '',
        institute: institute || '',
        type: 'INQUIRY',
        message: message || ''
      } as any
    })

    // Send emails (admin notification + customer confirmation)
    const emailResults = await sendContactFormEmails({ 
      name, 
      email, 
      phone,
      institute,
      message: message || '' 
    })

    // Log email results for debugging
    console.log('Email sending results:', emailResults)

    return NextResponse.json({
      message: 'Message sent successfully',
      id: contactMessage.id,
      emailsSent: {
        admin: emailResults.adminEmail.success,
        customer: emailResults.customerEmail.success
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    return NextResponse.json({ data: contacts }, { status: 200 })
  } catch (error) {
    console.error('GET contact error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
} 