import React from 'react';

const ChatBody = ({ messages, username, lastMessageRef }) => {
  return (
    <div className="chatBody">
      {messages.map((message, i) =>
        message.name === localStorage.getItem(username) ? (
          <div className="message__chats" key={i} ref={lastMessageRef}>
            <p
              className="senderName"
              style={{ marginBottom: 0, fontSize: '12px' }}
            >
              You <span style={{ marginLeft: '10px' }}>{message.time}</span>
            </p>
            <div className="message__recipient" style={{ marginBottom: 0 }}>
              <p style={{ margin: 0 }}>{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="message__chats" key={i} ref={lastMessageRef}>
            <p
              className="senderName"
              style={{ marginBottom: 0, fontSize: '12px' }}
            >
              {message.name}{' '}
              <span style={{ marginLeft: '10px' }}>{message.time}</span>
            </p>
            <div className="message__recipient" style={{ marginBottom: 0 }}>
              <p style={{ margin: 0 }}>{message.text}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ChatBody;
