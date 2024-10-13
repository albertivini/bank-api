import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, errors } = format;

const customFormat = printf(({ message, timestamp }) => {
  return `${timestamp}: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    customFormat,
  ),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});
