import React from 'react';
import AvatarCard from '../AvatarCard';
import Divider from '../Divider';
import IconButton from '../IconButton';

function Step5ReviewDetails({ recipientData, accountData, sendingAmount, recipientAmount, exchangeRate }) {
  // Calculate total amount (sending amount + fees)
  const baseAmount = parseFloat(sendingAmount) || 100.98;
  const fees = 0.98;
  const totalAmount = baseAmount + fees;

  return (
    <div className="send-process">
      <div className="header-content">
        <h1 className="send-step-title">Review details</h1>
      </div>
      
      <div className="sender-container">
        <label className="l1 text-body">Sender details</label>
        <AvatarCard
          image={accountData?.image || "/src/assets/images/chase.png"}
          name={accountData?.name || "Checking Account"}
          subheading={`****${accountData?.number || "1234"}`}
          showSendButton={true}
          onSendClick={() => console.log('Change account')}
        />
      </div>
      
      <Divider />
      
      <div className="receiver-container">
        <label className="l1 text-body">Receiver details</label>
        <AvatarCard
          image={recipientData?.image || "/src/assets/images/avatar.png"}
          name={recipientData?.name || "Sarah Johnson"}
          subheading={`${recipientData?.flag || "🇺🇸"} ${recipientData?.country || "United States"} (${recipientData?.currency || "USD"})`}
          showSendButton={true}
          onSendClick={() => console.log('Change recipient')}
        />
      </div>
      
      <Divider />
      
      <div className="sending-item">
        <label className="l1 body-text">You send</label>
        <div className="amount-with-breakdown">
          <h3 className="h3">USD {totalAmount.toFixed(2)}</h3>
          <span className="breakdown-text">USD {baseAmount.toFixed(2)} plus fees</span>
        </div>
      </div>
      
      <div className="sending-item">
        <div className="sending-item-header">
          <label className="l1 body-text">Total fees</label>
          <div className="info-icon">
            <span className="material-icons">info</span>
          </div>
        </div>
        <h3 className="h3">USD 0.98</h3>
      </div>
      
      <div className="sending-item">
        <label className="l1 body-text">{recipientData?.name || "Emily"} will get exactly</label>
        <h3 className="h3">{recipientData?.currency || "INR"} {recipientAmount || "8,380.56"}</h3>
      </div>
    </div>
  );
}

export default Step5ReviewDetails;
