const mysql = require('mysql');
const db = require('../../database/database');
const crypto = require('crypto'); // Node.js module for generating the token
const sendPasswordResetEmail = require('./sendPasswordResetEmail');
const resetPasswordController = (req, res) => {
    const { email } = req.body;
    
    // Step 1: Check if the user exists
    const sql = 'SELECT * FROM utilisateurs WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: 'Erreur lors de la recherche de l\'utilisateur' });
        }

        if (result.length === 0) {
            // For security, don't reveal if email exists in the system
            return res.status(200).json({ message: 'Si l\'email existe dans notre système, un lien de réinitialisation a été envoyé.' });
        }

        // Step 2: User exists, generate a token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const tokenExpiration = Date.now() + 3600000; // 1 hour from now

        // Step 3: Store the token and expiration in the database
        const updateSql = 'UPDATE utilisateurs SET reset_token = ?, token_expiration = ? WHERE email = ?';
    db.query(updateSql, [resetToken, tokenExpiration, email], (err, result) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: 'Erreur lors de l\'enregistrement du token de réinitialisation' });
        }

            // Step 4: Send the reset email
            sendPasswordResetEmail(email, resetToken) // Implement this function according to your email service
                .then(() => {
                    res.status(200).json({ message: 'Un lien de réinitialisation du mot de passe a été envoyé à votre adresse email.' });
                })
                .catch((err) => {
                    console.error('Email sending error: ', err);
                    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
                });
        });
    });
};

module.exports = resetPasswordController;
