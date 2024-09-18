import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const disconnectDb = async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
};
