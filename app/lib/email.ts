import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app password
  }
})

// Email templates
export const emailTemplates = {
  // Admin notification email
  adminNotification: (contactData: {
    name: string
    email: string
    message: string
  }) => ({
    subject: `New Contact Form Submission from ${contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">New Contact Form Submission</h2>
        <p>A new contact form has been submitted on the HOHAI website.</p>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Contact Details:</h3>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #dc2626;">
            ${contactData.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          This message was sent from the HOHAI website contact form.
        </p>
      </div>
    `
  }),

  // Customer confirmation email
  customerConfirmation: (contactData: {
    name: string
    email: string
  }) => ({
    subject: 'Thank you for contacting HOHAI - We\'ll get back to you soon!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #dc2626; margin-bottom: 10px;">HOHAI</h1>
          <p style="color: #6b7280; margin: 0;">Innovative Technology Solutions</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px;">
          <h2 style="color: #374151; margin-top: 0;">Thank you for contacting us!</h2>
          
          <p>Dear ${contactData.name},</p>
          
          <p>We have received your message and appreciate you taking the time to reach out to HOHAI. Our team has been notified and will review your inquiry shortly.</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h3 style="margin-top: 0; color: #374151;">What happens next?</h3>
            <ul style="color: #6b7280;">
              <li>Our team will review your message within 24 hours</li>
              <li>We'll respond with detailed information about your project</li>
              <li>If needed, we'll schedule a consultation call</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to explore our services:</p>
          <ul style="color: #6b7280;">
            <li>📱 Mobile App Development</li>
            <li>🌐 Web Application Development</li>
            <li>💻 Professional Websites</li>
            <li>🛒 E-commerce Solutions</li>
          </ul>
          
          <p>If you have any urgent questions, you can also reach us directly at:</p>
          <p style="margin: 20px 0;">
            <strong>Phone:</strong> +91 98765 43210<br>
<strong>Phone:</strong> +91 94350 14933<br>
            <strong>Email:</strong> corphohai@gmail.com
          </p>
          
          <p>Best regards,<br>
          <strong>The HOHAI Team</strong></p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      </div>
    `
  })
}

// Schedule Call Email Template
export const scheduleCallTemplate = (data: { name: string, phone: string, enquiry: string }) => ({
  subject: `New Call Request from ${data.name}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Call Request</h2>
      <p>A new call has been requested via the HOHAI website contact page.</p>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Details:</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Cause of Enquiry:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
          ${data.enquiry.replace(/\n/g, '<br>')}
        </div>
      </div>
      <p style="color: #6b7280; font-size: 14px;">
        This message was sent from the HOHAI website schedule a call modal.
      </p>
    </div>
  `
})

// Send email function
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@hohai.com',
      to,
      subject,
      html
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: (error as Error).message }
  }
}

// Send contact form emails
export async function sendContactFormEmails(contactData: {
  name: string
  email: string
  message: string
}) {
  try {
    // Send notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'admin@hohai.com'
    const adminTemplate = emailTemplates.adminNotification(contactData)
    const adminResult = await sendEmail(adminEmail, adminTemplate.subject, adminTemplate.html)

    // Send confirmation to customer
    const customerTemplate = emailTemplates.customerConfirmation(contactData)
    const customerResult = await sendEmail(contactData.email, customerTemplate.subject, customerTemplate.html)

    return {
      adminEmail: adminResult,
      customerEmail: customerResult
    }
  } catch (error) {
    console.error('Failed to send contact form emails:', error)
    return {
      adminEmail: { success: false, error: (error as Error).message },
      customerEmail: { success: false, error: (error as Error).message }
    }
  }
}

// Send schedule call email
export async function sendScheduleCallEmail(data: { name: string, phone: string, enquiry: string }) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'admin@hohai.com'
    const template = scheduleCallTemplate(data)
    const result = await sendEmail(adminEmail, template.subject, template.html)
    return result
  } catch (error) {
    console.error('Failed to send schedule call email:', error)
    return { success: false, error: (error as Error).message }
  }
} 