import React, { useState } from 'react';
import SVG from './user-regular.svg';

const ChatHeader = ({ usersList, getUserName, socket }) => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(usersList);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  const handleItemClick = (id) => {
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
    toggleDropdown();
    localStorage.setItem(`${items[id]}`, items[id]);
    getUserName(items[id]);
    const userName = items[id];
    socket.emit('newUser', { userName, socketID: socket.id });
  };
  return (
    <>
      <div className="headerContainer">
        <div className="selectUser">
          <div className="circle">
            {selectedItem ? (
              items.find((item, i) => i == selectedItem).slice(0, 1)
            ) : (
              <img src={SVG} alt="svg" style={{ width: '25px' }} />
            )}
          </div>
          <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
              {selectedItem
                ? items.find((item, i) => i == selectedItem)
                : 'Select User'}
              <i className={`fa fa-chevron-right icon ${isOpen && 'open'}`}></i>
            </div>
            <div className={`dropdown-body ${isOpen && 'open'}`}>
              {items.map((item, index) => (
                <div
                  className="dropdown-item"
                  onClick={(e) => handleItemClick(e.target.id)}
                  id={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
