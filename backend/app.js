import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import healthCheckRouter from "./src/routes/healthCheck.route.js";
import ticketRoutes from "./src/routes/tickets.route.js";
import userRoutes from "./src/routes/users.route.js";
import replyRoutes from "./src/routes/replies.routes.js";
import { ApiResponse } from "./src/utils/ApiResponse.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/healthCheck", healthCheckRouter);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/replyTickets", replyRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json(new ApiResponse(statusCode, null, message));
});
export { app };
