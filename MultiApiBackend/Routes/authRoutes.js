const express = require('express');
const router = express.Router();

// Import the controllers
const inscriptionController = require('../Controllers/UserControllers/inscriptionController');
const connexionController = require('../Controllers/UserControllers/connexionController');
const resetPasswordController = require('../Controllers/UserControllers/resetPasswordController');

// Existing routes
router.post('/inscription', inscriptionController);
router.post('/connexion', connexionController);

router.post('/auth/reset-password', resetPasswordController);

module.exports = router;
