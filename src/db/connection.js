import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express"

const app = express();

const connectDB = async () => {
    try {
        const connnectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        // app.listen(`App is listen on PORT ${process.env.PORT}`)
    } catch (error) {
        console.error("Error in DB connection:",error);
        process.exit(1);
    }
}

export default connectDB



