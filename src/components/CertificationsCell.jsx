import React from 'react';
import NotebookCell from './NotebookCell';
import SyntaxHighlighter from './SyntaxHighlighter';

export default function CertificationsCell({ isRunning }) {
  const code = `# cat certifications.json`;

  const certifications = [
    {
      name: "CS50P — Introduction to Programming with Python",
      issuer: "Harvard (CS50)",
      date: "2026",
      url: "https://certificates.cs50.io/f57c6b64-a5c1-49dd-ae95-ba4a4baeefc8.png?size=letter"
    },
    {
      name: "Pandas",
      issuer: "Kaggle",
      date: "May 21, 2026",
      url: "https://www.kaggle.com/learn/certification/sujay0515/pandas"
    }
  ];

  const output = (
    <div className="certs-container">
      {certifications.map((cert, idx) => (
        <div className="cert-row" key={idx}>
          <div className="cert-info">
            <span className="cert-name">{cert.name}</span>
            <span className="cert-issuer">{cert.issuer}</span>
            <span className="cert-date">{cert.date}</span>
          </div>
          <div className="cert-action">
            <a 
              href={cert.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link"
            >
              → verify
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <NotebookCell
      inNumber={7}
      outNumber={7}
      inputContent={<SyntaxHighlighter code={code} language="shell" />}
      outputContent={output}
      outputFilled={true}
      isRunning={isRunning}
    />
  );
}
