'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, Clock, Award, Target, Briefcase, CheckCircle, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

const counsellingTypes = [
  {
    id: 1,
    title: "Career Path Assessment",
    icon: <Target className="w-12 h-12" />,
    description: "One-on-one session to assess strengths, interests, and suitable career paths",
    duration: "60 minutes",
    price: 2999,
    counsellors: "IIT/IIM Alumni",
    benefits: [
      "Aptitude & Interest Analysis",
      "Career Goal Setting",
      "Industry Insights",
      "Action Plan"
    ]
  },
  {
    id: 2,
    title: "Job Interview Preparation",
    icon: <Briefcase className="w-12 h-12" />,
    description: "Mock interviews and personalized feedback from professionals at top companies",
    duration: "4 sessions x 60 minutes",
    price: 8999,
    counsellors: "Ex-Google, Amazon, Microsoft",
    benefits: [
      "Mock Interview Sessions",
      "Technical Concepts",
      "HR Round Practice",
      "Salary Negotiation Tips"
    ]
  },
  {
    id: 3,
    title: "Exam Strategy Counseling",
    icon: <BookOpen className="w-12 h-12" />,
    description: "Strategic guidance for competitive exams like CAT, JEE, NEET, UPSC",
    duration: "90 minutes",
    price: 4999,
    counsellors: "UPSC/CAT Toppers",
    benefits: [
      "Exam Analysis",
      "Study Plan",
      "Mock Test Strategy",
      "Time Management"
    ]
  },
  {
    id: 4,
    title: "Entrepreneurship Mentoring",
    icon: <Users className="w-12 h-12" />,
    description: "Learn from successful entrepreneurs and startup founders",
    duration: "Monthly (4 sessions)",
    price: 12999,
    counsellors: "Startup Founders",
    benefits: [
      "Business Ideation",
      "Pitch Development",
      "Fundraising Tips",
      "Network Building"
    ]
  },
  {
    id: 5,
    title: "Higher Education Guidance",
    icon: <Award className="w-12 h-12" />,
    description: "Counseling for international education and higher studies opportunities",
    duration: "2-3 sessions",
    price: 6999,
    counsellors: "Study Abroad Experts",
    benefits: [
      "University Selection",
      "Application Strategy",
      "Visa Guidance",
      "Scholarship Planning"
    ]
  },
  {
    id: 6,
    title: "Professional Skills Development",
    icon: <Clock className="w-12 h-12" />,
    description: "Communication, presentation, and leadership skills training",
    duration: "8 sessions",
    price: 9999,
    counsellors: "Corporate Trainers",
    benefits: [
      "Public Speaking",
      "Leadership Skills",
      "Communication",
      "Team Management"
    ]
  }
]

const counsellors = [
  {
    name: "Rajesh Kumar",
    qualification: "IIT Delhi Graduate, Ex-Google",
    specialty: "Tech Interviews, Startup Guidance",
    experience: "12 years",
    rating: 4.9,
    students: 2500
  },
  {
    name: "Priya Singh",
    qualification: "IIM Ahmedabad, UPSC Topper",
    specialty: "Competitive Exams, Career Planning",
    experience: "15 years",
    rating: 4.95,
    students: 3500
  },
  {
    name: "Arjun Sharma",
    qualification: "Stanford MBA, Ex-Microsoft",
    specialty: "Entrepreneurship, Business Strategy",
    experience: "10 years",
    rating: 4.87,
    students: 1800
  },
  {
    name: "Sneha Desai",
    qualification: "IIT Bombay, Study Abroad Expert",
    specialty: "Higher Education, International Studies",
    experience: "8 years",
    rating: 4.92,
    students: 2200
  }
]

export default function CareerCounsellingPage() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Career Counselling & Mentoring</h1>
          <p className="text-xl opacity-90">Get personalized guidance from IIT/IIM alumni and industry experts</p>
        </div>
      </div>

      {/* Counselling Types */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {counsellingTypes.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedSession(service.id)}
                className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-shadow"
              >
                <div className="text-indigo-600 mb-4">{service.icon}</div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-gray-700"><span className="font-semibold">Duration:</span> {service.duration}</p>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Investment:</span> ₹{service.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Counsellors:</span> {service.counsellors}</p>
                </div>

                <ul className="space-y-2 mb-8">
                  {service.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center">
                    Book Session
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Counsellors */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Counsellors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {counsellors.map((counsellor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {counsellor.name[0]}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{counsellor.name}</h3>
                
                <p className="text-sm font-semibold text-indigo-600 mb-2">{counsellor.qualification}</p>
                
                <p className="text-sm text-gray-600 mb-4">{counsellor.specialty}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <p><span className="font-semibold">Experience:</span> {counsellor.experience}</p>
                  <p><span className="font-semibold">Rating:</span> ⭐ {counsellor.rating}</p>
                  <p><span className="font-semibold">Students Guided:</span> {counsellor.students.toLocaleString()}+</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: "1", title: "Book Session", desc: "Choose counsellor & time slot" },
              { num: "2", title: "Take Session", desc: "Connect via video call" },
              { num: "3", title: "Get Guidance", desc: "Receive personalized advice" },
              { num: "4", title: "Execute Plan", desc: "Follow action items" }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rohit Patel",
                role: "Got into Google",
                story: "Career counselling with Rajesh sir helped me crack Google interview. Best investment for my career!"
              },
              {
                name: "Anjali Sharma",
                role: "UPSC Aspirant",
                story: "Priya ma'am's guidance changed my approach to exam preparation. Now targeting top 100 rank!"
              },
              {
                name: "Vikram Singh",
                role: "Startup Founder",
                story: "Arjun sir's mentoring helped me secure seed funding. His network and insights were invaluable!"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 border border-gray-200"
              >
                <p className="text-gray-700 mb-6 italic">"{testimonial.story}"</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-indigo-600 font-semibold text-sm">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Counselling Journey Today</h2>
          <p className="text-xl mb-8 opacity-90">Get 30-minute free consultation to understand your career options</p>
          <Link href="/contact">
            <motion.button
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Free Consultation
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}
