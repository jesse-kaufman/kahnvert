const library = {};

library.config = {
  defaultLanguage: "eng",
  ffmpegPath: "/usr/local/bin",
  libraryPath: "/home/storage/media/Movies",
  outputPath: "/home/storage/media/converted",
  ffmpegProbeSize: "5M",
  ffmpegAnalyzeDuration: 5000000,
  inputOptions: ["-fflags", "+genpts"],
  hardwareAccel: "vaapi",
  containerFormat: "mkv",
  audioCodec: "aac",
  audioEncoder: "libfdk_aac",
  videoCodec: "libx265",
  videoPreset: "slow",
  videoCrf: 24,
  videoOptions: ["-pix_fmt:v:0 yuv420p10le", "-profile:v:0 main10"],
};

export default library;
