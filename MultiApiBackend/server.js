const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./Routes/authRoutes');
const chatRoutes = require('./Routes/chatRoutes/chatRoutes');
const chatController = require('./Controllers/chatControllers/chatController');
const userRoutes = require('./Routes/userRoutes/userRoutes');
const { OpenAI } = require('openai');

const app = express();
const server = http.createServer(app);

// Configuration CORS pour autoriser les requêtes de votre client React
const corsOptions = {
  origin: 'http://localhost:5173', // Remplacer par l'URL de votre client React
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));

// Configuration de Socket.IO avec les options CORS
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/api', userRoutes);

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

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
  console.log('Un utilisateur connecté');

  socket.on('disconnect', () => {
    console.log('Un utilisateur déconnecté');
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

});

server.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});
