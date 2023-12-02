const mysql = require('mysql');
const db = require('../database/database');

// Contrôleur pour gérer la connexion d'un utilisateur
const connexionController = (req, res) => {
    const { email, motDePasse } = req.body;

    // Vérifiez les informations de connexion dans la base de données
    const sql = 'SELECT * FROM utilisateurs WHERE email = ? AND motDePasse = ?';
    db.query(sql, [email, motDePasse], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la connexion' });
        } else {
            if (result.length > 0) {
                // Utilisateur connecté avec succès
                res.status(200).json({ message: 'Connexion réussie' });
            } else {
                // Identifiants de connexion invalides
                res.status(401).json({ message: 'Identifiants de connexion invalides' });
            }
        }
    });
};

module.exports = connexionController;
