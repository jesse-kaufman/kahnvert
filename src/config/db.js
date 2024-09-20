import mongoose from "mongoose";

const db = {};

db.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

db.close = async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
};

export default db;
