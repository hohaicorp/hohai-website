'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import ThemeToggle from './components/ThemeToggle'
import { 
  GraduationCap, 
  BarChart3,
  Users,
  Video,
  Briefcase,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Menu,
  X,
  Star,
  TrendingUp,
  Calendar,
  BookOpen,
  Settings,
  Zap,
  Target,
  Award,
  Building2,
  DollarSign,
  PieChart,
  Clock,
  MousePointerClick
} from 'lucide-react'

const products = [
  {
    icon: <MousePointerClick className="w-10 h-10" />,
    title: "Landing Webpage & Website",
    description: "High-converting landing webpages and institutional websites designed to generate quality admissions and inquiries.",
    features: ["Conversion-focused design", "Lead forms with CRM integration", "SEO-ready structure", "Analytics and tracking setup"],
    pricing: "Starts at INR 8,999",
    setupTime: "3-5 days",
    idealFor: "Institutes launching campaigns and promotions",
    support: "Design updates + performance optimization",
    bgColor: "from-cyan-50 to-sky-100"
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    title: "Student ERP System",
    description: "Complete student information management system with admission tracking, fees, documents, and progress monitoring.",
    features: ["Admission Management", "Fee Collection Tracking", "Automatic Report Generation", "Parent Communication Portal"],
    pricing: "INR 12,999/mo",
    setupTime: "5-7 days",
    idealFor: "Schools & colleges (300+ students)",
    support: "Priority onboarding",
    bgColor: "from-blue-50 to-blue-100"
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "Attendance Management",
    description: "Smart attendance system with biometric integration, automated notifications, and detailed analytics.",
    features: ["Real-time Tracking", "Biometric Support", "Parent SMS/Email Alerts", "Attendance Analytics"],
    pricing: "INR 7,999/mo",
    setupTime: "3-5 days",
    idealFor: "Daily attendance automation",
    support: "Biometric setup support",
    bgColor: "from-green-50 to-green-100"
  },
  {
    icon: <CreditCard className="w-10 h-10" />,
    title: "Payment Gateway",
    description: "Integrated payment solution for fees, courses, and other services with multiple payment options.",
    features: ["All Payment Methods", "Auto-invoicing", "Refund Management", "Transaction Reports"],
    pricing: "2% fee + INR 4,999/mo",
    setupTime: "2-4 days",
    idealFor: "Online fee/course payments",
    support: "Settlement support",
    bgColor: "from-yellow-50 to-yellow-100"
  },
  {
    icon: <BookOpen className="w-10 h-10" />,
    title: "Library Management",
    description: "Digital library system with book inventory, issue/return tracking, and student access.",
    features: ["Book Inventory", "Digital Resources", "Issue/Return Automation", "RFID Support"],
    pricing: "INR 5,999/mo",
    setupTime: "4-6 days",
    idealFor: "Digital + physical libraries",
    support: "Catalog import help",
    bgColor: "from-purple-50 to-purple-100"
  },
  {
    icon: <Video className="w-10 h-10" />,
    title: "Webinars & Courses",
    description: "Deliver online courses and webinars with live streaming, recordings, and interactive features.",
    features: ["Live Class Streaming", "Session Recording", "Automated Certificates", "Performance Tracking"],
    pricing: "INR 14,999/mo",
    setupTime: "5-7 days",
    idealFor: "Paid webinars/classes",
    support: "Launch support",
    bgColor: "from-pink-50 to-pink-100"
  }
]

const courseTypes = [
  {
    title: "Career Counseling",
    description: "1-on-1 guidance from IIT/IIM alumni and industry experts",
    icon: <Briefcase className="w-8 h-8" />,
    color: "from-indigo-600 to-purple-600"
  },
  {
    title: "Skill Development",
    description: "Paid courses in AI, Data Science, Web Development, and more",
    icon: <Zap className="w-8 h-8" />,
    color: "from-orange-600 to-red-600"
  },
  {
    title: "UPSC/Competitive Exams",
    description: "Strategic guidance for civil services and competitive exams",
    icon: <Target className="w-8 h-8" />,
    color: "from-green-600 to-emerald-600"
  },
  {
    title: "Industry Connect",
    description: "Courses by professionals from Google, Microsoft, Amazon, etc.",
    icon: <Award className="w-8 h-8" />,
    color: "from-blue-600 to-cyan-600"
  }
]

const features = [
  {
    title: "Complete School Management",
    description: "Manage every aspect of your institution with our all-in-one platform",
    icon: <BarChart3 className="w-8 h-8" />
  },
  {
    title: "Enhanced Learning",
    description: "Interactive webinars and courses from top faculty to improve student outcomes",
    icon: <Video className="w-8 h-8" />
  },
  {
    title: "Revenue Generation",
    description: "Sell courses, webinars, and premium content to generate additional revenue",
    icon: <DollarSign className="w-8 h-8" />
  },
  {
    title: "Career Development",
    description: "Help students with career guidance and job preparation programs",
    icon: <Briefcase className="w-8 h-8" />
  },
  {
    title: "Real-time Analytics",
    description: "Data-driven insights about student performance and institutional health",
    icon: <PieChart className="w-8 h-8" />
  },
  {
    title: "Scalable Solution",
    description: "Grow from a single school to managing multiple institutions effortlessly",
    icon: <TrendingUp className="w-8 h-8" />
  }
]

const institutionGrowthServices = [
  {
    title: "Digital Marketing Campaigns",
    description: "End-to-end campaigns to increase admissions and visibility in your target region.",
    points: ["Meta and Google ads", "Landing pages and lead forms", "Admission funnel tracking"]
  },
  {
    title: "Social Media Promotion",
    description: "Build trust and awareness through consistent content and brand positioning.",
    points: ["Instagram, Facebook and YouTube", "Student success stories", "Reels and short-form content strategy"]
  },
  {
    title: "LinkedIn and Cold Outreach",
    description: "Professional outreach to parents, learners, and local communities.",
    points: ["LinkedIn institutional positioning", "Cold email campaigns", "Audience segmentation and follow-up"]
  },
  {
    title: "Student Growth Enablement",
    description: "Practical strategies to move from 10 students to 1000+ with measurable results.",
    points: ["Admission process optimization", "Lead nurturing workflows", "Monthly growth dashboards"]
  }
]

const stats = [
  { number: 500, label: "Schools Connected", suffix: "+" },
  { number: 250000, label: "Students Served", suffix: "+" },
  { number: 5000, label: "Expert Instructors", suffix: "+" },
  { number: 100, label: "Courses Available", suffix: "+" }
]

const alumniCompanies = [
  { name: "Google", file: "google.svg" },
  { name: "Meta", file: "meta.svg" },
  { name: "Apple", file: "apple.svg" },
  { name: "Netflix", file: "netflix.svg" },
  { name: "Accenture", file: "accenture.svg" },
  { name: "GitHub", file: "github.svg" },
  { name: "YouTube", file: "youtube.svg" },
  { name: "Spotify", file: "spotify.svg" },
  { name: "Intel", file: "intel.svg" },
  { name: "Samsung", file: "samsung.svg" },
  { name: "TCS", file: "tcs.svg" },
  { name: "Wipro", file: "wipro.svg" },
  { name: "Infosys", file: "infosys.svg" },
  { name: "Uber", file: "uber.svg" },
  { name: "Airbnb", file: "airbnb.svg" },
]

const testimonials = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Principal, Delhi Public School",
    content: "The ERP system transformed how we manage student data. Attendance tracking is now automated and reports are generated in seconds!"
  },
  {
    name: "Mrs. Priya Singh",
    role: "Director, APEX Coaching Institute",
    content: "Hosting webinars with IIT alumni through their platform has attracted premium students and improved our reputation significantly."
  },
  {
    name: "Akshay Patel",
    role: "Manager, Elite College",
    content: "The payment gateway integration saved us hours of manual work. Students can now pay online anytime, anywhere."
  }
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [flippedProduct, setFlippedProduct] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', institute: '', message: '' })
  const [formLoading, setFormLoading] = useState(false)
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -300])
  const statsRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value })
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      })
      
      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Request sent! We\'ll contact you soon.' })
        setContactForm({ name: '', email: '', phone: '', institute: '', message: '' })
      } else {
        setFormStatus({ type: 'error', message: 'Failed to send request. Try again.' })
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg dark:bg-gray-900' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-8 h-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">hohai</h1>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition-colors">Products</a>
              <a href="#courses" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition-colors">Courses</a>
              <a href="#features" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition-colors">Contact</a>
              <ThemeToggle />
              <Link href="/contact">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Get Demo
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-40"
            >
              <div className="flex flex-col space-y-4 p-6">
                <a href="#products" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Products</a>
                <a href="#courses" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Courses</a>
                <a href="#features" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Features</a>
                <a href="#contact" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Contact</a>
                <Link href="/contact">
                  <button className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                    Get Demo
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              One-stop solution for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Schools, Colleges and Coaching centers</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Stuck anywhere? Use hohai. We are your one-stop solution for all your problems and a trusted partner to a school, parent, and student.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact">
                <motion.button 
                  className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button 
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Features
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {stats.map((stat, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6">
                <p className="text-3xl font-bold text-indigo-600 mb-2">{stat.number}{stat.suffix}</p>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Products & Solutions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Stuck anywhere? Use hohai for six powerful modules to transform your institution.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="h-[420px] [perspective:1000px]"
                onMouseEnter={() => setFlippedProduct(idx)}
                onMouseLeave={() => setFlippedProduct(null)}
              >
                <div
                  className={`relative h-full w-full rounded-xl transition-transform duration-700 [transform-style:preserve-3d] ${
                    flippedProduct === idx ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow [backface-visibility:hidden]">
                    <div className="text-indigo-600 dark:text-indigo-400 mb-4">{product.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{product.title}</h3>
                    <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-3">{product.title} Details</p>
                    <p className="text-gray-700 mb-8">{product.description}</p>
                    <button
                      type="button"
                      onClick={() => setFlippedProduct(flippedProduct === idx ? null : idx)}
                      className="mt-auto inline-flex items-center px-4 py-2 rounded-lg border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                    >
                      View Details
                    </button>
                  </div>

                  <div className="absolute inset-0 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">{product.title} Details</h3>
                    <div className="mb-3 p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
                      <p className="text-xs uppercase tracking-wide text-indigo-700 dark:text-indigo-300">Pricing</p>
                      <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">{product.pricing}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 mb-3 text-xs">
                      <p className="text-gray-700 dark:text-gray-200"><span className="font-semibold">Ideal:</span> {product.idealFor}</p>
                      <p className="text-gray-700 dark:text-gray-200"><span className="font-semibold">Setup:</span> {product.setupTime}</p>
                      <p className="text-gray-700 dark:text-gray-200"><span className="font-semibold">Support:</span> {product.support}</p>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {product.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-700 dark:text-gray-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => setFlippedProduct(null)}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-700 dark:text-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Institution Growth Services */}
      <section className="py-24 px-4 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="inline-flex px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-4">
              Growth Engine for Institutions
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Services We Provide to Institutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Real promotion. Real admissions. Real outcomes. We help institutes scale from 10 students to 1000+ students with performance-led execution.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 rounded-full" />
            <div className="space-y-8">
              {institutionGrowthServices.map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className={`md:w-[48%] ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                >
                  <div className="relative rounded-2xl border border-indigo-100 dark:border-indigo-900 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 dark:from-indigo-950/40 dark:via-gray-900 dark:to-purple-950/40 p-7 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
                      {idx + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.points.map((point) => (
                        <span
                          key={point}
                          className="px-3 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses & Learning Section */}
    

      

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Institutions Choose Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-indigo-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        <section id="courses" className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Webinars & Courses to Students</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Stuck anywhere? Use hohai to learn from IIT/IIM alumni and industry experts.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseTypes.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${course.color} text-white p-8 rounded-xl hover:shadow-xl transition-all`}
              >
                <div className="mb-4">{course.icon}</div>
                <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                <p className="opacity-90">{course.description}</p>
              </motion.div>
            ))}
          </div>

          {/* <motion.div className="mt-12 p-8 bg-indigo-50 rounded-xl border-2 border-indigo-200 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Generate Additional Revenue</h3>
            <p className="text-gray-600 mb-6">Sell premium courses, webinars, and certifications to your students and alumni. Keep 100% of revenue or share with instructors.</p>
            <Link href="#contact">
              <motion.button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700" whileHover={{ scale: 1.05 }}>
                Learn Revenue Model
              </motion.button>
            </Link>
          </motion.div> */}
        </div>
      </section>

      {/* Alumni Logo Carousel */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">Our Alumni Are At</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Stuck anywhere? Use hohai to get guidance from experts working across top companies.</p>
          </motion.div>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10" />

            <div className="flex w-max animate-logo-scroll">
              {[...alumniCompanies, ...alumniCompanies].map((company, idx) => (
                <div
                  key={`${company.name}-${idx}`}
                  className="mx-3 h-20 w-44 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center px-4"
                >
                  <img
                    src={`/logos/${company.file}`}
                    alt={`${company.name} logo`}
                    className="max-h-8 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">What Institution Leaders Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center text-white mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-4">Get Started Today</h2>
            <p className="text-xl opacity-90">Stuck anywhere? Use hohai and see how our one-stop solution can transform your institution.</p>
          </motion.div>

          <motion.form
            onSubmit={handleContactSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  placeholder="john@school.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Institution Name</label>
                <input
                  type="text"
                  name="institute"
                  value={contactForm.institute}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  placeholder="Your School/College"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                placeholder="Tell us about your institution and needs..."
              ></textarea>
            </div>

            {formStatus.type && (
              <div className={`mb-6 p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {formStatus.message}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={formLoading}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formLoading ? 'Sending...' : 'Schedule Your Free Demo'}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <GraduationCap className="w-8 h-8" />
            <h1 className="text-2xl font-bold">hohai</h1>
          </div>
          <p className="text-gray-400 mb-6">Motto: Stuck anywhere? Use hohai. One-stop solution for all your problems and partner to a school, parent, and student.</p>
          <div className="flex justify-center space-x-8 mb-8">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Support</Link>
          </div>
          <p className="text-gray-500">© 2024 hohai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
