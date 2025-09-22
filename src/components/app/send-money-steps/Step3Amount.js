import React, { useState, useRef } from 'react';
import AmountInput from '../AmountInput';
import IconButton from '../IconButton';

function Step3Amount({ recipientData, sendingAmount, recipientAmount, exchangeRate, onAmountChange }) {
  const [localSendingAmount, setLocalSendingAmount] = useState(sendingAmount);
  const [localRecipientAmount, setLocalRecipientAmount] = useState(recipientAmount);
  const isUpdatingRef = useRef(false);

  const handleSendingAmountChange = (e) => {
    const usdValue = e.target.value;
    setLocalSendingAmount(usdValue);
    
    // Convert USD to recipient currency
    if (!isUpdatingRef.current) {
      isUpdatingRef.current = true;
      const numericUsdValue = parseFloat(usdValue) || 0;
      const recipientValue = (numericUsdValue * exchangeRate).toFixed(2);
      setLocalRecipientAmount(recipientValue);
      onAmountChange({ sendingAmount: usdValue, recipientAmount: recipientValue });
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);
    }
  };

  const handleRecipientAmountChange = (e) => {
    const recipientValue = e.target.value;
    setLocalRecipientAmount(recipientValue);
    
    // Convert recipient currency to USD
    if (!isUpdatingRef.current) {
      isUpdatingRef.current = true;
      const numericRecipientValue = parseFloat(recipientValue) || 0;
      const usdValue = (numericRecipientValue / exchangeRate).toFixed(2);
      setLocalSendingAmount(usdValue);
      onAmountChange({ sendingAmount: usdValue, recipientAmount: recipientValue });
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);
    }
  };

  return (
    <div className="send-process">
      <div className="header-content">
        <h1 className="send-step-title">Enter amount</h1>
        <p className="send-step-description">
          Enter the amount you want to send.
        </p>
      </div>
      
      <div className="conversion-container">
        <AmountInput
          label="You are sending"
          country="United States"
          currency="USD"
          countryCode="US"
          showDropdown={false}
          placeholder="0.00"
          value={localSendingAmount}
          onChange={handleSendingAmountChange}
          description=""
          showDescription={false}
        />
        
        <div className="conversion-arrow-container">
          <IconButton
            variant="primary"
            size="medium"
            icon="arrow_downward"
            onClick={() => console.log('Convert currencies')}
            className="conversion-arrow-button"
          />
        </div>
        
        <AmountInput
          label="Recipient gets"
          country={recipientData?.country || "India"}
          currency={recipientData?.currency || "INR"}
          countryCode={recipientData?.countryCode || "IN"}
          showDropdown={true}
          placeholder="0.00"
          value={localRecipientAmount}
          onChange={handleRecipientAmountChange}
          description={`1 USD = ${exchangeRate?.toFixed(2) || "88.00"} ${recipientData?.currency || "INR"}`}
          showDescription={true}
        />
      </div>
    </div>
  );
}

export default Step3Amount;
