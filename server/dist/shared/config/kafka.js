import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "url-service",
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});
const producer = kafka.producer({
    allowAutoTopicCreation: true,
});
const consumer = kafka.consumer({
    groupId: process.env.KAFKA_CONSUMER_GROUP || "url-shortener-clicks",
});
export { producer, consumer, kafka };
//# sourceMappingURL=kafka.js.map