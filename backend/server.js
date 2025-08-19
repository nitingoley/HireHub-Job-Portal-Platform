import "./config/instrument.js";
import express from "express";
const app = express();
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 5000;
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhook.js";
import companyRoutes from "./routes/company.routes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/job.routes.js";



// connect to db
await connectDB();
await connectCloudinary();



// sentry
Sentry.setupExpressErrorHandler(app);

// routes
app.get("/", (req, res) => {
  res.end("Hello world!");
});

// ⚡ Clerk webhook route FIRST with raw body
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);
app.use("/api/company"  , companyRoutes);
app.use("/api/jobs", jobRoutes)


// 🔹 Normal middlewares baad mai lagao
app.use(cors());
app.use(express.json());

// server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
