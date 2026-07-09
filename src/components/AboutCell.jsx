import React from 'react';
import NotebookCell from './NotebookCell';
import SyntaxHighlighter from './SyntaxHighlighter';

export default function AboutCell({ isRunning }) {
  const code = `""" About me — rendered below. """`;

  const output = (
    <div className="prose-text">
      <p>
        I'm in my final (8th) semester of BSc. CSIT, where the coursework built a foundation in C, C++, Java, JavaScript, .NET, SQL and databases. Outside of that, I've been teaching myself Python and ML/AI.
      </p>
      <p>
        Focused right now on building small end-to-end ML projects — data handling, model building, and evaluation — starting with a movie recommendation system.
      </p>
    </div>
  );

  return (
    <NotebookCell
      inNumber={2}
      outNumber={2}
      inputContent={<SyntaxHighlighter code={code} />}
      outputContent={output}
      outputFilled={true}
      outputTransparent={false}
      isRunning={isRunning}
    />
  );
}
