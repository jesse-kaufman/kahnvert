import VideoModel from "../videoModel.js";

/**
 * Does the actual "delete" in MongoDB by marking item inactive
 *
 * @returns {Object} Task object after saving
 */
export const doDelete = async function () {
  // Delete Task
  this.status = "inactive";
  const result = await this.save();

  return result;
};

/**
 * Gets FFMPEG command from VideoModel
 *
 * @returns {String} FFMPEG command
 */
export const getFfmpegCommand = async function () {
  const video = await VideoModel.read(this.filename);
  return video.getFfmpegCommand();
};

/**
 * Does the actual update in MongoDB
 *
 * @param {*} TaskId Task ID to update in MongoDB
 * @param {*} data New task data
 * @returns {Boolean} True if modified, otherwise false
 */
export const doUpdate = async function (TaskId, data) {
  /*
   * Create Task update object from data sent, defaulting properties
   * to values from the database.
   *
   * ID is set after data object spread to prevent ID being overwritten
   */
  const newTask = { ...this.toJSON(), ...data, _id: TaskId };

  // Update Task object
  this.overwrite(newTask);

  try {
    // Save the Task
    await this.save();
  } catch (err) {
    console.log(err);
    throw err;
  }

  // Return true if modified, otherwise false
  return this.isModified();
};

export default { doUpdate, doDelete, getFfmpegCommand };
