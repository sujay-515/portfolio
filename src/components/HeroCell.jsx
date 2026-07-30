import React from 'react';
import NotebookCell from './NotebookCell';
import SyntaxHighlighter from './SyntaxHighlighter';

export default function HeroCell({ isRunning }) {
  const code = `def whoami():
    return {
        "name": "Sujay Pandey",
        "role": "Aspiring ML Engineer",
        "status": "CSIT student, final semester",
        "education": "BSc. CSIT, Lumbini City College "
                     "(affiliated with Tribhuvan University), 2022–2026",
    }

whoami()`;

  const output = (
    <div>
      <div className="hero-name-container">
        <h1 className="hero-name">Sujay Pandey</h1>
        <span className="cursor" aria-hidden="true"></span>
      </div>
      <p className="hero-subtitle">
        Aspiring ML Engineer · CSIT Student
      </p>
      <div className="status-badge-container">
        <span className="status-dot"></span>
        <span className="status-text">Open to internship opportunities</span>
      </div>
      <div className="hero-education">
        education: BSc. CSIT, Lumbini City College (affiliated with Tribhuvan University), 2022–2026
      </div>
      <div className="tag-list">
        <span className="tag-pill">Python</span>
        <span className="tag-pill">Machine Learning</span>
        <span className="tag-pill">Scikit-learn</span>
        <span className="tag-pill">Pandas</span>
      </div>
      <div className="hero-actions">
        <a 
          href="/sujay-pandey-resume.pdf" 
          download="sujay-pandey-resume.pdf"
          className="btn btn-primary"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="btn-icon"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          download resume
        </a>
      </div>
    </div>
  );

  return (
    <NotebookCell
      inNumber={1}
      outNumber={1}
      inputContent={<SyntaxHighlighter code={code} />}
      outputContent={output}
      isRunning={isRunning}
    />
  );
}
