import { producer } from "../shared/config/kafka.js";
async function producerConnect() {
    await producer.connect();
    console.log("Kafka producer connected successfully");
}
async function sendMessage(event, data) {
    await producer.send({
        topic: "click-events",
        messages: [
            {
                key: event.shortUrl, // Use the shortUrl as the key for partitioning
                value: JSON.stringify(data),
            },
        ],
    });
    console.log(`Message sent to Kafka topic 'click-events': ${event.shortUrl} - ${JSON.stringify(data)}`);
}
export { producerConnect, sendMessage };
//# sourceMappingURL=clickProducer.js.map