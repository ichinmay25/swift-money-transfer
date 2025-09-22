import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '../app/IconButton';
import avatarImage from '../../assets/images/avatar.png';
import swiftLogo from '../../assets/images/swift.svg';
import '../../styles/components/nav.css';

function Nav({ showBackButton = false, backTo = "/", showChatBubble = false }) {
  const navigate = useNavigate();
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);

  const handleBackClick = () => {
    navigate(backTo);
  };

  // Handle chat bubble visibility - persist until user interacts
  useEffect(() => {
    if (showChatBubble) {
      setIsBubbleVisible(true);
    } else {
      setIsBubbleVisible(false);
    }
  }, [showChatBubble]);

  // Hide bubble when user clicks anywhere on the screen
  useEffect(() => {
    const handleClick = () => {
      if (isBubbleVisible) {
        setIsBubbleVisible(false);
      }
    };

    if (isBubbleVisible) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [isBubbleVisible]);
  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Back Button and Logo Section - Left */}
        <div className="nav-left-section">
          {showBackButton && (
            <IconButton
              variant="secondary"
              size="medium"
              icon="arrow_back"
              onClick={handleBackClick}
              ariaLabel="Go back"
              className="nav-back-button"
            />
          )}
          <div className="nav-logo">
            <img 
              src={swiftLogo} 
              alt="Swift" 
              className="nav-logo-svg"
            />
          </div>
        </div>
        
        {/* Created By Section - Right */}
        <div className="nav-right-section">
          <a 
            href="https://chinmayinamdar.design" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-created-by"
          >
            <div className="created-by-content">
              <div className="created-by-avatar">
                <img 
                  src={avatarImage} 
                  alt="Chinmay Inamdar" 
                  className="avatar-image"
                />
              </div>
              <div className="created-by-text">
                <span className="created-by-label">Created by</span>
                <span className="created-by-name">Chinmay Inamdar</span>
              </div>
              <IconButton
                variant="secondary"
                size="medium"
                icon="call_made"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://chinmayinamdar.com', '_blank', 'noopener,noreferrer');
                }}
              />
            </div>
          </a>
          
          {/* Chat Bubble */}
          {isBubbleVisible && (
            <div className="nav-chat-bubble">
              <div className="chat-bubble-content">
                <p className="chat-bubble-text">Hey! I have requested some money for Figma Pro and Cursor Pro. Can you help me out?</p>
                <div className="chat-bubble-arrow"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
