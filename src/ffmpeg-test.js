import videoModel from "./models/videoModel.js";

const IN_FILE =
  "Hellraiser (1987)/Hellraiser (1987) Remastered [WEBDL-1080p].mkv";

const app = async () => {
  const video = await videoModel.read(IN_FILE);
  const ffmpegCommand = video.getFfmpegCommand();

  console.log(ffmpegCommand);
};

app();
