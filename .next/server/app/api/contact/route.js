"use strict";(()=>{var e={};e.id=386,e.ids=[386],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},92761:e=>{e.exports=require("node:async_hooks")},17718:e=>{e.exports=require("node:child_process")},6005:e=>{e.exports=require("node:crypto")},15673:e=>{e.exports=require("node:events")},87561:e=>{e.exports=require("node:fs")},93977:e=>{e.exports=require("node:fs/promises")},70612:e=>{e.exports=require("node:os")},49411:e=>{e.exports=require("node:path")},97742:e=>{e.exports=require("node:process")},25997:e=>{e.exports=require("node:tty")},47261:e=>{e.exports=require("node:util")},3363:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>y,patchFetch:()=>f,requestAsyncStorage:()=>h,routeModule:()=>m,serverHooks:()=>x,staticGenerationAsyncStorage:()=>g});var o={};t.r(o),t.d(o,{GET:()=>d,POST:()=>u});var s=t(49303),a=t(88716),i=t(60670),n=t(87070),l=t(87637),c=t(95921);let p=new l.PrismaClient;async function u(e){try{let{name:r,email:t,phone:o,institute:s,message:a}=await e.json();if(!r||!t||!o||!s)return n.NextResponse.json({error:"Name, email, phone, and institute are required"},{status:400});let i=await p.contactMessage.create({data:{name:r,email:t,phone:o||"",institute:s||"",type:"INQUIRY",message:a||""}}),l=await (0,c.tS)({name:r,email:t,phone:o,institute:s,message:a||""});return console.log("Email sending results:",l),n.NextResponse.json({message:"Message sent successfully",id:i.id,emailsSent:{admin:l.adminEmail.success,customer:l.customerEmail.success}},{status:201})}catch(e){return console.error("Contact form error:",e),n.NextResponse.json({error:"Failed to send message"},{status:500})}}async function d(){try{let e=await p.contactMessage.findMany({orderBy:{createdAt:"desc"},take:50});return n.NextResponse.json({data:e},{status:200})}catch(e){return console.error("GET contact error:",e),n.NextResponse.json({error:"Failed to fetch contacts"},{status:500})}}let m=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"C:\\Users\\Anish Aich\\Desktop\\Hohai Web\\hohai-website\\app\\api\\contact\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:h,staticGenerationAsyncStorage:g,serverHooks:x}=m,y="/api/contact/route";function f(){return(0,i.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:g})}},95921:(e,r,t)=>{t.d(r,{X9:()=>u,tS:()=>p});var o=t(55245);let s=process.env.EMAIL_USER,a=process.env.EMAIL_PASSWORD||process.env.EMAIL_PASS;process.env.ADMIN_EMAIL,process.env.EMAIL_FROM,s&&a||console.error("Email transport configuration is missing. Set EMAIL_USER and EMAIL_PASSWORD in your environment.");let i=o.createTransport({service:"gmail",auth:{user:s,pass:a}}),n={adminNotification:e=>({subject:`New Contact Form Submission from ${e.name}`,html:`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">New Contact Form Submission</h2>
        <p>A new contact form has been submitted on the HOHAI website.</p>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Contact Details:</h3>
          <p><strong>Name:</strong> ${e.name}</p>
          <p><strong>Email:</strong> ${e.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #dc2626;">
            ${e.message.replace(/\n/g,"<br>")}
          </div>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          This message was sent from the HOHAI website contact form.
        </p>
      </div>
    `}),customerConfirmation:e=>({subject:"Thank you for contacting HOHAI - We'll get back to you soon!",html:`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #dc2626; margin-bottom: 10px;">HOHAI</h1>
          <p style="color: #6b7280; margin: 0;">Innovative Technology Solutions</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px;">
          <h2 style="color: #374151; margin-top: 0;">Thank you for contacting us!</h2>
          
          <p>Dear ${e.name},</p>
          
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
    `})},l=e=>({subject:`New Call Request from ${e.name}`,html:`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Call Request</h2>
      <p>A new call has been requested via the HOHAI website contact page.</p>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Details:</h3>
        <p><strong>Name:</strong> ${e.name}</p>
        <p><strong>Phone:</strong> ${e.phone}</p>
        <p><strong>Cause of Enquiry:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
          ${e.enquiry.replace(/\n/g,"<br>")}
        </div>
      </div>
      <p style="color: #6b7280; font-size: 14px;">
        This message was sent from the HOHAI website schedule a call modal.
      </p>
    </div>
  `});async function c(e,r,t){try{let o={from:process.env.EMAIL_USER||"noreply@hohai.com",to:e,subject:r,html:t},s=await i.sendMail(o);return console.log("Email sent successfully:",s.messageId),{success:!0,messageId:s.messageId}}catch(e){return console.error("Email sending failed:",e),{success:!1,error:e.message}}}async function p(e){try{let r=process.env.ADMIN_EMAIL||process.env.EMAIL_USER||"admin@hohai.com",t=n.adminNotification(e),o=await c(r,t.subject,t.html),s=n.customerConfirmation(e),a=await c(e.email,s.subject,s.html);return{adminEmail:o,customerEmail:a}}catch(e){return console.error("Failed to send contact form emails:",e),{adminEmail:{success:!1,error:e.message},customerEmail:{success:!1,error:e.message}}}}async function u(e){try{let r=process.env.ADMIN_EMAIL||process.env.EMAIL_USER||"admin@hohai.com",t=l(e);return await c(r,t.subject,t.html)}catch(e){return console.error("Failed to send schedule call email:",e),{success:!1,error:e.message}}}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[9276,5972,5245,7637],()=>t(3363));module.exports=o})();