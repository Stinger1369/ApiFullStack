import React from 'react';
import Draggable from 'react-draggable';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { useAuth } from '../../contexts/AuthContext';
import config from '../../utils/chatbotConfig';
import MessageParser from '../../utils/MessageParser';
import ActionProvider from '../../utils/ActionProvider';
import './ChatbotComponent.scss'

const ChatbotComponent = () => {
  const { isAuthenticated } = useAuth();
  let collapse = true
  const handleCollapse = () => {
    collapse = !collapse
    let chatbot = document.querySelector('.draggable-chatbot-container')
    // let chatbotContent = document.querySelector('.chatbot-content')
    let chatControl = document.querySelector('#chat-control')
    if(collapse) {
      chatbot.style.height = '25px';
      // chatbotContent.style.height = 0;
      chatControl.classList.remove('bi-chevron-down')
      chatControl.classList.add('bi-chevron-up')
    } else {
      chatbot.style.height = '580px';
      // chatbotContent.style.height = '530px';
      chatControl.classList.remove('bi-chevron-up')
      chatControl.classList.add('bi-chevron-down')
    }
  }

  return (
    <Draggable>
      <div className="draggable-chatbot-container">
        <div className="chatbot-window">

          <div className="chatbot-header" onClick={handleCollapse} >
            <div className="title">Chatbot</div>
            <div className="chatbot-toggle btn" 
                // data-bs-toggle="collapse"  data-bs-target="#chatbot-content"
            >
              { collapse ? <i id="chat-control" className="bi bi-chevron-up"></i> : <i id="chat-control" className="bi bi-chevron-down"></i> }
            </div>
          </div>

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