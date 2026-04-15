'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Video, BookOpen, Award, Users, Calendar, Clock, Star, ArrowRight, Filter, Search } from 'lucide-react'
import Link from 'next/link'

const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Arjun Sharma",
    qualification: "Ex-Google, IIT Delhi",
    duration: 40,
    level: "BEGINNER",
    price: 8999,
    students: 1250,
    rating: 4.8,
    category: "SKILL_DEVELOPMENT",
    image: "🚀",
    description: "Learn full-stack web development from scratch with modern technologies"
  },
  {
    id: 2,
    title: "UPSC Civil Services Preparation",
    instructor: "Dr. Priya Desai",
    qualification: "IIM Ahmedabad, UPSC Topper",
    duration: 120,
    level: "INTERMEDIATE",
    price: 15999,
    students: 3200,
    rating: 4.9,
    category: "COMPETITIVE_EXAM",
    image: "📚",
    description: "Complete guidance for UPSC Civil Services examination"
  },
  {
    id: 3,
    title: "Data Science & Machine Learning",
    instructor: "Vikram Singh",
    qualification: "Stanford PhD, Microsoft AI Research",
    duration: 60,
    level: "INTERMEDIATE",
    price: 12999,
    students: 2100,
    rating: 4.7,
    category: "SKILL_DEVELOPMENT",
    image: "🤖",
    description: "Master Data Science, Machine Learning, and AI applications"
  },
  {
    id: 4,
    title: "Career Counseling - 1-on-1 Session",
    instructor: "Career Experts",
    qualification: "IIT/IIM Alumni & Industry Professionals",
    duration: 1,
    level: "BEGINNER",
    price: 2999,
    students: 5600,
    rating: 4.9,
    category: "CAREER_COUNSELLING",
    image: "💼",
    description: "Personalized career guidance tailored to your profile"
  },
  {
    id: 5,
    title: "Amazon Interview Preparation",
    instructor: "Prateek Kumar",
    qualification: "Ex-Amazon, Senior Engineer",
    duration: 30,
    level: "INTERMEDIATE",
    price: 5999,
    students: 4200,
    rating: 4.8,
    category: "JOB_PREP",
    image: "💻",
    description: "Crack interviews at top tech companies like Amazon, Google, Microsoft"
  },
  {
    id: 6,
    title: "Webinar: Future of AI in Education",
    instructor: "Dr. Rajesh Pandey",
    qualification: "IIT Bombay, AI Research Lead at Adobe",
    duration: 2,
    level: "BEGINNER",
    price: 0,
    students: 8500,
    rating: 4.6,
    category: "WEBINAR",
    image: "🎓",
    description: "Free webinar exploring how AI is transforming education globally"
  }
]

const courseCategories = [
  { id: "ALL", name: "All Courses" },
  { id: "SKILL_DEVELOPMENT", name: "Skill Development" },
  { id: "COMPETITIVE_EXAM", name: "Competitive Exams" },
  { id: "JOB_PREP", name: "Job Preparation" },
  { id: "CAREER_COUNSELLING", name: "Career Counseling" },
  { id: "WEBINAR", name: "Webinars" }
]

const courseLevels = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [selectedLevel, setSelectedLevel] = useState("ALL")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCourses, setFilteredCourses] = useState(featuredCourses)

  useEffect(() => {
    let filtered = featuredCourses

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    if (selectedLevel !== "ALL") {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredCourses(filtered)
  }, [selectedCategory, selectedLevel, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Courses & Webinars</h1>
          <p className="text-xl opacity-90">Learn from IIT/IIM alumni and industry experts</p>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="bg-white border-b border-gray-200 py-8 px-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {courseCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Level</label>
            <div className="flex flex-wrap gap-2">
              {courseLevels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedLevel === level
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">{filteredCourses.length} Courses Found</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Course Image */}
                <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-6xl">
                  {course.image}
                </div>

                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3 inline-block">
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                      {course.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>

                  {/* Instructor */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700">{course.instructor}</p>
                    <p className="text-xs text-gray-600">{course.qualification}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(Math.round(course.rating))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 ml-2">{course.rating}</span>
                    <span className="text-xs text-gray-600 ml-1">({course.students.toLocaleString()} students)</span>
                  </div>

                  {/* Course Info */}
                  <div className="flex gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {course.duration}h
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {course.level}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">{course.description}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div>
                      {course.price > 0 ? (
                        <div>
                          <p className="text-2xl font-bold text-indigo-600">₹{course.price.toLocaleString()}</p>
                        </div>
                      ) : (
                        <p className="text-lg font-bold text-green-600">FREE</p>
                      )}
                    </div>
                    <Link href="/contact">
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                        Enroll
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No courses found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Can't find what you're looking for?</h2>
          <p className="text-xl mb-8 opacity-90">We offer custom courses tailored to your institution's needs</p>
          <Link href="/contact">
            <motion.button
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Custom Course
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}
