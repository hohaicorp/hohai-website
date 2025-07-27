'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Play,
  Code,
  Smartphone,
  Monitor,
  Globe,
  Star,
  Eye,
  Heart
} from 'lucide-react'
import {
  AndroidMockup,
  AndroidTabMockup,
  IPhoneMockup,
  IPadMockup
} from "react-device-mockup"


const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Application",
    description: "A modern e-commerce platform with advanced features like real-time inventory, AI-powered recommendations, and seamless payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    deviceType: "laptop",
    previewContent: "ecommerce-preview"
  },
  {
    id: 2,
    title: "Fitness Tracking App",
    category: "Mobile Application",
    description: "A comprehensive fitness tracking app with workout plans, nutrition tracking, and social features for motivation.",
    technologies: ["React Native", "Firebase", "Redux", "HealthKit"],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    deviceType: "mobile",
    previewContent: "fitness-preview"
  },
  {
    id: 3,
    title: "Portfolio Website",
    category: "Website",
    description: "A stunning portfolio website with smooth animations, dark mode, and responsive design for creative professionals.",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    deviceType: "laptop",
    previewContent: "portfolio-preview"
  },
  {
    id: 4,
    title: "Task Management System",
    category: "Web Application",
    description: "A collaborative task management system with real-time updates, team collaboration, and project tracking.",
    technologies: ["Vue.js", "Express.js", "PostgreSQL", "Socket.io"],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    deviceType: "laptop",
    previewContent: "task-preview"
  },
  {
    id: 5,
    title: "Food Delivery App",
    category: "Mobile Application",
    description: "A food delivery app with real-time tracking, multiple payment options, and restaurant management system.",
    technologies: ["Flutter", "Node.js", "MongoDB", "Google Maps API"],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    deviceType: "mobile",
    previewContent: "food-preview"
  },
  {
    id: 6,
    title: "Blog Platform",
    category: "Website",
    description: "A modern blog platform with rich text editor, SEO optimization, and analytics dashboard.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    deviceType: "laptop",
    previewContent: "blog-preview"
  }
]

const categories = ["All", "Web Application", "Mobile Application", "Website"]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 animate-float"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-3000"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg font-semibold">Back to Home</span>
          </Link>
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Projects
          </motion.h1>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="relative z-10 py-20 px-6"
        style={{ y, opacity }}
        ref={containerRef}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            className="text-6xl md:text-8xl font-bold text-white mb-6 animate-gradient-shift bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Showcase
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Explore our portfolio of innovative digital solutions that transform ideas into reality
          </motion.p>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg shadow-red-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                  onHoverStart={() => setIsHovered(project.id)}
                  onHoverEnd={() => setIsHovered(null)}
                >
                  {/* Device Mockup */}
                  <div className="relative">
                    {project.deviceType === 'laptop' ? (
                      <motion.div 
                        className="relative mx-auto w-full max-w-md animate-float"
                        whileHover={{ y: -10, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IPadMockup screenWidth={400}>
                          {/* Project Preview Content */}
                          <div className="w-full h-full bg-white overflow-hidden">
                            {/* Browser Header */}
                            <div className="bg-gray-100 px-3 py-2 flex items-center justify-between text-xs border-b border-gray-200">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              </div>
                              <div className="bg-white px-3 py-1 rounded text-gray-600 font-medium shadow-sm">
                                {project.title}
                              </div>
                              <div className="w-4"></div>
                            </div>

                            {/* Web Content Preview */}
                            <div className="p-3">
                              {/* Hero Section */}
                              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-4 mb-3 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="text-sm font-bold text-gray-800">Web Project Presentation</h3>
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                                <div className="bg-white rounded-lg p-2 mb-2 shadow-sm">
                                  <div className="w-full h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded flex items-center justify-center">
                                    <div className="text-white text-xs font-semibold">Featured Image</div>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-600">
                                  Modern web showcase with responsive design
                                </div>
                              </div>

                              {/* Content Sections */}
                              <div className="space-y-2">
                                <div className="bg-gray-50 rounded p-2 shadow-sm">
                                  <div className="w-full h-8 bg-gray-200 rounded mb-1"></div>
                                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                                </div>
                                <div className="bg-gray-50 rounded p-2 shadow-sm">
                                  <div className="w-full h-8 bg-gray-200 rounded mb-1"></div>
                                  <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Hover Overlay */}
                          <motion.div
                            className="absolute inset-0 bg-black/80 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered === project.id ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-center text-white">
                              <motion.button
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold mb-3 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Play className="w-5 h-5 inline mr-2" />
                                View Demo
                              </motion.button>
                              <div className="flex justify-center space-x-3">
                                <motion.button
                                  className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Github className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        </IPadMockup>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="relative mx-auto w-full max-w-xs animate-float"
                        whileHover={{ y: -10, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IPhoneMockup screenWidth={200}>
                          {/* Project Preview Content */}
                          <div className="w-full h-full bg-white overflow-hidden">
                            {/* Mobile App Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-white">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div className="text-xs font-semibold">{project.title}</div>
                                <div className="w-6"></div>
                              </div>
                            </div>

                            {/* Mobile App Content */}
                            <div className="p-4">
                              {/* App Icon */}
                              <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center">
                                  <div className="text-white text-xs font-bold">APP</div>
                                </div>
                              </div>

                              {/* App Content */}
                              <div className="space-y-3">
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="w-full h-6 bg-gray-200 rounded mb-2"></div>
                                  <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="w-full h-6 bg-gray-200 rounded mb-2"></div>
                                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="w-full h-6 bg-gray-200 rounded mb-2"></div>
                                  <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                                </div>
                              </div>

                              {/* Bottom Navigation */}
                              <div className="absolute bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 px-4 py-2">
                                <div className="flex justify-around">
                                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                </div>
                              </div>
                              
                              {/* Home Indicator */}
                              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* Hover Overlay */}
                          <motion.div
                            className="absolute inset-0 bg-black/80 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered === project.id ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-center text-white">
                              <motion.button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold mb-2 transition-colors text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Play className="w-4 h-4 inline mr-1" />
                                Demo
                              </motion.button>
                              <div className="flex justify-center space-x-2">
                                <motion.button
                                  className="bg-gray-800 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </motion.button>
                                <motion.button
                                  className="bg-gray-800 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Github className="w-3 h-3" />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        </IPhoneMockup>
                      </motion.div>
                    )}
                  </div>

                  {/* Project Info */}
                  <motion.div 
                    className="mt-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      {project.deviceType === 'laptop' && <Monitor className="w-5 h-5 text-blue-400" />}
                      {project.deviceType === 'mobile' && <Smartphone className="w-5 h-5 text-green-400" />}
                      <span className="text-sm text-gray-400 uppercase tracking-wider">{project.category}</span>
                      {project.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + techIndex * 0.1 }}
                          whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                      <motion.button
                        className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 animate-pulse-glow"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4 inline mr-2" />
                        View Project
                      </motion.button>
                      <motion.button
                        className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:border-red-500 hover:text-red-400 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="w-4 h-4 inline mr-2" />
                        Like
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        className="relative z-10 py-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Let's create something amazing together. Get in touch and let's discuss your next big idea.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 animate-pulse-glow"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
            <motion.button
              className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-red-500 hover:text-red-400 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  )
} 