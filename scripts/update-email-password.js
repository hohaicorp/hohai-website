const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');

try {
  // Read the current .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  const newPassword = 'ejmm dgnc didp jqke';
  const emailVars = [
    { key: 'EMAIL_HOST', value: 'smtp.gmail.com' },
    { key: 'EMAIL_PORT', value: '587' },
    { key: 'EMAIL_FROM', value: 'corphohai@gmail.com' },
  ];

  // Update or add EMAIL_PASS
  if (/EMAIL_PASS="[^"]*"/.test(envContent)) {
    envContent = envContent.replace(/EMAIL_PASS="[^"]*"/, `EMAIL_PASS="${newPassword}"`);
  } else {
    envContent += `\nEMAIL_PASS="${newPassword}"`;
  }

  // Update or add EMAIL_HOST, EMAIL_PORT, EMAIL_FROM
  emailVars.forEach(({ key, value }) => {
    const regex = new RegExp(`${key}="[^"]*"|${key}=\d+`);
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}="${value}"`);
    } else {
      envContent += `\n${key}="${value}"`;
    }
  });
  
  // Write back to .env file
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ Email config (host, port, from, pass) updated successfully!');
  console.log('Please re-run the print-email-env.js script to verify.');
  
} catch (error) {
  console.error('❌ Error updating email config:', error.message);
} 