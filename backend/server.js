import "./config/instrument.js";
import express from "express";
const app = express();
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 5000;
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhook.js";

// connect to db
connectDB();

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);


// routes 
app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});


app.post("/webhook", clerkWebhooks);


// middlewares
app.use(cors());
app.use(express.json());

// server running
app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
