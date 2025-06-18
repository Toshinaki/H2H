// logger.ts

type LogLevel = "info" | "warn" | "error";

const LOG_LEVELS: Record<LogLevel, LogLevel> = {
  info: "info",
  warn: "warn",
  error: "error",
};

// Utility function to get the log level based on environment
const getDefaultLogLevel = (): LogLevel => {
  switch (import.meta.env.MODE) {
    case "production":
      return LOG_LEVELS.error; // Log only errors in production
    case "development":
      return LOG_LEVELS.info; // Log all messages in development
    case "test":
      return LOG_LEVELS.error; // Log errors in test environment (adjustable)
    default:
      return LOG_LEVELS.info; // Default to info if NODE_ENV is not set
  }
};

// Utility function to get the log level from environment (can be overridden by VITE_LOG_LEVEL)
const getLogLevel = (): LogLevel => {
  return (import.meta.env.VITE_LOG_LEVEL as LogLevel) || getDefaultLogLevel();
};

class Logger {
  private logLevel: LogLevel;

  constructor() {
    this.logLevel = getLogLevel();
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = [LOG_LEVELS.info, LOG_LEVELS.warn, LOG_LEVELS.error];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const logLevelIndex = levels.indexOf(level);
    return logLevelIndex >= currentLevelIndex;
  }

  info(...message: Array<unknown>): void {
    if (this.shouldLog(LOG_LEVELS.info)) {
      console.info("[INFO] ", ...message);
    }
  }

  warn(...message: Array<unknown>): void {
    if (this.shouldLog(LOG_LEVELS.warn)) {
      console.warn("[WARN] ", ...message);
    }
  }

  error(...message: Array<unknown>): void {
    if (this.shouldLog(LOG_LEVELS.error)) {
      console.error("[ERROR] ", ...message);
    }
  }
}

// Create a logger instance
const logger = new Logger();
export default logger;
