import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// GET all institutions or a specific one
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const institution = await prisma.institution.findUnique({
        where: { id: parseInt(id) },
        include: { 
          subscriptions: true,
          students: true 
        }
      })
      
      if (!institution) {
        return NextResponse.json(
          { error: 'Institution not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ data: institution }, { status: 200 })
    }

    const institutions = await prisma.institution.findMany({
      include: { subscriptions: true }
    })
    
    return NextResponse.json({ data: institutions }, { status: 200 })
  } catch (error) {
    console.error('Institution GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch institutions' },
      { status: 500 }
    )
  }
}

// POST - Create new institution
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, email, phone, address, city, state, pincode } = body

    const institution = await prisma.institution.create({
      data: {
        name,
        type,
        email,
        phone,
        address,
        city,
        state,
        pincode
      }
    })

    return NextResponse.json({ data: institution }, { status: 201 })
  } catch (error) {
    console.error('Institution POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create institution' },
      { status: 500 }
    )
  }
}

// PUT - Update institution
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    const institution = await prisma.institution.update({
      where: { id: parseInt(id) },
      data: updateData
    })

    return NextResponse.json({ data: institution }, { status: 200 })
  } catch (error) {
    console.error('Institution PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update institution' },
      { status: 500 }
    )
  }
}
