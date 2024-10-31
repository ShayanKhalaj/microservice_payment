import express from 'express';
import * as paymentController from '../controllers/PaymentController.js';

const PaymentRouter = express.Router();

// ایجاد پرداخت جدید
PaymentRouter.post('/payments/create', paymentController.createPayment);

// دریافت پرداخت بر اساس شناسه
PaymentRouter.get('/payments/:id', paymentController.getPaymentById);

// دریافت همه پرداخت‌ها
PaymentRouter.get('/payments', paymentController.getAllPayments);

// به‌روزرسانی وضعیت پرداخت
PaymentRouter.patch('/payments/:id/status', paymentController.updatePaymentStatus);

// حذف پرداخت
PaymentRouter.delete('/payments/:id', paymentController.deletePayment);

export default PaymentRouter;
