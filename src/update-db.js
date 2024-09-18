import { connectDb, disconnectDb } from "./config/db.js";
import config from "./config/config.js";
import taskModel from "./models/taskModel.js";
import videoModel from "./models/videoModel.js";

console.log(config);
// MongoDB connection
connectDb();

const IN_FILE =
  "Hellraiser (1987)/Hellraiser (1987) Remastered [WEBDL-1080p].mkv";

const video = await videoModel.read(IN_FILE);

let audioStreams = video.getAudioStreams();
let videoStreams = video.getVideoStreams();
const streamCount = audioStreams.length + videoStreams.length;

audioStreams = audioStreams.map((stream) => ({
  index: stream.index,
  codecName: stream.codec_name,
  codecLongName: stream.codec_long_name,
  profile: stream.profile,
  channels: stream.channels,
  channelLayout: stream.channel_layout,
  sampleRate: stream.sample_rate,
  bitrate: stream.bit_rate,
  maxBitrate: stream.max_bit_rate,
  title: stream.tags.title,
}));

videoStreams = videoStreams.map((stream) => ({
  index: stream.index,
  codecName: stream.codec_name,
  codecLongName: stream.codec_long_name,
  profile: stream.profile,
  pixelFormat: stream.pix_fmt,
  framerate: stream.avg_frame_rate,
  bitrate: stream.bit_rate,
  maxBitrate: stream.max_bit_rate,
  aspectRatio: stream.display_aspect_ratio,
  width: stream.width,
  height: stream.height,
  title: stream.tags.title,
}));

const videoInfo = {
  streamCount,
  format: video.format.format_name,
  formatLongName: video.format.format_long_name,
  duration: video.format.duration,
  bitrate: video.format.bit_rate,
  size: video.format.size,
  videoStreams,
  audioStreams,
};

console.log(videoInfo);
disconnectDb();
//const task = await taskModel.findOne({ filename: IN_FILE });

//const ffmpegCommand = video.getFfmpegCommand();
//console.log(task);
//console.log(ffmpegCommand);
