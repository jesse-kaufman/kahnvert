/**
 * Task Query Service
 *
 * Provides functions to build a query for use in selecting Tasks from
 * the database.
 */
import mongoose from "mongoose";

const queryService = {};

/**
 * Sets up Task query
 *
 * @param {*} config
 * @param {*} TaskSchema
 * @returns
 */
queryService.setup = (config, TaskSchema) => {
  let query = {};
  const { taskId, status } = config;
  const { validStatuses } = TaskSchema;
  const statusFilter = queryService.setupStatusFilter(status, validStatuses);

  // Default to filtering by statusFilter
  if (statusFilter != null) {
    query = { status: statusFilter };
  }

  // Add taskId filter to query if set
  if (taskId != null) {
    query = {
      ...query,
      _id: mongoose.Types.ObjectId.createFromHexString(taskId),
    };
  }

  return query;
};

/**
 * Sets up the status filter for the Task query
 * @param {*} status
 * @param {*} validStatuses
 * @returns
 */
queryService.setupStatusFilter = (status, validStatuses) => {
  if (status === "any") return null;

  if (Array.isArray(status) === true) {
    const statusArray = status.map((statusItem) =>
      validStatuses.includes(statusItem) ? statusItem : null
    );
    return { $in: statusArray };
  }

  if (status != null) return status;

  return "pending";
};

export default queryService;
