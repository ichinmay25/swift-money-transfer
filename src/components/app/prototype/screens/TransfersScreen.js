import React, { useState } from 'react';
import IconButton from '../../IconButton';
import BottomBarItem from '../../BottomBarItem';
import '../../../../styles/components/prototype/screens/home-screen.css';

function TransfersScreen({ onNavigate, onBack }) {
  const [activeTab, setActiveTab] = useState('transfers');

  const bottomBarItems = [
    { icon: 'home', label: 'Home', id: 'home' },
    { icon: 'swap_horiz', label: 'Transfers', id: 'transfers' },
    { icon: 'arrow_upward', label: 'Send', id: 'send' },
    { icon: 'group', label: 'Recipients', id: 'recipients' },
    { icon: 'person', label: 'Profile', id: 'profile' }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate(tabId);
    }
  };

  return (
    <div className="home-screen">
      {/* NavBar */}
      <div className="navbar">
        <div className="navbar-logo">
          <img src={require('../../../../assets/images/swift.svg').default} alt="Swift" className="logo" />
        </div>
        <IconButton 
          variant="tertiary" 
          size="medium"
          icon="notifications"
          onClick={() => console.log('Notifications clicked')}
        />
      </div>

      {/* Body */}
      <div className="body">
        <div className="placeholder-content">
          <h1 className="placeholder-title">Transfers</h1>
          <p className="placeholder-message">
            This screen was out of scope and wasn't implemented.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        {bottomBarItems.map((item) => (
          <BottomBarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeTab === item.id}
            isHistory={item.id === 'send'}
            onClick={() => handleTabClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TransfersScreen;
