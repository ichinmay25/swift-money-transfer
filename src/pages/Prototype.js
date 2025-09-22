import React, { useState, useRef } from 'react';
import Nav from '../components/main/Nav';
import PrototypeScreen from '../components/app/prototype/PrototypeScreen';
import '../styles/pages/prototype.css';

function Prototype() {
  const [leftContent, setLeftContent] = useState({
    title: "Clean Prototype",
    description: "Empty prototype screen with surface00 background ready for development."
  });
  const [showChatBubble, setShowChatBubble] = useState(false);
  const prototypeScreenRef = useRef(null);

  // Handle content updates from the prototype screen
  const handleContentChange = (newContent) => {
    setLeftContent(newContent);
  };

  // Handle automatic navigation when video ends
  const handleVideoEnd = () => {
    if (prototypeScreenRef.current) {
      prototypeScreenRef.current.navigateToHome();
    }
  };

  // Handle chat bubble visibility
  const handleShowChatBubble = (show) => {
    setShowChatBubble(show);
  };

  // Handle marking request as processed
  const handleMarkRequestProcessed = () => {
    // This will be handled by the HomeScreen component
    console.log('Request marked as processed');
  };
  return (
    <>
      <Nav showBackButton={true} backTo="/" showChatBubble={showChatBubble} />
      <div className="prototype-hero-section">
        <div className="prototype-hero-container">
          {/* Left side content */}
          <div className="prototype-left-content">
            <div className="prototype-info-container">
              <h1 style={{
                fontFamily: 'Satoshi',
                fontWeight: 900,
                fontSize: '24px',
                lineHeight: '120%',
                letterSpacing: '4%',
                textTransform: "uppercase"
              }}>{leftContent.title}</h1>
              <p style={{
                fontFamily: 'Satoshi',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '150%',
                fontStyle: 'italic',
                color: "var(--text-body)"
              }}>{leftContent.description}</p>
            </div>
          </div>

          {/* Right side container */}
          <div className="prototype-right-content">
            <PrototypeScreen
              onContentChange={handleContentChange}
              onVideoEnd={handleVideoEnd}
              onShowChatBubble={handleShowChatBubble}
              onMarkRequestProcessed={handleMarkRequestProcessed}
              ref={prototypeScreenRef}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Prototype;
