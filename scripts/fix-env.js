const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');

const envContent = `DATABASE_URL="postgresql://postgres:admin321@localhost:5432/hohai_db"
JWT_SECRET="hohai-super-secret-jwt-key-2024-1751812821798"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="corphohai@gmail.com"
EMAIL_PASS="ejmm dgnc didp jqke"
EMAIL_FROM="corphohai@gmail.com"
ADMIN_EMAIL="corphohai@gmail.com"
`;

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file rewritten with correct configuration!');
} catch (error) {
  console.error('❌ Error writing .env file:', error.message);
} 