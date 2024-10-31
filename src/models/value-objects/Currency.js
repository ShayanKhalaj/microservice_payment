class Currency {
  constructor(currency = "IRR") {
    if (!this.isValidCurrencyCode(currency)) {
      throw new Error('واحد ارز معتبر نیست');
    }
    this.currency = currency.toUpperCase(); // نگهداری ارز در قالب حروف بزرگ
  }

  // اعتبار سنجی کد ارز
  isValidCurrencyCode(currency) {
    return typeof currency === 'string' && currency.length === 3;
  }

  // متدی برای دریافت اطلاعات ارز
  getCurrency() {
    return this.currency;
  }

  static isValid(currency) {
    try {
      new Currency(currency); // تلاش برای ساخت یک نمونه از کلاس
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default Currency;
