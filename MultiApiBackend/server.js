const express = require('express');
const OpenAI = require('openai-api');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./Routes/authRoutes'); 
const app = express();

// Appliquer le middleware CORS
app.use(cors({
    origin: 'http://localhost:5173' // Vous pouvez configurer cela en fonction de vos besoins
}));

app.use(express.json());

// Utilisez les routes d'authentification
app.use('/auth', authRoutes);

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const port = process.env.PORT || 3001;

app.post('/chatbot', async (req, res) => {
    const userMessage = req.body.message;
    
    try {
        const response = await openai.complete({
            engine: 'davinci',
            prompt: userMessage,
            maxTokens: 150
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
