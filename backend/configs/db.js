import mongoose from "mongoose";

// Connect app to the databae
const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URL);
  console.log(`✅ connected to DB`);
};

export default connectDB;
