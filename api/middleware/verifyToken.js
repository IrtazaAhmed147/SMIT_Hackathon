import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/responseHandler.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    
    if (!token) return errorHandler(res, 401, "You are not authenticated")

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return errorHandler(res, 403, "Token is not valid")

        req.user = user

        next()
    })
}