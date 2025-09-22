import React from 'react';
import IconButton from './IconButton';
import Button from './Button';
import CustomRadioButton from './CustomRadioButton';
import '../../styles/components/avatar-card.css';

function AvatarCard({ 
  image, 
  icon, 
  name, 
  subheading, 
  onImageClick, 
  onIconClick,
  onClick,
  // Third content props
  showRadio = false,
  isSelected = false,
  onRadioChange,
  amount = null,
  currency = null,
  showSendButton = false,
  onSendClick,
  buttonText = "Change"
}) {
  const handleCardClick = () => {
    if (showRadio && onRadioChange) {
      // If it's a radio card, trigger the radio change
      onRadioChange();
    } else if (onClick) {
      // Otherwise, use the regular onClick
      onClick();
    }
  };

  return (
    <div className="avatar-card" onClick={handleCardClick}>
      {/* Image or Icon Button */}
      <div className="avatar-card__media">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="avatar-card__image"
            onClick={onImageClick}
          />
        ) : (
          <IconButton
            variant="secondary"
            size="medium"
            icon={icon}
            onClick={onIconClick}
            className="avatar-card__icon-button"
          />
        )}
      </div>

      {/* Content Container */}
      <div className="avatar-card__content">
        <h5 className="avatar-card__name">{name}</h5>
        <p className="avatar-card__subheading">{subheading}</p>
      </div>

      {/* Third Content - Radio Button, Text Content, or Send Button */}
      <div className="avatar-card__third-content">
        {showRadio ? (
          <div className="avatar-card__radio-container">
            <CustomRadioButton
              checked={isSelected}
              onChange={onRadioChange}
              size="medium"
            />
          </div>
        ) : showSendButton ? (
          <Button
            variant="secondary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (onSendClick) onSendClick();
            }}
            className="avatar-card__send-button"
          >
            {buttonText}
          </Button>
        ) : (
          <div className="avatar-card__text-content">
            <div className="avatar-card__amount">{amount}</div>
            <div className="avatar-card__currency">{currency}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AvatarCard;
