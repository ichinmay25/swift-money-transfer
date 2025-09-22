import React from 'react';
import '../../styles/components/button.css';

/**
 * Button Component
 * 
 * @param {string} variant - 'primary', 'secondary', or 'tertiary'
 * @param {string} size - 'large', 'medium', or 'small'
 * @param {string} children - Button text content
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {object} style - Additional inline styles
 * @param {...props} props - Other props passed to button element
 */
function Button({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  onClick, 
  disabled = false,
  className = '',
  style = {},
  ...props 
}) {
  const getTextClass = (size) => {
    switch (size) {
      case 'large':
        return 'button-1';
      case 'medium':
        return 'button-2';
      case 'small':
        return 'button-3';
      default:
        return 'button-2';
    }
  };

  const buttonClasses = [
    'swift-button',
    `swift-button--${variant}`,
    `swift-button--${size}`,
    getTextClass(size),
    disabled ? 'swift-button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
