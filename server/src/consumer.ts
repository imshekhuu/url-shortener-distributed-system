import "dotenv/config";
import { consumer, kafka } from "./shared/config/kafka.js";
import { processClickEvent } from "./services/click.service.js";
import postgresDb from "./shared/Connections/postgresDb.js";

async function startConsumer() {
  try {
    await postgresDb.connect();

    // Connect to Kafka
    await consumer.connect();

    console.log("Kafka Consumer Connected");

    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
      waitForLeaders: true,
      topics: [{ topic: "click-events", numPartitions: 1, replicationFactor: 1 }],
    });
    await admin.disconnect();

    // Subscribe to topic
    await consumer.subscribe({
      topic: "click-events",
      fromBeginning: false,
    });

    // Start consuming messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          // Convert Buffer into string
          if (!message.value) {
            throw new Error("Kafka message has no value");
          }

          const data = JSON.parse(message.value.toString());

          console.log("Received Event:", data);

          console.log("Topic:", topic);
          console.log("Partition:", partition);
          console.log("Offset:", message.offset);

          // Process event
          await processClickEvent(data);
        } catch (error) {
          console.error("Message processing failed:", error);

          // Throw so KafkaJS does not treat
          // this message as successfully processed.
          throw error;
        }
      },
    });
  } catch (error) {
    console.error("Consumer error:", error);

    process.exit(1);
  }
}

async function shutdown() {
  console.log("Shutting down consumer...");

  await Promise.allSettled([consumer.disconnect(), postgresDb.disconnect()]);

  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startConsumer();
