require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const USER_SVC = process.env.USER_SVC || 'http://localhost:4000';


app.post('/api/auth/register', async (req, res) => {
    const r = await fetch(`${USER_SVC}/auth/register`, {
        method: 'POST', body: JSON.stringify(req.body), headers: {'Content-Type':'application/json'}
    });
    const data = await r.json();
    res.status(r.status).json(data);
});
app.post('/api/auth/login', async (req, res) => {
    const r = await fetch(`${USER_SVC}/auth/login`, {
        method: 'POST', body: JSON.stringify(req.body), headers: {'Content-Type':'application/json'}
    });
    const data = await r.json();
    res.status(r.status).json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`gateway on ${PORT}`));
