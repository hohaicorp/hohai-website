'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users, BookOpen, DollarSign, Settings, LogOut, Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [institutions, setInstitutions] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch institutions and courses
    const fetchData = async () => {
      try {
        const [instRes, courseRes] = await Promise.all([
          fetch('/api/institutions'),
          fetch('/api/courses')
        ])
        
        if (instRes.ok) setInstitutions(await instRes.json().then(r => r.data || []))
        if (courseRes.ok) setCourses(await courseRes.json().then(r => r.data || []))
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const stats = [
    { title: 'Total Institutions', value: institutions.length, icon: <BarChart3 /> },
    { title: 'Active Courses', value: courses.length, icon: <BookOpen /> },
    { title: 'Total Students', value: '5,234', icon: <Users /> },
    { title: 'Revenue (Monthly)', value: '₹2,45,000', icon: <DollarSign /> }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">HOHAI Admin</h1>
          <p className="text-gray-400 text-sm">Management Dashboard</p>
        </div>

        <nav className="space-y-4">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'institutions', label: 'Institutions', icon: '🏢' },
            { id: 'courses', label: 'Courses', icon: '📚' },
            { id: 'students', label: 'Students', icon: '👥' },
            { id: 'payments', label: 'Payments', icon: '💳' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-600'
                  : 'hover:bg-gray-800'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button className="w-full mt-8 px-4 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your performance overview.</p>
        </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold">{stat.title}</h3>
                    <div className="text-indigo-600">{stat.icon}</div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Institutions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Institutions</h2>
                {institutions.length > 0 ? (
                  <div className="space-y-3">
                    {institutions.slice(0, 5).map((inst: any) => (
                      <div key={inst.id} className="border-b pb-3 last:border-0">
                        <p className="font-semibold text-gray-900">{inst.name}</p>
                        <p className="text-sm text-gray-600">{inst.type} • {inst.city}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No institutions yet</p>
                )}
              </div>

              {/* Recent Courses */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Courses</h2>
                {courses.length > 0 ? (
                  <div className="space-y-3">
                    {courses.slice(0, 5).map((course: any) => (
                      <div key={course.id} className="border-b pb-3 last:border-0">
                        <p className="font-semibold text-gray-900">{course.title}</p>
                        <p className="text-sm text-gray-600">{course.instructorName}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No courses yet</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'institutions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Institutions</h2>
              <Link href="/admin/institutions/new">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Institution
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">City</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Students</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {institutions.length > 0 ? (
                    institutions.map((inst: any) => (
                      <tr key={inst.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{inst.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{inst.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{inst.city}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{inst.studentCount || 0}</td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-600">
                        No institutions yet. <Link href="/admin/institutions/new" className="text-indigo-600 hover:text-indigo-800">Create one</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'courses' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
              <Link href="/admin/courses/new">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Course
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Instructor</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length > 0 ? (
                    courses.map((course: any) => (
                      <tr key={course.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{course.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{course.instructorName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{course.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">₹{course.price}</td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-600">
                        No courses yet. <Link href="/admin/courses/new" className="text-indigo-600 hover:text-indigo-800">Create one</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Platform Name</label>
                  <input type="text" defaultValue="HOHAI" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                  <input type="email" defaultValue="admin@hohai.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Support Email</label>
                  <input type="email" defaultValue="support@hohai.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                  Save Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
