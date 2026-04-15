# HOHAI - Complete Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Razorpay Business Account
- Git

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd hohai-website

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Create .env.local file
cp .env.example .env.local
```

### 2. Database Setup

**Option A: Local PostgreSQL**
```bash
# Create database
createdb hohai_db

# Update .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/hohai_db"

# Run migrations
npx prisma migrate dev
```

**Option B: Remote Database (Vercel/Neon)**
```bash
# Use your remote database provider
DATABASE_URL="postgresql://user:password@host:5432/database"
npx prisma migrate deploy
```

### 3. Environment Configuration

Create `.env.local`:

```env
# Database
DATABASE_URL="postgresql://..."
SHADOW_DATABASE_URL="postgresql://..." # For Prisma migrations

# Email
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="noreply@hohai.com"
ADMIN_EMAIL="admin@yourschool.com"

# Razorpay Payment Gateway
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="your-secret-key-min-32-chars"
NODE_ENV="development"
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📦 Project Structure

```
app/
├── page.tsx                    # Home Page
├── products/page.tsx           # Products Showcase
├── courses/page.tsx            # Courses & Webinars
├── career-counselling/         # Career Services
├── admin/
│   ├── dashboard/page.tsx      # Admin Dashboard
│   └── institutions/page.tsx   # Manage Institutions
├── api/
│   ├── contact/route.ts        # Contact Form
│   ├── institutions/route.ts   # Institution APIs
│   ├── courses/route.ts        # Course APIs
│   ├── students/route.ts       # Student Management
│   ├── attendance/route.ts     # Attendance Tracking
│   ├── payments/route.ts       # Payment Processing
│   ├── career-sessions/route.ts# Career Sessions
│   └── webhooks/razorpay/      # Payment Webhooks
└── lib/
    ├── razorpay.ts            # Razorpay Integration
    ├── email.ts               # Email Service
    └── api.ts                 # API Client

prisma/
├── schema.prisma              # Database Schema
└── migrations/                # Migration History
```

## 💳 Payment Gateway Setup

### Razorpay Configuration

1. **Create Razorpay Account**
   - Visit https://razorpay.com
   - Sign up and verify your business
   - Generate API keys from dashboard

2. **Add Keys to .env.local**
   ```
   RAZORPAY_KEY_ID="rzp_live_xxx"
   RAZORPAY_KEY_SECRET="xxx"
   ```

3. **Setup Webhook**
   - In Razorpay Dashboard → Settings → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/razorpay`
   - Select events: `payment.authorized`, `payment.captured`, `payment.failed`
   - Copy webhook secret

4. **Test Payments**
   ```
   Card: 4111111111111111
   Expiry: Any future date
   CVV: Any 3 digits
   OTP: 123456
   ```

## 📧 Email Service Setup

### Gmail Configuration

1. **Enable App Password**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Generate App Password for Mail
   - Copy 16-character password

2. **Update .env.local**
   ```
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASSWORD="16-char-password"
   ```

### Using Other Email Providers

For SendGrid, Mailgun, or AWS SES, update:
```env
EMAIL_HOST="smtp.sendgrid.net"  # or appropriate SMTP
EMAIL_USER="apikey"
EMAIL_PASSWORD="your-api-key"
```

## 🔐 Security Configuration

Before deploying to production:

1. **Update Security Headers**
   - Edit `next.config.js`
   - Add rate limiting middleware
   - Enable CORS properly

2. **Database Security**
   - Use strong passwords
   - Enable SSL connections
   - Regular backups

3. **API Security**
   - Implement rate limiting
   - Add input validation
   - Use HTTPS only

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Set environment variables in Vercel Dashboard
# Deploy automatically on git push
```

### Option 2: Docker Deployment

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
# Build and run
docker build -t hohai .
docker run -e DATABASE_URL="..." -e RAZORPAY_KEY_ID="..." -p 3000:3000 hohai
```

### Option 3: DigitalOcean/AWS EC2

```bash
# SSH to server
ssh ubuntu@your-server-ip

# Clone repo
git clone <repo-url>
cd hohai-website

# Install dependencies
npm install

# Build
npm run build

# Install PM2
npm install -g pm2

# Start app
pm2 start npm --name "hohai" -- start
pm2 save
pm2 startup

# Setup Nginx as reverse proxy
sudo apt install nginx
# Configure /etc/nginx/sites-available/default to proxy to localhost:3000
```

## 📊 Database Migrations

### Create Migration
```bash
# After schema changes
npx prisma migrate dev --name describe_change
```

### Deploy Migration
```bash
# In production
npx prisma migrate deploy
```

### Rollback (if needed)
```bash
# Note: Vercel doesn't support rollbacks automatically
# Manual: Delete migration file and recreate database
```

## 🔧 API Endpoints Reference

### Institutions
- `GET /api/institutions` - List all
- `POST /api/institutions` - Create new
- `PUT /api/institutions` - Update
- `GET /api/institutions?id={id}` - Get specific

### Courses
- `GET /api/courses` - List courses
- `GET /api/courses?featured=true` - Featured only
- `POST /api/courses` - Create new
- `PUT /api/courses` - Update
- `DELETE /api/courses` - Delete

### Payments
- `GET /api/payments` - List payments
- `POST /api/payments` - Create payment
- `POST /api/payments/verify` - Verify Razorpay
- `PUT /api/payments` - Update status

### Students
- `GET /api/students?institutionId={id}` - List
- `POST /api/students` - Add new
- `PUT /api/students` - Update
- `DELETE /api/students` - Remove

### Attendance
- `GET /api/attendance?studentId={id}` - Get records
- `POST /api/attendance` - Record attendance
- `PUT /api/attendance` - Update
- `DELETE /api/attendance` - Delete

## 📝 Admin Features

Access admin panel at `/admin/dashboard`

### Dashboard
- See key metrics
- Recent institutions
- Active courses
- Revenue tracking

### Institutions
- Add/Edit/Delete institutions
- View subscription details
- Manage student count

### Courses
- Create courses with instructors
- Set pricing
- Manage enrollments
- Generate certificates

## ✅ Pre-Deployment Checklist

- [ ] Database configured and migrated
- [ ] Email service working (test email sending)
- [ ] Razorpay keys configured
- [ ] Environment variables set
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in dev
- [ ] Contact form working
- [ ] Payments tested
- [ ] Admin panel accessible
- [ ] Domain DNS configured
- [ ] SSL certificate installed
- [ ] Rate limiting enabled
- [ ] CORS configured properly
- [ ] Backup strategy in place
- [ ] Monitoring/logging setup

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED
```
Solution: Check DATABASE_URL and ensure PostgreSQL is running

### Prisma Client Not Found
```bash
npm run build
npm run dev
```

### Email Not Sending
- Enable Less Secure Apps for Gmail
- Check SMTP credentials
- Verify firewall allows SMTP

### Payment Integration Issues
- Verify Razorpay keys are correct
- Check webhook endpoint is accessible
- Review Razorpay dashboard for failed payments

## 📞 Support & Resources

- **Prisma Docs**: https://www.prisma.io/docs/
- **Next.js Docs**: https://nextjs.org/docs
- **Razorpay Docs**: https://razorpay.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## 📄 License

This project is proprietary. All rights reserved.

---

**Last Updated**: April 2026
**Version**: 1.0.0-beta
