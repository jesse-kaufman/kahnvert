import mongoose from "mongoose";

/**
 * Task log schema
 */
export const TaskLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

/**
 * Audio stream schema
 */
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
  sampleRate: {
    type: String,
    required: true,
  },
  bitrate: { type: String },
  maxBitrate: { type: String },
  title: { type: String },
});

/**
 * Video stream schema
 */
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
    type: String,
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
  },
});

/**
 * Video information schema
 */
export const VideoInfoSchema = new mongoose.Schema({
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
  size: {
    type: Number,
    required: true,
  },
  videoStreams: [VideoStreamSchema],
  audioStreams: [AudioStreamSchema],
});
