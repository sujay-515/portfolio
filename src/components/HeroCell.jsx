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
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          → download resume
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
