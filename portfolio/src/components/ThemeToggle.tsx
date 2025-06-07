import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' || 'auto';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    const root = document.documentElement;
    
    if (newTheme === 'auto') {
      root.classList.remove('light-mode', 'dark-mode');
    } else if (newTheme === 'light') {
      root.classList.remove('dark-mode');
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
      root.classList.add('dark-mode');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return '○';
      case 'dark':
        return '●';
      default:
        return '◐';
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      default:
        return 'Auto';
    }
  };

  return (
    <div className="theme-toggle">
      <button onClick={toggleTheme} className="theme-toggle-btn">
        <span className="theme-icon">{getIcon()}</span>
        <span className="theme-label">{getLabel()}</span>
      </button>
    </div>
  );
};

export default ThemeToggle; 