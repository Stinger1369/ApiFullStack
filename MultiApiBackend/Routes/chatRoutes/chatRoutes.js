// MultiApiBackend/Routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../../Controllers/chatControllers/chatController'); 
const userController = require('../../Controllers/chatControllers/userController');
 

// Définissez une route pour envoyer un message dans le chat
router.post('/send-message', chatController.sendMessage);
router.post('/save-message', chatController.saveMessage);
router.get('/users', userController.getUsers);

module.exports = router;
