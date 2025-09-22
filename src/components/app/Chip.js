import React from 'react';
import '../../styles/components/chip.css';

/**
 * Chip Component
 * 
 * @param {boolean} selected - Selected state of the chip
 * @param {string|React.Component} image - Image source for the circular image or React component
 * @param {string} text - Text content (heading 5 style)
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 * @param {object} style - Additional inline styles
 * @param {...props} props - Other props passed to the component
 */
function Chip({ 
  selected = false,
  image,
  text,
  onClick,
  className = '',
  style = {},
  ...props 
}) {
  const chipClasses = [
    'swift-chip',
    selected ? 'swift-chip--selected' : 'swift-chip--unselected',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={chipClasses}
      onClick={onClick}
      style={style}
      {...props}
    >
      {image && (
        typeof image === 'string' ? (
          <img 
            src={image} 
            alt="" 
            className="swift-chip__image"
          />
        ) : (
          <div className="swift-chip__image swift-chip__image--component">
            {image}
          </div>
        )
      )}
      {text && (
        <span className="swift-chip__text">
          {text}
        </span>
      )}
    </div>
  );
}

export default Chip;
