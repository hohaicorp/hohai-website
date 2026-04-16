'use client'

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { MessageSquare, MessageCircle, Send, X } from 'lucide-react'
import { sendContactFormEmail } from '@/app/lib/emailjs'

const options = [
  { key: 'chat', label: 'Ask a Question', description: 'Talk to our AI assistant instantly.' },
  { key: 'call', label: 'Request a Call', description: 'Our team will call you back.' },
  { key: 'text', label: 'Request a Text', description: 'We will text you the next steps.' },
  { key: 'details', label: 'Submit Details', description: 'Share your info so we can follow up.' }
] as const

type OptionKey = (typeof options)[number]['key']

type Message = {
  id: string
  sender: 'bot' | 'user'
  text: string
}

const botResponse = (input: string) => {
  const text = input.toLowerCase()

  if (text.includes('demo') || text.includes('schedule')) {
    return 'I can help you schedule a demo right now. Please share a preferred time or choose Request a Call for a faster response.'
  }

  if (text.includes('price') || text.includes('cost') || text.includes('budget')) {
    return 'Our solutions start from INR 8,999 for websites and INR 12,999/mo for ERP systems. I can get you a personalized quote if you share your needs.'
  }

  if (text.includes('erp') || text.includes('student') || text.includes('attendance')) {
    return 'We offer complete student ERP, attendance tracking, and parent communication tools. Tell me your institution size and we can suggest the best package.'
  }

  if (text.includes('website') || text.includes('landing') || text.includes('online')) {
    return 'We build conversion-focused websites and landing pages for schools, colleges, and coaching centers. Share your goal and I will help you choose the right option.'
  }

  if (text.includes('payment') || text.includes('gateway') || text.includes('fees')) {
    return 'Our payment gateway integration supports fee collection, receipts, and refunds. I can explain the setup in detail if you want.'
  }

  if (text.includes('call') || text.includes('contact')) {
    return 'I can arrange a call or text. Please choose Request a Call or Request a Text, then share your details.'
  }

  return 'That sounds interesting! We can help with school websites, student ERP, attendance, payment gateways, and admissions. Can you share a bit more about your requirement?'
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<OptionKey | null>(null)
  const [activeFlow, setActiveFlow] = useState<'chat' | 'contact' | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am your AI assistant. Ask a question or choose how you want us to respond.'
    }
  ])
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })
  const [chatLoading, setChatLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    // Stable per-browser session so we can store/load chat messages in Neon via Prisma.
    const safeCryptoUUID = () => {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
      return `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`
    }

    const id = window.localStorage.getItem('chat_session_id') || safeCryptoUUID()
    window.localStorage.setItem('chat_session_id', id)
    setSessionId(id)
  }, [])

  const appendMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const startFlow = (key: OptionKey) => {
    setSelected(key)
    setActiveFlow(key === 'chat' ? 'chat' : 'contact')
    appendMessage({ id: `user-${key}`, sender: 'user', text: options.find((o) => o.key === key)!.label })

    if (key === 'chat') {
      appendMessage({ id: 'bot-chat', sender: 'bot', text: 'Great! Ask me anything about demos, pricing, student ERP, websites, or payments.' })
    } else {
      appendMessage({ id: `bot-${key}`, sender: 'bot', text: `Sure! Please share your details and I will ${key === 'call' ? 'get someone to call you' : key === 'text' ? 'text you the next steps' : 'follow up with you'} shortly.` })
    }
  }

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userText = inputText.trim()
    appendMessage({ id: `user-msg-${Date.now()}`, sender: 'user', text: userText })
    setInputText('')

    // Ensure we always send a valid session id.
    const effectiveSessionId =
      sessionId ||
      window.localStorage.getItem('chat_session_id') ||
      `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`

    setChatLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: effectiveSessionId, message: userText })
      })

      const data = await response.json()
      if (!response.ok) {
        appendMessage({
          id: `bot-msg-${Date.now()}`,
          sender: 'bot',
          text: data?.error || botResponse(userText)
        })
        return
      }

      appendMessage({ id: `bot-msg-${Date.now()}`, sender: 'bot', text: data?.text || botResponse(userText) })
    } catch (error) {
      appendMessage({ id: `bot-msg-${Date.now()}`, sender: 'bot', text: botResponse(userText) })
    } finally {
      setChatLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: null, message: '' })

    const intentText = selected === 'call' ? 'Call request' : selected === 'text' ? 'Text request' : 'Detail submission'
    const emailBody = `${intentText} from chatbot:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`

    try {
      const response = await sendContactFormEmail({
        name: form.name || 'Chatbot Visitor',
        email: form.email,
        phone: form.phone,
        message: emailBody
      })

      if (response.success) {
        const adminOk = response.admin?.status === 200
        const customerOk = response.customer?.status === 200
        const successMessage = adminOk && customerOk
          ? 'Thanks! Your request has been sent and we will contact you soon.'
          : adminOk
          ? 'Your request reached us, but the confirmation email could not be sent.'
          : 'We could not deliver your request successfully. Please try again.'

        setStatus({ type: adminOk ? 'success' : 'error', message: successMessage })
        appendMessage({ id: `bot-action`, sender: 'bot', text: successMessage })

        if (adminOk) {
          setForm({ name: '', email: '', phone: '', message: '' })
          setSelected(null)
          setActiveFlow(null)
        }
      } else {
        setStatus({ type: 'error', message: response.error || 'Failed to send the request.' })
        appendMessage({ id: 'bot-fail', sender: 'bot', text: response.error || 'Failed to send the request.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' })
      appendMessage({ id: 'bot-exception', sender: 'bot', text: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[320px] md:w-[360px]">
      <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-xl shadow-black/10">
        <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-white" />
            <div>
              <p className="text-sm font-semibold text-white">HOHAI Assistant</p>
              <p className="text-xs text-indigo-100">Ask, call, text or share details</p>
            </div>
          </div>
          <button onClick={() => setOpen(!open)} className="text-white rounded-full p-1.5 hover:bg-white/20">
            {open ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
          </button>
        </div>

        {open ? (
          <div className="p-4">
            <div className="space-y-3 mb-3 max-h-[300px] overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`rounded-2xl px-3 py-2 text-sm ${message.sender === 'bot' ? 'bg-gray-100 text-gray-900' : 'bg-indigo-600 text-white'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {!selected ? (
              <div className="grid gap-3">
                {options.map((option) => (
                  <button
                    type="button"
                    key={option.key}
                    onClick={() => startFlow(option.key)}
                    className="rounded-2xl border border-gray-200 px-3 py-3 text-left hover:bg-indigo-50"
                  >
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </button>
                ))}
              </div>
            ) : activeFlow === 'chat' ? (
              <form onSubmit={handleChatSubmit} className="space-y-3">
                <div className="text-sm text-gray-700">Ask your question and our AI advisor will reply.</div>
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full rounded-2xl border border-gray-200 px-3 py-2 focus:outline-none focus:border-indigo-400"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={chatLoading}
                    aria-disabled={chatLoading}
                    className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {chatLoading ? 'Asking...' : 'Ask AI'}
                    <Send className="ml-2 w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelected(null); setActiveFlow(null); }}
                    className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="text-sm text-gray-700">Please enter your details:</div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-gray-200 px-3 py-2 focus:outline-none focus:border-indigo-400"
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="w-full rounded-2xl border border-gray-200 px-3 py-2 focus:outline-none focus:border-indigo-400"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full rounded-2xl border border-gray-200 px-3 py-2 focus:outline-none focus:border-indigo-400"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={selected === 'details' ? 'Share your details or requirements' : 'Any note for us?'}
                  rows={3}
                  className="w-full rounded-2xl border border-gray-200 px-3 py-2 focus:outline-none focus:border-indigo-400"
                />
                {status.type && (
                  <div className={`rounded-2xl px-3 py-2 text-sm ${status.type === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                    {status.message}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Submit'}
                    <Send className="ml-2 w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelected(null); setActiveFlow(null); }}
                    className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
