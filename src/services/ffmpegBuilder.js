import config from "../models/configModel.js";

/**
 * Gets input arguments for FFMPEG command
 *
 * @returns {Array<string>} Input arguments
 */
const getInputArgs = () => {
  const args = [
    ...config.inputOptions,
    `-probesize ${config.ffmpegProbeSize}`,
    `-analyzeduration ${config.ffmpegAnalyzeDuration}`,
  ];

  if (config.hwAccel) {
    args.push(`-hwaccel ${config.hwAccel}`);
  }

  return args;
};

/**
 * Gets audio arguments for FFMPEG command
 *
 * @param {*} streams Array of FFMPEG streams
 * @returns {Array<string>} Audio arguments
 */
const getAudioArgs = (streams) => {
  const audioArgs = [];

  streams.forEach((stream, index) => {
    audioArgs.push(`-map 0:a:${index}`);
    audioArgs.push(`-c:a:${index} ${config.audioCodec}`);
    audioArgs.push(`-metadata:s:a:${index} title="${stream.title}"`);

    // eslint-disable-next-line no-magic-numbers
    if (stream.channels > 2) {
      audioArgs.push(`-map 0:a:${index}`);
      audioArgs.push(`-c:a:${index} ${config.audioCodec}`);
      audioArgs.push("-ac 2");
      audioArgs.push(`-metadata:s:a:${index} title="English / Stereo"`);
    }
  });

  return audioArgs;
};

/**
 * Gets video arguments for FFMPEG command
 *
 * @returns {Array<String>} Video arguments
 */
const getVideoArgs = () => {
  return [
    // Set video options
    "-map 0:v:0",
    `-c:v ${config.videoCodec}`,
    `-preset ${config.videoPreset}`,
    `-crf ${config.videoCrf}`,
    ...config.videoOptions,
  ];
};

/**
 * Gets additional arguments for FFMPEG command
 *
 * @returns {Array<string>} Arguments for FFMPEG command
 */
const getOtherArgs = () => {
  return [
    // Copy tags
    "-map 0:t?",
    "-c:t copy",
    // Add comment
    '-metadata comment="Processed by Kahnvert"',
    "-strict experimental",
  ];
};

/**
 * Gets FFMPEG command for given video file
 *
 * @param {Object} videoFile The video file
 * @returns {String} The FFMPEG command
 */
const getCommand = (videoFile) => {
  const args = [];

  args.push(...getInputArgs());
  args.push(`-i "${videoFile.inputFile}"`);
  args.push(...getAudioArgs(videoFile.getOutputAudioStreams()));
  args.push(...getVideoArgs());
  args.push(...getOtherArgs());
  args.push(`"${videoFile.outputFile}"`);

  return `${config.ffmpegPath}/ffmpeg ${args.join(" ")}`;
};

export default { getCommand };
