'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  MessageSquare,
  Calendar,
  Users,
  Globe
} from 'lucide-react'
import Link from 'next/link'
import { api } from '../lib/api'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' })
  const [callModalOpen, setCallModalOpen] = useState(false)
  const [callForm, setCallForm] = useState({ name: '', phone: '', enquiry: '' })
  const [callLoading, setCallLoading] = useState(false)
  const [callStatus, setCallStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await api.submitContact({
        name: formData.name,
        email: formData.email,
        message: `Project Inquiry:
        
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Project Type: ${formData.projectType}
Budget: ${formData.budget}
Timeline: ${formData.timeline}

Project Description:
${formData.description}`
      })

      if (response.error) {
        setStatus({ type: 'error', message: response.error })
      } else {
        setStatus({ type: 'success', message: 'Thank you! We\'ll get back to you within 24 hours with a detailed quote.' })
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          description: ''
        })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleCallInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCallForm({ ...callForm, [e.target.name]: e.target.value })
  }

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCallLoading(true)
    setCallStatus({ type: null, message: '' })
    try {
      const res = await fetch('/api/schedule-meet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(callForm)
      })
      const data = await res.json()
      if (res.ok) {
        setCallStatus({ type: 'success', message: 'Call request sent! We will contact you soon.' })
        setCallForm({ name: '', phone: '', enquiry: '' })
      } else {
        setCallStatus({ type: 'error', message: data.error || 'Failed to send call request.' })
      }
    } catch (err) {
      setCallStatus({ type: 'error', message: 'Failed to send call request.' })
    } finally {
      setCallLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "+91 98765 43210<br />+91 94350 14933",
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "corphohai@gmail.com",
      description: "Send us an email anytime"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      details: "Guwahati, Assam, India",
      description: "Visit our office"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: "Mon - Fri: 9AM - 6PM",
      description: "IST (Indian Standard Time)"
    }
  ]

  const projectTypes = [
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'web-app', label: 'Web Application Development' },
    { value: 'website', label: 'Professional Website' },
    { value: 'ecommerce', label: 'E-commerce Platform' },
    { value: 'custom', label: 'Custom Software Solution' },
    { value: 'consultation', label: 'IT Consultation' }
  ]

  const budgetRanges = [
    { value: 'under-50k', label: 'Under ₹50,000' },
    { value: '50k-1l', label: '₹50,000 - ₹1,00,000' },
    { value: '1l-2l', label: '₹1,00,000 - ₹2,00,000' },
    { value: '2l-5l', label: '₹2,00,000 - ₹5,00,000' },
    { value: '5l-plus', label: '₹5,00,000+' },
    { value: 'discuss', label: 'Let\'s discuss' }
  ]

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (1-2 weeks)' },
    { value: '1-month', label: '1 Month' },
    { value: '2-3-months', label: '2-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-plus-months', label: '6+ Months' },
    { value: 'flexible', label: 'Flexible' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Gamusa Side Strips - Left */}
      <div className="fixed left-0 top-0 w-12 h-full bg-red-600 z-40">
        <div className="w-full h-full bg-white" style={{
          backgroundImage: `
            linear-gradient(0deg, #dc2626 0%, #dc2626 10%, white 10%, white 20%, #dc2626 20%, #dc2626 30%, white 30%, white 40%, #dc2626 40%, #dc2626 50%, white 50%, white 60%, #dc2626 60%, #dc2626 70%, white 70%, white 80%, #dc2626 80%, #dc2626 90%, white 90%, white 100%),
            linear-gradient(90deg, #dc2626 0%, #dc2626 8.33%, white 8.33%, white 16.66%, #dc2626 16.66%, #dc2626 25%, white 25%, white 33.33%, #dc2626 33.33%, #dc2626 41.66%, white 41.66%, white 50%, #dc2626 50%, #dc2626 58.33%, white 58.33%, white 66.66%, #dc2626 66.66%, #dc2626 75%, white 75%, white 83.33%, #dc2626 83.33%, #dc2626 91.66%, white 91.66%, white 100%)
          `,
          backgroundSize: '12px 40px, 12px 12px'
        }}>
          {/* Traditional Gamusa circular motifs */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 6px 20px, #dc2626 1px, transparent 2px),
              radial-gradient(circle at 6px 60px, #dc2626 1px, transparent 2px),
              radial-gradient(circle at 6px 100px, #dc2626 1px, transparent 2px),
              radial-gradient(circle at 6px 140px, #dc2626 1px, transparent 2px)
            `,
            backgroundSize: '12px 80px'
          }}></div>
          {/* Geometric diamond pattern */}
          <div className="absolute inset-0 opacity-70" style={{
            backgroundImage: `
              conic-gradient(from 45deg at 6px 10px, #dc2626 0deg 90deg, transparent 90deg 180deg, #dc2626 180deg 270deg, transparent 270deg 360deg),
              conic-gradient(from 45deg at 6px 30px, transparent 0deg 90deg, #dc2626 90deg 180deg, transparent 180deg 270deg, #dc2626 270deg 360deg)
            `,
            backgroundSize: '12px 20px'
          }}></div>
        </div>
      </div>
      
      {/* Gamusa Side Strips - Right */}
      <div className="fixed right-0 top-0 w-12 h-full bg-red-600 z-40">
        <div className="w-full h-full bg-white" style={{
          backgroundImage: `
            linear-gradient(0deg, #dc2626 0%, #dc2626 10%, white 10%, white 20%, #dc2626 20%, #dc2626 30%, white 30%, white 40%, #dc2626 40%, #dc2626 50%, white 50%, white 60%, #dc2626 60%, #dc2626 70%, white 70%, white 80%, #dc2626 80%, #dc2626 90%, white 90%, white 100%),
            linear-gradient(90deg, #dc2626 0%, #dc2626 8.33%, white 8.33%, white 16.66%, #dc2626 16.66%, #dc2626 25%, white 25%, white 33.33%, #dc2626 33.33%, #dc2626 41.66%, white 41.66%, white 50%, #dc2626 50%, #dc2626 58.33%, white 58.33%, white 66.66%, #dc2626 66.66%, #dc2626 75%, white 75%, white 83.33%, #dc2626 83.33%, #dc2626 91.66%, white 91.66%, white 100%)
          `,
          backgroundSize: '12px 40px, 12px 12px'
        }}>
          {/* Traditional Gamusa circular motifs */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 6px 20px, #dc2626 1px, transparent 2px),
              radial-gradient(circle at 6px 60px, #dc2626 1px, transparent 2px),
              radial-gradient(circle at 6px 100px, #dc2626 1px, transparent 2px),
              radial-gradient(circle at 6px 140px, #dc2626 1px, transparent 2px)
            `,
            backgroundSize: '12px 80px'
          }}></div>
          {/* Geometric diamond pattern */}
          <div className="absolute inset-0 opacity-70" style={{
            backgroundImage: `
              conic-gradient(from 45deg at 6px 10px, #dc2626 0deg 90deg, transparent 90deg 180deg, #dc2626 180deg 270deg, transparent 270deg 360deg),
              conic-gradient(from 45deg at 6px 30px, transparent 0deg 90deg, #dc2626 90deg 180deg, transparent 180deg 270deg, #dc2626 270deg 360deg)
            `,
            backgroundSize: '12px 20px'
          }}></div>
        </div>
      </div>
      
      {/* Main Content with proper margins */}
      <div className="ml-12 mr-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-red-100 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 p-4 rounded-full">
                  <MessageSquare className="w-12 h-12" />
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-6">Start Your Project</h1>
              <p className="text-xl text-red-100 max-w-3xl mx-auto">
                Ready to bring your vision to life? Let's discuss your project and create something amazing together.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get Your Free Quote</h2>
              
              {status.type && (
                <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                  status.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="+91 98765 43210 or +91 94350 14933"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((budget) => (
                        <option key={budget.value} value={budget.value}>{budget.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((timeline) => (
                        <option key={timeline.value} value={timeline.value}>{timeline.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    rows={6}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Tell us about your project, requirements, goals, and any specific features you need..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Get Free Quote
                    </>
                  )}
                </button>
              </form>
              <button
                type="button"
                className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                onClick={() => setCallModalOpen(true)}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Call
              </button>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-red-100 p-3 rounded-lg">
                      <div className="text-red-600">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-600 font-medium">{info.details}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Us */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose HOHAI?</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-gray-700">Free consultation and project planning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-gray-700">Transparent pricing with no hidden costs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-gray-700">Flexible payment plans available</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-gray-700">24/7 support and maintenance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-gray-700">Quick turnaround times</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-4">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </button>
                <button className="w-full border-2 border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Meet Our Team
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Schedule a Call Modal */}
      {callModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => { setCallModalOpen(false); setCallStatus({ type: null, message: '' }) }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 flex items-center"><Calendar className="w-6 h-6 mr-2 text-blue-600" />Schedule a Call</h2>
            {callStatus.type && (
              <div className={`mb-4 p-3 rounded flex items-center space-x-2 ${
                callStatus.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {callStatus.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span>{callStatus.message}</span>
              </div>
            )}
            <form onSubmit={handleCallSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={callForm.name}
                  onChange={handleCallInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={callForm.phone}
                  onChange={handleCallInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cause of Enquiry *</label>
                <textarea
                  name="enquiry"
                  required
                  rows={4}
                  value={callForm.enquiry}
                  onChange={handleCallInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Briefly describe the reason for your call..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={callLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {callLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Requesting...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Request Call
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 