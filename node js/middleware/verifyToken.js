import jwt from "jsonwebtoken";
import { createError, sendError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log(token);
    
    if (!token) return sendError(res, 401, "You are not authenticated")

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return sendError(res, 403, "Token is not valid")

        req.user = user

        next()
    })
}