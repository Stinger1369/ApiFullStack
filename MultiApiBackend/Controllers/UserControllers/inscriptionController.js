const mysql = require('mysql');
const db = require('../../database/database');


// Contrôleur pour gérer l'inscription d'un utilisateur
const inscriptionController = (req, res) => {
    const { nom_utilisateur, email, mot_de_passe } = req.body;

    // First, check if the email already exists
    const emailCheckSql = 'SELECT * FROM utilisateurs WHERE email = ?';
    db.query(emailCheckSql, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur lors de la vérification de l\'email' });
        }

        if (result.length > 0) {
            // Email already exists
            return res.status(409).json({ message: 'Email déjà utilisé' });
        }

        // If email doesn't exist, proceed with registration
        const sql = 'INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe) VALUES (?, ?, ?)';
        db.query(sql, [nom_utilisateur, email, mot_de_passe], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Erreur lors de l\'inscription' });
            } else {
                res.status(200).json({ message: 'Inscription réussie' });
            }
        });
    });
};

module.exports = inscriptionController;
