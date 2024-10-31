class Amount {
  constructor(value) {
    if (!this.isNumber(value)) {
      throw new Error('مقدار باید عددی باشد');
    }
    if (!this.isPositive(value)) {
      throw new Error('مقدار نمی‌تواند منفی باشد');
    }
    this.value = value;
  }

  // بررسی عددی بودن
  isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  // بررسی مثبت بودن مقدار
  isPositive(value) {
    return value >= 0;
  }

  // بررسی اعشاری بودن مقدار
  hasDecimals() {
    return this.value % 1 !== 0;
  }

  // تبدیل به فرمت مناسب (مثلاً دو رقم اعشار)
  format() {
    return this.value.toFixed(2);
  }

  static isValid(value) {
    try {
      new Amount(value); // تلاش برای ساخت یک نمونه از کلاس
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default Amount;
