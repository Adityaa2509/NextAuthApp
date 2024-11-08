import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { randomUUID } from 'crypto';
interface SendEmailOptions {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}
export const sendEmail = async({email,emailType,userId}:SendEmailOptions)=>{
    try{
        const tk = await randomUUID();
        if(emailType === 'VERIFY'){
         const us = await User.findByIdAndUpdate(userId,{
            verifyToken:tk,
            verifyTokenExpiry: Date.now() + 3600000
          },{$new:true})
          console.log(us);
        }else if(emailType === 'RESET'){

          await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:tk,
            forgotPasswordTokenExpiry: Date.now() + 3600000
          })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "91147b47087b58",
          pass: "c9dffd73c464f2"
        }
      });
      const htmlContent = emailType === 'VERIFY'
      ? `<p>Hi,</p>
         <p>Thank you for registering. Please verify your email by clicking the link below:</p>
         <a href="${process.env.DOMAIN}/verifyemail?token=${tk}">Verify Email</a>
         <p>This link will expire in 1 hour.</p>`
      : `<p>Hi,</p>
         <p>We received a request to reset your password. Click the link below to set a new password:</p>
         <a href="${process.env.DOMAIN}/resetPassword?token=${tk}">Reset Password</a>
         <p>This link will expire in 1 hour.</p>`;

          const mailOptions = {
            from: 'terabaapbhosdike@gmail.com',
            to:email, 
            subject:  emailType === 'VERIFY'?"Verify YOUR EMAIL":"Reset Your Password",
            html: htmlContent, 
          }
        const mailResponse =  await transport.sendMail(mailOptions);
        return mailResponse;
    }catch(err){
        console.log("error while sending mails")
        console.log(err)
        
    }
}