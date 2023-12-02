import React from 'react';
import Draggable from 'react-draggable';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { useAuth } from '../../contexts/AuthContext';
import config from '../../utils/chatbotConfig';
import MessageParser from '../../utils/MessageParser';
import ActionProvider from '../../utils/ActionProvider';

const ChatbotComponent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Draggable>
      <div className="draggable-chatbot-container">
        <div className="chatbot-window">
          <div className="chatbot-header">Chatbot</div>
          <div className="chatbot-content">
            {isAuthenticated ? (
              // Si l'utilisateur est connecté, affichez le message de bienvenue
              <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
            ) : (
              // Si l'utilisateur n'est pas connecté, affichez un message différent
              <div>Veuillez vous connecter pour utiliser le chatbot.</div>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};
export default ChatbotComponent;