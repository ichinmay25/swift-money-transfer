import React, { useState, useRef, useEffect } from 'react';
import IconButton from './IconButton';
import '../../styles/components/slide-to-send-button.css';

function SlideToSendButton({ onSlideComplete, disabled = false }) {
  const [slideProgress, setSlideProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleMouseDown = (e) => {
    if (disabled || isCompleted || !sliderRef.current) return;
    
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    
    const deltaX = e.clientX - startXRef.current;
    const maxSlide = sliderRef.current.offsetWidth - 56;
    const progress = Math.min(Math.max(deltaX, 0), maxSlide);
    
    setSlideProgress(progress);
    
    if (progress >= maxSlide - 5) {
      setIsCompleted(true);
      isDraggingRef.current = false;
      if (onSlideComplete) {
        onSlideComplete();
      }
    }
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    
    isDraggingRef.current = false;
    setIsDragging(false);
    if (slideProgress < sliderRef.current.offsetWidth - 108) {
      setSlideProgress(0);
    }
  };

  const handleTouchStart = (e) => {
    if (disabled || isCompleted || !sliderRef.current) return;
    
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    
    const deltaX = e.touches[0].clientX - startXRef.current;
    const maxSlide = sliderRef.current.offsetWidth - 56;
    const progress = Math.min(Math.max(deltaX, 0), maxSlide);
    
    setSlideProgress(progress);
    
    if (progress >= maxSlide - 5) {
      setIsCompleted(true);
      isDraggingRef.current = false;
      if (onSlideComplete) {
        onSlideComplete();
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    
    isDraggingRef.current = false;
    setIsDragging(false);
    if (slideProgress < sliderRef.current.offsetWidth - 108) {
      setSlideProgress(0);
    }
  };

  return (
    <div 
      className={`slide-to-send-container ${disabled ? 'disabled' : ''} ${isCompleted ? 'completed' : ''} ${isDragging ? 'sliding' : ''}`}
      ref={sliderRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="slide-track">
        <div 
          className="slide-fill"
          style={{ width: `${slideProgress + 28}px` }}
        />
        <div className="slide-text">
          {isCompleted ? 'Sending...' : 'Slide to Send'}
        </div>
      </div>
      
      <div 
        className="slide-button"
        style={{ transform: `translateX(${slideProgress}px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <IconButton
          variant="primary"
          size="large"
          icon="arrow_forward"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default SlideToSendButton;
