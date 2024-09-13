const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
require('dotenv').config();

// Парсинг даних з форми
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Статичні файли (наприклад, для вашого HTML і CSS)
app.use(express.static('public'));

// Налаштування Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.LOGIN, // Ваша пошта
        pass: process.env.PASS // Ваш пароль або пароль додатка
    }
});

// Обробка POST запиту з форми
app.post('/send', (req, res) => {
    const { username, tel, email, textarea } = req.body;

    const mailOptions = {
        from: email,
        to: 'recipient-email@gmail.com', // Куди надсилається повідомлення
        subject: 'Повідомлення з HOLIWEB',
        text: `Ім'я: ${username}\nТелефон: ${tel}\nEmail: ${email}\nПовідомлення: ${textarea}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Помилка при відправці повідомлення');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Дякуємо, повідомлення успішно надіслано.');
        }
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});
