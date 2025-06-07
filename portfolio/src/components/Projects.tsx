import React from 'react';
import project1Img from '../assets/Project1.png';
import project2Img from '../assets/Project2.png';

const Projects: React.FC = () => {
  return (
    <section id="projects">
      <h1 className="title page-top">My Projects</h1>
      <div className="section-container">
        <div className="experience-details-container">
          <div className="about-containers">
            <div className="project-container glassmorphism-card color-container">
              <div className="article-container">
                <img
                  src={project1Img}
                  alt="Project 1 Image"
                  className="project-img"
                />
              </div>
              <div className="proj-cont">
                <h2 className="experience-sub-title project-title">
                  Personal Website
                </h2>
                <div className="btn-container">
                  <button
                    className="btn btn-color-2 project-btn"
                    onClick={() => window.open('https://github.com/vabucci/portfolio-website')}
                  >
                    GitHub Repo
                  </button>
                </div>
              </div>
            </div>
            <div className="project-container glassmorphism-card color-container">
              <div className="article-container">
                <img
                  src={project2Img}
                  alt="Project 2 Image"
                  className="project-img"
                />
              </div>
              <div className="proj-cont">
                <h2 className="experience-sub-title project-title">
                  React Todo App
                </h2>
                <div className="btn-container">
                  <button
                    className="btn btn-color-2 project-btn"
                    onClick={() => window.open('https://todo-list-498fe.web.app')}
                  >
                    Website
                  </button>
                  <button
                    className="btn btn-color-1"
                    onClick={() => window.open('https://github.com/vabucci/todo')}
                  >
                    GitHub Repo
                  </button>
                </div>
              </div>
            </div>
            {/*
            <div className="project-container color-container">
              <div className="article-container">
                <img
                  src="/assets/assets/"
                  alt="Project 1 Image"
                  className="project-img"
                />
              </div>
              <h2 className="experience-sub-title project-title">
                Project Three (Coming Soon)
              </h2>
              <div className="btn-container">
                <button
                  className="btn btn-color-2 project-btn"
                  onClick={() => window.location.href='https://github.com/vabucci'}
                >
                  GitHub Repo
                </button>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 