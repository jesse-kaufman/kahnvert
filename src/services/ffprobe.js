import ffmpeg from "fluent-ffmpeg";

/**
 * Gets video file information from ffprobe
 *
 * @param {string} file String containing video file
 * @returns {Object} Object containing video data
 */
const getData = (file) => {
  // Wrap ffmpeg.ffprobe() call in promise
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(file, (error, response) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      console.log(response);
      resolve(response);
    });
  });
};

export default getData;
