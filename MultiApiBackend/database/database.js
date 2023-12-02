const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Par défaut, l'utilisateur MySQL est 'root'
    password: '', // Par défaut, il n'y a pas de mot de passe
    database: 'nodejs' // Le nom de la base de données que vous souhaitez utiliser
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});

module.exports = db;
