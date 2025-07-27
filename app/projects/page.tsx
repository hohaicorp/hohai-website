'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Play, ExternalLink, Github, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "PowerFit Pro Gym Website",
    category: "Website",
    description: "A modern, responsive gym website with class booking, trainer profiles, and fitness tracking features. Built with HTML5, CSS3, and JavaScript.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Fitness UI/UX"],
    image: "/screenshots/gym-destop.jpg",
    demoUrl: "/gym-website/index.html",
    githubUrl: "#",
    deviceType: "laptop"
  },
  {
    id: 2,
    title: "PowerFit Pro Mobile",
    category: "Mobile App",
    description: "Mobile-optimized version of the gym website with touch-friendly interface and mobile-specific features.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Mobile-First", "Touch UI"],
    image: "/screenshots/gym-mobile.jpg",
    demoUrl: "/gym-website/index.html",
    githubUrl: "#",
    deviceType: "mobile"
  },
  {
    id: 3,
    title: "DMSM Admin",
    category: "E-Commerce Platform",
    description: "A comprehensive e-commerce platform for Dhunu Munu Super Mart featuring consumer mobile app, delivery management, and admin panel. Complete solution with inventory management, order tracking, and payment processing.",
    technologies: ["React Native", "Node.js", "MongoDB", "Express.js", "Payment Gateway", "Real-time Tracking"],
    image: "/screenshots/dms-mobile.png",
    demoUrl: "#",
    githubUrl: "#",
    deviceType: "laptop"
  },
  {
    id: 4,
    title: "DMSM Mobile App",
    category: "Mobile App",
    description: "Consumer-side mobile application for Dhunu Munu Super Mart with product browsing, cart management, order placement, and real-time delivery tracking.",
    technologies: ["React Native", "Redux", "Firebase", "Push Notifications", "GPS Tracking", "Payment Integration"],
    image: "/screenshots/dms-desktop.jpg",
    demoUrl: "#",
    githubUrl: "#",
    deviceType: "mobile"
  },
  {
    id: 5,
    title: "Portfolio Website",
    category: "Website",
    description: "A modern portfolio website showcasing creative work with smooth animations and interactive elements.",
    technologies: ["Next.js", "Framer Motion", "TypeScript", "Tailwind CSS", "GSAP"],
    image: "/screenshots/dms-mobile.jpg",
    demoUrl: "#",
    githubUrl: "#",
    deviceType: "laptop"
  },
  {
    id: 6,
    title: "Weather Dashboard",
    category: "Web Application",
    description: "A weather dashboard with real-time data, interactive maps, and detailed weather forecasts.",
    technologies: ["React", "OpenWeather API", "Chart.js", "Geolocation", "PWA"],
    image: "/screenshots/dms-desktop.jpg",
    demoUrl: "#",
    githubUrl: "#",
    deviceType: "mobile"
  }
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(project => project.category)));
    return ['all', ...uniqueCategories];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Blobs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-200 to-red-300 rounded-full opacity-20 animate-float"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-red-300 to-pink-200 rounded-full opacity-15 animate-float"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-200 to-red-200 rounded-full opacity-20 animate-float"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-red-300 to-red-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Back to Dashboard Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/">
            <motion.button
              className="inline-flex items-center gap-2 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </motion.button>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent animate-gradient-shift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Projects
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our portfolio of innovative web applications, websites, and mobile solutions. 
            Each project showcases our expertise in modern web technologies and user experience design.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-red-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              onMouseEnter={() => setIsHovered(project.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              {/* Project Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Device Mockup */}
                <div className="relative">
                  {project.deviceType === 'laptop' ? (
                    <motion.div 
                      className="relative mx-auto w-full max-w-2xl animate-float"
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Laptop Mockup with Clean Frame */}
                      <div className="relative">
                        {/* Laptop Base */}
                        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-2 shadow-2xl">
                          {/* Screen Frame */}
                          <div className="bg-black rounded-t-lg p-1">
                            {/* Camera */}
                            <div className="w-2 h-2 bg-gray-600 rounded-full mx-auto mb-1"></div>
                            {/* Screen */}
                            <div className="bg-white rounded-lg overflow-hidden aspect-video relative">
                              <Image
                                src={project.image}
                                alt={`${project.title} Screenshot`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                              
                              {/* Hover Overlay */}
                              <motion.div
                                className="absolute inset-0 bg-black/80 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered === project.id ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="text-center text-white">
                                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                    <motion.button
                                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold mb-3 transition-colors"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Play className="w-5 h-5 inline mr-2" />
                                      View Demo
                                    </motion.button>
                                  </Link>
                                  <div className="flex justify-center space-x-3">
                                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                      <motion.button
                                        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                      </motion.button>
                                    </Link>
                                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                      <motion.button
                                        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <Github className="w-4 h-4" />
                                      </motion.button>
                                    </Link>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                          {/* Keyboard Area */}
                          <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg p-2 mt-1">
                            <div className="w-16 h-1 bg-gray-600 rounded-full mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="relative mx-auto w-full max-w-xs animate-float"
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Phone Mockup with Clean Frame */}
                      <div className="relative">
                        {/* Phone Frame */}
                        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-2 shadow-2xl">
                          {/* Screen */}
                          <div className="bg-black rounded-2xl p-1">
                            <div className="bg-white rounded-xl overflow-hidden aspect-[9/16] relative">
                              <Image
                                src={project.image}
                                alt={`${project.title} Screenshot`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 25vw"
                              />
                              
                              {/* Hover Overlay */}
                              <motion.div
                                className="absolute inset-0 bg-black/80 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered === project.id ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="text-center text-white">
                                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                    <motion.button
                                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold mb-2 transition-colors text-sm"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Play className="w-4 h-4 inline mr-1" />
                                      Demo
                                    </motion.button>
                                  </Link>
                                  <div className="flex justify-center space-x-2">
                                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                      <motion.button
                                        className="bg-gray-800 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                      </motion.button>
                                    </Link>
                                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                      <motion.button
                                        className="bg-gray-800 hover:bg-gray-700 text-white p-1.5 rounded-lg transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <Github className="w-3 h-3" />
                                      </motion.button>
                                    </Link>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                          {/* Home Indicator */}
                          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mt-1"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Project Info */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-red-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-4">
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Project
                      </motion.button>
                    </Link>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        className="bg-white border border-gray-300 hover:border-red-300 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Code
                      </motion.button>
                    </Link>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-red-50 to-red-100 text-red-700 text-xs font-medium rounded-full border border-red-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's bring your ideas to life with cutting-edge web technologies and exceptional user experience design.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            <Link href="/contact">
              <motion.button
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
            </Link>
            <Link href="/services">
              <motion.button
                className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Services
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 