
const { Server } = require('socket.io');


const sendMessage = (io) => (req, res) => {
  const { message } = req.body;

  // Envoie le message au WebSocket
  io.emit('chat message', message);

  res.status(200).json({ success: true });
};

module.exports = {
  sendMessage,
};
