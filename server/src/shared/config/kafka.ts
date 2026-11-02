import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "url-service",
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer({
  allowAutoTopicCreation: false,
});

export { producer, kafka };
