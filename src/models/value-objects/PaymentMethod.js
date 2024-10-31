class PaymentMethod {
  constructor(method) {
    const validMethods = ['zarrin_pal', 'asan_pardakht', 'saman_bank', 'mellat_bank'];

    if (!this.isValidMethod(method, validMethods)) {
      throw new Error('روش پرداخت معتبر نیست');
    }
    this.method = method.toLowerCase(); // ذخیره روش پرداخت به صورت حروف کوچک
  }

  // اعتبارسنجی روش پرداخت
  isValidMethod(method, validMethods) {
    return validMethods.includes(method.toLowerCase());
  }

  getMethod() {
    return this.method;
  }

  static isValid(method) {
    const validMethods = ['zarrin_pal', 'asan_pardakht', 'saman_bank', 'mellat_bank'];
    return this.isValidMethod(method, validMethods);
  }
}

export default PaymentMethod;
