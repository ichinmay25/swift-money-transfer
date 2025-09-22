import React, { useEffect, useRef, useState } from 'react';
import statusBarSvg from '../../../assets/images/status-bar.svg';
import statusBarWhiteSvg from '../../../assets/images/status-bar_white.svg';
import homeIndicatorSvg from '../../../assets/images/home-indicator.svg';
import homeIndicatorWhiteSvg from '../../../assets/images/home-indicator_white.svg';
import SendModal from '../SendModal';
import '../../../styles/components/prototype/prototype-frame.css';

function PrototypeFrame({ 
  children, 
  currentScreen, 
  darkMode = false,
  backgroundType = 'color', // 'color', 'video', 'image'
  backgroundSrc = null,
  backgroundColor = 'var(--surface-00)',
  onVideoEnd,
  isTransitioning = false,
  isSendModalOpen = false,
  onCloseSendModal,
  onSendSuccess,
  sendModalPrefillData = null,
  fromChat = false,
  onContentChange
}) {
  const videoRef = useRef(null);

  // Choose appropriate SVGs based on dark mode
  const statusBarImage = darkMode ? statusBarWhiteSvg : statusBarSvg;
  const homeIndicatorImage = darkMode ? homeIndicatorWhiteSvg : homeIndicatorSvg;

  // Video playback logic for welcome screen
  useEffect(() => {
    if (backgroundType !== 'video' || !videoRef.current) return;

    const video = videoRef.current;

    const handleVideoEnd = () => {
      // When video ends, trigger navigation (parent handles transition)
      if (onVideoEnd) {
        onVideoEnd();
      }
    };

    const handleTimeUpdate = () => {
      // No special logic needed - just let video play once
    };

    const handleLoadedMetadata = () => {
      // Play video once at normal speed
      video.playbackRate = 1.0; // Normal speed for single playback
      video.play().catch(console.error);
    };

    // Add event listeners
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Start playing the video once it's loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    // Cleanup
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [backgroundType, backgroundSrc, onVideoEnd]);
  
  return (
    <div className="prototype-frame" style={{
      backgroundColor: backgroundType === 'color' ? backgroundColor : 'transparent'
    }}>
      {/* Background Layer */}
      {backgroundType === 'video' && backgroundSrc && (
        <div className={`video-container ${isTransitioning ? 'transitioning' : ''}`}>
          <video
            ref={videoRef}
            className="prototype-background-video smooth-video"
            muted
            playsInline
            preload="auto"
            autoPlay
            loop={false} // We handle looping manually
            webkit-playsinline="true"
          >
            <source src={backgroundSrc} type="video/mp4" />
            <source src={backgroundSrc.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      
      {backgroundType === 'image' && backgroundSrc && (
        <img 
          src={backgroundSrc}
          alt="Background"
          className="prototype-background-image"
        />
      )}

      {/* Status Bar SVG */}
      <div className="status-bar-container">
        <img 
          src={statusBarImage} 
          alt="Status Bar" 
          className="status-bar-svg"
        />
      </div>

      {/* Screen Content Area */}
      <div className="screen-content">
        {children}
      </div>

            {/* Home Indicator SVG */}
            <div className="home-indicator-container">
              <img 
                src={homeIndicatorImage} 
                alt="Home Indicator" 
                className="home-indicator-svg"
              />
            </div>

            {/* Send Modal */}
            <SendModal 
              isOpen={isSendModalOpen} 
              onClose={onCloseSendModal}
              onSendSuccess={onSendSuccess}
              prefillData={sendModalPrefillData}
              fromChat={fromChat}
              onContentChange={onContentChange}
            />
          </div>
        );
      }
      
      export default PrototypeFrame;
