import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'
import { createError, sendError } from '../utils/error.js'
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
    try {


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = await User({
            ...req.body,
            password: hash
        })
        await newUser.save()
        res.status(200).json({
            success: true,
            status: 200,
            data: newUser,
            message: 'user registered successfully'


        })
    } catch (error) {
        sendError(res, 404, error.message)
    }
}


export const login = async (req, res, next) => {
    try {
        const isUser = await User.findOne({ username: req.body.username })
        if (!isUser) return sendError(res, 404, "User not found")

        const isPasswordCorrect = await bcrypt.compare(req.body.password, isUser.password);
        if (!isPasswordCorrect) return sendError(res, 404, "Invalid ceredentials")

        const token = jwt.sign({ id: isUser._id, username: isUser.username }, process.env.JWT)

        const { password, ...otherDetails } = isUser._doc


        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
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
        sameSite: 'None'
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