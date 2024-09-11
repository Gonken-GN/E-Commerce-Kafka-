import express, { Request, Response } from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import { HandleErrorWithLogger, httpLogger } from "./utils";
import { MessageBroker } from "./utils/broker";
import { Consumer, Producer } from "kafkajs";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);

  //   1st step: connect to the producer and consumer
  const producer = MessageBroker.connectProducer<Producer>();
  (await producer).on("producer.connect", () => {
    console.log("Producer Connected");
  });
  const consumer = MessageBroker.connectConsumer<Consumer>();
  (await consumer).on("consumer.connect", () => {
    console.log("Consumer Connected");
  });

  //   2nd step: Subscribe to the topic or publish the message
  await MessageBroker.subscribe((message) => {
    console.log("Consumer received message");
    console.log("Message Received: ", message);
  }, "OrderEvents");
  app.use("/order", orderRoutes);
  app.use("/cart", cartRoutes);

  app.use(HandleErrorWithLogger);

  return app;
};
