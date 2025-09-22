import React, { useState, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import IconButton from '../../IconButton';
import Chip from '../../Chip';
import CurrencyGraph from '../../CurrencyGraph';
import BottomBarItem from '../../BottomBarItem';
import AvatarCard from '../../AvatarCard';
import SendModal from '../../SendModal';
import '../../../../styles/components/prototype/screens/home-screen.css';
import '../../../../styles/components/currency-graph.css';

// Currency mapping - moved outside component to prevent recreation
const currencyMap = {
  'India': { code: 'INR', symbol: '₹', name: 'Indian Rupee', countryCode: 'IN' },
  'Chile': { code: 'CLP', symbol: '$', name: 'Chilean Peso', countryCode: 'CL' },
  'China': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', countryCode: 'CN' },
  'USA': { code: 'USD', symbol: '$', name: 'US Dollar', countryCode: 'US' }
};

function HomeScreen({ onNavigate, onOpenSendModal, transfers = [], onShowChatBubble, onMarkRequestProcessed }) {
  console.log('🏠 HomeScreen received transfers:', transfers);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [exchangeRate, setExchangeRate] = useState(88.0);
  const [currencyCode, setCurrencyCode] = useState('INR');
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [changeData, setChangeData] = useState({ amount: 0, percentage: 0, isPositive: true });
  const [hoveredValue, setHoveredValue] = useState(null);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [showRequests, setShowRequests] = useState(false);
  const [hasProcessedRequest, setHasProcessedRequest] = useState(false);

  // Show requests section after 2 seconds, but only if not processed yet
  useEffect(() => {
    if (!hasProcessedRequest) {
      const timer = setTimeout(() => {
        setShowRequests(true);
        if (onShowChatBubble) {
          onShowChatBubble(true);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [onShowChatBubble, hasProcessedRequest]);

  // Check if request has been processed (transfer created)
  useEffect(() => {
    // Check if there's a transfer for Chinmay (the requester)
    const chinmayTransfer = transfers.find(transfer => 
      transfer.name === 'Chinmay Inamdar' || 
      transfer.name === 'Chinmay' ||
      transfer.recipientName === 'Chinmay Inamdar'
    );
    
    if (chinmayTransfer && !hasProcessedRequest) {
      setHasProcessedRequest(true);
      setShowRequests(false);
    }
  }, [transfers, hasProcessedRequest]);

  // Function to mark request as processed (called when Send Money is clicked)
  const markRequestAsProcessed = () => {
    setHasProcessedRequest(true);
    setShowRequests(false);
    if (onMarkRequestProcessed) {
      onMarkRequestProcessed();
    }
  };

  // Helper function to create country flag component
  const createCountryFlag = (countryCode) => (
    <ReactCountryFlag 
      countryCode={countryCode} 
      svg 
      style={{ width: '32px', height: '32px' }} 
    />
  );

  // Hardcoded users with specific images and countries
  const consistentUsers = {
    CN: [
      { name: 'Wei Zhang', image: require('../../../../assets/images/china-1.jpg'), country: 'China', countryCode: 'CN', flag: '🇨🇳' },
      { name: 'Li Na Chen', image: require('../../../../assets/images/china-2.jpg'), country: 'China', countryCode: 'CN', flag: '🇨🇳' }
    ],
    CL: [
      { name: 'Valentina Rojas', image: require('../../../../assets/images/chile-1.png'), country: 'Chile', countryCode: 'CL', flag: '🇨🇱' }
    ],
    IN: [
      { name: 'Aarav Sharma', image: require('../../../../assets/images/india-1.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' },
      { name: 'Priya Nair', image: require('../../../../assets/images/india-2.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' },
      { name: 'Rohan Mehta', image: require('../../../../assets/images/india-3.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' },
      { name: 'Ananya Iyer', image: require('../../../../assets/images/india-4.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' }
    ]
  };

  // Special user for chat requests
  const chinmayUser = {
    name: 'Chinmay Inamdar',
    image: require('../../../../assets/images/avatar.png'),
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳'
  };

  // Calculate change data from daily data (comparing current day to previous day)
  const calculateChangeData = (currentRate, historicalData) => {
    if (!historicalData || !historicalData.values || historicalData.values.length < 2) {
      return { amount: 0, percentage: 0, isPositive: true };
    }

    const values = historicalData.values;
    const currentDayIndex = values.length - 1; // Last day (current day)
    const previousDayIndex = values.length - 2; // Previous day
    
    if (values.length <= previousDayIndex) {
      return { amount: 0, percentage: 0, isPositive: true };
    }
    
    const previousDayRate = values[previousDayIndex];
    const currentDayRate = values[currentDayIndex];
    
    const changeAmount = currentDayRate - previousDayRate;
    const changePercentage = ((changeAmount / previousDayRate) * 100);
    const isPositive = changeAmount >= 0;

    return {
      amount: Math.abs(changeAmount),
      percentage: Math.abs(changePercentage),
      isPositive: isPositive
    };
  };

  // Handle graph hover events
  const handleGraphHover = (value, label, dataIndex) => {
    if (value !== null && value !== undefined) {
      setHoveredValue(value);
      setHoveredLabel(label);
    } else {
      // Reset to current value when not hovering
      setHoveredValue(null);
      setHoveredLabel(null);
    }
  };

  // Reset to current value (for when user wants to see real-time value)
  const resetToCurrentValue = () => {
    setHoveredValue(null);
    setHoveredLabel(null);
  };

  const bottomBarItems = [
    { icon: 'home', label: 'Home', id: 'home' },
    { icon: 'swap_horiz', label: 'Transfers', id: 'transfers' },
    { icon: 'arrow_upward', label: 'Send', id: 'send' },
    { icon: 'group', label: 'Recipients', id: 'recipients' },
    { icon: 'person', label: 'Profile', id: 'profile' }
  ];

  // Generate realistic daily fluctuations based on current rate
  const generateRealisticHistoricalData = (currentRate, currencyCode) => {
    console.log('Generating realistic data for currency:', currencyCode, 'with rate:', currentRate);
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const labels = [];
    const values = [];
    
    // Generate data for the last 7 days (more realistic timeframe)
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(`Sep ${date.getDate()}`);
      
      // Create realistic daily variations (±0.5% typical for currencies)
      // Use a seed based on date for consistency
      const seed = date.getDate() + date.getMonth();
      const random = (seed * 9301 + 49297) % 233280 / 233280; // Simple deterministic "random"
      const variation = (random - 0.5) * 0.01; // ±0.5% variation
      
      let dailyRate;
      if (i === 0) {
        // Today's rate should match the current rate
        dailyRate = currentRate;
      } else {
        dailyRate = currentRate * (1 + variation);
      }
      
      values.push(parseFloat(dailyRate.toFixed(2)));
    }
    
    return {
      labels: labels,
      values: values
    };
  };

  // Fetch historical exchange rates for graph
  const fetchHistoricalRates = async (country) => {
    const currencyInfo = currencyMap[country];
    
    // Always fetch fresh data to reflect current rates
    // This ensures each currency switch gets updated values

    if (country === 'USA') {
      // For USD, show 1.0 for all days in September up to current day
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const labels = [];
      const values = [];
      
      for (let day = 1; day <= currentDay; day++) {
        labels.push(`Sep ${day}`);
        values.push(1.0);
      }
      
      const historicalData = {
        labels: labels,
        values: values
      };
      
      // Don't cache - we want fresh data each time to reflect current rates
      setGraphData(historicalData);
      return;
    }

    // For historical data, we'll generate realistic variations based on current rate
    // since most free APIs don't provide reliable historical data
    const historicalData = generateRealisticHistoricalData(exchangeRate, currencyInfo.code);
    setGraphData(historicalData);
    
    // Calculate change data
    const change = calculateChangeData(exchangeRate, historicalData);
    setChangeData(change);
  };

  // Check if we need to fetch fresh data (once per day)
  const shouldFetchFreshData = (country) => {
    const cacheKey = `exchange_rate_${country}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return true;
    
    try {
      const { timestamp } = JSON.parse(cached);
      const now = new Date();
      const cacheDate = new Date(timestamp);
      
      // Check if it's a different day
      return now.toDateString() !== cacheDate.toDateString();
    } catch {
      return true;
    }
  };

  // Get cached exchange rate
  const getCachedRate = (country) => {
    const cacheKey = `exchange_rate_${country}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return null;
    
    try {
      const { rate, currencyCode } = JSON.parse(cached);
      return { rate, currencyCode };
    } catch {
      return null;
    }
  };

  // Cache exchange rate
  const cacheExchangeRate = (country, rate, currencyCode) => {
    const cacheKey = `exchange_rate_${country}`;
    const cacheData = {
      rate,
      currencyCode,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  };

  // Fetch exchange rate for selected country
  const fetchExchangeRate = async (country) => {
    console.log('Checking exchange rate for country:', country);
    
    if (country === 'USA') {
      setExchangeRate(1.0);
      setCurrencyCode('USD');
      return;
    }

    // Check if we have fresh cached data
    if (!shouldFetchFreshData(country)) {
      const cached = getCachedRate(country);
      if (cached) {
        console.log('Using cached rate for:', country, cached.rate);
        setExchangeRate(cached.rate);
        setCurrencyCode(cached.currencyCode);
        return;
      }
    }

    console.log('Fetching fresh data for:', country);
    setIsLoading(true);
    try {
      const currencyInfo = currencyMap[country];
      
      // Try multiple API endpoints for better reliability
      const apiEndpoints = [
        `https://api.fxratesapi.com/latest?base=USD&symbols=${currencyInfo.code}`,
        `https://open.er-api.com/v6/latest/USD`,
        `https://api.exchangerate.host/latest?base=USD&symbols=${currencyInfo.code}`
      ];
      
      let rate = null;
      
      for (const endpoint of apiEndpoints) {
        try {
          console.log('Trying API:', endpoint);
          const response = await fetch(endpoint);
          const data = await response.json();
          
          if (data.rates && data.rates[currencyInfo.code]) {
            rate = data.rates[currencyInfo.code];
            console.log('Successfully fetched rate:', rate, 'from', endpoint);
            break;
          }
        } catch (error) {
          console.log('API failed:', endpoint, error.message);
          continue;
        }
      }
      
      if (rate) {
        setExchangeRate(rate);
        setCurrencyCode(currencyInfo.code);
        // Cache the fresh data
        cacheExchangeRate(country, rate, currencyInfo.code);
      } else {
        throw new Error('All APIs failed');
      }
    } catch (error) {
      console.error('All exchange rate APIs failed:', error);
      // Fallback rates only when all APIs fail
      const fallbackRates = {
        'India': 83.2,
        'Chile': 950.0,
        'China': 7.2
      };
      console.log('Using fallback rate for:', country);
      const fallbackRate = fallbackRates[country] || 1.0;
      const fallbackCurrencyCode = currencyMap[country]?.code || 'USD';
      
      setExchangeRate(fallbackRate);
      setCurrencyCode(fallbackCurrencyCode);
      // Cache fallback data too
      cacheExchangeRate(country, fallbackRate, fallbackCurrencyCode);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle chip selection
  const handleChipClick = async (country) => {
    console.log('Chip clicked for country:', country);
    setSelectedCountry(country);
    // Reset hover state when switching currencies
    setHoveredValue(null);
    setHoveredLabel(null);
    
    // Clear existing graph data to prevent carryover
    setGraphData(null);
    
    await fetchExchangeRate(country);
    // The historical data will be generated by the useEffect when exchangeRate changes
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'send') {
      onOpenSendModal();
    } else if (onNavigate) {
      onNavigate(tabId);
    }
  };

  // Load initial exchange rate (graph data will be generated by the other useEffect)
  useEffect(() => {
    fetchExchangeRate(selectedCountry);
  }, []);


  // Generate fresh historical data when exchange rate changes
  useEffect(() => {
    if (exchangeRate && selectedCountry && currencyMap[selectedCountry]) {
      console.log('Exchange rate changed to:', exchangeRate, 'for country:', selectedCountry);
      
      // Generate fresh historical data based on the new exchange rate
      const currencyInfo = currencyMap[selectedCountry];
      const historicalData = generateRealisticHistoricalData(exchangeRate, currencyInfo.code);
      setGraphData(historicalData);
      
      // Calculate change data
      const change = calculateChangeData(exchangeRate, historicalData);
      setChangeData(change);
    }
  }, [exchangeRate, selectedCountry]);

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
               {/* Chip Container */}
               <div className="chip-container">
                 <Chip 
                   selected={selectedCountry === 'India'}
                   image={createCountryFlag('IN')}
                   text="India"
                   onClick={() => handleChipClick('India')}
                 />
                 <Chip 
                   selected={selectedCountry === 'Chile'}
                   image={createCountryFlag('CL')}
                   text="Chile"
                   onClick={() => handleChipClick('Chile')}
                 />
                 <Chip 
                   selected={selectedCountry === 'China'}
                   image={createCountryFlag('CN')}
                   text="China"
                   onClick={() => handleChipClick('China')}
                 />
                 <IconButton 
                   variant="tertiary" 
                   size="small"
                   icon="add"
                   onClick={() => console.log('Add chip clicked')}
                 />
               </div>

        {/* Graph Container */}
        <div className="graph-container">
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px'}}>
            <h3 className="exchange-rate" onClick={resetToCurrentValue} style={{ cursor: 'pointer' }}>
              {isLoading ? 'Loading...' : `1 USD = ${(hoveredValue || exchangeRate).toFixed(2)} ${currencyCode}`}
            </h3>
            
            {/* Change Container */}
            <div className="change-container">
              <span className={`change-icon ${changeData.isPositive ? 'change-bad' : 'change-good'}`}>
                {changeData.isPositive ? '↗' : '↘'}
              </span>
              <span className="change-amount">
                {currencyCode} {changeData.isPositive ? '+' : '-'}{changeData.amount.toFixed(2)} ({changeData.isPositive ? '+' : '-'}{changeData.percentage.toFixed(1)}%)
              </span>
              <span className="change-period">
                {hoveredLabel ? `${hoveredLabel} ${new Date().getFullYear()}` : 'today'}
              </span>
            </div>
          </div>
          
          {/* Graph Area */}
          <div className="graph-area">
            {isGraphLoading ? (
              <div className="graph-loading">
                <div className="loading-spinner"></div>
                <p>Loading historical data...</p>
              </div>
            ) : graphData ? (
              <CurrencyGraph 
                data={graphData}
                currentValue={exchangeRate}
                onHover={handleGraphHover}
              />
            ) : (
              <div className="graph-placeholder">
                <p>No data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Requests Container */}
        {showRequests && (
          <div className="transfers-container">
            <div className="transfers-header">
              <h4 className="transfers-title">Requests</h4>
            </div>
            
            {/* Avatar Cards */}
            <div className="transfers-cards">
              <AvatarCard
                image={require('../../../../assets/images/avatar.png')}
                name="Chinmay Inamdar"
                subheading="🇮🇳 India"
                showSendButton={true}
                onSendClick={() => {
                  onNavigate('chat');
                  if (onShowChatBubble) {
                    onShowChatBubble(false); // Hide chat bubble when navigating to chat
                  }
                }}
                buttonText="View"
              />
            </div>
          </div>
        )}

        {/* Transfers Container */}
        <div className="transfers-container">
          <div className="transfers-header">
            <h4 className="transfers-title">Transfers</h4>
            <IconButton 
              variant="secondary" 
              size="small"
              icon="keyboard_arrow_right"
              onClick={() => console.log('View all transfers clicked')}
            />
          </div>
          
          {/* Avatar Cards */}
          <div className="transfers-cards">
            {transfers.map((transfer, index) => {
              console.log('🎨 Rendering transfer:', transfer);
              const countryUsers = consistentUsers[transfer.countryCode] || [];
              // Use transfer.id to get a more unique user index to avoid repetition
              const userIndex = parseInt(transfer.id) % (countryUsers.length || 1);
              const user = countryUsers[userIndex] || { 
                name: transfer.name, 
                image: require('../../../../assets/images/avatar.png'),
                country: transfer.country,
                countryCode: transfer.countryCode
              };
              
              return (
                <AvatarCard
                  key={transfer.id}
                  image={transfer.image || user.image}
                  name={transfer.name}
                  subheading={`${transfer.flag} ${transfer.country}`}
                  amount={transfer.amount}
                  currency={transfer.currency}
                  onClick={() => console.log(`${transfer.name} clicked`)}
                />
              );
            })}
          </div>
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

export default HomeScreen;
