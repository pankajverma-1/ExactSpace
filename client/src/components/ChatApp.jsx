import './ChatApp.css';
import socketIO from 'socket.io-client';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import { useEffect, useRef, useState } from 'react';
const socket = socketIO.connect('http://localhost:4000');

const ChatApp = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const usersList = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin'];

  const getUserName = (name) => {
    setUsername(name);
  };

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [messages]);
  useEffect(() => {
    window.addEventListener('unload', handleTabClosing);
    return () => {
      window.removeEventListener('unload', handleTabClosing);
    };
  });
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTabClosing = () => {
    localStorage.removeItem(username);
  };

  return (
    <div className="main">
      <ChatHeader
        usersList={usersList}
        socket={socket}
        getUserName={getUserName}
      />
      <ChatBody
        messages={messages}
        username={username}
        lastMessageRef={lastMessageRef}
      />
      <ChatFooter socket={socket} username={username} />
    </div>
  );
};

export default ChatApp;
