import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'
import { sendError } from '../utils/error.js'
import bcrypt from "bcryptjs";
import { generateEmail, GenerateToken, VerifyToken } from '../utils/commonFunctions.js';
import { nanoid } from 'nanoid'

export const register = async (req, res, next) => {

    const { username, email, password } = req.body
    
    if (!username || !email || !password) return sendError(res, 400, 'All fields are required')

    try {
        
        const user = await User.findOne({ email: email });
        if (user) {
            
            return sendError(res, 409, "Email is already Exists")
        }

        const userNameValidation = await User.findOne({ username: username.trim() });
        
        if (userNameValidation) {
            
            return sendError(res, 409, "UserName aleady taken, please try another")
        }


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const doc = await User({
            username,
            email,
            password: hash
        })
      

        const otp = nanoid().slice(0, 6)
        doc.otp = otp
        doc.otpExpires = Date.now() + 600000; // OTP expires in 10 minutes
        doc.isVerified = false

        let savedUser = await doc.save();

        const token = GenerateToken({ data: savedUser, expiresIn: '10m' });

        if (savedUser) {
            const emailSent = await generateEmail(email, otp)

            res.json({ success: true, message: "Signed up Successfully, OTP send to your email address please verify", data: savedUser, token: token })
        } else {
            sendError(res, 500, "User did not saved")
        }

    } catch (error) {
        sendError(res, 500, error.message)
    }
}


export const login = async (req, res, next) => {
    try {
        const isUser = await User.findOne({ username: req.body.username })
        if (!isUser) return sendError(res, 404, "User not found")

        const isPasswordCorrect = await bcrypt.compare(req.body.password, isUser.password);
        if (!isPasswordCorrect) return sendError(res, 404, "Invalid ceredentials")

        const isVerified = await User.findOne({ isVerified: true, username: req.body.username })
        if (!isVerified) return sendError(res, 403, "Account already exist. Verify your account")



        const token = jwt.sign({ id: isUser._id, username: isUser.username }, process.env.JWT, {
            expiresIn: '1m'
        })

        const { password, ...otherDetails } = isUser._doc


        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 1000
        }).status(200).json({
            success: true,
            status: 200,
            data: { ...otherDetails },
            message: 'user loggedin successfully'


        })


    } catch (error) {
        sendError(res, 404, error.message)
    }
}

export const logout = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }).status(200).json({ success: true, message: 'Logged out successfully' });
};


export const checkAuth = (req, res) => {
    res.status(200).json({
        success: true,
        status: 200,
        data: req.user,
        message: 'user is loggedin'
    });
}



export const verifyEmail = async (req, res) => {
    const { otp } = req.body

    const token = req.header('Authorization')

    if (token.startsWith('Bearer')) {


        const verifyingUser = VerifyToken(token.split(' ')[1])

        const userDetails = await User.findOne({
            otp: otp,
            _id: verifyingUser.result._id,
            otpExpires: { $gt: new Date() } // only if the OTP is still valid
        });


        if (userDetails) {
            res.status(200).json({ success: true, message: "OTP is valid" })
            await User.findByIdAndUpdate(verifyingUser.result._id, {
                isVerified: true
            })
        } else {
            sendError(res, 404, "OTP is expired")
        }
    } else {
        sendError(res, 404, "No Token Received")
    }
}