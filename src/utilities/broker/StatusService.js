// src/services/statusService.js
import amqp from 'amqplib';

const PAYMENT_STATUS_QUEUE = 'paymentStatusQueue';

export const startStatusService = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(PAYMENT_STATUS_QUEUE);

  console.log('Waiting for payment status messages in %s', PAYMENT_STATUS_QUEUE);

  channel.consume(PAYMENT_STATUS_QUEUE, (msg) => {
    if (msg !== null) {
      const paymentStatus = JSON.parse(msg.content.toString());
      console.log('Received payment status:', paymentStatus);
      // اینجا باید وضعیت پرداخت را در پایگاه داده ثبت کنید
      channel.ack(msg);
    }
  });
};
