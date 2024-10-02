import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const mail = (email,randomString) => {

    const transport = nodemailer.createTransport( {
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    } )

    let details = {
        from: process.env.USER,
        to: email,
        subject: "RESET PASSWORD",
        html: `
        <h3>Dear User</h3>
        <p>We received a request to reset your password for your account. You can reset your password using the link below:</p>
        <h3><a href="https://ajith-password-reset.netlify.app/changepassword/">Click here to reset</a></h3>
        <h3>Verification Code:<b>${randomString}</b></h3>
        <p>If you didn’t request a password reset, you can ignore this email. Your password will remain unchanged.</p>
        <p>For your security, please reset your password as soon as possible.</p>
        <p>Thnak You !</p>
        <p>Best Regards</p>
        <p>Ajith Arumugam</p>
        `
    }

    transport.sendMail( details, ( err ) => {
        if ( err ) {
            console.log("check credential")
        } else {
            console.log("mail sent succesfully")
        }
    })
    
}

export default mail
