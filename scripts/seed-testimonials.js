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
        institutionType: "SCHOOL",
        contactPerson: "Priya Sharma",
        position: "Principal, Delhi Public School",
        email: "priya@dps.com",
        company: "Delhi Public School",
        productsUsed: "ERP, Attendance, Courses",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
        rating: 5,
        testimonial: "HOHAI transformed our school management with an incredible ERP platform. Student enrollment increased by 40% and administrative efficiency improved by 60%. Highly recommended!"
      },
      {
        name: "Rajesh Kumar",
        institutionType: "COLLEGE",
        contactPerson: "Rajesh Kumar",
        position: "Dean, Technical Institute",
        email: "rajesh@tech-institute.com",
        company: "Technical Institute",
        productsUsed: "Courses, Attendance, Payments",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
        rating: 5,
        testimonial: "The online course platform HOHAI built for us is phenomenal. Student engagement increased by 250% and we've trained 5000+ professionals. Exceptional quality!"
      },
      {
        name: "Anjali Patel",
        institutionType: "COACHING",
        contactPerson: "Anjali Patel",
        position: "Founder, Excellence Coaching",
        email: "anjali@excellence.com",
        company: "Excellence Coaching",
        productsUsed: "Payment Gateway, Career Counselling, Webinars",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
        rating: 5,
        testimonial: "HOHAI's expertise in educational technology is unmatched. Their platform helped us scale from 500 to 5000 students. The payment gateway integration works flawlessly!"
      },
      {
        name: "Vikram Singh",
        institutionType: "SCHOOL",
        contactPerson: "Vikram Singh",
        position: "Manager, Central School",
        email: "vikram@central-school.com",
        company: "Central School",
        productsUsed: "ERP, Attendance, Career Counselling",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
        rating: 5,
        testimonial: "Working with HOHAI was a game-changer for our school. Attendance tracking is now automated, reducing paperwork by 80%. Student management has never been easier!"
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