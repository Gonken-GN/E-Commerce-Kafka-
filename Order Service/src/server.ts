import { ExpressApp } from "./express";
import * as dotenv from "dotenv";
import { logger } from "./utils";
dotenv.config();
const PORT = process.env.APP_PORT || 9000;
export const StartServer = async () => {
  const app = await ExpressApp();
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

StartServer().then(() => logger.info("Server started"));
