import qs from "../../services/queryBuilder.js";

/**
 * Gets plant by ID.
 *
 * @param {*} plantId
 * @param {*} status
 * @returns {Object} Task object
 */
const getById = async function (taskId, status) {
  const query = qs.setup({ taskId, status }, this);

  const task = await this.findOne(query);

  // Add ffmpeg command to task and return
  const ffmpegCommand = await task.getFfmpegCommand();
  return { ...task.toJSON(), ffmpegCommand };
};

/**
 * Gets all tasks based on optional criteria.
 * @param {*} statuses
 * @returns {Array<Object>} All matching tasks
 */
const getAll = async function ({ status }) {
  const query = qs.setup({ status: status || "pending" }, this);
  let tasks = await this.find(query);

  // Add ffmpeg command to each task
  tasks = await Promise.all(
    tasks.map(async (task) => ({
      ...task.toJSON(),
      ffmpeg: await task.getFfmpegCommand(),
    }))
  );

  return tasks;
};

export default { getById, getAll };
