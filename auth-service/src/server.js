require('dotenv').config({ path: __dirname + '/../.env' });
console.log('✅ AUTH .env loaded. JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Auth-service running on port ${PORT}`));
