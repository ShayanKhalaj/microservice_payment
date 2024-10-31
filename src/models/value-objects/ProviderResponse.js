class ProviderResponse {
    constructor(response) {
      if (!this.validateResponse(response)) {
        throw new Error('پاسخ ارائه‌دهنده معتبر نیست');
      }
      this.response = response;
    }
  
    // اعتبارسنجی ساختار پاسخ
    validateResponse(response) {
      return response &&
        typeof response === 'object' &&
        typeof response.status === 'string' &&
        typeof response.message === 'string' &&
        response.status.length >= 2 &&
        response.status.length <= 50 &&
        response.message.length >= 5 &&
        response.message.length <= 200;
    }
  
    getResponse() {
      return this.response;
    }
  
    static isValid(response) {
      try {
        new ProviderResponse(response); // تلاش برای ساخت یک نمونه از کلاس
        return true;
      } catch (e) {
        return false;
      }
    }
  }
  
  export default ProviderResponse;
  