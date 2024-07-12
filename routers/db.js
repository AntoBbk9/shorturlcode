const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: process.env.DATA_USERNAME,
    mot_de_passe: process.env.DATA_MOT_DE_PASSE , 
    hôte : process.env.DATA_HOTE , 
    port : process.env.DATA_PORT ,
    database : process.env.DATA_DATABASE
});


module.exports = {
    query : (text, params) =>{
        pool.query(text, params)
    }
}