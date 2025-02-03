import mongoose from "mongoose";

// Connect to MongoDB
const connectMongoDB = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;

        if (MONGODB_URL != '') {
            await mongoose.connect(MONGODB_URL, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log("Connected to MongoDB");
        } else {
            console.log("Please setup mongo uri in env");
        }
    }
    catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};
export default connectMongoDB;