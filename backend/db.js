const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'projekt_inzynierka',
    password: 'postgres',
    port: 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Błąd połączenia z bazą:', err.stack);
    }
    console.log('Połączono z PostgreSQL!');
    release();
});

module.exports = pool;
