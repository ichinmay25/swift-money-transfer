import React from 'react';
import Button from '../../Button';
import homeIndicatorSvg from '../../../../assets/images/home-indicator.svg';
import '../../../../styles/components/prototype/screens/success-screen.css';

function SuccessScreen({ onNavigate }) {
  const handleClose = () => {
    // Navigate back to home screen
    onNavigate('home');
  };

  return (
    <div className="success-screen">
      {/* Success Message */}
      <div className="success-message-container">
        {/* Success Circle with Checkmark */}
        <div className="success-circle">
          <svg 
            className="success-checkmark" 
            width="56" 
            height="56" 
            viewBox="0 0 56 56" 
            fill="none"
          >
            <defs>
              <linearGradient id="checkmarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--surface-primary-01, #8755ca)" />
                <stop offset="100%" stopColor="var(--surface-primary-02, #4c74d5)" />
              </linearGradient>
            </defs>
            <path 
              d="M14 28L24.5 38.5L42 21" 
              stroke="url(#checkmarkGradient)" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h1 className="success-message">Your payment was successful</h1>
      </div>
      
      {/* Footer - Same structure as SendModal */}
      <div className="success-screen-footer">
        <Button 
          variant="success-white" 
          size="large"
          onClick={handleClose}
          className="success-footer-button"
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default SuccessScreen;
