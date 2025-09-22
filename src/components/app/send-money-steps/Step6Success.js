import React from 'react';
import Button from '../Button';
import backgroundVideo from '../../../assets/images/background-vid.mp4';

function Step6Success({ onClose }) {
  return (
    <div className="success-step-content">
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        className="success-background-video"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      
      {/* Success Message */}
      <div className="success-message-container">
        <h1 className="success-message">Your payment was successful</h1>
      </div>
      
      {/* Close Button */}
      <div className="success-button-container">
        <Button 
          variant="secondary-white" 
          size="large"
          onClick={onClose}
          className="success-close-button"
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default Step6Success;
