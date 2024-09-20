import TaskModel from "../models/taskModel.js";

const fileExists = async (filename) => {
  if (!filename) return false;

  const task = await TaskModel.findOne({
    status: { $ne: "deleted" },
    filename: filename.trim(),
  });

  // Return true if the file exists in the task list, otherwise return false
  return task != null;
};

export default { fileExists };
