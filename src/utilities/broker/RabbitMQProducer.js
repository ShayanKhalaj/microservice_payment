// src/rabbitMQProducer.js
import amqp from 'amqplib';

const QUEUE_NAME = 'paymentQueue';

let channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
  }
};

export const sendToQueue = async (message) => {
  if (!channel) {
    console.error('Channel not initialized');
    return;
  }
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), { persistent: true });
};
