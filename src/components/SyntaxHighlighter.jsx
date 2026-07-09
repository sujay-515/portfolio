import React from 'react';

function highlightPython(code) {
  const rules = [
    { type: 'comment', regex: /^(?:"""[\s\S]*?"""|#.*)/ },
    { type: 'string', regex: /^(?:"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/ },
    { type: 'keyword', regex: /^\b(def|return|import|from|class|if|else|elif|for|in|and|or|not|is|lambda)\b/ },
    { type: 'boolean', regex: /^\b(True|False|None)\b/ },
    { type: 'number', regex: /^\b\d+(?:\.\d+)?\b/ },
    { type: 'def-name', regex: /^([a-zA-Z_]\w*)/ }
  ];

  let html = [];
  let remaining = code;
  let isDefPending = false;

  while (remaining.length > 0) {
    // 1. Match comments
    const commentMatch = remaining.match(rules[0].regex);
    if (commentMatch && commentMatch.index === 0) {
      const text = commentMatch[0];
      html.push(<span key={html.length} className="token comment">{text}</span>);
      remaining = remaining.substring(text.length);
      continue;
    }

    // 2. Match strings
    const stringMatch = remaining.match(rules[1].regex);
    if (stringMatch && stringMatch.index === 0) {
      const text = stringMatch[0];
      html.push(<span key={html.length} className="token string">{text}</span>);
      remaining = remaining.substring(text.length);
      continue;
    }

    // 3. Match keywords
    const keywordMatch = remaining.match(rules[2].regex);
    if (keywordMatch && keywordMatch.index === 0) {
      const text = keywordMatch[0];
      html.push(<span key={html.length} className="token keyword">{text}</span>);
      remaining = remaining.substring(text.length);
      if (text === 'def') {
        isDefPending = true;
      }
      continue;
    }

    // 4. Match booleans/None
    const booleanMatch = remaining.match(rules[3].regex);
    if (booleanMatch && booleanMatch.index === 0) {
      const text = booleanMatch[0];
      html.push(<span key={html.length} className="token keyword">{text}</span>);
      remaining = remaining.substring(text.length);
      continue;
    }

    // 5. Match numbers
    const numberMatch = remaining.match(rules[4].regex);
    if (numberMatch && numberMatch.index === 0) {
      const text = numberMatch[0];
      html.push(<span key={html.length} className="token number">{text}</span>);
      remaining = remaining.substring(text.length);
      continue;
    }

    // 6. Match identifiers (especially function names after def)
    const identifierMatch = remaining.match(rules[5].regex);
    if (identifierMatch && identifierMatch.index === 0) {
      const text = identifierMatch[0];
      if (isDefPending) {
        html.push(<span key={html.length} className="token def">{text}</span>);
        isDefPending = false;
      } else {
        html.push(text);
      }
      remaining = remaining.substring(text.length);
      continue;
    }

    // 7. Match whitespace or other characters
    const nextChar = remaining.charAt(0);
    if (nextChar === ' ' || nextChar === '\n' || nextChar === '\t') {
      if (nextChar !== ' ') {
        isDefPending = false;
      }
    } else {
      isDefPending = false;
    }
    
    html.push(nextChar);
    remaining = remaining.substring(1);
  }

  return <>{html}</>;
}

function highlightShell(code) {
  const lines = code.split('\n');
  return (
    <>
      {lines.map((line, idx) => {
        if (line.startsWith('$ ')) {
          const parts = line.substring(2).split(' ');
          const cmd = parts[0];
          const args = parts.slice(1).join(' ');
          return (
            <div key={idx}>
              <span className="token comment">$ </span>
              <span className="token keyword">{cmd}</span>
              {args ? ` ${args}` : ''}
            </div>
          );
        }
        return <div key={idx}>{line}</div>;
      })}
    </>
  );
}

export default function SyntaxHighlighter({ code, language = 'python' }) {
  return (
    <pre className="code-area">
      {language === 'shell' ? highlightShell(code) : highlightPython(code)}
    </pre>
  );
}
