import dotenv from "dotenv";
import { BrevoClient } from "@getbrevo/brevo";

dotenv.config();

// Create Brevo Client
const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

// ===============================
// Welcome Email
// ===============================
export const sendWelcomeMail = async (email, name) => {
    try {
        await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: process.env.SENDER_NAME,
                email: process.env.SENDER_EMAIL,
            },
            to: [
                {
                    email,
                    name,
                },
            ],
            subject: "Welcome to Bala Labs",
            htmlContent: `
                <h2>Welcome ${name} 👋</h2>

                <p>Your account has been created successfully.</p>

                <p>We're excited to have you on board.</p>

                <p>Happy Learning!</p>

                <br>

                <p>Regards,</p>

                <h3>Bala Labs</h3>
            `,
        });
        console.log("Welcome email sent successfully.");
    } catch (error) {
        console.log("Failed to send welcome email.");
        console.log(error.body || error);
    }
};

// ===============================
// Reset Password Email
// ===============================
export const sendResetPasswordMail = async (email, token) => {
    try {
        const resetLink = `http://localhost:5173/reset-password/${token}`;

        await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: process.env.BREVO_SENDER_NAME,
                email: process.env.BREVO_SENDER_EMAIL,
            },
            to: [
                {
                    email,
                },
            ],
            subject: "Reset Your Password",
            htmlContent: `
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
            `,
        });
        console.log("Reset password email sent successfully.");
    } catch (error) {
        console.log("Failed to send reset password email.");
        console.log(error.body || error);
    }
};