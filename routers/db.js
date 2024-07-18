const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DATA_USERNAME,
    passsword: process.env.DATA_MOT_DE_PASSE , 
    host : process.env.DATA_HOTE , 
    port : process.env.DATA_PORT ,
    database : process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erreur de connexion à la base de données', err.stack);
    }
    console.log('Connexion réussie à la base de données');
    release();
});
module.exports = { pool };

module.exports.query = (text, params) => {
    return pool.query(text, params);
};