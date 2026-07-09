import React from 'react';
import NotebookCell from './NotebookCell';
import SyntaxHighlighter from './SyntaxHighlighter';

export default function SkillsCell({ isRunning }) {
  const code = `$ pip list --group`;

  const skillsData = [
    {
      category: "Machine Learning",
      items: ["python", "pandas", "scikit-learn"]
    },
    {
      category: "Core Languages",
      items: ["c / c++", "java"]
    },
    {
      category: "Web / Tools",
      items: ["javascript", "html / css", "sql", ".net"]
    }
  ];

  const output = (
    <div className="pip-list-container">
      <div className="pip-columns">
        {skillsData.map((col, idx) => (
          <div className="pip-column" key={idx}>
            <h3 className="pip-header">{col.category}</h3>
            <ul className="pip-items">
              {col.items.map((item, itemIdx) => (
                <li className="pip-item" key={itemIdx}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pip-learning-note token comment">
        # currently installing: transformers, deep learning fundamentals
      </div>
    </div>
  );

  return (
    <NotebookCell
      inNumber={6}
      outNumber={6}
      inputContent={<SyntaxHighlighter code={code} language="shell" />}
      outputContent={output}
      outputFilled={true}
      isRunning={isRunning}
    />
  );
}
