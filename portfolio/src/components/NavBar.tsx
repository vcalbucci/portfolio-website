import React, { useState, useEffect, useRef, useCallback } from 'react';

const sections = [
  { id: 'home', label: 'Home', href: '#' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
];

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLUListElement>(null);

  const updateIndicatorPosition = useCallback(() => {
    if (navRef.current && scrolled) {
      const activeIndex = sections.findIndex(section => section.id === activeSection);
      const activeLink = navRef.current.children[activeIndex]?.querySelector('a') as HTMLElement;
      
      if (activeLink) {
        const rect = activeLink.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        setIndicatorStyle({
          left: rect.left - navRect.left,
          width: rect.width
        });
      }
    }
  }, [scrolled, activeSection]);

  useEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = 'home';
      
      for (const section of sections) {
        if (section.id !== 'home') {
          const el = document.getElementById(section.id);
          if (el && el.offsetTop - 100 <= scrollY) {
            current = section.id;
          }
        }
      }
      
      setActiveSection(current);
      setScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateIndicatorPosition);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateIndicatorPosition);
    };
  }, [updateIndicatorPosition]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const NavLinks = () => (
    <>
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={section.href}
            className={scrolled && activeSection === section.id ? 'active' : ''}
            onClick={e => handleNavClick(e, section.id)}
          >
            {section.label}
          </a>
        </li>
      ))}
    </>
  );

  return (
    <div className="navbar-container">
      <nav id="desktop-nav" className={`rounded-navbar${scrolled ? '' : ' transparent-navbar'}`}>
        <div style={{ position: 'relative' }}>
          <ul className="nav-links" ref={navRef}>
            <NavLinks />
          </ul>
          {scrolled && (
            <div 
              className="nav-indicator"
              style={indicatorStyle}
            />
          )}
        </div>
      </nav>
      <nav id="hamburger-nav" className={`rounded-navbar${scrolled ? '' : ' transparent-navbar'}`}>
        <div className="hamburger-menu">
          <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`menu-links${menuOpen ? ' open' : ''}`}> 
            <NavLinks />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar; 