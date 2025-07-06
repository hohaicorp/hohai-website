const { PrismaClient } = require('../app/generated/prisma')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setupAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    })

    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@hohai.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    console.log('Admin user created successfully:', {
      id: admin.id,
      email: admin.email,
      role: admin.role
    })

    console.log('Default credentials:')
    console.log('Email: admin@hohai.com')
    console.log('Password: admin123')

  } catch (error) {
    console.error('Error setting up admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupAdmin() 