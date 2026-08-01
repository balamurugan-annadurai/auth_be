import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendResetPasswordMail, sendWelcomeMail } from "../services/nodemailer.services.js";
import { sendResetPasswordMail, sendWelcomeMail } from './../services/email.service.js';


export const register = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (user) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await User.create({
            name,
            email,
            password: hashPassword
        })

        sendWelcomeMail(email, name);

        // sendWelcomeMail(email, name)


        return res.status(201).json({
            message: "User registered successfully"
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password."
            });
        }

        return res.status(200).json({
            message: "Login successful."
        });


    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "10m"
            }
        )

        sendResetPasswordMail(email, token)

        // sendResetPasswordMail(email, token)

        return res.status(200).json({
            message: "Password reset link sent successfully."
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

export const verifyToken = async (req, res) => {

    const token = req.headers.authorization?.split(" ")[1];

    try {
        if (!token) {
            return res.status(401).json({
                message: "Token is missing."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.status(200).json({
            message: "Token verified successfully."
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

export const changePassword = async (req, res) => {

    const { newPassword } = req.body;

    const token = req.headers.authorization?.split(" ")[1];

    try {
        if (!token) {
            return res.status(401).json({
                message: "Token is missing."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashPassword;
        await user.save();

        return res.status(200).json({
            message: "Password changed successfully."
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}