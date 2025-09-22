import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PrototypeFrame from './PrototypeFrame';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import TransfersScreen from './screens/TransfersScreen';
import RecipientsScreen from './screens/RecipientsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SuccessScreen from './screens/SuccessScreen';
import ChatScreen from './screens/ChatScreen';
import '../../../styles/components/prototype/prototype-screen.css';

const PrototypeScreen = forwardRef(function PrototypeScreen({ onContentChange, onVideoEnd, onShowChatBubble, onMarkRequestProcessed }, ref) {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [navigationStack, setNavigationStack] = useState(['welcome']);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [sendModalPrefillData, setSendModalPrefillData] = useState(null);
  const [isFromChat, setIsFromChat] = useState(false);
  const [transfers, setTransfers] = useState([
    {
      id: '1',
      name: 'Aarav Sharma',
      country: 'India',
      countryCode: 'IN',
      flag: '🇮🇳',
      amount: '-USD 150',
      currency: 'INR 12,450 (83.00)',
      date: new Date('2024-09-15'),
      status: 'completed',
      image: require('../../../assets/images/india-1.jpg')
    },
    {
      id: '2',
      name: 'Valentina Rojas',
      country: 'Chile',
      countryCode: 'CL',
      flag: '🇨🇱',
      amount: '-USD 75',
      currency: 'CLP 63,750 (850.00)',
      date: new Date('2024-09-14'),
      status: 'completed',
      image: require('../../../assets/images/chile-1.png')
    },
    {
      id: '3',
      name: 'Wei Zhang',
      country: 'China',
      countryCode: 'CN',
      flag: '🇨🇳',
      amount: '-USD 200',
      currency: 'CNY 1,440 (7.20)',
      date: new Date('2024-09-13'),
      status: 'completed',
      image: require('../../../assets/images/china-1.jpg')
    }
  ]);

  // Content for different screens that updates the left side
  const screenContent = {
    welcome: {
      title: "Welcome to Swift",
      description: "Experience the future of global money transfers. Fast, secure, and transparent - your gateway to seamless international payments starts here."
    },
    home: {
      title: "Homepage",
      description: "The homepage is customized based on the user's selected favorite countries, providing a personalized experience. From here, users can either initiate a transfer directly or respond to a pending request for money, making the two primary actions easily accessible."
    },
    transfers: {
      title: "Transfers",
      description: "This screen was out of scope and wasn't implemented."
    },
    recipients: {
      title: "Recipients", 
      description: "This screen was out of scope and wasn't implemented."
    },
    profile: {
      title: "Profile",
      description: "This screen was out of scope and wasn't implemented."
    },
    success: {
      title: "Success Screen",
      description: "The success screen confirms the transfer has been completed. It automatically closes after displaying the confirmation, ensuring a smooth user flow back to the main app experience."
    },
    chat: {
      title: "Chat Screen",
      description: "The chat screen displays a log of previous transactions and related conversations. This allows users to track their financial interactions while keeping communication with recipients in one place."
    },
    send_step1: {
      title: "Send Money – Step 1 (Marketing Pit Stop)",
      description: "A one-time marketing dialog highlights the ability to import the user's contact list. While users can choose to connect their contacts immediately, the option remains available later through the profile section."
    },
    send_step2: {
      title: "Send Money – Step 2 (Recipient Selection)",
      description: "If contacts have been imported, users can see which of their connections are already on the platform and send them money instantly without re-entering details. For new recipients not yet on the app, the \"Add New Recipient\" option is provided."
    },
    send_step3: {
      title: "Send Money – Step 3 (Enter Amount)",
      description: "Users can enter the transfer amount in either their home currency or the recipient's currency. The system automatically calculates the conversion, eliminating guesswork."
    },
    send_step4: {
      title: "Send Money – Step 4 (Payment Details)",
      description: "At this step, users provide or select payment details. This ensures secure and accurate processing of the transaction."
    },
    send_step5: {
      title: "Send Money – Step 5 (Review & Confirm)",
      description: "Users can review all transaction details before sending. The screen also provides clear options to return and edit either sender or recipient information if changes are needed."
    }
  };

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle navigation between screens
  const handleNavigate = (screenName) => {
    if (screenName !== currentScreen && !isTransitioning) {
      // If navigating from welcome screen, trigger transition
      if (currentScreen === 'welcome' && screenName === 'home') {
        setIsTransitioning(true);
        // Wait for transition animation to complete, then navigate
        setTimeout(() => {
          setCurrentScreen(screenName);
          setNavigationStack([...navigationStack, screenName]);
          setIsTransitioning(false);
          
          // Update parent component with new content
          if (onContentChange && screenContent[screenName]) {
            onContentChange(screenContent[screenName]);
          }
        }, 1000); // Wait for transition to complete
      } else if (screenName === 'send') {
        // Mark request as processed when Send Money is clicked
        if (onMarkRequestProcessed) {
          onMarkRequestProcessed();
        }
        
        // Open send modal with pre-filled data from chat request
        setIsFromChat(true); // This is from chat flow
        setSendModalPrefillData({
          recipient: {
            name: 'Chinmay Inamdar',
            country: 'India',
            countryCode: 'IN',
            currency: 'INR',
            image: require('../../../assets/images/avatar.png')
          },
          sendingAmount: '432',
          recipientAmount: '38000',
          exchangeRate: 88.00,
          account: {
            name: 'Checking Account',
            number: '1234',
            image: '/chase.png'
          }
        });
        setIsSendModalOpen(true);
      } else {
        // Normal navigation for other screens
        setCurrentScreen(screenName);
        setNavigationStack([...navigationStack, screenName]);
        
        // Update parent component with new content
        if (onContentChange && screenContent[screenName]) {
          onContentChange(screenContent[screenName]);
        }
      }
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (navigationStack.length > 1) {
      const newStack = [...navigationStack];
      newStack.pop(); // Remove current screen
      const previousScreen = newStack[newStack.length - 1];
      
      setNavigationStack(newStack);
      setCurrentScreen(previousScreen);
      
      // Update parent with previous screen content
      if (onContentChange && screenContent[previousScreen]) {
        onContentChange(screenContent[previousScreen]);
      }
    }
  };

  // Initialize content on first render
  React.useEffect(() => {
    if (onContentChange && screenContent[currentScreen]) {
      onContentChange(screenContent[currentScreen]);
    }
  }, []); // Empty dependency array for first render only

  // Handle send modal
  const handleOpenSendModal = () => {
    setIsFromChat(false); // Regular send money flow
    setIsSendModalOpen(true);
  };

  const handleCloseSendModal = () => {
    setIsSendModalOpen(false);
  };

  // Create a new transfer
  const createTransfer = (transferData) => {
    console.log('🔄 Creating transfer with data:', transferData);
    
    const newTransfer = {
      id: Date.now().toString(),
      name: transferData.recipientName,
      country: transferData.country,
      countryCode: transferData.countryCode,
      flag: transferData.flag,
      image: transferData.image, // Include the image in the transfer
      amount: `-USD ${transferData.sendingAmount}`,
      currency: `${transferData.currency} ${transferData.recipientAmount} (${transferData.exchangeRate})`,
      date: new Date(),
      status: 'completed'
    };
    
    console.log('✅ New transfer created:', newTransfer);
    
    // Add new transfer to the beginning of the array (most recent first)
    setTransfers(prevTransfers => {
      const updated = [newTransfer, ...prevTransfers];
      console.log('📋 Updated transfers array:', updated);
      return updated;
    });
  };

  const handleSendSuccess = (transferData) => {
    console.log('🎯 handleSendSuccess called with:', transferData);
    if (transferData) {
      createTransfer(transferData);
    } else {
      console.log('❌ No transfer data provided to handleSendSuccess');
    }
    setIsSendModalOpen(false);
    handleNavigate('success');
  };

  // Expose navigation methods to parent component
  useImperativeHandle(ref, () => ({
    navigateToHome: () => handleNavigate('home')
  }));

  // Render appropriate screen component
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={handleNavigate} />;
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} onOpenSendModal={handleOpenSendModal} transfers={transfers} onShowChatBubble={onShowChatBubble} onMarkRequestProcessed={onMarkRequestProcessed} />;
      case 'transfers':
        return <TransfersScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'recipients':
        return <RecipientsScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'success':
        return <SuccessScreen onNavigate={handleNavigate} />;
      case 'chat':
        return <ChatScreen onNavigate={handleNavigate} onBack={handleBack} />;
      default:
        return <WelcomeScreen onNavigate={handleNavigate} />;
    }
  };

  // Determine background props based on current screen
  const getBackgroundProps = () => {
    if (currentScreen === 'welcome' || currentScreen === 'success') {
      return {
        backgroundType: 'video',
        backgroundSrc: require('../../../assets/images/background-vid.mp4'),
        darkMode: true // Use white status bar and home indicator on dark video
      };
    }
    return {
      backgroundType: 'color',
      backgroundColor: 'var(--surface-00)',
      darkMode: false
    };
  };

        return (
          <div className="prototype-screen-container">
            {/* Mobile Frame with Status Bar and Home Indicator */}
            <PrototypeFrame 
              currentScreen={currentScreen}
              onVideoEnd={() => handleNavigate('home')}
              isTransitioning={isTransitioning}
              isSendModalOpen={isSendModalOpen}
              onCloseSendModal={handleCloseSendModal}
              onSendSuccess={handleSendSuccess}
              sendModalPrefillData={sendModalPrefillData}
              fromChat={isFromChat}
              onContentChange={onContentChange}
              {...getBackgroundProps()}
            >
              {renderScreen()}
            </PrototypeFrame>
          </div>
        );
});

export default PrototypeScreen;
