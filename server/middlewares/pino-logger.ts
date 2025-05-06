import { PinoLogger, pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

import env from "~/env";

export const pinoLoggerMiddleware = () => {
  return pinoLogger({
    pino: pino(
      {
        level: env.LOG_LEVEL,
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
          },
        },
      },
      env.NODE_ENV === "production" ? undefined : pretty()
    ),
  });
};

export type PinoLoggerType = {
  Variables: {
    logger: PinoLogger;
  };
};
