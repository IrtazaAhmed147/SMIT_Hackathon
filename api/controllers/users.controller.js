import User from "../models/user.model.js"

export const getUsers = async(req, res, next)=> {
    try {
        const users  = await User.find()
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}