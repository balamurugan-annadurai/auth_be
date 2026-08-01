import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.User,
        pass: process.env.Pass
    }
});

// Welcome Email
export const sendWelcomeMail = (email, name) => {

    const mailDetails = {
        from: process.env.User,
        to: email,
        subject: "Welcome to Our Bala Labs",
        html: `
            <h2>Welcome ${name} 👋</h2>

            <p>Your account has been created successfully.</p>

            <p>We're excited to have you on board.</p>

            <p>Happy Learning!</p>

            <br>

            <p>Regards,</p>
            <h3>Bala Labs</h3>
        `
    };

    transporter.sendMail(mailDetails, (error) => {

        if (error) {
            console.log(error);
        } else {
            console.log("Welcome email sent successfully.");
        }

    });

};


// Reset Password Email
export const sendResetPasswordMail = (email,token) => {

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const mailDetails = {
        from: process.env.User,
        to: email,
        subject: "Reset Your Password",
        html: `
            <h2>Password Reset Request</h2>

            <p>We received a request to reset your password.</p>

            <p>This link is valid for <strong>10 minutes</strong>.</p>

            <a href="${resetLink}">
                Click Here to Reset Password
            </a>

            <br><br>

            <p>If you didn't request this, you can safely ignore this email.</p>

            <br>

            <p>Regards,</p>
            <h3>Bala Labs</h3>
        `
    };

    transporter.sendMail(mailDetails, (error) => {

        if (error) {
            console.log(error);
        } else {
            console.log("Reset password email sent successfully.");
        }

    });

};