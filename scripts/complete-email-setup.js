const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, '..', '.env');

console.log('🚀 HOHAI Email Setup Wizard');
console.log('============================\n');

// Step 1: Check current .env file
function checkCurrentEnv() {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('EMAIL_USER') && envContent.includes('EMAIL_PASS')) {
      console.log('✅ Email configuration found in .env file');
      return true;
    }
  } catch (error) {
    console.log('❌ No .env file found or email configuration missing');
  }
  return false;
}

// Step 2: Create/Update .env file
function createEnvFile() {
  const envContent = `DATABASE_URL="postgresql://postgres:admin321@localhost:5432/hohai_db"

# JWT Secret for admin authentication
JWT_SECRET="hohai-super-secret-jwt-key-2024-${Date.now()}"

# Email Configuration
EMAIL_USER="corphohai@gmail.com"
EMAIL_PASS="your-gmail-app-password-here"
ADMIN_EMAIL="corphohai@gmail.com"
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created/updated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    return false;
  }
}

// Step 3: Guide through Gmail setup
function guideGmailSetup() {
  console.log('\n📧 Gmail App Password Setup Guide');
  console.log('==================================');
  console.log('Follow these steps to enable email functionality:\n');
  
  console.log('1️⃣ Enable 2-Factor Authentication:');
  console.log('   • Go to https://myaccount.google.com/security');
  console.log('   • Click on "2-Step Verification"');
  console.log('   • Follow the setup process for your Gmail account (corphohai@gmail.com)\n');
  
  console.log('2️⃣ Generate App Password:');
  console.log('   • Go to https://myaccount.google.com/apppasswords');
  console.log('   • Sign in with your Gmail account');
  console.log('   • Select "Mail" from the dropdown');
  console.log('   • Click "Generate"');
  console.log('   • Copy the 16-character password (e.g., "abcd efgh ijkl mnop")\n');
  
  console.log('3️⃣ Update .env file:');
  console.log('   • Replace "your-gmail-app-password-here" in .env with your app password');
  console.log('   • Remove spaces from the app password\n');
}

// Step 4: Test email functionality
function testEmailFunctionality() {
  return new Promise((resolve) => {
    rl.question('\n🔧 Do you want to test the email functionality now? (y/n): ', async (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        console.log('\n🧪 Testing email functionality...');
        
        // Check if app password is still placeholder
        try {
          const envContent = fs.readFileSync(envPath, 'utf8');
          if (envContent.includes('your-gmail-app-password-here')) {
            console.log('❌ Please update the EMAIL_PASS in .env with your actual Gmail app password first');
            console.log('   Then restart the development server and run this test again');
            resolve(false);
            return;
          }
        } catch (error) {
          console.log('❌ Error reading .env file');
          resolve(false);
          return;
        }
        
        // Import and test email functionality
        try {
          const { sendEmail } = require('../app/lib/email');
          
          const testResult = await sendEmail(
            'corphohai@gmail.com',
            'HOHAI Email Test - Success!',
            `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626;">✅ HOHAI Email Test Successful!</h2>
              <p>Your email configuration is working correctly.</p>
              <p><strong>Test Details:</strong></p>
              <ul>
                <li>From: corphohai@gmail.com</li>
                <li>To: corphohai@gmail.com</li>
                <li>Subject: HOHAI Email Test - Success!</li>
                <li>Timestamp: ${new Date().toLocaleString()}</li>
              </ul>
              <p>Your "Get Free Quote" form will now send email notifications!</p>
            </div>
            `
          );
          
          if (testResult.success) {
            console.log('✅ Email test successful!');
            console.log('   Message ID:', testResult.messageId);
            console.log('   Check your Gmail inbox for the test email');
          } else {
            console.log('❌ Email test failed:', testResult.error);
          }
        } catch (error) {
          console.log('❌ Error testing email:', error.message);
        }
        
        resolve(true);
      } else {
        console.log('\n📝 Email test skipped. You can test it later by running this script again.');
        resolve(false);
      }
    });
  });
}

// Step 5: Final instructions
function showFinalInstructions() {
  console.log('\n🎉 Setup Complete!');
  console.log('==================');
  console.log('Your HOHAI website is now configured with:');
  console.log('✅ Database connection (PostgreSQL)');
  console.log('✅ JWT authentication for admin dashboard');
  console.log('✅ Email configuration (needs app password)');
  console.log('✅ Contact form functionality');
  console.log('✅ Admin dashboard access');
  
  console.log('\n🚀 Next Steps:');
  console.log('1. Complete Gmail app password setup (if not done)');
  console.log('2. Restart development server: npm run dev');
  console.log('3. Test the "Get Free Quote" form at http://localhost:3002/contact');
  console.log('4. Access admin dashboard at http://localhost:3002/admin');
  
  console.log('\n📧 Email Features:');
  console.log('• Admin notifications for new quote requests');
  console.log('• Customer confirmation emails');
  console.log('• Professional email templates');
  
  console.log('\n🔐 Admin Dashboard:');
  console.log('• View all contact form submissions');
  console.log('• Manage testimonials');
  console.log('• Monitor website activity');
  
  console.log('\n💡 Tips:');
  console.log('• Keep your .env file secure and never commit it to version control');
  console.log('• Regularly backup your database');
  console.log('• Monitor email delivery and spam folders');
}

// Main execution
async function main() {
  console.log('Checking current configuration...');
  
  if (!checkCurrentEnv()) {
    console.log('Creating email configuration...');
    if (!createEnvFile()) {
      console.log('❌ Failed to create .env file. Please check file permissions.');
      rl.close();
      return;
    }
  }
  
  guideGmailSetup();
  
  await testEmailFunctionality();
  
  showFinalInstructions();
  
  rl.close();
}

// Handle script termination
rl.on('close', () => {
  console.log('\n👋 Setup wizard completed. Good luck with HOHAI!');
  process.exit(0);
});

// Start the setup process
main().catch(error => {
  console.error('❌ Setup failed:', error.message);
  rl.close();
  process.exit(1);
}); 