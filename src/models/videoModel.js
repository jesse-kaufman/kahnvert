import config from "./configModel.js";
import ffmpegBuilder from "../services/ffmpegBuilder.js";
import ffprobe from "../services/ffprobe.js";
import metadata from "../services/metadata.js";
import path from "path";

/**
 * Gets audio streams from ffprobe data
 *
 * @param {Array} streams Array of streams from video data
 * @returns
 */
function getAudioStreams() {
  return this.streams.filter((stream) => {
    if (stream.codec_type !== "audio") return false;

    if (stream.tags.language != null && stream.tags.language !== "eng")
      return false;

    return true;
  });
}

/**
 * Gets output audio streams from videoFile data
 *
 * @param {Array} streams Array of streams from video data
 * @returns
 */
function getOutputAudioStreams() {
  const outputStreams = [];
  const inputStreams = this.getAudioStreams();

  inputStreams.forEach((stream) => {
    // Get index, channels, and channel layout from stream object
    // eslint-disable-next-line camelcase
    const { index, codec_name, channels, channel_layout } = stream;

    outputStreams.push({
      index,
      // eslint-disable-next-line camelcase
      codec_name,
      channels,
      // eslint-disable-next-line camelcase
      channel_layout,
      title: metadata.formatAudioStreamTitle(stream),
    });
  });

  return outputStreams;
}

/**
 * Gets video streams from videoFile data
 *
 * @param {Array} streams
 * @returns
 */
function getVideoStreams() {
  return this.streams.filter((stream) => stream.codec_type === "video");
}

/**
 * Gets FFMPEG command from ffmpegBuilder
 *
 * @returns {String} FFMPEG command
 */
function getFfmpegCommand() {
  return ffmpegBuilder.getCommand(this);
}

/**
 * Gets video file information from videoFile
 *
 * @param {string} file String containing video file
 * @returns
 */
const read = async (file) => {
  const inputFile = `${config.libraryPath}/${file}`;
  const outputFilename = file.replace(path.extname(file), "mkv");

  // Read video file data
  const data = await ffprobe(inputFile);

  // Set input/output filenames
  data.inputFile = inputFile;
  data.outputFile = `${config.outputPath}/${outputFilename}`;

  // Add methods to object
  data.getAudioStreams = getAudioStreams;
  data.getOutputAudioStreams = getOutputAudioStreams;
  data.getVideoStreams = getVideoStreams;
  data.getFfmpegCommand = getFfmpegCommand;

  return data;
};
export default { read };
