import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';
const d = new Date();

function add12Hformat(i) {
  if (i <= 12) {
    return i;
  }

  if (i > 12) {
    i = i - 12;
    return i;
  }
}
function addAMPM(i) {
  if (i < 12) {
    return 'AM';
  } else {
    return 'PM';
  }
}
function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

const ChatFooter = ({ socket, username }) => {
  let h = add12Hformat(d.getHours());
  let m = addZero(d.getMinutes());
  let s = addZero(d.getSeconds());
  let time = h + ':' + m + ':' + addAMPM(d.getHours());

  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (username) {
      if (message.trim() && localStorage.getItem(username)) {
        socket.emit('message', {
          text: message,
          time: time,
          name: localStorage.getItem(username),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      }
    } else {
      alert('select user');
    }
    setMessage('');
  };
  function handleOnEnter(text) {
    console.log('enter', text);
  }

  return (
    <div className="chatMessageBody ">
      <div className="chat__footer">
        <form className="form" onSubmit={handleSendMessage}>
          <InputEmoji
            value={message}
            onChange={setMessage}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
          />

          <button className="sendBtn">SEND</button>
        </form>
      </div>
    </div>
  );
};

export default ChatFooter;
