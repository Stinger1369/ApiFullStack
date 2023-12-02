const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./Routes/authRoutes');
const chatRoutes = require('./Routes/chatRoutes/chatRoutes');
const chatController = require('./Controllers/chatControllers/chatController');
// Import OpenAI package
const { OpenAI } = require('openai');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Appliquer le middleware CORS
app.use(cors({
  origin: 'http://localhost:5173', // Vous pouvez configurer cela en fonction de vos besoins
}));

app.use(express.json());

// Utilisez les routes d'authentification
app.use('/auth', authRoutes);

// Utilisez les routes du chat
app.use('/chat', chatRoutes);

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const port = process.env.PORT || 3001;

app.post('/chatbot', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.complete({
      engine: 'davinci',
      prompt: userMessage,
      maxTokens: 150,
    });
    res.json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    if (error.response && error.response.status === 429) {
      res.status(429).send('Limite de requêtes atteinte. Veuillez réessayer plus tard.');
    } else {
      console.error(error);
      res.status(500).send('Erreur lors de la communication avec OpenAI');
    }
  }
});

// WebSocket pour le chat
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
