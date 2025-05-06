import { PinoLogger, pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

export const pinoLoggerMiddleware = () => {
  return pinoLogger({
    pino: pino(
      {
        level: process.env.LOG_LEVEL || "info",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
          },
        },
      },
      process.env.NODE_ENV === "production" ? undefined : pretty()
    ),
  });
};

export type PinoLoggerType = {
  Variables: {
    logger: PinoLogger;
  };
};
