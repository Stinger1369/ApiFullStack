import { createChatBotMessage } from 'react-chatbot-kit';

const botName = "Bot";

const config = {
  initialMessages: [createChatBotMessage(`Bonjour! Je suis ${botName}. Comment puis-je vous aider ?`)],
  botName: botName,
  // Ajoutez ici des widgets ou des options de personnalisation supplémentaires si nécessaire
};

export default config;
