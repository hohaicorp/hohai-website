'use client'

import { motion } from 'framer-motion'
import { 
  Smartphone, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Users, 
  Zap,
  Code,
  Smartphone as PhoneIcon,
  Globe,
  Database,
  Shield,
  BarChart3,
  Cloud,
  Server,
  Repeat,
  Cpu,
  Settings,
  Monitor,
  TrendingUp,
  Edit,
  Plus,
  Trash2,
  Eye
} from 'lucide-react'
import Link from 'next/link'

export default function MobileAppService() {
  const processSteps = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "We analyze your requirements, target audience, and business goals to create a comprehensive project plan.",
      duration: "1-2 weeks",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: 2,
      title: "UI/UX Design",
      description: "Our designers create intuitive, user-friendly interfaces that provide exceptional user experience.",
      duration: "2-3 weeks",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Development",
      description: "Expert developers build your app using the latest technologies and best practices.",
      duration: "6-12 weeks",
      icon: <Code className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Testing & QA",
      description: "Rigorous testing ensures your app works flawlessly across all devices and scenarios.",
      duration: "2-3 weeks",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 5,
      title: "Deployment",
      description: "We handle app store submissions and ensure smooth deployment to production.",
      duration: "1-2 weeks",
      icon: <Zap className="w-6 h-6" />
    },
    {
      step: 6,
      title: "Support & Maintenance",
      description: "Ongoing support, updates, and maintenance to keep your app running smoothly.",
      duration: "Ongoing",
      icon: <Shield className="w-6 h-6" />
    }
  ]

  const features = [
    "Native iOS & Android Development",
    "Cross-platform Development (React Native/Flutter)",
    "Custom UI/UX Design",
    "Push Notifications",
    "Offline Functionality",
    "Payment Gateway Integration",
    "Social Media Integration",
    "Analytics & Reporting",
    "App Store Optimization",
    "24/7 Support & Maintenance"
  ]

  const pricingPlans = [
    {
      name: "Basic App",
      price: "₹20,000 - ₹50,000",
      duration: "4-6 weeks",
      description: "Perfect for startups and small businesses",
      features: [
        "Simple UI/UX Design",
        "Core Features Development",
        "Single Platform (iOS or Android)",
        "Basic Testing",
        "App Store Submission",
        "3 Months Support",
        "Basic Analytics",
        "Push Notifications"
      ],
      popular: false
    },
    {
      name: "Professional App",
      price: "₹50,000 - ₹1,00,000",
      duration: "8-12 weeks",
      description: "Ideal for growing businesses",
      features: [
        "Advanced UI/UX Design",
        "Cross-platform Development",
        "Advanced Features",
        "Comprehensive Testing",
        "Analytics Integration",
        "6 Months Support",
        "Performance Optimization",
        "Payment Integration",
        "Social Media Login",
        "Offline Functionality"
      ],
      popular: true
    },
    {
      name: "Enterprise App",
      price: "₹1,00,000 - ₹2,50,000",
      duration: "12-20 weeks",
      description: "For large-scale applications",
      features: [
        "Custom Enterprise Features",
        "Advanced Security",
        "Scalable Architecture",
        "API Development",
        "Admin Dashboard",
        "1 Year Support",
        "Performance Monitoring",
        "Custom Integrations",
        "Multi-language Support",
        "Advanced Analytics",
        "Real-time Features",
        "Cloud Integration"
      ],
      popular: false
    }
  ]

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

  return (
    <div className="min-h-screen bg-white">
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
                <Smartphone className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Mobile App Development</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Transform your business with cutting-edge mobile applications. We build native and cross-platform apps that deliver exceptional user experiences and drive real results.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We follow a proven 6-step process to ensure your mobile app is delivered on time, within budget, and exceeds expectations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4">
                    {step.step}
                  </div>
                  <div className="text-red-600">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {step.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every mobile app project includes these essential features and services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-red-600 mr-4 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Affordable mobile app development solutions tailored for the Indian market. Choose the perfect plan that fits your budget and requirements.
            </p>
            
            {/* Pricing Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4"
              >
                <div className="text-2xl font-bold text-red-600 mb-2">₹20K</div>
                <div className="text-sm text-gray-600">Starting Price</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center p-4"
              >
                <div className="text-2xl font-bold text-red-600 mb-2">4-6 Weeks</div>
                <div className="text-sm text-gray-600">Fastest Delivery</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center p-4"
              >
                <div className="text-2xl font-bold text-red-600 mb-2">Flexible</div>
                <div className="text-sm text-gray-600">Payment Plans</div>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                  plan.popular ? 'ring-2 ring-red-600' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Best Value
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-red-600 mb-1">{plan.price}</div>
                    <div className="text-sm text-gray-500 font-medium">Starting from</div>
                  </div>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {plan.duration}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors inline-block text-center ${
                  plan.popular
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Get Quote
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pricing Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Detailed Feature Comparison</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Features</th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase">Basic</th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase">Professional</th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">UI/UX Design</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Simple</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Advanced</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Custom</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Platform Support</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Single</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Cross-platform</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Multi-platform</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Payment Integration</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-400">—</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Analytics</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Basic</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Advanced</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Enterprise</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Support Period</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">3 Months</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">6 Months</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">1 Year</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Real-time Features</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-400">—</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-400">—</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Pricing Options</h3>
              <p className="text-gray-600 text-sm">
                Our pricing is based on app complexity, features, and development time. We offer flexible payment plans and can work within your budget constraints. 
                Contact us for a detailed quote tailored to your specific requirements.
              </p>
            </div>
            <p className="text-gray-600 mb-4">Need a custom solution? Let's discuss your specific requirements.</p>
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Contact Us for Custom Quote
            </button>
          </motion.div>
        </div>
      </section>

      {/* Additional IT Consultancy Services Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <motion.div
            className="flex space-x-8 overflow-x-auto pb-4 cursor-grab"
            drag="x"
            dragConstraints={{ left: -((additionalServices.length - 3) * 340), right: 0 }}
            style={{ WebkitOverflowScrolling: 'touch' }}
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
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Mobile App?</h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a mobile app that drives real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Your Project
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 