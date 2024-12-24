const express = require('express');
const bodyParser = require('body-parser'); // Body parser kutubxonasi
const fs = require('fs');

const app = express(); // `app` obyektini shu yerda e'lon qilish kerak

app.use(bodyParser.json()); // Endi `app` mavjud va foydalanishga tayyor