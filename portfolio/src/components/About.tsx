import React from 'react';

const skillsData = {
  Languages: [
    { name: 'Java', badge: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white' },
    { name: 'Python', badge: 'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54' },
    { name: 'C', badge: 'https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white' },
    { name: 'C++', badge: 'https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white' },
    { name: 'JavaScript', badge: 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E' },
    { name: 'TypeScript', badge: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white' },
    { name: 'R', badge: 'https://img.shields.io/badge/r-%23276DC3.svg?style=for-the-badge&logo=r&logoColor=white' },
    { name: 'HTML5', badge: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white' },
    { name: 'CSS3', badge: 'https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white' }
  ],
  'Frameworks & Libraries': [
    { name: 'React', badge: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' },
    { name: 'Vite', badge: 'https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white' },
    { name: 'Node.js', badge: 'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white' },
    { name: 'TensorFlow', badge: 'https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white' },
    { name: 'PyTorch', badge: 'https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white' },
    { name: 'NumPy', badge: 'https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white' },
    { name: 'Matplotlib', badge: 'https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black' }
  ],
  'Tools & Platforms': [
    { name: 'Jupyter Notebook', badge: 'https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=for-the-badge&logo=jupyter&logoColor=white' },
    { name: 'GitHub', badge: 'https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white' },
    { name: 'Visual Studio Code', badge: 'https://img.shields.io/badge/Visual%20Studio%20Code-0078d4.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white' },
    { name: 'OpenCV', badge: 'https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white' },
    { name: 'AWS', badge: 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white' },
    { name: 'Firebase', badge: 'https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase' }
  ]
};

const focusAreas = [
  'Software Engineering',
  'Machine Learning', 
  'Software Architecture',
  'Scalable Systems',
  'Backend Development',
  'Cloud Computing'
];

const About: React.FC = () => {
  return (
    <section id="about">
      <h1 className="title page-top">About Me</h1>
      
      {/* Personal Introduction */}
      <div className="about-containers">
        <div className="details-container glassmorphism-card desc">
          <p>
            I'm a Computer Science student at the University of British Columbia with a focus 
            on Software Engineering and Machine Learning. I have experience in backend 
            engineering, machine learning, and full-stack development. I'm 
            especially interested in scalable systems, data-driven products, and applying 
            machine learning in production environments.
          </p>
        </div>
      </div>

      {/* Education - Below Description */}
      <div className="education-section">
        <div className="education-text">
          <h3>University of British Columbia</h3>
          <p>B.Sc. Computer Science, Software Engineering Option</p>
          <p className="graduation-date">Expected Graduation: Dec 2026</p>
        </div>
      </div>

      {/* Focus Areas - Pills */}
      <div className="focus-areas-section">
        <h2 className="section-heading">Areas of Interest</h2>
        <div className="focus-areas-container">
          {focusAreas.map((area, index) => (
            <div key={index} className="focus-pill glassmorphism-card">
              {area}
            </div>
          ))}
        </div>
      </div>

      {/* Technical Skills - 3 Columns */}
      <div className="skills-section">
        <h2 className="section-heading">Technical Skills</h2>
        <div className="skills-grid">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="details-container glassmorphism-card skill">
              <h3 className="skill-category-title">{category}</h3>
              <div className="skill-badges">
                {skills.map((skill) => (
                  <img 
                    key={skill.name}
                    src={skill.badge} 
                    alt={skill.name} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 