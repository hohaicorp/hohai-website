'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  Star, 
  BarChart3, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { adminApi } from '../lib/adminApi'

interface AdminStats {
  totalUsers: number
  totalTestimonials: number
  totalMessages: number
  recentMessages: number
}

interface ContactMessage {
  id: number
  name: string
  email: string
  message: string
  createdAt: string
}

interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  rating: number
  testimonial: string
  projectType: string
}

interface CallRequest {
  id: number
  name: string
  phone: string
  enquiry: string
  createdAt: string
}

interface DashboardData {
  stats: AdminStats
  recentMessages: ContactMessage[]
  recentTestimonials: Testimonial[]
}

interface LoginResponse {
  token: string
  user: {
    id: number
    email: string
    name: string
    role: string
  }
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentSection, setCurrentSection] = useState('dashboard')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTestimonials: 0,
    totalMessages: 0,
    recentMessages: 0
  })
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [user, setUser] = useState<any>(null)
  const [callRequests, setCallRequests] = useState<CallRequest[]>([])

  // Real authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsAuthenticated(true)
      loadDashboardData()
    }
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await adminApi.getDashboardData()
      if (response.error) {
        setError(response.error)
        if (response.error === 'Unauthorized') {
          handleLogout()
        }
        return
      }
      
      if (response.data) {
        const data = response.data as DashboardData
        setStats(data.stats)
        setRecentMessages(data.recentMessages)
        setTestimonials(data.recentTestimonials)
      }
      // Fetch call requests
      const callRes = await adminApi.getCallRequests()
      // Type assertion to inform TypeScript about the expected shape
      const callData = callRes.data as { callRequests: CallRequest[] } | undefined
      if (callData && callData.callRequests) {
        setCallRequests(callData.callRequests)
      }
    } catch (err) {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    try {
      const response = await adminApi.login(email, password)
      if (response.error) {
        setError(response.error)
        return
      }
      
      if (response.data) {
        const data = response.data as LoginResponse
        localStorage.setItem('adminToken', data.token)
        setUser(data.user)
        setIsAuthenticated(true)
        setSuccess('Login successful!')
        loadDashboardData()
      }
    } catch (err) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-600 mb-2">HOHAI Admin</h1>
            <p className="text-gray-600">Sign in to access the admin dashboard</p>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800">{success}</span>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="admin@hohai.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  const sections = [
    { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { key: 'testimonials', label: 'Testimonials', icon: Star },
    { key: 'messages', label: 'Messages', icon: MessageSquare },
    { key: 'calls', label: 'Call Requests', icon: Phone },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-600">HOHAI Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user?.name || 'Admin User'}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            {sections.map((section) => (
              <button
                key={section.key}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentSection === section.key
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentSection(section.key)}
              >
                <section.icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {currentSection === 'dashboard' && (
            <DashboardOverview 
              stats={stats} 
              recentMessages={recentMessages}
              testimonials={testimonials}
            />
          )}
          
          {currentSection === 'testimonials' && (
            <TestimonialsManagement testimonials={testimonials} />
          )}
          
          {currentSection === 'messages' && (
            <MessagesManagement messages={recentMessages} />
          )}
          
          {currentSection === 'calls' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center"><Phone className="w-6 h-6 mr-2 text-blue-600" />Scheduled Call Requests</h2>
              {callRequests.length === 0 ? (
                <div className="text-gray-500">No call requests yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Phone</th>
                        <th className="px-4 py-2 border-b">Cause of Enquiry</th>
                        <th className="px-4 py-2 border-b">Requested At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {callRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-b font-medium">{req.name}</td>
                          <td className="px-4 py-2 border-b">{req.phone}</td>
                          <td className="px-4 py-2 border-b">{req.enquiry}</td>
                          <td className="px-4 py-2 border-b text-sm text-gray-500">{new Date(req.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {currentSection === 'users' && (
            <UsersManagement />
          )}
          
          {currentSection === 'settings' && (
            <SettingsPanel />
          )}
        </main>
      </div>
    </div>
  )
}

// Dashboard Overview Component
function DashboardOverview({ 
  stats, 
  recentMessages, 
  testimonials 
}: { 
  stats: AdminStats
  recentMessages: ContactMessage[]
  testimonials: Testimonial[]
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome to your HOHAI admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Testimonials</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTestimonials}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalMessages}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Messages</p>
              <p className="text-3xl font-bold text-gray-900">{stats.recentMessages}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{message.name}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{message.email}</p>
                <p className="text-sm text-gray-700">{message.message.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Testimonials */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Testimonials</h3>
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{testimonial.position}</p>
                <p className="text-sm text-gray-700">{testimonial.testimonial.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Testimonials Management Component
function TestimonialsManagement({ testimonials }: { testimonials: Testimonial[] }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.target as HTMLFormElement)
    const testimonialData = {
      name: formData.get('name') as string,
      position: formData.get('position') as string,
      company: formData.get('company') as string,
      rating: parseInt(formData.get('rating') as string),
      testimonial: formData.get('testimonial') as string,
      projectType: formData.get('projectType') as string,
      projectDuration: formData.get('projectDuration') as string,
      projectImprovement: formData.get('projectImprovement') as string,
      projectFeatures: formData.get('projectFeatures') as string,
      photo: formData.get('photo') as string || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }

    try {
      const response = await adminApi.createTestimonial(testimonialData)
      if (response.error) {
        setError(response.error)
        return
      }
      
      setSuccess('Testimonial added successfully!')
      setShowAddForm(false)
      // Reset form
      ;(e.target as HTMLFormElement).reset()
      // Reload testimonials (you might want to add a callback to refresh the list)
      window.location.reload()
    } catch (err) {
      setError('Failed to add testimonial')
    } finally {
      setLoading(false)
    }
  }

  const handleViewTestimonial = (testimonial: Testimonial) => {
    // For now, just show an alert with testimonial details
    alert(`Testimonial Details:\n\nName: ${testimonial.name}\nPosition: ${testimonial.position}\nCompany: ${testimonial.company}\nRating: ${testimonial.rating} stars\n\nTestimonial: ${testimonial.testimonial}`)
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    // For now, just show an alert
    alert('Edit functionality coming soon!')
  }

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const response = await adminApi.deleteTestimonial(id)
      if (response.error) {
        setError(response.error)
        return
      }
      
      setSuccess('Testimonial deleted successfully!')
      // Reload testimonials
      window.location.reload()
    } catch (err) {
      setError('Failed to delete testimonial')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Testimonials Management</h2>
          <p className="text-gray-600">Manage client testimonials and reviews</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel' : 'Add Testimonial'}</span>
        </button>
      </div>

      {/* Add Testimonial Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Testimonial</h3>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800">{success}</span>
            </div>
          )}

          <form onSubmit={handleAddTestimonial} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  name="position"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="CEO"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  name="company"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Tech Corp"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <select
                  name="rating"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="">Select rating</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="">Select project type</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Web Application Development">Web Application Development</option>
                  <option value="Professional Websites">Professional Websites</option>
                  <option value="E-commerce Platform">E-commerce Platform</option>
                  <option value="Custom Software">Custom Software</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Duration *
                </label>
                <input
                  name="projectDuration"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="8 weeks"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Improvement *
                </label>
                <input
                  name="projectImprovement"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="40% increase in sales"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Features *
                </label>
                <input
                  name="projectFeatures"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="User authentication, Payment integration, Real-time notifications (comma-separated)"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URL
                </label>
                <input
                  name="photo"
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial *
                </label>
                <textarea
                  name="testimonial"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Share your experience with HOHAI..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Testimonial'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {testimonial.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {testimonial.projectType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewTestimonial(testimonial)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditTestimonial(testimonial)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit testimonial"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Messages Management Component
function MessagesManagement({ messages }: { messages: ContactMessage[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h2>
        <p className="text-gray-600">View and manage contact form submissions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {message.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {message.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs truncate">{message.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Users Management Component
function UsersManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Users Management</h2>
          <p className="text-gray-600">Manage admin users and permissions</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <p className="text-gray-600">User management features coming soon...</p>
      </div>
    </div>
  )
}

// Settings Panel Component
function SettingsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">Configure your admin dashboard</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <p className="text-gray-600">Settings panel coming soon...</p>
      </div>
    </div>
  )
} 