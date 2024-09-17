const metadata = {};

/**
 * Formats audio stream title
 *
 * @param {Object} stream The audio stream object
 * @returns {String} Title of the audio stream
 */
metadata.formatAudioStreamTitle = (stream) => {
  // Copy existing title if set, otherwise use "English / {channel_layout}"
  const title = stream?.tags?.title || `English / ${stream.channel_layout}`;

  // Replace "AC3", "DTS", or "TrueHD" with "AAC" in title
  return title.replace(/(AC3|DTS|TrueHD)/i, "AAC");
};

export default metadata;
