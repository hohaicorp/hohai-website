# HOHAI - Complete Platform for Educational Institutions
## One Stop Solution for All Your Problems - Partner to a School, Parent & Student

A comprehensive SaaS platform designed for schools, colleges, academies, and coaching institutes to manage student operations, deliver online courses, and provide career counselling.

## 🚀 Features

### Core Products
- **Student ERP System** - Complete admission, documentation, and student information management
- **Attendance Management** - Real-time tracking with biometric integration and automated notifications
- **Payment Gateway** - Integrated payment processing for fees, courses, and services
- **Library Management** - Digital library with book inventory and RFID support
- **Facility Management** - Hostel, transportation, cafeteria, and maintenance management
- **Webinars & Courses** - Live streaming, recorded sessions, and automated certificates

### Additional Features
- **Courses & Webinars** - From IIT/IIM alumni and MNC professionals
- **Career Counselling** - 1-on-1 guidance from industry experts
- **Multiple Subscription Plans** - STARTER, PROFESSIONAL, ENTERPRISE
- **Revenue Generation** - Sell courses and premium content
- **Analytics Dashboard** - Real-time insights and reporting

## 📋 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Nodemailer (SMTP)
- **Authentication**: JWT (ready for integration)
- **Payment**: Razorpay & Stripe ready (integration pending)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ & npm
- PostgreSQL database
- Git

### 1. Clone & Install

```bash
cd hohai-website
npm install
```

### 2. Database Setup

Create a PostgreSQL database:
```bash
createdb hohai_db
```

### 3. Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update with your values:
```
DATABASE_URL="postgresql://user:password@localhost:5432/hohai_db"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
ADMIN_EMAIL="admin@yourschool.com"
```

### 4. Run Migrations

```bash
npx prisma migrate dev --name init
```

This will:
- Create all database tables from schema
- Generate Prisma Client
- Seed initial data (optional)

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
app/
├── page.tsx                 # Homepage
├── products/page.tsx        # Products showcase
├── courses/page.tsx         # Courses & webinars listing
├── career-counselling/      # Career counselling services
├── api/
│   ├── contact/            # Contact form API
│   ├── institutions/       # Institution management
│   ├── courses/            # Course management
│   ├── students/           # Student management
│   ├── attendance/         # Attendance tracking
│   ├── payments/           # Payment processing
│   └── subscriptions/      # Subscription management
├── lib/
│   ├── api.ts             # API client functions
│   └── email.ts           # Email sending utilities
└── components/
    └── ResponsiveNav.tsx   # Navigation component

prisma/
├── schema.prisma          # Database schema
└── migrations/            # Database migrations
```

## 🔌 API Endpoints

### Institutions
- `GET /api/institutions` - List all institutions
- `POST /api/institutions` - Create new institution
- `PUT /api/institutions` - Update institution
- `GET /api/institutions?id={id}` - Get specific institution

### Courses
- `GET /api/courses` - List courses
- `GET /api/courses?featured=true` - Get featured courses
- `POST /api/courses` - Create course
- `PUT /api/courses` - Update course
- `DELETE /api/courses` - Delete course

### Students
- `GET /api/students?institutionId={id}` - List students
- `POST /api/students` - Add new student
- `PUT /api/students` - Update student
- `DELETE /api/students` - Remove student

### Attendance
- `GET /api/attendance?studentId={id}` - Get attendance records
- `POST /api/attendance` - Record attendance
- `PUT /api/attendance` - Update attendance
- `DELETE /api/attendance` - Delete attendance

### Payments
- `GET /api/payments` - List payments
- `POST /api/payments` - Process payment
- `PUT /api/payments` - Update payment status

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact inquiries

## 📦 Deployment

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

During setup:
- Connect your GitHub repo
- Add environment variables in Vercel dashboard
- Deploy with one click

### Option 2: Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t hohai .
docker run -e DATABASE_URL="..." -p 3000:3000 hohai
```

### Option 3: Traditional Server (AWS/DigitalOcean)

```bash
# SSH to your server
ssh user@your-server.com

# Clone repo
git clone your-repo-url
cd hohai-website

# Install dependencies
npm install

# Build
npm run build

# Use PM2 to keep it running
npm install -g pm2
pm2 start npm --name "hohai" -- start
pm2 save
```

## 🔐 Security Features Needed

Before production deployment:

1. **Add Authentication**
   - Implement JWT or NextAuth.js
   - Add role-based access control (RBAC)

2. **Payment Security**
   - Integrate Razorpay/Stripe securely
   - Implement PCI compliance

3. **Data Protection**
   - Add rate limiting
   - Implement CORS properly
   - Add input validation/sanitization

4. **Environment**
   - Use HTTPS only
   - Set secure cookies
   - Add helmet middleware

## 📊 Database Schema

Key models:
- **Institution** - Schools, colleges, coaching institutes
- **SubscriptionPlan** - Pricing plans
- **Subscription** - Active subscriptions
- **InstitutionStudent** - Student records
- **Attendance** - Daily attendance
- **Course** - Online courses/webinars
- **CourseEnrollment** - Student enrollments
- **Payment** - Payment transactions
- **ContactMessage** - Lead inquiries
- **CallRequest** - Call request bookings

## 📝 Next Steps

1. **Add Admin Dashboard**
   - Manage institutions
   - View analytics
   - Handle payments

2. **Implement Payment Gateway**
   - Razorpay integration
   - Webhook handling
   - Receipt generation

3. **Student Portal**
   - Attendance view
   - Fee payment
   - Course enrollment
   - Career counselling booking

4. **Mobile App**
   - React Native or Flutter
   - Student app
   - Parent app

5. **Email Notifications**
   - Attendance alerts
   - Payment confirmations
   - Course updates

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
Solution: Ensure PostgreSQL is running and DATABASE_URL is correct.

### Prisma Client Not Found
```
npm run build
npm run dev
```

### Email Not Sending
- Enable "Less secure app access" for Gmail
- Use app-specific password for Gmail
- Check SMTP credentials in .env.local

## 📞 Support & Documentation

- Prisma Docs: https://www.prisma.io/docs/
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

## 📄 License

This project is proprietary software. All rights reserved.

## ✅ Checklist for Deployment

- [ ] Database configured and migrated
- [ ] Environment variables set
- [ ] Email service configured
- [ ] Prisma Client generated
- [ ] Build succeeds: `npm run build`
- [ ] Admin account created
- [ ] Contact page working
- [ ] All API endpoints tested
- [ ] HTTPS enabled
- [ ] Domain DNS updated
- [ ] Backup strategy in place

---

**Built with ❤️ for Educational Institutions**
