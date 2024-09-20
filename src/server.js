// Server
import compression from "compression";
import config from "./config/config.js";
import cors from "cors";
import db from "./config/db.js";
import errorHandler from "errorhandler";
import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

// MongoDB connection
db.connect();

// Setup Express
const app = express();

// Enable compression
app.use(compression());

// Interpret responses as JSON
app.use(express.json());

// Only parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Use CORS
app.use(cors());

// Setup Express error handlers for dev environment
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

// Setup Express error handlers for production environment
if (process.env.NODE_ENV === "production") {
  app.use(errorHandler());
}

// Plant routes
app.use("/api/v1/tasks", taskRoutes);

// Start the server
const server = app.listen(config.apiPort, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
