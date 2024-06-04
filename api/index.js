import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()

mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log("connected to MongoDB")
})
.catch((err) => {
    console.log(err)
});

const __dirname =path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRoute)
app.use('/api/auth', authRoute)

app.use((err, req, res, next ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})