import React from 'react';
import Draggable from 'react-draggable';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from '../../utils/chatbotConfig';
import MessageParser from '../../utils/MessageParser';
import ActionProvider from '../../utils/ActionProvider';

const ChatbotComponent = () => {
  return (
    <Draggable>
      <div className="draggable-chatbot-container">
        <div className="chatbot-window">
          <div className="chatbot-header">Chatbot</div>
          <div className="chatbot-content">
            <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ChatbotComponent;
