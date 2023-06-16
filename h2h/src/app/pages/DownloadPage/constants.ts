export const FETCH_QUERY_ID = "download-history";
export const FETCH_ALL_QUERY_ID = "download-histories";

export const messages = {
  errors: {
    history: {
      alreadyExists: "messages.error.history.ALREADY_EXISTS",
      notFound: "messages.error.history.NOT_FOUND",
    },
  },
  action: {
    history: {
      create: {
        success: "messages.action.history.create.success",
        fail: "messages.action.history.create.fail",
      },
      update: {
        success: "messages.action.history.update.success",
        fail: "messages.action.history.update.fail",
      },
      delete: {
        success: "messages.action.history.delete.success",
        fail: "messages.action.history.delete.fail",
      },
    },
  },
};

export const AUDIO_SAMPLE_RATES: Record<number, string> = {
  44100: "44.1 kHz", // CD quality
  48000: "48 kHz", // standard for video and audio production
  96000: "96 kHz", // high-resolution audio
  192000: "192 kHz", // ultra-high-resolution audio
  22050: "22.05 kHz", // used for lower-quality audio
  32000: "32 kHz", // used for low-bitrate audio streaming
  8000: "8 kHz", // telephone quality
};
