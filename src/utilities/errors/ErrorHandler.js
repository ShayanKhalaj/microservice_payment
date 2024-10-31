// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // چاپ خطا در کنسول برای اشکال‌زدایی
  
    // بررسی نوع خطا
    if (err.name === 'ValidationError') {
      // خطای اعتبارسنجی
      return res.status(400).json({
        success: false,
        message: 'خطای اعتبارسنجی',
        error: err.message
      });
    }
  
    if (err.name === 'CastError') {
      // خطای تبدیل نوع
      return res.status(400).json({
        success: false,
        message: 'شناسه یا داده‌های وارد شده معتبر نیستند',
        error: err.message
      });
    }
  
    // خطای داخلی سرور
    res.status(500).json({
      success: false,
      message: 'مشکلی در سرور رخ داده است.',
      error: err.message
    });
  };
  
  export default errorHandler;
  