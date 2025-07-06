import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const callRequests = await prisma.callRequest.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ callRequests })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch call requests' }, { status: 500 })
  }
} 