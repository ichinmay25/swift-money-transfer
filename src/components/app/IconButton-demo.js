// Demo component to showcase IconButton - you can delete this after testing
import React from 'react';
import IconButton from './IconButton';

function IconButtonDemo() {
  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <h3>IconButton Component Demo</h3>
      
      <div>
        <h4>Primary IconButtons</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <IconButton variant="primary" size="large" icon="home" ariaLabel="Home" />
          <IconButton variant="primary" size="medium" icon="search" ariaLabel="Search" />
          <IconButton variant="primary" size="small" icon="close" ariaLabel="Close" />
        </div>
      </div>
      
      <div>
        <h4>Secondary IconButtons</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <IconButton variant="secondary" size="large" icon="settings" ariaLabel="Settings" />
          <IconButton variant="secondary" size="medium" icon="favorite" ariaLabel="Favorite" />
          <IconButton variant="secondary" size="small" icon="share" ariaLabel="Share" />
        </div>
      </div>
      
      <div>
        <h4>Tertiary IconButtons</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <IconButton variant="tertiary" size="large" icon="edit" ariaLabel="Edit" />
          <IconButton variant="tertiary" size="medium" icon="delete" ariaLabel="Delete" />
          <IconButton variant="tertiary" size="small" icon="add" ariaLabel="Add" />
        </div>
      </div>
      
      <div>
        <h4>Disabled IconButtons</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <IconButton variant="primary" size="large" icon="lock" disabled ariaLabel="Locked" />
          <IconButton variant="secondary" size="medium" icon="block" disabled ariaLabel="Blocked" />
          <IconButton variant="tertiary" size="small" icon="help" disabled ariaLabel="Help" />
        </div>
      </div>
      
      <div>
        <h4>Interactive Example</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <IconButton 
            variant="primary" 
            size="large" 
            icon="send" 
            onClick={() => alert('Send clicked!')}
            ariaLabel="Send money"
          />
          <IconButton 
            variant="secondary" 
            size="medium" 
            icon="account_balance_wallet" 
            onClick={() => alert('Wallet clicked!')}
            ariaLabel="Wallet"
          />
          <IconButton 
            variant="tertiary" 
            size="small" 
            icon="more_vert" 
            onClick={() => alert('More options clicked!')}
            ariaLabel="More options"
          />
        </div>
      </div>
    </div>
  );
}

export default IconButtonDemo;
