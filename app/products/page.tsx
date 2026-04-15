'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Video, DollarSign, TrendingUp, Globe, CheckCircle, ArrowRight, Zap, Award, Briefcase } from 'lucide-react'
import Link from 'next/link'

const products = [
  {
    title: "Student ERP System",
    icon: <Users className="w-12 h-12" />,
    description: "Complete student information management system with admission tracking, fees, documents, and progress monitoring.",
    features: [
      "Admission Management",
      "Fee Collection Tracking",
      "Automatic Report Generation",
      "Parent Communication Portal",
      "Performance Analytics"
    ],
    pricing: "Custom",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Attendance Management",
    icon: <CheckCircle className="w-12 h-12" />,
    description: "Smart attendance system with biometric integration, automated notifications, and detailed analytics.",
    features: [
      "Real-time Tracking",
      "Biometric Support",
      "Parent SMS/Email Alerts",
      "Attendance Analytics",
      "Batch Operations"
    ],
    pricing: "₹5,000/month",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Payment Gateway",
    icon: <DollarSign className="w-12 h-12" />,
    description: "Integrated payment solution for fees, courses, and other services with multiple payment options.",
    features: [
      "Multiple Payment Methods",
      "Auto-invoicing",
      "Refund Management",
      "Transaction Reports",
      "Reconciliation Dashboard"
    ],
    pricing: "2.5% + ₹0",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    title: "Library Management",
    icon: <BookOpen className="w-12 h-12" />,
    description: "Digital library system with book inventory, issue/return tracking, and student access.",
    features: [
      "Book Inventory Management",
      "Digital Resources",
      "Issue/Return Automation",
      "RFID Support",
      "Fine Calculation"
    ],
    pricing: "₹3,000/month",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Facility Management",
    icon: <Globe className="w-12 h-12" />,
    description: "Manage hostel, transportation, cafeteria, and other facility operations efficiently.",
    features: [
      "Hostel Booking",
      "Transport Tracking",
      "Cafeteria Orders",
      "Maintenance Requests",
      "Expense Tracking"
    ],
    pricing: "₹7,000/month",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Webinars & Courses",
    icon: <Video className="w-12 h-12" />,
    description: "Deliver online courses and webinars with live streaming, recordings, and interactive features.",
    features: [
      "Live Class Streaming",
      "Session Recording",
      "Automated Certificates",
      "Performance Tracking",
      "Resource Library"
    ],
    pricing: "₹10,000/month",
    color: "from-pink-500 to-pink-600"
  }
]

const bundles = [
  {
    name: "STARTER",
    price: "₹15,000",
    period: "/month",
    features: ["Student ERP", "Attendance Management", "Basic Payment Gateway", "Up to 500 Students"]
  },
  {
    name: "PROFESSIONAL",
    price: "₹35,000",
    period: "/month",
    features: ["All Starter Features", "Library Management", "Facility Management", "Up to 2000 Students"]
  },
  {
    name: "ENTERPRISE",
    price: "₹65,000",
    period: "/month",
    features: ["All Features", "Webinars & Courses", "Priority Support", "Unlimited Students"]
  }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Our Products & Solutions</h1>
          <p className="text-xl opacity-90">Comprehensive tools to manage every aspect of your institution</p>
        </div>
      </div>

      {/* Individual Products */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Six Powerful Modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className={`h-2 bg-gradient-to-r ${product.color}`}></div>
                
                <div className="p-8">
                  <div className="mb-4 text-indigo-600">{product.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">{product.pricing}</span>
                    <Link href="/contact">
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                        Get Demo
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Bundles */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Subscription Plans</h2>
            <p className="text-xl text-gray-600">Choose the perfect plan for your institution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bundles.map((bundle, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl p-8 ${idx === 1 ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white ring-2 ring-indigo-600 scale-105' : 'bg-gray-50 border border-gray-200'}`}
              >
                <h3 className={`text-3xl font-bold mb-3`}>{bundle.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{bundle.price}</span>
                  <span className={idx === 1 ? 'text-gray-200' : 'text-gray-600'}>{bundle.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {bundle.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start">
                      <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${idx === 1 ? 'text-green-300' : 'text-green-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/contact">
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${idx === 1 ? 'bg-white text-indigo-600 hover:bg-gray-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                    Get Started
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Institution?</h2>
          <p className="text-xl mb-8 opacity-90">Get a personalized demo and see how we can help you</p>
          <Link href="/contact">
            <motion.button
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Free Demo Today
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}
