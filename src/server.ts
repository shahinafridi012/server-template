import app from "./app";
import { connectDB } from "./db";
import { Server } from "http";
import dotenv from "dotenv";

dotenv.config();

let server: Server;

async function main() {
  try {
    console.log("📡 DATABASE_URL:", process.env.DATABASE_URL);

    // Connect DB
    await connectDB();

    // Start server
    const port = process.env.PORT || 5000;
    server = app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
}
// hello world

main();

// Error handlers
process.on("unhandledRejection", (reason) => {
  console.error("🚨 Unhandled Rejection:", reason);
  if (server) server.close(() => process.exit(1));
  else process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception:", err);
  process.exit(1);
});
