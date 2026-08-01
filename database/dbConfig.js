import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.mongoDbConnectionString);
        console.log("DB connected");
        return connection;
    }
    catch (error) {
        console.error("Database connection failed.");
        console.error(error.message);
    }
}

export default connectDB;