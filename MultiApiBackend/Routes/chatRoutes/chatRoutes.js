// MultiApiBackend/Routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../../Controllers/chatControllers/chatController'); 

// Définissez une route pour envoyer un message dans le chat
router.post('/send-message', chatController.sendMessage);

module.exports = router;
