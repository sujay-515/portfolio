import React from 'react';

export default function NotebookCell({ 
  inNumber, 
  outNumber, 
  inputContent, 
  outputContent, 
  outputFilled = true, 
  outputTransparent = false,
  eyebrow = null,
  isRunning = false
}) {
  return (
    <section className="cell-block">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      
      {/* Input Row */}
      {inputContent && (
        <div className="cell-row input-row">
          <div className={`prompt-label in ${isRunning ? 'active' : ''}`}>
            In [{isRunning ? '*' : (inNumber || ' ')}]:
          </div>
          <div className="cell-content">
            {inputContent}
          </div>
        </div>
      )}

      {/* Output Row */}
      {outputContent && (
        <div className="cell-row output-row">
          <div className="prompt-label out">
            {outNumber ? `Out[${outNumber}]:` : ''}
          </div>
          <div className="cell-content">
            <div className={`output-area ${outputTransparent ? 'transparent' : ''} ${outputFilled && !outputTransparent ? 'filled' : ''}`}>
              {outputContent}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
