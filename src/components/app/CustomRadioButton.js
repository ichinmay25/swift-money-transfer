import React from 'react';
import '../../styles/components/custom-radio-button.css';

function CustomRadioButton({ 
  checked = false, 
  onChange, 
  onClick,
  className = '',
  size = 'medium' // 'small', 'medium', 'large'
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange(!checked);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      className={`custom-radio-button custom-radio-button--${size} ${className}`}
      onClick={handleClick}
    >
      <div className="custom-radio-button__container">
        {checked && (
          <div className="custom-radio-button__inner-circle"></div>
        )}
      </div>
    </div>
  );
}

export default CustomRadioButton;
