import { pinoHttp } from "pino-http";
import pino from "pino";
export const logger = pino({
  level: "info",
  base: {
    serviceName: "catalog-service",
  },
  serializers: pino.stdSerializers,
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  transport: {
    target: "pino-pretty",
    level: "error",
  },
});

export const httpLogger = pinoHttp({
  level: "error",
  logger,
});
