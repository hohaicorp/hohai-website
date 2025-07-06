const fs = require('fs');
const path = require('path');

console.log('--- DEBUG: print-email-env.js script started ---');

const envPath = path.join(__dirname, '..', '.env');
try {
  const rawEnv = fs.readFileSync(envPath, 'utf8');
  console.log('--- DEBUG: Raw .env file contents ---');
  console.log(rawEnv);
} catch (e) {
  console.log('--- DEBUG: Could not read .env file:', e.message);
}

require('dotenv').config();

console.log('--- DEBUG: After dotenv.config() ---');
console.log('Loaded email environment variables:');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '[HIDDEN]' : undefined);
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);

if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_FROM) {
  console.log('\n--- DEBUG: Dumping all environment variables ---');
  console.log(process.env);
} 