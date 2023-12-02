const mysql = require('mysql');
const db = require('../database/database');


// Contrôleur pour gérer l'inscription d'un utilisateur
const inscriptionController = (req, res) => {
    const { nom, email, motDePasse } = req.body;

    // Insérez les données d'inscription dans la base de données
    const sql = 'INSERT INTO utilisateurs (nom, email, motDePasse) VALUES (?, ?, ?)';
    db.query(sql, [nom, email, motDePasse], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de l\'inscription' });
        } else {
            res.status(200).json({ message: 'Inscription réussie' });
        }
    });
};

module.exports = inscriptionController;
