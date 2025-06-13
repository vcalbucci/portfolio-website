import React, { useState, useEffect } from 'react';
import project1Img from '../assets/Project1.png';
import project1DarkImg from '../assets/Project1Dark.png';
import project2Img from '../assets/Project2.png';
import project3Img from '../assets/Project3.png';

interface ProjectData {
  title: string;
  image: string;
  buttons: {
    text: string;
    url: string;
    variant: 'primary' | 'secondary';
  }[];
}

const Projects: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const rootElement = document.documentElement;
      const hasManualTheme = rootElement.classList.contains('light-mode') || rootElement.classList.contains('dark-mode');
      
      if (hasManualTheme) {
        setIsDarkMode(rootElement.classList.contains('dark-mode'));
      } else {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };

    checkTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      checkTheme();
    };

    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  const projects: ProjectData[] = [
    {
      title: "Personal Website",
      image: isDarkMode ? project1Img : project1DarkImg,
      buttons: [
        {
          text: "GitHub Repo",
          url: "https://github.com/vabucci/portfolio-website",
          variant: "primary"
        }
      ]
    },
    {
      title: "HTTP Server from Scratch",
      image: project3Img,
      buttons: [
        {
          text: "GitHub Repo",
          url: "https://github.com/vcalbucci/java-http-server",
          variant: "primary"
        }
      ]
    },
    {
      title: "React Todo App",
      image: project2Img,
      buttons: [
        {
          text: "Website",
          url: "https://todo-list-498fe.web.app",
          variant: "secondary"
        },
        {
          text: "GitHub Repo",
          url: "https://github.com/vabucci/todo",
          variant: "primary"
        }
      ]
    }
  ];

  return (
    <section id="projects">
      <h1 className="title page-top">My Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card glassmorphism-card">
            <div className="project-image-container">
              <img
                src={project.image}
                alt={`${project.title} Image`}
                className={`project-img ${project.title === "HTTP Server from Scratch" ? "project3-img" : ""}`}
              />
            </div>
            <div className="project-content">
              <h2 className="project-title">{project.title}</h2>
              <div className="project-buttons">
                {project.buttons.map((button, buttonIndex) => (
                  <button
                    key={buttonIndex}
                    className={`btn ${button.variant === 'primary' ? 'btn-color-1' : 'btn-color-2'} project-btn`}
                    onClick={() => window.open(button.url)}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects; 