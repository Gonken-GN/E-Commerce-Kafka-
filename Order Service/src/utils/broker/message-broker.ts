import { Consumer, Kafka, logLevel, Producer } from "kafkajs";
import { MessageBrokerType, MessageHandler, PublishType } from "./broker.type";

// Configuration Properties
const CLIENT_ID = process.env.CLIENT_ID || "order-service";
const GROUP_ID = process.env.GROUP_ID || "order-service-group";
const BROKERS = [process.env.BROKER_1 || "localhost:9092"];

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  logLevel: logLevel.INFO,
});

let producer: Producer;
let consumer: Consumer;

const createTopic = async (topic: string[]) => {
  const topics = topic.map((t) => ({
    topic: t,
    numPartitions: 2,
    relicationFactor: 1,
  }));

  const admin = kafka.admin();
  await admin.connect();

  const topicExists = await admin.listTopics();
  console.log("Topic Exists: ", topicExists);
  for (const t of topics) {
    if (!topicExists.includes(t.topic)) {
      await admin.createTopics({
        topics: [t],
      });
    }
  }
  await admin.disconnect();
};

export const MessageBroker: MessageBrokerType = {
  connectProducer: function <T>(): Promise<T> {
    throw new Error("Function not implemented.");
  },
  disconnectProducer: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  publish: function (data: PublishType): Promise<boolean> {
    throw new Error("Function not implemented.");
  },
  connectConsumer: function <T>(): Promise<T> {
    throw new Error("Function not implemented.");
  },
  disconnectConsumer: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  subscribe: function (
    messageHandler: MessageHandler,
    topic: string
  ): Promise<void> {
    throw new Error("Function not implemented.");
  },
};
