import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3001'); // Remplacez par l'URL de votre serveur WebSocket

    // Écoute des messages du serveur
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Écoute des utilisateurs connectés
    socket.on('users', (connectedUsers) => {
      setUsers(connectedUsers);
    });

    return () => {
      socket.disconnect(); // Déconnexion du socket lors du démontage du composant
    };
  }, []);

  const sendMessage = () => {
    // Envoyer le message au serveur via WebSocket
    // Vous devrez implémenter la logique de l'envoi côté serveur
  };

  return (
    <div>
      <div>
        <h2>Chat en direct</h2>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Entrez votre message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
      <div>
        <h2>Utilisateurs connectés</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
