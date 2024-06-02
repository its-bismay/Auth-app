import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js"

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

const app = express();

app.use("/api/user", userRoute)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})