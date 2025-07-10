'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, PanInfo } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Smartphone, 
  Globe, 
  Monitor, 
  Code, 
  Users, 
  Award, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Star,
  Quote,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Cloud,
  Server,
  Repeat,
  BarChart3,
  Cpu,
  Settings,
  TrendingUp,
  ArrowLeft
} from 'lucide-react'
import { api } from './lib/api'

const additionalServices = [
  {
    name: 'Cloud Migration & Management',
    icon: <Cloud className="w-8 h-8 text-blue-600" />, 
    description: 'Seamlessly migrate your business to the cloud and manage cloud infrastructure for scalability and reliability.'
  },
  {
    name: 'IT Infrastructure Setup',
    icon: <Server className="w-8 h-8 text-gray-700" />, 
    description: 'Design and implement robust IT infrastructure for your growing business.'
  },
  {
    name: 'DevOps & CI/CD Automation',
    icon: <Repeat className="w-8 h-8 text-green-600" />, 
    description: 'Automate your development pipeline for faster, more reliable software delivery.'
  },
  {
    name: 'IT Support & Managed Services',
    icon: <Settings className="w-8 h-8 text-indigo-600" />, 
    description: 'Comprehensive IT support and managed services to keep your business running smoothly.'
  },
  {
    name: 'API Integration Services',
    icon: <Code className="w-8 h-8 text-purple-600" />, 
    description: 'Integrate third-party APIs and services to extend your business capabilities.'
  },
  {
    name: 'Legacy System Modernization',
    icon: <BarChart3 className="w-8 h-8 text-orange-600" />, 
    description: 'Upgrade and modernize your legacy systems for improved performance and security.'
  },
  {
    name: 'SaaS Product Development',
    icon: <Globe className="w-8 h-8 text-pink-600" />, 
    description: 'Build scalable SaaS products tailored to your business needs.'
  },
  {
    name: 'CRM/ERP Implementation',
    icon: <Users className="w-8 h-8 text-yellow-600" />, 
    description: 'Implement and customize CRM/ERP solutions to streamline your operations.'
  },
  {
    name: 'IT Strategy & Roadmapping',
    icon: <TrendingUp className="w-8 h-8 text-teal-600" />, 
    description: 'Develop a clear IT strategy and roadmap to align technology with your business goals.'
  },
  {
    name: 'Custom Software Consulting',
    icon: <Monitor className="w-8 h-8 text-red-600" />, 
    description: 'Get expert advice and solutions for your unique software challenges.'
  },
  {
    name: 'AI/ML Solutions',
    icon: <Cpu className="w-8 h-8 text-fuchsia-600" />, 
    description: 'Leverage artificial intelligence and machine learning to gain a competitive edge.'
  }
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0, support: 0 })
  const [countersStarted, setCountersStarted] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [contactStatus, setContactStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' })
  const [contactLoading, setContactLoading] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const visibleCards = 3
  const totalCards = additionalServices.length
  
  const statsRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -300])

  // Load testimonials from API
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        console.log('Loading testimonials...')
        const response = await api.getTestimonials()
        console.log('Testimonials response:', response)
        if (response.data && Array.isArray(response.data)) {
          console.log('Setting testimonials:', response.data)
          setTestimonials(response.data)
        } else {
          console.log('No testimonials data or not an array')
          // Fallback to default testimonials if API fails
          setTestimonials([])
        }
      } catch (error) {
        console.error('Failed to load testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Touch gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && isMenuOpen) {
      setIsMenuOpen(false)
    } else if (isRightSwipe && !isMenuOpen) {
      setIsMenuOpen(true)
    }

    setTouchStart(null)
    setTouchEnd(null)
  }, [touchStart, touchEnd, isMenuOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  // Carousel auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  // Carousel navigation functions
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
    setIsAutoPlaying(false)
  }

  // Contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactLoading(true)
    setContactStatus({ type: null, message: '' })

    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    try {
      const response = await api.submitContact({ name, email, message })
      if (response.error) {
        setContactStatus({ type: 'error', message: response.error })
      } else {
        setContactStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' })
        // Reset form
        ;(e.target as HTMLFormElement).reset()
      }
    } catch (error) {
      setContactStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
    } finally {
      setContactLoading(false)
    }
  }

  // Animated counters effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true)
            animateCounters()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [countersStarted])

  const animateCounters = () => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    const targets = { projects: 50, clients: 30, years: 5, support: 24 }
    
    let currentStep = 0
    
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      
      setCounters({
        projects: Math.floor(targets.projects * progress),
        clients: Math.floor(targets.clients * progress),
        years: Math.floor(targets.years * progress),
        support: Math.floor(targets.support * progress)
      })
      
      if (currentStep >= steps) {
        clearInterval(interval)
        setCounters(targets)
      }
    }, stepDuration)
  }

  const getServiceUrl = (title: string) => {
    // Map service titles to their correct URL paths
    const urlMap: { [key: string]: string } = {
      'Mobile App Development': 'mobile-app',
      'Web Application Development': 'web-app',
      'Professional Websites': 'website'
    }
    
    return `/services/${urlMap[title] || title.toLowerCase().replace(/\s+/g, '-')}`
  }

  const services = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android with cutting-edge features and intuitive user experience.",
      features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Application Development",
      description: "Scalable web applications built with modern technologies to drive your business forward in the digital landscape.",
      features: ["React.js", "Next.js", "Node.js", "Full-stack Development"]
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Professional Websites",
      description: "Beautiful, responsive websites that represent your brand professionally and convert visitors into customers.",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"]
    }
  ]

  const stats = [
    { number: counters.projects, label: "Projects Completed", suffix: "+" },
    { number: counters.clients, label: "Happy Clients", suffix: "+" },
    { number: counters.years, label: "Years Experience", suffix: "+" },
    { number: counters.support, label: "Support Available", suffix: "/7" }
  ]

  const faqs = [
    {
      id: 1,
      question: "What is the typical timeline for developing a mobile app?",
      answer: "The timeline varies based on complexity. A simple app takes 6-8 weeks, while complex applications with advanced features can take 12-16 weeks. We follow an agile development process with regular updates and milestone deliveries."
    },
    {
      id: 2,
      question: "Do you provide post-launch support and maintenance?",
      answer: "Yes, we offer comprehensive post-launch support including bug fixes, updates, security patches, and feature enhancements. Our support packages include 24/7 monitoring, regular backups, and performance optimization."
    },
    {
      id: 3,
      question: "What technologies do you use for web development?",
      answer: "We use modern, scalable technologies including React.js, Next.js, Node.js, Python, and PHP. Our tech stack is chosen based on project requirements, ensuring optimal performance, security, and maintainability."
    },
    {
      id: 4,
      question: "How do you handle project communication and updates?",
      answer: "We maintain transparent communication through weekly progress calls, daily stand-ups, and a dedicated project management portal. You'll have direct access to your project team and real-time updates on development progress."
    },
    {
      id: 5,
      question: "What is your pricing structure for projects?",
      answer: "Our pricing is project-based and depends on complexity, features, and timeline. We provide detailed quotes after understanding your requirements. We offer flexible payment terms with milestone-based payments."
    },
    {
      id: 6,
      question: "Do you provide hosting and domain services?",
      answer: "Yes, we offer complete hosting solutions including cloud hosting, domain registration, SSL certificates, and CDN services. We ensure high uptime, fast loading speeds, and robust security for all hosted applications."
    },
    {
      id: 7,
      question: "Can you help with existing applications that need updates?",
      answer: "Absolutely! We specialize in modernizing legacy applications, adding new features, improving performance, and migrating to newer technologies. We analyze your existing codebase and provide upgrade strategies."
    },
    {
      id: 8,
      question: "What makes HOHAI different from other development companies?",
      answer: "Our unique combination of technical expertise, cultural understanding, and personalized approach sets us apart. We focus on long-term partnerships, provide transparent pricing, and ensure your success through continuous support and innovation."
    }
  ]

  const scrollToIndex = (idx: number) => {
    if (carouselRef.current) {
      const cardWidth = 340 // min-w-[320px] + gap
      carouselRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth'
      })
    }
    setCarouselIndex(idx)
  }

  const handleLeft = () => {
    if (carouselIndex > 0) scrollToIndex(carouselIndex - 1)
  }
  const handleRight = () => {
    if (carouselIndex < totalCards - visibleCards) scrollToIndex(carouselIndex + 1)
  }

  return (
    <div 
      className="min-h-screen bg-white relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Gamusa Side Strips - Left */}
      <div className="fixed left-0 top-0 w-12 sm:w-8 md:w-12 h-full bg-red-600 z-40">
        <div className="w-full h-full bg-white" style={{
          backgroundImage: `
            linear-gradient(0deg, #dc2626 0%, #dc2626 10%, white 10%, white 20%, #dc2626 20%, #dc2626 30%, white 30%, white 40%, #dc2626 40%, #dc2626 50%, white 50%, white 60%, #dc2626 60%, #dc2626 70%, white 70%, white 80%, #dc2626 80%, #dc2626 90%, white 90%, white 100%),
            linear-gradient(90deg, #dc2626 0%, #dc2626 8.33%, white 8.33%, white 16.66%, #dc2626 16.66%, #dc2626 25%, white 25%, white 33.33%, #dc2626 33.33%, #dc2626 41.66%, white 41.66%, white 50%, #dc2626 50%, #dc2626 58.33%, white 58.33%, white 66.66%, #dc2626 66.66%, #dc2626 75%, white 75%, white 83.33%, #dc2626 83.33%, #dc2626 91.66%, white 91.66%, white 100%)
          `,
          backgroundSize: '8px 40px, 8px 8px',
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
      <div className="fixed right-0 top-0 w-12 sm:w-8 md:w-12 h-full bg-red-600 z-40">
        <div className="w-full h-full bg-white" style={{
          backgroundImage: `
            linear-gradient(0deg, #dc2626 0%, #dc2626 10%, white 10%, white 20%, #dc2626 20%, #dc2626 30%, white 30%, white 40%, #dc2626 40%, #dc2626 50%, white 50%, white 60%, #dc2626 60%, #dc2626 70%, white 70%, white 80%, #dc2626 80%, #dc2626 90%, white 90%, white 100%),
            linear-gradient(90deg, #dc2626 0%, #dc2626 8.33%, white 8.33%, white 16.66%, #dc2626 16.66%, #dc2626 25%, white 25%, white 33.33%, #dc2626 33.33%, #dc2626 41.66%, white 41.66%, white 50%, #dc2626 50%, #dc2626 58.33%, white 58.33%, white 66.66%, #dc2626 66.66%, #dc2626 75%, white 75%, white 83.33%, #dc2626 83.33%, #dc2626 91.66%, white 91.66%, white 100%)
          `,
          backgroundSize: '8px 40px, 8px 8px',
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
       <div className="ml-12 sm:ml-8 md:ml-12 mr-12 sm:mr-8 md:mr-12 text-base sm:text-sm md:text-base">
         {/* Navigation */}
         <nav className={`fixed top-0 left-12 right-12 z-50 transition-all duration-300 ${
           isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
         }`}>
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-red-600">HOHAI</h1>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#home" className="text-gray-700 hover:text-red-600 transition-colors">Home</a>
                <a href="#services" className="text-gray-700 hover:text-red-600 transition-colors">Services</a>
                <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors">About</a>
                <a href="#faq" className="text-gray-700 hover:text-red-600 transition-colors">FAQ</a>
                <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</a>
                <Link href="/contact">
                  <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Get Started
                  </button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 hover:text-red-600"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                height: isMenuOpen ? "auto" : 0
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeInOut"
              }}
              className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <motion.div 
                className="px-2 pt-2 pb-3 space-y-1"
                initial={{ y: -20 }}
                animate={{ y: isMenuOpen ? 0 : -20 }}
                transition={{ 
                  duration: 0.3,
                  delay: isMenuOpen ? 0.1 : 0
                }}
              >
                {[
                  { href: "#home", label: "Home" },
                  { href: "#services", label: "Services" },
                  { href: "#about", label: "About" },
                  { href: "#faq", label: "FAQ" },
                  { href: "#contact", label: "Contact" }
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isMenuOpen ? 1 : 0,
                      x: isMenuOpen ? 0 : -20
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: isMenuOpen ? 0.1 + index * 0.05 : 0
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <Link href="/contact">
                  <motion.button 
                    className="w-full mt-3 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: isMenuOpen ? 1 : 0,
                      scale: isMenuOpen ? 1 : 0.9
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: isMenuOpen ? 0.3 : 0
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white overflow-hidden">
          {/* Parallax background elements */}
          <motion.div 
            className="absolute inset-0"
            style={{ y }}
          >
            <div className="absolute top-20 left-20 w-32 h-32 bg-red-200 rounded-full opacity-20"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-red-300 rounded-full opacity-30"></div>
            <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-red-100 rounded-full opacity-25"></div>
            <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-red-200 rounded-full opacity-20"></div>
          </motion.div>
          
          <div className="absolute inset-0 bg-opacity-50" style={{
            backgroundImage: `radial-gradient(circle at 30px 30px, #dc2626 1px, transparent 2px)`,
            backgroundSize: '60px 60px',
            opacity: 0.1
          }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Business with
                <span className="text-red-600 block">Innovative Tech Solutions</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4">
                HOHAI delivers cutting-edge mobile apps, web applications, and professional websites 
                that drive growth and enhance your digital presence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Link href="/contact">
                  <motion.button 
                    className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center active:scale-95"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </Link>
                <motion.button 
                  className="border-2 border-red-600 text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-red-600 hover:text-white transition-colors active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Our Work
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We specialize in creating innovative digital solutions that help businesses 
                thrive in the modern digital landscape.
              </p>
            </motion.div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-red-50 p-6 sm:p-8 rounded-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-red-200"
              >
                <motion.div 
                  className="bg-red-600 w-16 h-16 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature: string, featureIndex: number) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center text-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-red-600 rounded-full mr-3"
                        whileHover={{ scale: 1.5 }}
                      ></motion.div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="mt-6 flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link href={getServiceUrl(service.title)} className="text-red-600 font-semibold flex items-center hover:text-red-700 transition-colors group/link">
                    Learn More 
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/contact" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors text-center">
                    Get Quote
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
          </div>
        </section>

        {/* Additional IT Consultancy Services Carousel */}
        <section className="py-20 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">More IT Consultancy & Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We offer a wide range of IT services to help your business grow, innovate, and stay secure.
              </p>
            </motion.div>
            <div className="relative">
              {/* Left Button */}
              {carouselIndex > 0 && (
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
                  onClick={handleLeft}
                  aria-label="Scroll Left"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
              )}
              {/* Right Button */}
              {carouselIndex < totalCards - visibleCards && (
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
                  onClick={handleRight}
                  aria-label="Scroll Right"
                >
                  <ArrowRight className="w-6 h-6 text-gray-700" />
                </button>
              )}
              <div
                ref={carouselRef}
                className="flex space-x-8 overflow-x-auto pb-4 cursor-grab scrollbar-hide"
                style={{ WebkitOverflowScrolling: 'touch' }}
                onScroll={() => {
                  if (carouselRef.current) {
                    const cardWidth = 340
                    const idx = Math.round(carouselRef.current.scrollLeft / cardWidth)
                    setCarouselIndex(idx)
                  }
                }}
              >
                {additionalServices.map((service, idx) => (
                  <motion.div
                    key={service.name}
                    className="min-w-[320px] max-w-xs bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-between hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -8 }}
                  >
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{service.name}</h3>
                    <p className="text-gray-600 text-center mb-4">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

              {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-red-600 relative overflow-hidden">
        {/* Parallax background elements */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ y }}
        >
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white rounded-full"></div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer"
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: countersStarted ? 1 : 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    delay: index * 0.1 
                  }}
                >
                  {stat.number}{stat.suffix}
                </motion.div>
                <div className="text-red-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

              {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About HOHAI</h2>
              <p className="text-lg text-gray-600 mb-6">
                HOHAI is a leading technology solutions company dedicated to transforming 
                businesses through innovative digital solutions. Our team of experienced 
                developers and designers work together to create exceptional products 
                that drive results.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe in the power of technology to solve real-world problems and 
                create meaningful impact. Our commitment to quality, innovation, and 
                customer satisfaction sets us apart in the industry.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-red-600 mr-2" />
                  <span className="text-gray-700">Award Winning</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-red-600 mr-2" />
                  <span className="text-gray-700">Expert Team</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-100 to-red-200 p-8 rounded-xl"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
                  <div className="text-gray-700">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
                  <div className="text-gray-700">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">Fast</div>
                  <div className="text-gray-700">Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">Modern</div>
                  <div className="text-gray-700">Technology</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience with HOHAI.
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {loading ? (
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <Quote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No testimonials available at the moment.</p>
              </div>
            ) : (
              <>
                {/* Carousel Container */}
                <div className="relative overflow-hidden rounded-xl">
                  <motion.div
                    className="flex transition-transform duration-500 ease-in-out"
                    animate={{ x: `-${currentTestimonial * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: currentTestimonial === index ? 1 : 0.7,
                        scale: currentTestimonial === index ? 1 : 0.95
                      }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {/* Quote Icon */}
                      <div className="flex justify-between items-start mb-6">
                        <Quote className="w-8 h-8 text-red-600 opacity-50" />
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-600 mb-6 italic leading-relaxed text-sm sm:text-base">
                        "{testimonial.testimonial}"
                      </p>

                      {/* Project Outcome */}
                      <div className="bg-red-50 p-4 rounded-lg mb-6">
                        <h4 className="font-semibold text-red-600 mb-2 text-sm sm:text-base">{testimonial.projectType}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <span className="ml-2 font-medium">{testimonial.projectDuration}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Improvement:</span>
                            <span className="ml-2 font-medium text-green-600">{testimonial.projectImprovement}</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span className="text-gray-500 text-sm">Key Features:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {testimonial.projectFeatures.split(',').map((feature: string, featureIndex: number) => (
                              <span 
                                key={featureIndex}
                                className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                              >
                                {feature.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center">
                        <div className="relative w-12 h-12 mr-4">
                          <Image 
                            src={testimonial.photo} 
                            alt={testimonial.name}
                            fill
                            sizes="48px"
                            className="rounded-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">{testimonial.position}</p>
                          <p className="text-xs sm:text-sm text-red-600 font-medium">{testimonial.company}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-red-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              aria-label="Previous testimonial"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-red-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentTestimonial === index 
                      ? 'bg-red-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
              </>
            )}


          </div>

          {/* Overall Rating */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-white p-8 rounded-xl shadow-lg inline-block">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Overall Client Satisfaction</h3>
              <div className="flex justify-center items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-current mx-1" />
                ))}
                <span className="ml-3 text-2xl font-bold text-gray-900">5.0</span>
              </div>
              <p className="text-gray-600">Based on {testimonials.length} verified client reviews</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our services, process, and what makes HOHAI your ideal technology partner.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-red-600 flex-shrink-0" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === faq.id ? "auto" : 0,
                    opacity: openFAQ === faq.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* FAQ CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                We're here to help! Contact our team for personalized answers and expert guidance on your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Schedule a Call
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
                  Send Email
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Ready to transform your business? Let's discuss your project and 
                how we can help you achieve your goals.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-red-600 mr-4" />
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <div className="text-gray-600">+91 98765 43210<br />+91 94350 14933</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-red-600 mr-4" />
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <div className="text-gray-600">corphohai@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-red-600 mr-4" />
                    <div>
                      <div className="font-semibold text-gray-900">Address</div>
                      <div className="text-gray-600">Guwahati, Assam, India</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                {contactStatus.type && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                    contactStatus.type === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    {contactStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span>{contactStatus.message}</span>
                  </div>
                )}
                
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <div className="block text-gray-700 font-semibold mb-2">Name</div>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 font-semibold mb-2">Email</div>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 font-semibold mb-2">Message</div>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-4">HOHAI</h3>
                <p className="text-gray-400">
                  Transforming businesses through innovative technology solutions.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Mobile App Development</li>
                  <li>Web Applications</li>
                  <li>Professional Websites</li>
                  <li>Digital Consulting</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>About Us</li>
                  <li>Our Team</li>
                  <li>Careers</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Contact Us</li>
                  <li>Support</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 HOHAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Action Button */}
      <Link href="/contact">
        <motion.button
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl z-50 flex items-center justify-center touch-manipulation"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{ touchAction: 'manipulation' }}
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </Link>

      {/* Back to Top Button */}
      <motion.button
        className={`fixed bottom-4 sm:bottom-8 left-4 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl z-50 flex items-center justify-center transition-all duration-300 touch-manipulation ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ touchAction: 'manipulation' }}
      >
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-[-90deg]" />
      </motion.button>
    </div>
  )
}