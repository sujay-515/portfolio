import React from 'react';
import NotebookCell from './NotebookCell';
import SyntaxHighlighter from './SyntaxHighlighter';

export default function ContactCell({ isRunning }) {
  const code = `def contact_me():
    return ["email", "github", "linkedin"]

contact_me()`;

  const output = (
    <div>
      <div className="github-chart-container">
        <img
          src="https://ghchart.rshah.org/4A55C4/sujay-515"
          alt="GitHub contribution graph for sujay-515"
          className="github-chart"
          loading="lazy"
        />
      </div>
      <div className="contact-buttons">
        <a
          href="mailto:sujaypandey345@gmail.com"
          className="btn btn-primary"
        >
          → email me
        </a>
        <a
          href="https://github.com/sujay-515"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          → GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/sujay-pandey-abba85369/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          → LinkedIn
        </a>
      </div>
    </div>
  );

  return (
    <NotebookCell
      inNumber={8}
      outNumber={8}
      inputContent={<SyntaxHighlighter code={code} />}
      outputContent={output}
      outputFilled={true}
      outputTransparent={false}
      isRunning={isRunning}
    />
  );
}
