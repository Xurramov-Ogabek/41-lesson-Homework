

const express = require('express');
const bodyParser = require('body-parser'); // Body parser kutubxonasini ulaymiz
const fs = require('fs');

const app = express(); // `app` obyektini yaratamiz

// Middleware
app.use(bodyParser.json());

// Fayl o'qish va yozish funksiyalari
const readData = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

const USERS_FILE = './database/users.json';
const BLOGS_FILE = './database/blog.json';

// Ro'yxatdan o'tkazish
app.post('/register', (req, res) => {
    const { username, password, fullName, age, email, gender } = req.body;

    if (!username || username.length < 3) return res.status(400).send('Username kamida 3 ta belgidan iborat bo\'lishi kerak.');
    if (!password || password.length < 5) return res.status(400).send('Parol kamida 5 ta belgidan iborat bo\'lishi kerak.');
    if (!email) return res.status(400).send('Email kiritilishi shart.');
    if (age < 10) return res.status(400).send('Yosh kamida 10 dan katta bo\'lishi kerak.');

    const users = readData(USERS_FILE);
    if (users.find(user => user.username === username || user.email === email)) {
        return res.status(400).send('Bu username yoki email avvaldan mavjud.');
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
        fullName: fullName || '',
        age,
        email,
        gender: gender || 'not specified',
    };

    users.push(newUser);
    writeData(USERS_FILE, users);
    res.status(201).send(newUser);
});

// Profilni olish
app.get('/profile/:identifier', (req, res) => {
    const identifier = req.params.identifier;
    const users = readData(USERS_FILE);

    const user = users.find(u => u.username === identifier || u.email === identifier);
    if (!user) return res.status(404).send('Foydalanuvchi topilmadi.');

    res.status(200).send(user);
});

// Serverni boshlash
app.listen(3000, () => console.log('Server ishlayapti: http://localhost:3000'));