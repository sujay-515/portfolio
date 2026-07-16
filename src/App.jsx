import React, { useState, useEffect, useRef, useCallback } from 'react';
import ChromeBar from './components/ChromeBar';
import HeroCell from './components/HeroCell';
import AboutCell from './components/AboutCell';
import ProjectCell from './components/ProjectCell';
import SkillsCell from './components/SkillsCell';
import CertificationsCell from './components/CertificationsCell';
import TerminalCell from './components/TerminalCell';
import ContactCell from './components/ContactCell';

const projectsData = [
  {
    id: 1,
    inNumber: 3,
    outNumber: 3,
    eyebrow: "projects/",
    pythonCode: `project_1 = Project(
    name="Movie-Recommendation-Engine",
    type="content-based recommendation system",
    stack=["pandas", "scikit-learn"],
    status="completed"
)
project_1.display()`,
    title: "Movie-Recommendation-Engine — content-based movie recommendation system.",
    description: "Movie-Recommendation-Engine — Full-stack movie recommender (FastAPI + React) using precomputed sentence-transformer embeddings (all-MiniLM-L6-v2), vectorized cosine similarity, fractional genre-overlap scoring, and a logarithmic popularity weight — across a 49k-title TMDB dataset. Includes typo-tolerant search and a 30-test suite.",
    repoUrl: "https://github.com/sujay-515/Movie-Recommendation-Engine",
    demoUrl: "#",
  },
  {
    id: 2,
    inNumber: 4,
    outNumber: 4,
    pythonCode: `project_2 = Project(
    name="Sirupata-farm-house",
    type="Django-based hotel web application",
    stack=["Django", "MySQL", "TextBlob"],
    status="completed"
)
project_2.display()`,
    title: "Sirupata-farm-house — Django-based hotel website with ML recommendations.",
    description: "A Django-based hotel website for Sirupata Farm House, featuring room bookings, review sentiment analysis (TextBlob), and content-based room recommendations (TF-IDF + Cosine Similarity).",
    repoUrl: "https://github.com/sujay-515/Sirupata-farm-house",
    demoUrl: "#",
  },
  {
    id: 3,
    inNumber: 5,
    outNumber: 5,
    pythonCode: `project_3 = Project(
    name="house-price-predictor",
    type="housing market regression analysis",
    stack=["pandas", "scikit-learn", "matplotlib"],
    status="in_progress"
)
project_3.display()`,
    title: "house-price-predictor — California housing data regression analysis.",
    description: "Predicts median house values using multiple regression and random forest models. Built in Python with scikit-learn, pandas, and matplotlib.",
    repoUrl: "https://github.com/sujay-515",
    demoUrl: "#",
  }
];

function App() {
  const [activeExecution, setActiveExecution] = useState({});
  const [triggeredCells, setTriggeredCells] = useState({});
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    if (isTerminalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isTerminalOpen]);

  const queueRef = useRef([]);
  const processingRef = useRef(false);
  const triggeredRef = useRef(new Set());

  const processQueue = useCallback(() => {
    if (processingRef.current || queueRef.current.length === 0) return;
    processingRef.current = true;

    const nextCellId = queueRef.current.shift();

    // Trigger this cell's flash
    setActiveExecution(prev => ({ ...prev, [nextCellId]: true }));
    setTriggeredCells(prev => ({ ...prev, [nextCellId]: true }));
    setTimeout(() => {
      setActiveExecution(prev => ({ ...prev, [nextCellId]: false }));
    }, 700);

    // Stagger the next one in the queue by 150ms
    setTimeout(() => {
      processingRef.current = false;
      processQueue();
    }, 150);
  }, []);

  const triggerCell = useCallback((cellId) => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (triggeredRef.current.has(cellId)) return;
    triggeredRef.current.add(cellId);

    queueRef.current.push(cellId);
    processQueue();
  }, [processQueue]);

  useEffect(() => {
    // Setup delay of 400ms after load to handle cells already above fold (e.g. Hero cell)
    const timer = setTimeout(() => {
      const isMobile = window.innerWidth <= 600;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const cellId = parseInt(entry.target.dataset.cellId, 10);
              if (cellId) {
                triggerCell(cellId);
              }
            }
          });
        },
        {
          threshold: isMobile ? 0.1 : 0.2,
          rootMargin: isMobile ? '0px 0px -40% 0px' : '0px'
        }
      );

      const cellElements = document.querySelectorAll('[data-cell-id]');
      cellElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 150);

    return () => clearTimeout(timer);
  }, [triggerCell]);

  return (
    <>
      <ChromeBar />
      <main className="notebook-container">
        <div data-cell-id="1" className={triggeredCells[1] ? "cell-triggered" : ""}>
          <HeroCell isRunning={!!activeExecution[1]} />
        </div>

        <div id="about" data-cell-id="2" className={triggeredCells[2] ? "cell-triggered" : ""}>
          <AboutCell isRunning={!!activeExecution[2]} />
        </div>

        <div id="projects">
          {projectsData.map((project) => (
            <div
              key={project.id}
              data-cell-id={project.inNumber}
              className={triggeredCells[project.inNumber] ? "cell-triggered" : ""}
            >
              <ProjectCell
                project={project}
                isRunning={!!activeExecution[project.inNumber]}
              />
            </div>
          ))}
        </div>

        <div id="skills" data-cell-id="6" className={triggeredCells[6] ? "cell-triggered" : ""}>
          <SkillsCell isRunning={!!activeExecution[6]} />
        </div>

        <div id="certifications" data-cell-id="7" className={triggeredCells[7] ? "cell-triggered" : ""}>
          <CertificationsCell isRunning={!!activeExecution[7]} />
        </div>

        <div id="contact" data-cell-id="8" className={triggeredCells[8] ? "cell-triggered" : ""}>
          <ContactCell isRunning={!!activeExecution[8]} />
        </div>
      </main>
      <TerminalCell isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="floating-terminal-btn"
        aria-label="Open terminal"
      >
        &gt;_
      </button>
    </>
  );
}

export default App;
