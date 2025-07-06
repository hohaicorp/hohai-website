const fs = require('fs');
const path = require('path');

// Read current .env file
const envPath = path.join(__dirname, '..', '.env');
let envContent = '';

try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
  console.log('No existing .env file found, creating new one...');
}

// Check if email configuration already exists
if (envContent.includes('EMAIL_USER')) {
  console.log('✅ Email configuration already exists in .env file');
  console.log('Current email settings:');
  const lines = envContent.split('\n');
  lines.forEach(line => {
    if (line.includes('EMAIL_') || line.includes('JWT_')) {
      console.log(`  ${line}`);
    }
  });
  console.log('\n📧 To enable email functionality:');
  console.log('1. Replace "your-gmail-app-password-here" with your actual Gmail app password');
  console.log('2. Make sure 2-factor authentication is enabled on your Gmail account');
  console.log('3. Generate an app password from Google Account settings > Security > App passwords');
  process.exit(0);
}

// Add email configuration
const emailConfig = `

# JWT Secret for admin authentication
JWT_SECRET="hohai-super-secret-jwt-key-2024-${Date.now()}"

# Email Configuration
EMAIL_USER="corphohai@gmail.com"
EMAIL_PASS="your-gmail-app-password-here"
ADMIN_EMAIL="corphohai@gmail.com"
`;

// Write updated .env file
const updatedContent = envContent.trim() + emailConfig;

try {
  fs.writeFileSync(envPath, updatedContent);
  console.log('✅ Email configuration added to .env file successfully!');
  console.log('\n📧 Email settings configured:');
  console.log('  EMAIL_USER="corphohai@gmail.com"');
  console.log('  EMAIL_PASS="your-gmail-app-password-here"');
  console.log('  ADMIN_EMAIL="corphohai@gmail.com"');
  console.log('  JWT_SECRET="hohai-super-secret-jwt-key-2024-[timestamp]"');
  
  console.log('\n🔧 Next steps to enable email functionality:');
  console.log('1. Enable 2-factor authentication on your Gmail account (corphohai@gmail.com)');
  console.log('2. Go to Google Account settings > Security > App passwords');
  console.log('3. Generate a new app password for "Mail"');
  console.log('4. Replace "your-gmail-app-password-here" in .env with the generated app password');
  console.log('5. Restart your development server: npm run dev');
  
  console.log('\n⚠️  Important:');
  console.log('- Never commit your .env file to version control');
  console.log('- Keep your app password secure');
  console.log('- The JWT_SECRET is automatically generated with a timestamp for security');
  
} catch (error) {
  console.error('❌ Error updating .env file:', error.message);
  console.log('\n📝 Manual setup required:');
  console.log('Please add the following to your .env file:');
  console.log(emailConfig);
} 