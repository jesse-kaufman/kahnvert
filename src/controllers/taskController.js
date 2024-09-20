import TaskModel from "../models/taskModel.js";
import { httpCodes } from "../config/config.js";
import taskValidators from "../services/taskValidators.js";

/**
 * Gets an existing task from the database
 *
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const getTask = async (req, res) => {
  let task = null;

  try {
    // Get the Task
    task = await TaskModel.getById(req.params.taskId, "any");
  } catch (err) {
    console.error(err);
    return res.status(httpCodes.SERVER_ERROR).json({ error: err.message });
  }

  if (task == null) {
    return res.status(httpCodes.NOT_FOUND).json({ error: "Task not found" });
  }

  res.status(httpCodes.OK).json(task);
};

/**
 * Gets a list of Tasks from the database
 *
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const getTasks = async (req, res, next) => {
  const { status, stage } = req.query;

  try {
    const tasks = await TaskModel.getAll({ status, stage });
    console.log(tasks);
    res.status(httpCodes.OK).json(tasks);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

/**
 * Adds a new Task to the database
 *
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const addTask = async (req, res) => {
  let newTask = null;

  //
  // Check if a Task with the same name already exists
  //
  const taskExists = await taskValidators.nameExists(req.body.name);
  if (taskExists === false) {
    return res
      .status(httpCodes.CONFLICT)
      .json({ error: "A Task with that name already exists" });
  }

  // Create new Task object from data sent
  newTask = new TaskModel(req.body);

  // Save Task to the database
  try {
    await newTask.save();
  } catch (err) {
    return res.status(httpCodes.SERVER_ERROR).json({ error: err.message });
  }

  res.status(httpCodes.CREATED).json(newTask);
};

/**
 * Updates an existing Task in the database
 *
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const updateTask = async (req, res) => {
  // Find the Task
  const task = await TaskModel.findById(req.params.taskId);

  if (task == null) {
    res.status(httpCodes.NOT_FOUND).json({ error: "Task not found" });
    return;
  }

  try {
    // Update Task object
    const wasModified = task.doUpdate(req.params.taskId, req.body);
    if (!wasModified) {
      console.log("No changes made to Task");
    }
  } catch (err) {
    console.error(err);
    return res.status(httpCodes.SERVER_ERROR).json({ error: err.message });
  }

  res.status(httpCodes.OK).json(task);
};

/**
 * Deletes an existing Task from the database
 *
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const deleteTask = async (req, res) => {
  const task = await TaskModel.findById(req.params.taskId);

  if (task == null) {
    return res.status(httpCodes.NOT_FOUND).json({ error: "Task not found" });
  }

  try {
    await task.doDelete();
  } catch (err) {
    console.error(err);
    return res.status(httpCodes.SERVER_ERROR).json({ error: err.message });
  }

  res.status(httpCodes.OK).json(task);
};
