import {producer} from "../shared/config/kafka.js";

async function producerConnect() {
  try {
    await producer.connect();
    console.log("Kafka producer connected successfully");
  } catch (error) {
    console.error("Error connecting Kafka producer:", error);
  }
}



async function sendMessage(event: { shortUrl: string }, data: any){

    await producer.send({
        topic: "click-events",
        messages: [
            {
                key: event.shortUrl, // Use the shortUrl as the key for partitioning
                value: JSON.stringify(data),
            },
        ],
    });

    console.log(`Message sent to Kafka topic 'click-events': ${event} - ${JSON.stringify(data)}`);
}


export { producerConnect, sendMessage };