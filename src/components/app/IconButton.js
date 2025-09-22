import React from 'react';
import '../../styles/components/icon-button.css';

/**
 * IconButton Component - Square buttons with Material Icons
 * 
 * @param {string} variant - 'primary', 'secondary', or 'tertiary'
 * @param {string} size - 'large', 'medium', or 'small'
 * @param {string} icon - Material icon name (e.g., 'home', 'search', 'close')
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {object} style - Additional inline styles
 * @param {string} ariaLabel - Accessibility label (required for icon-only buttons)
 * @param {...props} props - Other props passed to button element
 */
function IconButton({ 
  variant = 'primary', 
  size = 'medium', 
  icon,
  onClick, 
  disabled = false,
  className = '',
  style = {},
  ariaLabel,
  ...props 
}) {
  const buttonClasses = [
    'swift-icon-button',
    `swift-icon-button--${variant}`,
    `swift-icon-button--${size}`,
    disabled ? 'swift-icon-button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={style}
      aria-label={ariaLabel || `${icon} button`}
      {...props}
    >
      {icon && (
        <span className="material-icons swift-icon-button__icon">
          {icon}
        </span>
      )}
    </button>
  );
}

export default IconButton;
