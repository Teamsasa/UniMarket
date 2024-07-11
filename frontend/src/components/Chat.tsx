import React, { useEffect, useState } from 'react';

type Message = {
  sender: string;
  content: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data);
      if (parsedMessage.type === 'history') {
        setMessages(parsedMessage.data);
      } else if (parsedMessage.type === 'message') {
        setMessages((prevMessages) => [...prevMessages, parsedMessage.data]);
      }
    };
    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (ws && input.trim()) {
      const message: Message = { sender: 'User', content: input };
      ws.send(JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput('');
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
