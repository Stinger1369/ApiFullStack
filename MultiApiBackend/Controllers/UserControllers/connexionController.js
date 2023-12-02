const mysql = require('mysql');
const db = require('../../database/database');

const connexionController = (req, res) => {
    const { email, mot_de_passe } = req.body;

    const sql = 'SELECT * FROM utilisateurs WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: 'Erreur lors de la connexion' });
        }

        if (result.length > 0) {
            // Directly comparing plain text password
            if (mot_de_passe === result[0].mot_de_passe) {
                // Include 'nom_utilisateur' in the response
                const nomUtilisateur = result[0].nom_utilisateur;
                res.status(200).json({ message: 'Connexion réussie', nom_utilisateur: nomUtilisateur });
            } else {
                res.status(401).json({ message: 'Mot de passe invalide' });
            }
        } else {
            res.status(401).json({ message: 'Utilisateur non trouvé' });
        }
    });
};


module.exports = connexionController;
