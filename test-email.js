import { sendEmail } from './app/lib/email.js'

async function testEmail() {
  console.log('🧪 Testing email functionality...')

  const result = await sendEmail(
    'corphohai@gmail.com',
    'HOHAI Email Test - System Check',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">✅ HOHAI Email System Test</h2>
      <p>This is a test email to verify that the HOHAI contact form email system is working properly.</p>

      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Test Details:</h3>
        <p><strong>Sender:</strong> corphohai@gmail.com</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Status:</strong> ✅ Email system is operational</p>
      </div>

      <p>If you received this email, the contact form will work correctly!</p>

      <p style="color: #6b7280; font-size: 14px;">
        This is an automated test message from the HOHAI website system.
      </p>
    </div>
    `
  )

  if (result.success) {
    console.log('✅ Email sent successfully!')
    console.log('📧 Message ID:', result.messageId)
  } else {
    console.log('❌ Email failed to send')
    console.log('🔍 Error:', result.error)
  }
}

testEmail().catch(console.error)