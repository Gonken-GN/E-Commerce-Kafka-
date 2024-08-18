import app from "./expressApp";
import * as dotenv from "dotenv";
import { logger } from "./utils";
dotenv.config();
const PORT = process.env.APP_PORT || 8000;
export const StartServer = async () => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

StartServer().then(() => logger.info("Server started"));
