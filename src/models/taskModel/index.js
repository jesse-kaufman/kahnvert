import VideoInfoSchema from "./schemas.js";
import methods from "./methods.js";
import mongoose from "mongoose";
import statics from "./statics.js";

/**
 * List of valid Task statuses.
 */
const validStatuses = [
  "pending",
  "assigned",
  "processing",
  "complete",
  "missing",
  "failed",
  "inactive",
];

const TaskSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: validStatuses,
      default: "pending",
    },
    filename: {
      type: String,
      required: true,
      validate: {
        validator: (value) =>
          /^[\p{Letter}\\ \p{Punctuation}\p{Number}]{3,255}$/gmu.test(value),
        message: (props) =>
          `'${props.value}' is not valid. Filenames must only contain letters, numbers, and punctuation.`,
      },
    },
    inputData: {
      type: VideoInfoSchema,
      required: true,
    },
    outputData: {
      type: VideoInfoSchema,
      required: true,
    },
    assignedNode: {
      type: String,
    },
    startedAt: {
      type: Date,
    },
    endedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

TaskSchema.pre("save", function () {
  this.status = "assigned";
  console.log("here", this);
  return this;
});

// Add static methods to schema
TaskSchema.statics = statics;

// Add task config to schema
TaskSchema.statics.validStatuses = validStatuses;

// Add instance methods to schema
TaskSchema.methods = methods;

export default mongoose.model("Task", TaskSchema);
