import React from 'react';
import experienceImg from '../assets/experience.png';
import educationImg from '../assets/education.png';

const Experience: React.FC = () => {
  return (
    <section id="experience">
      <h1 className="title page-top">Experience</h1>
      <div className="section-container">
        <div className="about-containers">
          <div className="details-container glassmorphism-card">
            <img
              src={experienceImg}
              alt="Work Experience Icon"
              className="icon"
            />
            <h3>Work Experience</h3>
            <p>Currently seeking internship opportunities<br /><br />Open to software development roles</p>
          </div>
          <div className="details-container glassmorphism-card">
            <img
              src={educationImg}
              alt="Academic Projects Icon"
              className="icon"
            />
            <h3>Academic Projects</h3>
            <p>Multiple coding projects through coursework<br /><br />3 years of college-level CS experience</p>
          </div>
        </div>
        <div className="about-containers">
          <div className="details-container glassmorphism-card desc">
            <h3>Skills & Learning</h3>
            <p>
              Passionate about software development with experience in multiple programming languages. 
              Currently expanding my knowledge through my Computer Science program at UBC and hands-on projects. 
              Always eager to learn new technologies and contribute to meaningful projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 