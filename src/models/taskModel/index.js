import methods from "./methods.js";
import mongoose from "mongoose-fill";
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

const VideoStreamSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  codecName: {
    type: String,
    required: true,
  },
  codecLongName: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  pixelFormat: {
    type: String,
    required: true,
  },
  framerate: {
    type: Number,
  },
  bitrate: {
    type: String,
  },
  maxBitrate: {
    type: String,
  },
  aspectRatio: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const AudioStreamSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  codecName: {
    type: String,
    required: true,
  },
  codecLongName: {
    type: String,
    required: true,
  },
  profile: { type: String },
  channels: {
    type: Number,
    required: true,
  },
  channelLayout: {
    type: String,
    required: true,
  },
  sampleFormat: {
    type: String,
    required: true,
  },
  bitrate: { type: String },
  maxBitrate: { type: String },
  title: { type: String },
});

const VideoDataSchema = new mongoose.Schema({
  streamCount: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  formatLongName: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  bitrate: {
    type: Number,
    required: true,
  },
  videoStreams: [VideoStreamSchema],
  audioStreams: [AudioStreamSchema],
});

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
      streamCount: {
        type: Number,
        required: true,
      },
      format: {
        type: String,
        required: true,
      },
      formatLongName: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      bitrate: {
        type: Number,
        required: true,
      },
      videoStreams: [VideoStreamSchema],
      audioStreams: [AudioStreamSchema],
    },
    outputData: {
      videoStreams: [VideoStreamSchema],
      audioStreams: [AudioStreamSchema],
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
