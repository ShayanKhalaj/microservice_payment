// src/server.js
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import PaymentRouter from './routes/PaymentRouter.js'; // مسیر به فایل روتر
import { connectRabbitMQ } from './utilities/broker/RabbitMQProducer.js'; // وارد کردن ماژول RabbitMQ
import errorHandler from './utilities/errors/ErrorHandler.js';
import { startPaymentService } from './utilities/broker/PaymentService.js';
 // شروع سرویس پرداخت


const app = express();
const PORT = process.env.PORT || 4000;

// تنظیمات Middleware
app.use(helmet()); // افزودن هدرهای امنیتی
app.use(cors()); // فعال‌سازی CORS
app.use(express.json()); // برای پردازش JSON

// تنظیم محدودیت نرخ درخواست
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقیقه
  max: 100, // محدودیت به 100 درخواست در هر 15 دقیقه
  message: 'تعداد درخواست‌ها از حد مجاز عبور کرده است.'
});
app.use(limiter);

// اتصال به پایگاه داده MongoDB
mongoose.connect('mongodb://localhost:27017/Payment-Sevice', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // برای ایجاد ایندکس‌ها به صورت خودکار (اختیاری)
  useFindAndModify: false // برای جلوگیری از هشدارهای مربوط به findAndModify (اختیاری)
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// اتصال به RabbitMQ
connectRabbitMQ(() => {
  console.log('Connected to RabbitMQ');
});

// شروع سرویس پردازش پرداخت
startPaymentService();

// استفاده از روترها
app.use('/api', PaymentRouter);

// مدیریت خطاها
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'مشکلی در سرور رخ داده است.',
    error: err.message
  });
});

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
