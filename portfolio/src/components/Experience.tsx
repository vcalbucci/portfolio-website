import React from 'react';
import experienceImg from '../assets/experience.png';
import educationImg from '../assets/education.png';

interface ExperienceEntry {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
}

interface EducationEntry {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  details: string[];
}

const Experience: React.FC = () => {
  const workExperience: ExperienceEntry[] = [
    {
      company: "Company Name",
      position: "Software Developer Intern",
      duration: "Summer 2025",
      location: "City, Province",
      description: [
        "• Description of responsibilities and achievements",
        "• Another key accomplishment or project",
        "• Technical challenges solved or systems improved"
      ],
      technologies: ["React", "TypeScript", "Node.js", "AWS"]
    }
  ];

  const education: EducationEntry[] = [
    {
      institution: "University of British Columbia",
      degree: "B.Sc. Computer Science, Software Engineering Option",
      duration: "2023 - 2026",
      location: "Vancouver, BC",
      details: [
        "• Expected Graduation: December 2026",
        "• Focus: Software Engineering and Machine Learning",
        "• Relevant Coursework: Data Structures, Algorithms, Software Design"
      ]
    }
  ];

  return (
    <section id="experience">
      <h1 className="title page-top">Experience</h1>
      <div className="section-container">
        
        <div className="experience-category">
          <div className="category-header">
            <img
              src={experienceImg}
              alt="Work Experience Icon"
              className="icon"
            />
            <h2>Work Experience</h2>
          </div>
          
          <div className="experience-list">
            {workExperience.map((exp, index) => (
              <div key={index} className="experience-item glassmorphism-card">
                <div className="experience-header">
                  <div className="experience-title">
                    <h3>{exp.position}</h3>
                    <h4>{exp.company}</h4>
                  </div>
                  <div className="experience-meta">
                    <span className="duration">{exp.duration}</span>
                    <span className="location">{exp.location}</span>
                  </div>
                </div>
                <div className="experience-content">
                  <div className="description">
                    {exp.description.map((desc, i) => (
                      <p key={i}>{desc}</p>
                    ))}
                  </div>
                  <div className="technologies">
                    <strong>Technologies:</strong>
                    <div className="tech-tags">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="experience-category">
          <div className="category-header">
            <img
              src={educationImg}
              alt="Education Icon"
              className="icon"
            />
            <h2>Education</h2>
          </div>
          
          <div className="experience-list">
            {education.map((edu, index) => (
              <div key={index} className="experience-item glassmorphism-card">
                <div className="experience-header">
                  <div className="experience-title">
                    <h3>{edu.degree}</h3>
                    <h4>{edu.institution}</h4>
                  </div>
                  <div className="experience-meta">
                    <span className="duration">{edu.duration}</span>
                    <span className="location">{edu.location}</span>
                  </div>
                </div>
                <div className="experience-content">
                  <div className="description">
                    {edu.details.map((detail, i) => (
                      <p key={i}>{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience; 