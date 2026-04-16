import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

function getGeminiModel() {
  return process.env.GOOGLE_GEMINI_MODEL || 'gemini-flash-latest'
}

async function callGemini(message: string, history: Array<{ role: string; content: string }>) {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) throw new Error('Missing GOOGLE_API_KEY')

  const model = getGeminiModel()
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

  const contents = [
    ...history.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    })),
    {
      role: 'user',
      parts: [{ text: message }],
    }
  ]

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents,
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    const errText = data?.error?.message || data?.message || 'Gemini request failed'
    throw new Error(errText)
  }

  const parts = data?.candidates?.[0]?.content?.parts
  const text = Array.isArray(parts) ? parts.map((p: any) => p?.text).filter(Boolean).join('') : ''
  if (!text) throw new Error('Gemini returned an empty response')

  return text
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, message } = await request.json()

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 })
    }
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    // Load recent context for the session (keeps prompts small)
    const recent = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    const history = recent
      .slice()
      .reverse()
      .map((m) => ({ role: m.role, content: m.content }))

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'user',
        content: message,
      },
    })

    const aiText = await callGemini(message, history)

    // Save assistant message
    const saved = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'assistant',
        content: aiText,
      },
    })

    return NextResponse.json({ text: aiText, id: saved.id }, { status: 200 })
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to generate AI response' },
      { status: 500 }
    )
  }
}

