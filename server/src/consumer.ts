import dotenv from "dotenv";
dotenv.config();

const { consumer } = require("./config/kafka");

const {
    processClickEvent
} = require("./services/click.service");


async function startConsumer() {

    try {

        // Connect to Kafka
        await consumer.connect();

        console.log("Kafka Consumer Connected");

        // Subscribe to topic
        await consumer.subscribe({
            topic: "click-events",
            fromBeginning: false
        });

        // Start consuming messages
        await consumer.run({

            eachMessage: async ({
                topic,
                partition,
                message
            }) => {

                try {

                    // Convert Buffer into string
                    const data = JSON.parse(
                        message.value.toString()
                    );

                    console.log("Received Event:", data);

                    console.log("Topic:", topic);
                    console.log("Partition:", partition);
                    console.log(
                        "Offset:",
                        message.offset
                    );

                    // Process event
                    await processClickEvent(data);

                } catch (error) {

                    console.error(
                        "Message processing failed:",
                        error
                    );

                    // Throw so KafkaJS does not treat
                    // this message as successfully processed.
                    throw error;

                }

            }

        });

    } catch (error) {

        console.error("Consumer error:", error);

        process.exit(1);

    }

}


async function shutdown() {

    console.log("Shutting down consumer...");

    await consumer.disconnect();

    process.exit(0);

}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startConsumer();