import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connect successfully");
    } catch (error) {
        console.log("Connect failed");
        process.exit(1);
    }
}
