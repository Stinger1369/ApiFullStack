// MultiApiBackend/Routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../../Controllers/chatControllers/userController');

// Route pour obtenir la liste des utilisateurs
router.get('/users', userController.getUsers);

module.exports = router;
