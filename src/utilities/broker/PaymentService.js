// src/services/paymentService.js
import amqp from 'amqplib';
import Payment from '../../models/entities/Payment.js';

const QUEUE_NAME = 'paymentQueue';
const PAYMENT_STATUS_QUEUE = 'paymentStatusQueue';

export const processOrder = async (order) => {
  try {
    // فرض می‌کنیم که پرداخت موفقیت‌آمیز است و داده‌های پرداخت را در پایگاه داده ذخیره می‌کنیم
    const paymentData = {
      transactionId: order.transactionId,
      userId: order.userId,
      orderId: order.orderId,
      amount: order.amount,
      currency: order.currency,
      status: 'completed', // یا وضعیت واقعی پرداخت
      paymentMethod: order.paymentMethod,
      providerResponse: order.providerResponse,
    };

    // ذخیره اطلاعات پرداخت در پایگاه داده
    const payment = new Payment(paymentData);
    await payment.save();
    console.log('Payment saved to database:', payment);

    // ارسال وضعیت پرداخت به صف وضعیت
    const channel = await amqp.connect('amqp://localhost').then(conn => conn.createChannel());
    await channel.assertQueue(PAYMENT_STATUS_QUEUE);
    channel.sendToQueue(PAYMENT_STATUS_QUEUE, Buffer.from(JSON.stringify({
      orderId: order.orderId,
      status: 'completed', // یا وضعیت واقعی پرداخت
    })));
    console.log('Payment status published to queue');

    await channel.close();
  } catch (error) {
    console.error('Error processing order:', error.message);
  }
};

export const startPaymentService = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME);

  console.log('Waiting for messages in %s', QUEUE_NAME);

  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg !== null) {
      const order = JSON.parse(msg.content.toString());
      console.log('Received order:', order);
      await processOrder(order);
      channel.ack(msg);
    }
  });
};
