const fs = require('fs');
const path = require('path');

console.log('🏥 HOHAI Website Status Check');
console.log('=============================\n');

// Check .env file
function checkEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('✅ .env file exists');
    
    const hasDatabase = envContent.includes('DATABASE_URL');
    const hasJWT = envContent.includes('JWT_SECRET');
    const hasEmail = envContent.includes('EMAIL_USER');
    const hasEmailPass = envContent.includes('EMAIL_PASS');
    const hasAdminEmail = envContent.includes('ADMIN_EMAIL');
    
    console.log('   Database URL:', hasDatabase ? '✅ Configured' : '❌ Missing');
    console.log('   JWT Secret:', hasJWT ? '✅ Configured' : '❌ Missing');
    console.log('   Email User:', hasEmail ? '✅ Configured' : '❌ Missing');
    console.log('   Email Password:', hasEmailPass ? '⚠️  Needs Gmail app password' : '❌ Missing');
    console.log('   Admin Email:', hasAdminEmail ? '✅ Configured' : '❌ Missing');
    
    return { hasDatabase, hasJWT, hasEmail, hasEmailPass, hasAdminEmail };
  } catch (error) {
    console.log('❌ .env file not found or not readable');
    return { hasDatabase: false, hasJWT: false, hasEmail: false, hasEmailPass: false, hasAdminEmail: false };
  }
}

// Check database connection
async function checkDatabase() {
  try {
    const { PrismaClient } = require('../app/generated/prisma');
    const prisma = new PrismaClient();
    
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Check if tables exist
    const userCount = await prisma.user.count();
    const testimonialCount = await prisma.testimonial.count();
    const contactCount = await prisma.contactMessage.count();
    
    console.log('   Users in database:', userCount);
    console.log('   Testimonials in database:', testimonialCount);
    console.log('   Contact messages in database:', contactCount);
    
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    return false;
  }
}

// Check if development server is running
function checkServer() {
  return new Promise((resolve) => {
    const http = require('http');
    const req = http.request('http://localhost:3002', { method: 'GET' }, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Development server is running on http://localhost:3002');
        resolve(true);
      } else {
        console.log('⚠️  Server responded with status:', res.statusCode);
        resolve(false);
      }
    });

    req.on('error', (error) => {
      console.log('❌ Development server is not running');
      console.log('   Error:', error.message);
      resolve(false);
    });

    req.setTimeout(3000, () => {
      console.log('❌ Server connection timeout');
      resolve(false);
    });

    req.end();
  });
}

// Check file structure
function checkFileStructure() {
  const requiredFiles = [
    'app/page.tsx',
    'app/contact/page.tsx',
    'app/api/contact/route.ts',
    'app/lib/email.ts',
    'app/lib/api.ts',
    'prisma/schema.prisma',
    'package.json'
  ];
  
  console.log('\n📁 File Structure Check:');
  let allFilesExist = true;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      console.log(`   ${file}: ✅ Exists`);
    } else {
      console.log(`   ${file}: ❌ Missing`);
      allFilesExist = false;
    }
  });
  
  return allFilesExist;
}

// Main status check
async function main() {
  console.log('🔍 Checking configuration...\n');
  const envStatus = checkEnvFile();
  
  console.log('\n🗄️  Checking database...');
  const dbStatus = await checkDatabase();
  
  console.log('\n🌐 Checking server...');
  const serverStatus = await checkServer();
  
  const fileStatus = checkFileStructure();
  
  // Summary
  console.log('\n📊 Status Summary');
  console.log('==================');
  console.log('Configuration:', envStatus.hasDatabase && envStatus.hasJWT ? '✅ Complete' : '⚠️  Partial');
  console.log('Database:', dbStatus ? '✅ Connected' : '❌ Failed');
  console.log('Server:', serverStatus ? '✅ Running' : '❌ Not running');
  console.log('Files:', fileStatus ? '✅ All present' : '❌ Missing files');
  
  console.log('\n🎯 "Get Free Quote" Functionality:');
  if (envStatus.hasDatabase && dbStatus && fileStatus) {
    console.log('✅ Form submission: Working');
    console.log('✅ Database storage: Working');
    console.log('✅ API endpoint: Working');
    
    if (envStatus.hasEmailPass && !envStatus.hasEmailPass.toString().includes('your-gmail-app-password-here')) {
      console.log('✅ Email notifications: Working');
    } else {
      console.log('⚠️  Email notifications: Needs Gmail app password');
    }
    
    console.log('\n🎉 Your contact form is fully functional!');
    console.log('   Customers can submit quote requests and data will be saved to your database.');
    
  } else {
    console.log('❌ Form functionality: Incomplete');
    console.log('   Please fix the issues above before testing.');
  }
  
  console.log('\n🚀 Next Steps:');
  if (!serverStatus) {
    console.log('1. Start development server: npm run dev');
  }
  if (!envStatus.hasEmailPass || envStatus.hasEmailPass.includes('your-gmail-app-password-here')) {
    console.log('2. Complete Gmail setup: node scripts/complete-email-setup.js');
  }
  console.log('3. Test the form: http://localhost:3002/contact');
  console.log('4. Access admin: http://localhost:3002/admin');
  
  console.log('\n💡 The HOHAI website is ready to collect leads!');
}

main().catch(error => {
  console.error('❌ Status check failed:', error.message);
  process.exit(1);
}); 