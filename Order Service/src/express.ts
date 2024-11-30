import express, { Request, Response } from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import { HandleErrorWithLogger, httpLogger } from "./utils";
import { MessageBroker } from "./utils/broker";
import { Consumer, Producer } from "kafkajs";
import { InitializeBroker } from "./service/broker.service";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);

  await InitializeBroker();

  app.use("/order", orderRoutes);
  app.use("/cart", cartRoutes);

  app.use(HandleErrorWithLogger);

  return app;
};
