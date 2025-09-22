import React, { useState, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import '../../styles/components/amount-input.css';

function AmountInput({ 
  label,
  country = 'United States',
  currency = 'USD',
  countryCode = 'US',
  showDropdown = true,
  placeholder = '0.00',
  value = '',
  onChange,
  description,
  showDescription = false
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  // Format the value to include currency
  const formatValueWithCurrency = (val) => {
    if (!val || val === '') return '';
    const numericValue = val.replace(/[^\d.]/g, ''); // Remove non-numeric characters except decimal
    if (numericValue === '') return '';
    return `${numericValue} ${currency}`;
  };

  // Extract numeric value from formatted string
  const extractNumericValue = (formattedValue) => {
    return formattedValue.replace(` ${currency}`, '').replace(/[^\d.]/g, '');
  };

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatValueWithCurrency(value));
    }
  }, [value, currency, isFocused]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = extractNumericValue(inputValue);
    
    // While typing, show only the numeric value
    setDisplayValue(numericValue);
    
    // Call the parent onChange with just the numeric value
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: numericValue
        }
      };
      onChange(syntheticEvent);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Show only numeric value when focused
    const numericValue = extractNumericValue(displayValue);
    setDisplayValue(numericValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Add currency when user finishes typing
    const numericValue = extractNumericValue(displayValue);
    if (numericValue) {
      setDisplayValue(formatValueWithCurrency(numericValue));
    }
  };

  return (
    <div className="amount-input-container">
      <label className="amount-input-label l1">{label}</label>
      
      <div className="amount-input-wrapper">
        <div className="country-container">
          <div className="flag-circle">
            <ReactCountryFlag 
              countryCode={countryCode} 
              svg 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%'
              }}
            />
          </div>
          <span className="currency-name">{currency}</span>
          {showDropdown && (
            <div className="dropdown-arrow">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
        
        <div className="amount-input-field">
          <input
            type="text"
            placeholder={placeholder}
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="amount-input h2"
          />
        </div>
      </div>
      
      {showDescription && description && (
        <p className="body-3" style={{ color: 'var(--text-primary, #8755CA)' }}>{description}</p>
      )}
    </div>
  );
}

export default AmountInput;
