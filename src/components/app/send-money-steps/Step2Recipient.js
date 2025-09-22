import React, { useState } from 'react';
import IconButton from '../IconButton';
import AvatarCard from '../AvatarCard';
import CustomRadioButton from '../CustomRadioButton';
import Divider from '../Divider';

function Step2Recipient({ selectedRecipient, onRecipientSelect }) {
  // Hardcoded users with specific images and countries
  const consistentUsers = {
    CN: [
      { name: 'Wei Zhang', image: require('../../../assets/images/china-1.jpg'), country: 'China', countryCode: 'CN', flag: '🇨🇳' },
      { name: 'Li Na Chen', image: require('../../../assets/images/china-2.jpg'), country: 'China', countryCode: 'CN', flag: '🇨🇳' }
    ],
    CL: [
      { name: 'Valentina Rojas', image: require('../../../assets/images/chile-1.png'), country: 'Chile', countryCode: 'CL', flag: '🇨🇱' }
    ],
    IN: [
      { name: 'Aarav Sharma', image: require('../../../assets/images/india-1.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' },
      { name: 'Priya Nair', image: require('../../../assets/images/india-2.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' },
      { name: 'Rohan Mehta', image: require('../../../assets/images/india-3.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' },
      { name: 'Ananya Iyer', image: require('../../../assets/images/india-4.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' }
    ]
  };

  // Users for "On Swift" section (Aarav Sharma, Valentina Rojas, Wei Zhang)
  const onSwiftUsers = [
    { name: 'Aarav Sharma', image: require('../../../assets/images/india-1.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' },
    { name: 'Valentina Rojas', image: require('../../../assets/images/chile-1.png'), country: 'Chile', countryCode: 'CL', flag: '🇨🇱' },
    { name: 'Wei Zhang', image: require('../../../assets/images/china-1.jpg'), country: 'China', countryCode: 'CN', flag: '🇨🇳' }
  ];

  // Users for "Invite Friends" section (all except Chinmay Inamdar)
  const inviteFriendsUsers = [
    { name: 'Priya Nair', image: require('../../../assets/images/india-2.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' },
    { name: 'Rohan Mehta', image: require('../../../assets/images/india-3.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' },
    { name: 'Ananya Iyer', image: require('../../../assets/images/india-4.jpg'), country: 'India', countryCode: 'IN', flag: '🇮🇳' },
    { name: 'Li Na Chen', image: require('../../../assets/images/china-2.jpg'), country: 'China', countryCode: 'CN', flag: '🇨🇳' }
  ];

  return (
    <div className="send-process">
      <div className="header-content">
        <h1 className="send-step-title">Who are you sending it to?</h1>
        <p className="send-step-description">
          Enter the receiver's details here.
        </p>
      </div>
      <div 
        className="add-recipient-container"
        onClick={() => console.log('Add recipient')}
        style={{ cursor: 'pointer' }}
      >
        <IconButton
          variant="secondary"
          size="medium"
          icon="add"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Add recipient');
          }}
        />
        <h4>Add new recipient</h4>
        <IconButton
          variant="tertiary"
          size="medium"
          icon="keyboard_arrow_right"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Add recipient');
          }}
        />
      </div>
      
      <div className="recipient-info-container">
        <div className="section-header-container">
          <label className="l1">On Swift</label>
          <IconButton
            variant="tertiary"
            size="medium"
            icon="search"
            onClick={() => console.log('Search')}
          />
        </div>
        
               <div className="un-container">
                 {onSwiftUsers.map((user, index) => (
                   <AvatarCard
                     key={user.name}
                     image={user.image}
                     name={user.name}
                     subheading={`${user.flag} ${user.country} (${user.countryCode === 'IN' ? 'INR' : user.countryCode === 'CL' ? 'CLP' : 'CNY'})`}
                     showRadio={true}
                     isSelected={selectedRecipient === user.name.toLowerCase().replace(' ', '_')}
                     onRadioChange={() => onRecipientSelect(user.name.toLowerCase().replace(' ', '_'))}
                   />
                 ))}
               </div>
        
        <Divider />
        
        <div className="section-header-container">
          <label className="l1">Invite Friends</label>
          <IconButton
            variant="tertiary"
            size="medium"
            icon="search"
            onClick={() => console.log('Search Recent')}
          />
        </div>
        
        <div className="un-container">
                 {inviteFriendsUsers.map((user, index) => (
                   <AvatarCard
                     key={user.name}
                     image={user.image}
                     name={user.name}
                     subheading={`${user.flag} ${user.country} (${user.countryCode === 'IN' ? 'INR' : user.countryCode === 'CL' ? 'CLP' : 'CNY'})`}
                     showSendButton={true}
                     onSendClick={() => console.log(`Invite ${user.name}`)}
                     buttonText="Invite"
                   />
                 ))}
               </div>
      </div>
    </div>
  );
}

export default Step2Recipient;
