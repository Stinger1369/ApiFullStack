const express = require('express');
const router = express.Router();
const inscriptionController = require('../Controllers/inscriptionController');
const connexionController = require('../Controllers/connexionController');

// Route pour l'inscription d'un utilisateur
router.post('/inscription', inscriptionController);

// Route pour la connexion d'un utilisateur
router.post('/connexion', connexionController);

module.exports = router;
