const { Pool } = require('pg');

const pool = new pool({
    user:'anto',
    mot_de_passe : 'posgres' , 
    hôte : 'localhost' , 
    port : 5432 ,
    database : 'shorturldatabase'
});

module.exports = {
    query : (text, params) =>{ pool.query(text, params)
}};