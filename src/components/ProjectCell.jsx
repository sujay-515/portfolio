import React from 'react';
import NotebookCell from './NotebookCell';
import SyntaxHighlighter from './SyntaxHighlighter';

export default function ProjectCell({ project, isRunning }) {
  const output = (
    <div>
      <h2 className="project-title">{project.title}</h2>
      <p className="project-desc">{project.description}</p>
      <div className="project-links">
        <a 
          href={project.repoUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project-link"
        >
          → view repo
        </a>
        {project.demoUrl && (
          <a 
            href={project.demoUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            → live demo
          </a>
        )}
      </div>
    </div>
  );

  return (
    <NotebookCell
      inNumber={project.inNumber}
      outNumber={project.outNumber}
      inputContent={<SyntaxHighlighter code={project.pythonCode} />}
      outputContent={output}
      outputFilled={true}
      outputTransparent={false}
      eyebrow={project.eyebrow}
      isRunning={isRunning}
    />
  );
}
