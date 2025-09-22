import React from 'react';
import '../../../../styles/components/prototype/screens/welcome-screen.css';

function WelcomeScreen({ onNavigate }) {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <div className="welcome-screen" onClick={handleClick}>
      <div className="welcome-content">
        <h1 className="swift-text">Swift</h1>
      </div>
    </div>
  );
}

export default WelcomeScreen;
