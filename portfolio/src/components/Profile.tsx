import React, { useState, useEffect } from 'react';
import linkedinImg from '../assets/linkedin.png';
import githubImg from '../assets/github.png';
import resumePdf from '../assets/Victor-Calbucci-Resume.pdf';
import downloadIcon from '../assets/download.png';
import AnimatedBackground from './AnimatedBackground';

const Profile: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fullName = 'Victor Calbucci';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullName.length) {
        setDisplayedText(fullName.slice(0, index));
        index++;
      } else {
        setTypewriterComplete(true);
        clearInterval(timer);
        
        setTimeout(() => {
          setShowCursor(false);
        }, 2000);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, scale: string) => {
    (e.currentTarget as HTMLElement).style.transform = `scale(${scale})`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
  };

  const socialIcons = [
    {
      src: linkedinImg,
      alt: 'My LinkedIn Profile',
      url: 'https://www.linkedin.com/in/victor-calbucci/'
    },
    {
      src: githubImg,
      alt: 'My GitHub Account',
      url: 'https://github.com/vcalbucci'
    }
  ];

  return (
    <div className="profile-container">
      <AnimatedBackground />
      <section id="profile" className="profile-section">
        <div className="section-text profile-content">
          <p 
            className="section-text-p1"
            style={{ 
              fontSize: '1.2rem'
            }}
          >
            Hello, I'm
          </p>
          <h1 
            className="title"
            style={{ 
              fontSize: '3.5rem',
              minHeight: '4rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}
          >
            {displayedText}
            <span className="cursor" style={{ 
              opacity: showCursor ? 1 : 0,
              animation: showCursor ? 'blink 1s infinite' : 'none'
            }}>|</span>
          </h1>
          <p 
            className="section-text-p2"
            style={{ 
              fontSize: '1.5rem',
              color: 'var(--secondary)',
              opacity: 0,
              animation: typewriterComplete ? 'slideInFromRight 0.8s ease-out 0.3s forwards' : 'none',
              marginBottom: '2rem'
            }}
          >
            Software Engineer
          </p>
          <div 
            className="btn-container"
            style={{ 
              opacity: 0,
              animation: typewriterComplete ? 'fadeInUp 0.8s ease-out 0.6s forwards' : 'none'
            }}
          >
            <button
              className="btn btn-color-2"
              onClick={() => window.open(resumePdf)}
              style={{ 
                fontSize: '1.1rem',
                padding: '1rem 2.5rem',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => handleMouseEnter(e, '1.05')}
              onMouseLeave={handleMouseLeave}
            >
              Resume
              <img 
                src={downloadIcon} 
                alt="Download" 
                className="download-icon"
              />
            </button>
          </div>
          <div 
            id="socials-container" 
            className="socials-container"
            style={{ 
              opacity: 0,
              animation: typewriterComplete ? 'fadeInUp 0.8s ease-out 0.9s forwards' : 'none'
            }}
          >
            {socialIcons.map((social, index) => (
              <img
                key={index}
                src={social.src}
                alt={social.alt}
                className="icon social-icon"
                onClick={() => window.open(social.url)}
                onMouseEnter={(e) => handleMouseEnter(e, '1.1')}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile; 