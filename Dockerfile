# انتخاب تصویر پایه
FROM node:20

# ایجاد دایرکتوری برای برنامه
WORKDIR /src

# کپی کردن فایل‌های پروژه
COPY package*.json ./
COPY src ./src

# نصب وابستگی‌ها
RUN npm install

# معرفی پورت
EXPOSE 4000

# اجرای برنامه
CMD ["npm", "run", "start"]
