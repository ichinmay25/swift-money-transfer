import React, { useState, useEffect } from 'react';
import IconButton from './IconButton';
import Button from './Button';
import SlideToSendButton from './SlideToSendButton';
import homeIndicatorSvg from '../../assets/images/home-indicator.svg';
import {
  Step1Marketing,
  Step2Recipient,
  Step3Amount,
  Step4PaymentDetails,
  Step5ReviewDetails,
  Step6Success
} from './send-money-steps';
import '../../styles/components/send-modal.css';
import '../../styles/utilities/typography.css';

function SendModal({ isOpen, onClose, onSendSuccess, prefillData = null, fromChat = false, onContentChange }) {
  const [isClosing, setIsClosing] = useState(false);
  const [currentStep, setCurrentStep] = useState(fromChat ? 5 : 1);
  
  // Flow data state
  const [flowData, setFlowData] = useState({
    selectedRecipient: prefillData?.recipient || null,
    sendingAmount: prefillData?.sendingAmount || '100',
    recipientAmount: prefillData?.recipientAmount || '8800',
    selectedAccount: prefillData?.account || null,
    exchangeRate: prefillData?.exchangeRate || 88.00,
    realTimeRate: prefillData?.exchangeRate || 88.00
  });

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setCurrentStep(fromChat ? 5 : 1); // Start from step 5 if from chat, otherwise step 1
    }
  }, [isOpen, fromChat]);

  // Update content when step changes
  useEffect(() => {
    if (isOpen && onContentChange) {
      const content = {
        title: `Send Money – Step ${currentStep}`,
        description: getStepDescription(currentStep)
      };
      onContentChange(content);
    }
  }, [currentStep, isOpen, onContentChange]);

  const getStepDescription = (step) => {
    const descriptions = {
      1: "A one-time marketing dialog highlights the ability to import the user's contact list. While users can choose to connect their contacts immediately, the option remains available later through the profile section.",
      2: "If contacts have been imported, users can see which of their connections are already on the platform and send them money instantly without re-entering details. For new recipients not yet on the app, the \"Add New Recipient\" option is provided.",
      3: "Users can enter the transfer amount in either their home currency or the recipient's currency. The system automatically calculates the conversion, eliminating guesswork.",
      4: "At this step, users provide or select payment details. This ensures secure and accurate processing of the transaction.",
      5: "Users can review all transaction details before sending. The screen also provides clear options to return and edit either sender or recipient information if changes are needed."
    };
    return descriptions[step] || "";
  };

  // Update flowData when prefillData changes
  useEffect(() => {
    if (prefillData) {
      setFlowData({
        selectedRecipient: prefillData.recipient || null,
        sendingAmount: prefillData.sendingAmount || '100',
        recipientAmount: prefillData.recipientAmount || '8800',
        selectedAccount: prefillData.account || null,
        exchangeRate: prefillData.exchangeRate || 88.00,
        realTimeRate: prefillData.exchangeRate || 88.00
      });
    }
  }, [prefillData]);

  // Fetch exchange rate when recipient is selected
  useEffect(() => {
    const recipientData = getRecipientData();
    if (recipientData && recipientData.currency !== 'USD') {
      fetchExchangeRate(recipientData.currency).then(rate => {
        updateFlowData({ realTimeRate: rate });
        // Recalculate recipient amount with new rate
        const usdAmount = parseFloat(flowData.sendingAmount) || 0;
        const newRecipientAmount = (usdAmount * rate).toFixed(2);
        updateFlowData({ recipientAmount: newRecipientAmount });
      });
    }
  }, [flowData.selectedRecipient]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if current step is valid for proceeding
  const isStepValid = () => {
    switch (currentStep) {
      case 1: // Marketing step - always valid
        return true;
      case 2: // Recipient selection - check if recipient is selected
        return flowData.selectedRecipient !== null;
      case 3: // Amount entry - check if amount is entered
        return flowData.sendingAmount && parseFloat(flowData.sendingAmount) > 0;
      case 4: // Payment details - check if account is selected
        return flowData.selectedAccount !== null;
      case 5: // Review details - check if all required data is present
        return flowData.selectedRecipient !== null && 
               flowData.sendingAmount && 
               parseFloat(flowData.sendingAmount) > 0 && 
               flowData.selectedAccount !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 5) {
      // After review details, trigger success screen
      console.log('📝 SendModal: Step 5 - Review details completed');
      console.log('📝 SendModal: onSendSuccess callback exists:', !!onSendSuccess);
      
      if (onSendSuccess) {
        const recipientData = getRecipientData();
        console.log('📝 SendModal: recipientData:', recipientData);
        console.log('📝 SendModal: flowData:', flowData);
        
        const transferData = {
          recipientName: recipientData?.name || 'Unknown',
          country: recipientData?.country || 'Unknown',
          countryCode: recipientData?.countryCode || 'US',
          flag: recipientData?.flag || '🇺🇸',
          image: recipientData?.image || require('../../assets/images/avatar.png'),
          sendingAmount: flowData.sendingAmount,
          recipientAmount: flowData.recipientAmount,
          currency: recipientData?.currency || 'USD',
          exchangeRate: flowData.realTimeRate?.toFixed(2) || '88.00'
        };
        
        console.log('📝 SendModal: calling onSendSuccess with transferData:', transferData);
        onSendSuccess(transferData);
      } else {
        console.log('❌ SendModal: onSendSuccess callback not provided');
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const updateFlowData = (newData) => {
    setFlowData(prev => ({ ...prev, ...newData }));
  };

  const getRecipientData = () => {
    if (!flowData.selectedRecipient) return null;
    
    // If selectedRecipient is an object (from prefill data), return it directly
    if (typeof flowData.selectedRecipient === 'object') {
      return flowData.selectedRecipient;
    }
    
    // Hardcoded recipients for normal flow
    const recipients = {
      'aarav_sharma': {
        name: 'Aarav Sharma',
        country: 'India',
        currency: 'INR',
        countryCode: 'IN',
        flag: '🇮🇳',
        image: require('../../assets/images/india-1.jpg')
      },
      'valentina_rojas': {
        name: 'Valentina Rojas',
        country: 'Chile',
        currency: 'CLP',
        countryCode: 'CL',
        flag: '🇨🇱',
        image: require('../../assets/images/chile-1.png')
      },
      'wei_zhang': {
        name: 'Wei Zhang',
        country: 'China',
        currency: 'CNY',
        countryCode: 'CN',
        flag: '🇨🇳',
        image: require('../../assets/images/china-1.jpg')
      },
      'priya_nair': {
        name: 'Priya Nair',
        country: 'India',
        currency: 'INR',
        countryCode: 'IN',
        flag: '🇮🇳',
        image: require('../../assets/images/india-2.jpg')
      },
      'rohan_mehta': {
        name: 'Rohan Mehta',
        country: 'India',
        currency: 'INR',
        countryCode: 'IN',
        flag: '🇮🇳',
        image: require('../../assets/images/india-3.jpg')
      },
      'ananya_iyer': {
        name: 'Ananya Iyer',
        country: 'India',
        currency: 'INR',
        countryCode: 'IN',
        flag: '🇮🇳',
        image: require('../../assets/images/india-4.jpg')
      },
      'li_na_chen': {
        name: 'Li Na Chen',
        country: 'China',
        currency: 'CNY',
        countryCode: 'CN',
        flag: '🇨🇳',
        image: require('../../assets/images/china-2.jpg')
      }
    };
    
    return recipients[flowData.selectedRecipient];
  };

  const fetchExchangeRate = async (toCurrency) => {
    try {
      // Using a free exchange rate API
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      const data = await response.json();
      const rate = data.rates[toCurrency] || 88.00; // Fallback to 88 if API fails
      return rate;
    } catch (error) {
      console.log('API failed, using fallback rate');
      return 88.00; // Fallback rate
    }
  };

  const getAccountData = () => {
    if (!flowData.selectedAccount) return null;
    
    // If selectedAccount is an object (from prefill data), return it directly
    if (typeof flowData.selectedAccount === 'object') {
      return flowData.selectedAccount;
    }
    
    // Otherwise, use the hardcoded accounts for normal flow
    const accounts = {
      'checking': {
        name: 'Checking Account',
        number: '1234',
        bank: 'Chase',
        image: '/chase.png'
      },
      'savings': {
        name: 'Savings Account',
        number: '5678',
        bank: 'PNC',
        image: '/pnc.png'
      }
    };
    
    return accounts[flowData.selectedAccount];
  };

  if (!isOpen) return null;

  return (
    <div className="send-modal-overlay">
      <div className={`send-modal ${isClosing ? 'closing' : ''}`}>
        {/* NavBar */}
        <div className="send-modal-navbar">
          <div className="send-modal-navbar-left">
            {currentStep > 1 && !fromChat && (
              <IconButton 
                variant="secondary" 
                size="medium"
                icon="arrow_back"
                onClick={handleBack}
              />
            )}
          </div>
          <div className="send-modal-navbar-right">
            {currentStep === 1 ? (
              <Button 
                variant="tertiary" 
                size="medium"
                onClick={handleClose}
              >
                Later
              </Button>
            ) : (
              <IconButton 
                variant="secondary" 
                size="medium"
                icon="close"
                onClick={handleClose}
              />
            )}
          </div>
        </div>

        {/* Body */}
        <div className="send-modal-body">
          {currentStep === 1 && <Step1Marketing />}
          {currentStep === 2 && (
            <Step2Recipient 
              selectedRecipient={flowData.selectedRecipient}
              onRecipientSelect={(recipient) => updateFlowData({ selectedRecipient: recipient })}
            />
          )}
          {currentStep === 3 && (
            <Step3Amount 
              recipientData={getRecipientData()}
              sendingAmount={flowData.sendingAmount}
              recipientAmount={flowData.recipientAmount}
              exchangeRate={flowData.realTimeRate}
              onAmountChange={(amounts) => updateFlowData(amounts)}
            />
          )}
          {currentStep === 4 && (
            <Step4PaymentDetails 
              selectedAccount={flowData.selectedAccount}
              onAccountSelect={(account) => updateFlowData({ selectedAccount: account })}
            />
          )}
          {currentStep === 5 && (
            <Step5ReviewDetails 
              recipientData={getRecipientData()}
              accountData={getAccountData()}
              sendingAmount={flowData.sendingAmount}
              recipientAmount={flowData.recipientAmount}
              exchangeRate={flowData.exchangeRate}
            />
          )}
        </div>

        {/* Footer */}
        <div className="send-modal-footer">
               {currentStep === 5 ? (
                 <SlideToSendButton 
                   onSlideComplete={handleNext}
                   disabled={!isStepValid()}
                 />
               ) : (
                 <Button 
                   variant="primary" 
                   size="large"
                   onClick={handleNext}
                   className="footer-button"
                   disabled={!isStepValid()}
                 >
                   {currentStep === 1 && "Access Contacts"}
                   {currentStep === 2 && "Continue"}
                   {currentStep === 3 && "Continue"}
                   {currentStep === 4 && "Continue"}
                 </Button>
               )}
        </div>

        {/* Home Indicator */}
        <div className="send-modal-home-indicator">
          <img 
            src={homeIndicatorSvg} 
            alt="Home Indicator" 
            className="send-modal-home-indicator-svg"
          />
        </div>
      </div>
    </div>
  );
}

export default SendModal;
