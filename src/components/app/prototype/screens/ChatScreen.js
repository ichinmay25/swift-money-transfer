import React, { useState, useEffect, useRef } from 'react';
import IconButton from '../../IconButton';
import Button from '../../Button';
import '../../../../styles/components/prototype/screens/chat-screen.css';

function ChatScreen({ onNavigate, onBack }) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  useEffect(() => {
    // Scroll to bottom when component mounts
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      // Scroll to bottom after sending message
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-screen">
      {/* NavBar */}
      <div className="chat-navbar">
        <div className="chat-navbar-left">
          <IconButton
            variant="secondary"
            size="medium"
            icon="arrow_back"
            onClick={onBack}
            ariaLabel="Go back"
          />
          <div className="chat-user-info">
            <img 
              src={require('../../../../assets/images/avatar.png')} 
              alt="Chinmay Inamdar" 
              className="chat-user-avatar"
            />
            <div className="chat-user-details">
              <h3 className="chat-user-name">Chinmay Inamdar</h3>
              <p className="chat-user-status">🇮🇳 India</p>
            </div>
          </div>
        </div>
        <div className="chat-navbar-right">
          <IconButton
            variant="tertiary"
            size="medium"
            icon="more_vert"
            onClick={() => console.log('More options')}
          />
        </div>
      </div>

      {/* Body */}
      <div className="chat-body">
        {/* Messages */}
        <div className="chat-messages">
          <div className="message received">
            <div className="message-content">
              <p>Hi! I was thinking of buying Figma Pro and Cursor Pro for exploring vibe coding. Can you send me $432 or approx ₹38,000 to my Indian bank account?</p>
              <span className="message-time">2:30 PM</span>
            </div>
          </div>
          
          <div className="message sent">
            <div className="message-content">
              <p>Sure! I can send that to you. Send me a request in Swift and I'll process it right away.</p>
              <span className="message-time">2:32 PM</span>
            </div>
          </div>

          <div className="message received">
            <div className="message-content">
              <p>Thanks! I really appreciate it. Sending now!</p>
              <span className="message-time">2:33 PM</span>
            </div>
          </div>

          {/* Request Money Card */}
          <div className="message received">
            <div className="request-money-card">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p className="request-amount-usd">Chinmay sent a request</p>
                <h2>₹38,000</h2>
                <p className="request-amount-usd">$432 USD</p>
              </div>
              <Button
                variant="secondary"
                size="small"
                onClick={() => onNavigate('send')}
                style={{ backgroundColor: 'var(--surface-03, #cac9c8)' }}
              >
                Send Money
              </Button>
            </div>
          </div>
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

      </div>

      {/* Footer */}
      <div className="chat-footer">
        <div className="chat-footer-container">
          <IconButton
            variant="secondary"
            size="medium"
            icon="add"
            onClick={() => console.log('Add attachment')}
          />
          <div className="message-container">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="chat-footer-input"
            />
          </div>
          <IconButton
            variant="primary"
            size="medium"
            icon="send"
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
