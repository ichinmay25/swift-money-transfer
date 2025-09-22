import React from 'react';
import '../../styles/components/bottom-bar-item.css';

function BottomBarItem({ icon, label, isActive, onClick, isHistory = false }) {
  const itemClasses = `bottom-bar-item ${isActive ? 'bottom-bar-item--active' : 'bottom-bar-item--inactive'} ${isHistory ? 'bottom-bar-item--history' : ''}`;
  
  return (
    <div className={itemClasses} onClick={onClick}>
      <div className="bottom-bar-item__icon-container">
        <span className="bottom-bar-item__icon material-icons">
          {icon}
        </span>
      </div>
      <span className="bottom-bar-item__label">
        {label}
      </span>
    </div>
  );
}

export default BottomBarItem;
