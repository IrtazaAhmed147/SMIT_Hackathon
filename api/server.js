import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.routes.js'
import userRoute from './routes/users.route.js'
import productRoute from './routes/product.routes.js'

const app = express()

dotenv.config()


// mongodb connection
const connect = async () => {
    try {

        await mongoose.connect(process.env.MONGO)
    } catch (error) {
        console.log('MongoDB connection error', error);

    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");

})
mongoose.connection.on("connected", () => {
    console.log("mongoDB connected");

})

// middleware

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"


    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

// routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)



app.listen(8800, () => {
    connect()
    console.log("Server is running at port 8800");

})