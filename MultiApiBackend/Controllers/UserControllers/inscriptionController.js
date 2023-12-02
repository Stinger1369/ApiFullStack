const mysql = require('mysql');
const db = require('../../database/database');

// Contrôleur pour gérer l'inscription d'un utilisateur
const inscriptionController = (req, res) => {
    const { nom_utilisateur, email, mot_de_passe } = req.body;

    console.log("Début de l'inscription :", nom_utilisateur, email); // Affiche les détails de l'utilisateur

    // Première étape, vérifier si l'email existe déjà
    const emailCheckSql = 'SELECT * FROM utilisateurs WHERE email = ?';
    db.query(emailCheckSql, [email], (err, result) => {
        if (err) {
            console.error("Erreur lors de la vérification de l'email :", err);
            return res.status(500).json({ message: 'Erreur lors de la vérification de l\'email' });
        }

        if (result.length > 0) {
            console.log("Email déjà utilisé :", email); // Email existe déjà
            return res.status(409).json({ message: 'Email déjà utilisé' });
        }

        // Si l'email n'existe pas, procéder à l'inscription
        const sql = 'INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe) VALUES (?, ?, ?)';
        db.query(sql, [nom_utilisateur, email, mot_de_passe], (error, result) => {
            if (error) {
                console.error("Erreur lors de l'inscription :", error);
                res.status(500).json({ message: 'Erreur lors de l\'inscription' });
            } else {
                console.log("Inscription réussie pour :", nom_utilisateur);
                res.status(200).json({ message: 'Inscription réussie' });
            }
        });
    });
};

module.exports = inscriptionController;
