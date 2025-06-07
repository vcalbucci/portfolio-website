import React from 'react';
import emailImg from '../assets/email.png';
import linkedinImg from '../assets/linkedin.png';

const Contact: React.FC = () => {
  return (
    <section id="contact">
      <h1 className="title page-top">Contact Me</h1>
      <div className="contact-info-top">
        <div className="contact-info-container glassmorphism-card">
          <img
            src={emailImg}
            alt="Email Icon"
            className="icon contact-icon email-icon"
          />
          <p><a href="mailto:victor@calbucci.com">victor@calbucci.com</a></p>
        </div>
        <div className="contact-info-container glassmorphism-card">
          <img
            src={linkedinImg}
            alt="LinkedIn Icon"
            className="icon contact-icon"
          />
          <p>
            <a href="https://www.linkedin.com/in/victor-calbucci-a91458210/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact; 