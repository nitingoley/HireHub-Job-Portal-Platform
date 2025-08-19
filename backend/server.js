import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
import userRoutes from "./routes/user.routes.js";
import { clerkWebhooks } from "./controllers/webhook.js";
import { clerkMiddleware } from "@clerk/express";
import * as Sentry from "@sentry/node";

const app = express();
const PORT = process.env.PORT || 5000;

// connect db + cloudinary
await connectDB();
await connectCloudinary();

// middlewares FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// sentry
Sentry.setupExpressErrorHandler(app);

// ⚡ Clerk webhook (raw body)
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// routes
app.get("/", (req, res) => {
  res.end("Hello world!");
});

app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

app.use(clerkMiddleware());

// server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
