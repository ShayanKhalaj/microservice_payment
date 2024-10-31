import mongoose from "mongoose";
import Amount from "../value-objects/Amount.js";
import Currency from "../value-objects/Currency.js";
import PaymentMethod from "../value-objects/PaymentMethod.js";
import Status from "../value-objects/Status.js";
import ProviderResponse from "../value-objects/ProviderResponse.js";


const PaymentSchema = new mongoose.Schema({
  transactionId: {
    type: Number,
    required: true,
    unique: true, // شناسه یکتا برای تراکنش
    index: true
  },
  userId: {
    type: Number,
    required: true,
    ref: 'User' // مرجع به سرویس کاربر
  },
  orderId: {
    type: Number,
    required: true,
    ref: 'Order' // مرجع به سرویس سفارش
  },
  amount: { 
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return Amount.isValid(value); // استفاده از متد isValid برای اعتبارسنجی
      },
      message: props => `${props.value} مبلغ معتبر نیست!`
    },
  }, 
  currency: {
    type: String,
    required: true,
    default: 'IRR',
    validate: {
      validator: function (value) {
        return Currency.isValid(value); // استفاده از متد isValid برای اعتبارسنجی
      },
      message: props => `${props.value} واحد ارز معتبر نیست!`
    },
    uppercase: true, // ذخیره ارز به صورت حروف بزرگ
  },
  status: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return Status.isValid(value); // استفاده از متد isValid برای اعتبارسنجی وضعیت
      },
      message: props => `${props.value} وضعیت معتبر نیست!`
    },
    lowercase: true, // ذخیره وضعیت به صورت حروف کوچک
  },
  paymentMethod: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return PaymentMethod.isValid(value); // استفاده از متد isValid برای اعتبارسنجی روش پرداخت
      },
      message: props => `${props.value} روش پرداخت معتبر نیست!`
    },
    lowercase: true, // ذخیره روش پرداخت به صورت حروف کوچک
  },
  providerResponse: {
    type: Map,
    of: String,
    required: true,
    validate: {
      validator: function (value) {
        return ProviderResponse.isValid(value); // استفاده از متد isValid برای اعتبارسنجی پاسخ ارائه‌دهنده
      },
      message: props => 'پاسخ ارائه‌دهنده معتبر نیست!'
    },
  },
  createdAt: {
    type: Date,
    default: Date.now // تاریخ و زمان ایجاد
  },
  updatedAt: {
    type: Date,
    default: Date.now // تاریخ و زمان آخرین به‌روزرسانی
  }
});

// به‌روزرسانی خودکار updatedAt
PaymentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// افزودن متد برای به‌روزرسانی وضعیت پرداخت
PaymentSchema.methods.updateStatus = function (newStatus) {
  this.status = newStatus;
  this.updatedAt = Date.now();
  return this.save();
};

const Payment = mongoose.model('payments', PaymentSchema);

export default Payment
