const { Server } = require('socket.io');
const db = require('../../database/database');

// Fonction pour enregistrer les messages dans la base de données
const saveMessage = async (sender_id, receiver_id, message) => {
  const query = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(query, [sender_id, receiver_id, message], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Fonction pour gérer l'envoi des messages
const sendMessage = (io) => async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  try {
    await saveMessage(sender_id, receiver_id, message);
    io.emit('chat message', message);
    res.status(200).json({ success: true, message: 'Message envoyé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement du message' });
  }
};

module.exports = {
  sendMessage,
  saveMessage,
};
