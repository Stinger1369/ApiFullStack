import React from 'react';
import Draggable from 'react-draggable';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { useAuth } from '../../contexts/AuthContext';
import config from '../../utils/chatbotConfig';
import MessageParser from '../../utils/MessageParser';
import ActionProvider from '../../utils/ActionProvider';
import './ChatbotComponent.scss';
import clickSound from '../../assets/sounds/chatbot.mp3'; // Assurez-vous que le chemin est correct

const ChatbotComponent = () => {
  const { isAuthenticated } = useAuth();
  

  const audio = new Audio(clickSound);

  // Fonction pour jouer le son
  const playSound = () => {
    audio.play();
  }

  let collapse = true;
  const handleCollapse = () => {
    // Bascule l'état de collapse
    collapse = !collapse;

    // Joue le son seulement si le chatbot est en train de s'ouvrir
    if (!collapse) {
      playSound();
    }

    let chatbot = document.querySelector('.draggable-chatbot-container');
    let chatControl = document.querySelector('#chat-control');

    if (collapse) {
      chatbot.style.height = '25px';
      chatControl.classList.remove('bi-chevron-down');
      chatControl.classList.add('bi-chevron-up');
    } else {
      chatbot.style.height = '580px';
      chatControl.classList.remove('bi-chevron-up');
      chatControl.classList.add('bi-chevron-down');
    }
  };

  return (
    <Draggable>
      <div className="draggable-chatbot-container">
        <div className="chatbot-window">
          <div className="chatbot-header" onClick={handleCollapse}>
            <div className="walking-man"></div>
            <div className="chatbot-toggle btn">
              {collapse ? <i id="chat-control" className="bi bi-chevron-up"></i> : <i id="chat-control" className="bi bi-chevron-down"></i>}
            </div>
          </div>
          <div className="chatbot-content">
            {isAuthenticated ? (
              <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
            ) : (
              <div>Veuillez vous connecter pour utiliser le chatbot.</div>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ChatbotComponent;
