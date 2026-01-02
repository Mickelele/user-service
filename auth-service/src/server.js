require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');

console.log('🔍 Sprawdzanie zmiennych środowiskowych:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Ustawione' : '❌ BRAK');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ Ustawione' : '❌ BRAK');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST || 'smtp.gmail.com (domyślne)');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || '❌ BRAK');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Auth-service running on port ${PORT}`));
