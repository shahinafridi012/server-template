import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // 🔥 THIS LINE IS THE KEY
const MONGODB_URI = process.env.DATABASE_URL as string;

if (!MONGODB_URI) {
  throw new Error("DATABASE_URL not set in environment variables");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 20000,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected:", mongoose.connection.host);
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
