import mongoose from "mongoose";

const connectDB = async () => {
    try{
        if (!process.env.MONGO_URI) {
            throw new Error("Mongoose_URI is not defined");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("COnnected to MongoDB");
    }
    catch (error){
        console.log("DB connection error:", error);
        process.exit(1);
    }
}
export default connectDB;