import React, { useState, useEffect, useRef } from 'react';

export default function TerminalCell({ isOpen, onClose }) {
  const [history, setHistory] = useState(["Type 'help' to see available commands"]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [tempInput, setTempInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const closeButtonRef = useRef(null);
  const historyContainerRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousActiveElement = document.activeElement;
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    };
  }, [isOpen]);

  const getFocusableElements = () => {
    if (!modalRef.current) return [];

    return Array.from(
      modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.disabled && element.getAttribute('aria-hidden') !== 'true');
  };

  const handleModalKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusable = getFocusableElements();
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const currentIndex = focusable.indexOf(document.activeElement);
    const nextIndex = e.shiftKey
      ? (currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1)
      : (currentIndex === -1 || currentIndex === focusable.length - 1 ? 0 : currentIndex + 1);

    focusable[nextIndex].focus();
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleGlobalFocus = (e) => {
      if (!modalRef.current || modalRef.current.contains(e.target)) return;
      inputRef.current?.focus();
    };

    document.addEventListener('focusin', handleGlobalFocus);
    return () => document.removeEventListener('focusin', handleGlobalFocus);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (historyIndex === -1) {
      setTempInput(e.target.value);
    }
  };

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, "$"]);
      return;
    }

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newHistory = [...history, `$ ${trimmed}`];
    const commandLower = trimmed.toLowerCase();

    if (commandLower === 'help') {
      newHistory.push(
        "help            - Show this list of available commands",
        "whoami          - Display my name, role, and tagline",
        "skills          - Display key technical skills by category",
        "education       - Display educational credentials",
        "contact         - Show email, github, and linkedin profiles",
        "sudo hire-me    - Trigger automatic contact redirection",
        "clear           - Clear terminal screen output history"
      );
    } else if (commandLower === 'whoami') {
      newHistory.push(
        "Sujay Pandey",
        "Role: Aspiring ML Engineer",
        "Tagline: Aspiring ML Engineer · CSIT Student"
      );
    } else if (commandLower === 'skills') {
      newHistory.push(
        "Machine Learning: python, pandas, scikit-learn",
        "Core Languages:   c / c++, java",
        "Web / Tools:      javascript, html / css, sql, .net"
      );
    } else if (commandLower === 'education') {
      newHistory.push(
        "BSc. CSIT, Lumbini City College (affiliated with Tribhuvan University), 2022–2026"
      );
    } else if (commandLower === 'contact') {
      newHistory.push(
        "Email:    sujaypandey345@gmail.com",
        "GitHub:   https://github.com/sujay-515",
        "LinkedIn: https://www.linkedin.com/in/sujay-pandey-abba85369/"
      );
    } else if (commandLower === 'sudo hire-me') {
      newHistory.push("Permission granted. Redirecting to contact()...");
      setHistory(newHistory);
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 250);
      }, 800);
      return;
    } else if (commandLower === 'clear') {
      setHistory([]);
      return;
    } else {
      newHistory.push(`command not found: ${trimmed}. Type 'help' for available commands.`);
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
      setInputValue('');
      setTempInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      let nextIndex = historyIndex;
      if (historyIndex === -1) {
        setTempInput(inputValue);
        nextIndex = commandHistory.length - 1;
      } else if (historyIndex > 0) {
        nextIndex = historyIndex - 1;
      }

      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;

      if (historyIndex === commandHistory.length - 1) {
        setInputValue(tempInput);
        setHistoryIndex(-1);
      } else {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="terminal-modal-overlay" 
      onClick={handleOverlayClick}
      onKeyDown={handleModalKeyDown}
    >
      <div
        className="terminal-window"
        ref={modalRef}
        onClick={focusInput}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terminal-modal-title"
      >
        <div className="terminal-header">
          <div className="chrome-dots">
            <button 
              ref={closeButtonRef}
              className="chrome-dot red focusable-close" 
              onClick={onClose} 
              aria-label="Close terminal"
              title="Close (Esc)"
            ></button>
            <span className="chrome-dot yellow" aria-hidden="true"></span>
            <span className="chrome-dot green" aria-hidden="true"></span>
          </div>
          <div className="terminal-title" id="terminal-modal-title">bash</div>
        </div>
        <div className="terminal-body">
          <div className="terminal-history" ref={historyContainerRef}>
            {history.map((line, idx) => (
              <div key={idx} className="terminal-line">
                {line}
              </div>
            ))}
          </div>
          <div className="terminal-input-line">
            <span className="terminal-prompt">$</span>
            <div className="terminal-input-wrapper">
              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="terminal-real-input"
                aria-label="Terminal command input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <div className="terminal-fake-input">
                <span>{inputValue}</span>
                <span className={`terminal-cursor ${isFocused ? 'blinking' : 'idle'}`}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
