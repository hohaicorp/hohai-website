const { PrismaClient } = require('../app/generated/prisma')

const prisma = new PrismaClient()

async function seedTestimonials() {
  try {
    // Check if testimonials already exist
    const existingTestimonials = await prisma.testimonial.count()
    
    if (existingTestimonials > 0) {
      console.log('Testimonials already exist, skipping seed...')
      return
    }

    const testimonials = [
      {
        name: "Priya Sharma",
        position: "CEO, TechStart Solutions",
        company: "TechStart Solutions",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
        rating: 5,
        testimonial: "HOHAI transformed our business with an incredible e-commerce platform. The team delivered our project 2 weeks ahead of schedule, and the results exceeded our expectations. Our online sales increased by 300% within the first 3 months!",
        projectType: "E-commerce Platform",
        projectDuration: "8 weeks",
        projectImprovement: "300% increase in online sales",
        projectFeatures: "Payment Gateway Integration, Inventory Management, Mobile App"
      },
      {
        name: "Rajesh Kumar",
        position: "Founder, FoodExpress",
        company: "FoodExpress",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
        rating: 5,
        testimonial: "The mobile app HOHAI built for our food delivery service is absolutely phenomenal. User engagement increased by 250%, and our delivery time tracking feature has reduced customer complaints by 80%. Highly recommended!",
        projectType: "Food Delivery Mobile App",
        projectDuration: "12 weeks",
        projectImprovement: "250% increase in user engagement",
        projectFeatures: "Real-time Tracking, Payment Integration, Driver App"
      },
      {
        name: "Anjali Patel",
        position: "Marketing Director, EduTech Pro",
        company: "EduTech Pro",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
        rating: 5,
        testimonial: "HOHAI's expertise in educational technology is unmatched. They created a comprehensive learning management system that has helped us onboard 10,000+ students. The platform is intuitive, scalable, and has revolutionized our teaching methods.",
        projectType: "Learning Management System",
        projectDuration: "16 weeks",
        projectImprovement: "10,000+ students onboarded",
        projectFeatures: "Video Conferencing, Assignment Tracking, Analytics Dashboard"
      },
      {
        name: "Vikram Singh",
        position: "CTO, HealthCare Plus",
        company: "HealthCare Plus",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
        rating: 5,
        testimonial: "Working with HOHAI on our healthcare management system was a game-changer. The platform handles patient data securely, streamlines appointments, and has reduced administrative workload by 60%. The team's attention to detail is exceptional.",
        projectType: "Healthcare Management System",
        projectDuration: "20 weeks",
        projectImprovement: "60% reduction in administrative workload",
        projectFeatures: "Patient Portal, Appointment Scheduling, Secure Data Storage"
      }
    ]

    for (const testimonial of testimonials) {
      await prisma.testimonial.create({
        data: testimonial
      })
    }

    console.log('Testimonials seeded successfully!')
    console.log(`Created ${testimonials.length} testimonials`)

  } catch (error) {
    console.error('Error seeding testimonials:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedTestimonials() 