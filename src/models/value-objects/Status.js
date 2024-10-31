class Status {
  constructor(status) {
    const validStatuses = ['pending', 'completed', 'failed', 'canceled'];

    if (!this.isValidStatus(status, validStatuses)) {
      throw new Error('وضعیت معتبر نیست');
    }
    this.status = status.toLowerCase(); // ذخیره وضعیت به صورت حروف کوچک
  }

  // اعتبارسنجی وضعیت
  isValidStatus(status, validStatuses) {
    return validStatuses.includes(status.toLowerCase());
  }

  getStatus() {
    return this.status;
  }

  static isValid(status) {
    const validStatuses = ['pending', 'completed', 'failed', 'canceled'];
    return this.isValidStatus(status, validStatuses);
  }
}

export default Status;
