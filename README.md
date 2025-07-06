# HOHAI - Tech Solutions Website

A modern, professional website for HOHAI, a technology solutions company specializing in mobile apps, web applications, and professional websites. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎨 Design Theme

The website features a beautiful red and white color scheme inspired by the Assamese traditional "gamusa" (traditional towel/cloth), creating a professional and culturally meaningful design.

## ✨ Features

- **Responsive Design**: Fully responsive across all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Performance Optimized**: Built with Next.js for optimal performance
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessible**: WCAG compliant design
- **Interactive Elements**: Smooth scroll navigation and hover effects
- **Contact Form**: Functional contact form with email notifications
- **Email System**: Automatic email notifications for contact form submissions
- **Admin Dashboard**: Full admin panel for managing testimonials and messages
- **Database Integration**: PostgreSQL database with Prisma ORM
- **Authentication**: JWT-based admin authentication

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 📱 Sections

1. **Hero Section**: Compelling headline with call-to-action buttons
2. **Services**: Three main service offerings with detailed features
3. **Statistics**: Key metrics and achievements
4. **About**: Company information and values
5. **Contact**: Contact form and company information
6. **Footer**: Links and company details

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Gmail account (for email functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hohai-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hohai_db"

# JWT Secret for admin authentication
JWT_SECRET="your-super-secret-jwt-key-here"

# Email Configuration
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
ADMIN_EMAIL="admin@hohai.com"
```

4. Set up the database:
```bash
# Run database migrations
npx prisma migrate dev

# Seed the database with initial data
node scripts/setup-admin.js
node scripts/seed-testimonials.js
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Email Setup

For the contact form email functionality to work:

1. **Gmail Setup**:
   - Enable 2-factor authentication on your Google account
   - Go to Google Account settings > Security > App passwords
   - Generate a new app password for "Mail"
   - Use that password in `EMAIL_PASS`

2. **Alternative Email Services**:
   - You can change the email service in `app/lib/email.ts`
   - Supported services: Gmail, Outlook, Yahoo, etc.
   - Update the `service` field in the transporter configuration

3. **Environment Variables**:
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your app password (not regular password)
   - `ADMIN_EMAIL`: Email where admin notifications will be sent

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- `gamusa-red-*`: Various shades of red
- `gamusa-white`: Pure white
- `gamusa-cream`: Light cream color

### Content
Update the content in `app/page.tsx`:
- Company information
- Services offered
- Contact details
- Statistics and achievements

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support or questions, please contact:
- Email: corphohai@gmail.com
- Phone: +91 98765 43210
- Phone: +91 94350 14933

---

Built with ❤️ by HOHAI Team 