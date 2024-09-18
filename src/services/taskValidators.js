import TaskModel from "../models/taskModel.js";

const fileExists = async (filename) => {
  if (!filename) return false;

  const task = await TaskModel.findOne({
    status: { $in: ["pending", "processing"] },
    filename: filename.trim(),
  });

  return task == null;
};

export default { fileExists };
