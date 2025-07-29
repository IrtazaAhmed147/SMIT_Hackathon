import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'
import { errorHandler } from '../utils/responseHandler.js'
import bcrypt from "bcryptjs";
import { generateEmail, GenerateToken, VerifyToken } from '../utils/commonFunctions.js';
import { nanoid } from 'nanoid'

export const register = async (req, res, next) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) return errorHandler(res, 400, "missing fields")

    try {

        const user = await User.findOne({ $or: [{ email: email }, { userName: username }] })
        if (user) {

            return errorHandler(res, 400, "UserName or Email Address already exists, please change and retry")
        }
        if (password.length < 8) {
            return errorHandler(res, 400, "Password length should be minimum 8 characters long")

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
            return successHandler(res, 200, "Signed up Successfully, OTP send to your email address please verify", { ...savedUser, token: token })
        } else {
            return errorHandler(res, 500, "User did not saved")
        }

    } catch (error) {
        errorHandler(res, 500, error.message)
    }
}


export const login = async (req, res, next) => {
    try {

        if (!req.username || !req.password) {
            // return errorHandler(res, 400, "missing fields");
            return errorHandler(res, 400, "missing fields")
        }

        // const isExists = await Users.find({ $or: [{ email: email }, { userName: userName }] })
        const isExists = await User.findOne({ username: username })


        if (!isExists) {
            return errorHandler(res, 400, "User Name not exists, please retry")
        }
        const isPasswordCorrect = await compare(
            password, isExists.password
        );
        if (!isPasswordCorrect) {
            return errorHandler(res, 400, "User Name not exists, please retry")
        }

        const isVerified = await User.findOne({ isVerified: true, username: req.body.username })
        if (!isVerified) return errorHandler(res, 403, "Account already exist. Verify your account")



        const token = jwt.sign({ id: isExists._id, username: isExists.username }, process.env.JWT, {
            expiresIn: '7d'
        })

        const { password, ...otherDetails } = isExists._doc


        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).status(200).json({
            success: true,
            status: 200,
            data: { ...otherDetails },
            message: 'user loggedin successfully'


        })


    } catch (error) {
        errorHandler(res, 404, error.message)
    }
}

export const logout = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }).status(200).json({ success: true, message: 'Logged out successfully' });
};



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
            errorHandler(res, 404, "OTP is expired")
        }
    } else {
        errorHandler(res, 404, "No Token Received")
    }
}