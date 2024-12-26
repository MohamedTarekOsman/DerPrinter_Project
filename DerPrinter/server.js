/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// تحميل متغيرات البيئة من ملف .env
dotenv.config();

const app = express();

// إعدادات الوسطاء
app.use(cors());
app.use(bodyParser.json());

// إعداد nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // استخدم خدمة البريد الخاصة بك
  auth: {
    user: process.env.EMAIL_USER, // بريدك الإلكتروني من متغيرات البيئة
    pass: process.env.EMAIL_PASS, // كلمة مرور البريد من متغيرات البيئة
  },
});

// نقطة النهاية لاستقبال البيانات وإرسال البريد
app.post('/send-email', (req, res) => {
  const { fname, lname, email, msg } = req.body;

  const mailOptions = {
    from: email, // البريد الإلكتروني للمرسل
    to: process.env.RECEIVER_EMAIL, // بريدك الذي ستستقبل عليه الرسائل
    subject: `Nachricht von ${fname} ${lname}`,
    text: `Nachricht: ${msg}\nVon: ${fname} ${lname}\nE-Mail: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
});

// تشغيل الخادم
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
