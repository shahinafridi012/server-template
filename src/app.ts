import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";

const app: Application = express();

// Serve static uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Parse JSON
app.use(express.json());

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend is running 🚀" });
});

export default app;
