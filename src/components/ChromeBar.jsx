import React from 'react';

export default function ChromeBar() {
  return (
    <header className="chrome-bar" aria-label="Editor Header">
      <div className="chrome-dots" aria-hidden="true">
        <span className="chrome-dot red"></span>
        <span className="chrome-dot yellow"></span>
        <span className="chrome-dot green"></span>
      </div>
      <div className="chrome-title">portfolio.ipynb</div>
      <nav className="chrome-nav" aria-label="Jupyter Cell Navigation">
        <a href="#about" className="chrome-nav-link">[2] About</a>
        <a href="#projects" className="chrome-nav-link">[3] Projects</a>
        <a href="#skills" className="chrome-nav-link">[6] Skills</a>
        <a href="#certifications" className="chrome-nav-link">[7] Certs</a>
        <a href="#contact" className="chrome-nav-link">[8] Contact</a>
      </nav>
      <div className="chrome-status">
        <span className="chrome-status-dot" aria-hidden="true">●</span> Python 3.11.4
      </div>
    </header>
  );
}
