import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.routes.js'
import { connectDB } from './utils/connectDB.js'
import helmet from "helmet"
// import mongoSanitize from "express-mongo-sanitize"

const app = express()

dotenv.config()


// mongodb connection
connectDB()


// middleware
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
// app.use(mongoSanitize())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))



// routes
app.use('/api/auth', authRoute)




if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 6500;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// Export for Vercel
export default app;