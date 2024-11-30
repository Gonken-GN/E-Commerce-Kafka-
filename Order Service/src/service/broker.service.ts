import { Consumer, Producer } from "kafkajs";
import { MessageBroker } from "../utils/broker";
import { handleSubscription } from "./order.service";
import { OrderEvent } from "../types";

export const InitializeBroker = async () => {
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", async () => {
    console.log("Producer Connected");
  });

  const consumer = await MessageBroker.connectConsumer<Consumer>();
  consumer.on("consumer.connect", async () => {
    console.log("Consumer Connected");
  });

  await MessageBroker.subscribe(handleSubscription, "OrderEvents");
};

export const SendCreateOrderMessage = async (data: any) => {
  await MessageBroker.publish({
    event: OrderEvent.CREATE_ORDER,
    topic: "CatalogEvents",
    headers: {},
    message: data,
  });
};

export const SendOrderCancelledMessage = async (data: any) => {
  await MessageBroker.publish({
    event: OrderEvent.CANCEL_ORDER,
    topic: "CatalogEvents",
    headers: {},
    message: data,
  });
};