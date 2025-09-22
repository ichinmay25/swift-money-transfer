import React from 'react';

function Step1Marketing() {
  return (
    <div className="marketing-content">
      <img 
        src={require('../../../assets/images/marketing-image.png')} 
        alt="Send Money Marketing" 
        className="marketing-image"
      />
      <div className="marketing-text-container">
        <h1 className="display-1">No more searching for bank details</h1>
        <p className="body-3">
          Send money directly to anyone using Swift by entering their contact information
        </p>
      </div>
    </div>
  );
}

export default Step1Marketing;
