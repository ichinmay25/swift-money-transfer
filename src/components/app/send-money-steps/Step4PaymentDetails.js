import React, { useState } from 'react';
import IconButton from '../IconButton';
import AvatarCard from '../AvatarCard';

function Step4PaymentDetails({ selectedAccount, onAccountSelect }) {
  return (
    <div className="send-process">
      <div className="header-content">
        <h1 className="send-step-title">Add your payment details</h1>
        <p className="send-step-description">
          Enter the account details from which you are sending money from.
        </p>
      </div>
      <div 
        className="add-recipient-container"
        onClick={() => console.log('Add new bank account')}
        style={{ cursor: 'pointer' }}
      >
        <IconButton
          variant="secondary"
          size="medium"
          icon="add"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Add new bank account');
          }}
        />
        <h4>Add new bank account</h4>
        <IconButton
          variant="tertiary"
          size="medium"
          icon="keyboard_arrow_right"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Add new bank account');
          }}
        />
      </div>
       <AvatarCard
         image="/chase.png"
         name="Checking Account"
         subheading="**** 1234"
         showRadio={true}
         isSelected={selectedAccount === 'checking'}
         onRadioChange={() => onAccountSelect('checking')}
       />
       <AvatarCard
         image="/pnc.png"
         name="Savings Account"
         subheading="**** 5678"
         showRadio={true}
         isSelected={selectedAccount === 'savings'}
         onRadioChange={() => onAccountSelect('savings')}
       />
    </div>
  );
}

export default Step4PaymentDetails;
