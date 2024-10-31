// src/controllers/paymentController.js
import Payment from '../models/entities/Payment.js';
import { sendToQueue } from '../utilities/broker/RabbitMQProducer.js';

// ایجاد پرداخت جدید
export const createPayment = async (req, res) => {
  try {
    const paymentData = req.body;

    // ایجاد یک سند جدید از مدل Payment
    const payment = new Payment(paymentData);
    await payment.save();

    // ارسال پیام به RabbitMQ
    await sendToQueue({
      ...paymentData,
      status: 'pending', // وضعیت اولیه پرداخت
    });

    res.status(201).json({
      success: true,
      message: 'پرداخت با موفقیت ایجاد شد',
      data: payment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'خطا در ایجاد پرداخت',
      error: error.message
    });
  }
};

// دریافت پرداخت بر اساس شناسه
export const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'پرداخت پیدا نشد'
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'خطا در دریافت پرداخت',
      error: error.message
    });
  }
};

// دریافت همه پرداخت‌ها
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({
      success: true,
      data: payments
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'خطا در دریافت پرداخت‌ها',
      error: error.message
    });
  }
};

// به‌روزرسانی وضعیت پرداخت
export const updatePaymentStatus = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { newStatus } = req.body;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'پرداخت پیدا نشد'
      });
    }

    // به‌روزرسانی وضعیت پرداخت
    payment.status = newStatus;
    await payment.save();

    res.status(200).json({
      success: true,
      message: 'وضعیت پرداخت با موفقیت به‌روزرسانی شد',
      data: payment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'خطا در به‌روزرسانی وضعیت پرداخت',
      error: error.message
    });
  }
};

// حذف پرداخت
export const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const payment = await Payment.findByIdAndDelete(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'پرداخت پیدا نشد'
      });
    }

    res.status(200).json({
      success: true,
      message: 'پرداخت با موفقیت حذف شد'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'خطا در حذف پرداخت',
      error: error.message
    });
  }
};
