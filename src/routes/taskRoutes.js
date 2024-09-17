// Task routes

// import {
//   addLog,
//   getLog,
//   getLogs,
//   notAllowed,
// } from "../controllers/logController.js";

import {
  addTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import { Router } from "express";

const router = new Router();

router
  .get("/", getTasks)
  .get("/:taskId", getTask)
  .post("/", addTask)
  .put("/:taskId", updateTask)
  .delete("/:taskId", deleteTask);

// // Task log routes
// .get("/:taskId/logs", getLogs)
// .get("/:taskId/logs/:logId", getLog)
// .post("/:taskId/logs/", addLog)
// .put("/:taskId/logs/", notAllowed)
// .delete("/:taskId", notAllowed);

export default router;
