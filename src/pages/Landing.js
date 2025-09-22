import { Link, useNavigate } from 'react-router-dom';
import Nav from '../components/main/Nav';
import Button from '../components/app/Button';
import '../styles/pages/landing.css';

// Import country flag images
import chileFlag from '../assets/images/chile.png';
import usaFlag from '../assets/images/usa.png';
import indiaFlag from '../assets/images/india.png';

function Landing() {
  const navigate = useNavigate();

  const handlePrototypeClick = () => {
    navigate('/prototype');
  };

  const handleFigmaClick = () => {
    window.open("https://www.figma.com/design/s41Vy4ZGv6zbnD1IhQt9Xj/Ria-Design-Challenge?node-id=98-3010&t=w1OpHqhDkUKD73JH-1", "_blank");
  };

  return (
    <>
      <Nav />
      <div className="landing-container">
        <div className="hero-container">
          <div className="hero-content">
            <div className="decorative-container">
              <div className="avatar-container">
                <img
                  src={chileFlag}
                  alt="Chile"
                  className="decorative-avatar"
                />
                <img
                  src={usaFlag}
                  alt="USA"
                  className="decorative-avatar"
                />
                <img
                  src={indiaFlag}
                  alt="India"
                  className="decorative-avatar"
                />
              </div>
              <div style={{ fontSize: '16px', fontFamily: 'Satoshi', textTransform: 'uppercase', fontWeight: 'bold', color: '#666', lineHeight: '1', backgroundColor: '#F8F8F8', padding: '0px 16px', borderRadius: '24px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+180 countries</div>
            </div>
            <h1 className="landing-hero-title">
              Send money across borders<br />
              <span className="effortlessly-text">effortlessly!</span>
            </h1>
            
            <p className="landing-hero-description">
              Streamline your cash transactions with our intuitive fintech app. No hassle,<br/>
              just seamless money moves from anywhere.
            </p>
          </div>
          
          <div className="landing-buttons">
            <Button 
              variant="primary" 
              size="large" 
              onClick={handlePrototypeClick}
              className="landing-button-fixed-width"
            >
              Vibe Prototype
            </Button>
          
            <Button 
              variant="secondary" 
              size="large" 
              onClick={handleFigmaClick}
              className="landing-button-fixed-width"
            >
              Figma File
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;