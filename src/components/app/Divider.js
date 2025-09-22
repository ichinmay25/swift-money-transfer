import React from 'react';
import '../../styles/components/divider.css';

function Divider({ 
  className = '',
  color = 'var(--border-00, #e0e0e0)',
  height = '1px',
  width = '100%'
}) {
  return (
    <div 
      className={`divider ${className}`}
      style={{
        backgroundColor: color,
        height: height,
        width: width
      }}
    />
  );
}

export default Divider;
