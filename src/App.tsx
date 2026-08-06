import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Github, Linkedin, FileCode, BookOpen, GraduationCap, ArrowDown, ArrowUpRight, Code, Database, Box, Layers, Building, Atom, Cloud, Server, Terminal, Bot, Activity, Workflow, Braces } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatedBackground } from './components/AnimatedBackground';
import { BackToTop } from './components/BackToTop';

const BlogPost = lazy(() => import('./pages/BlogPost').then(module => ({ default: module.BlogPost })));

const projects = [
  { title: 'Caribou', image: 'images/Caribou.png', description: 'A framework for running and deploying complex serverless workflows, multi-constraint and multi-objective aware, across hyper-scalers and regions.', github: 'https://github.com/ubc-cirrus-lab/caribou', demo: 'https://cirrus.ece.ubc.ca/papers/sosp24_caribou.pdf' },
  { title: 'modyn', image: 'images/Modyn.png', description: 'A research platform for training ML models on dynamic datasets.', github: 'https://github.com/eth-easl/modyn', demo: 'https://systems.ethz.ch/research/blog/modyn.html' },
  { title: 'Mixtera', image: 'images/mixtera.png', description: 'An open-source data-centric training data plane for modern LLM/VLM training.', github: 'https://github.com/eth-easl/mixtera', demo: 'https://github.com/eth-easl/mixtera/blob/main/examples/torchtitan.md' },
  { title: 'vitrivr', image: 'images/vitrivr.png', description: 'An open-source, full-stack content-based multimedia retrieval system focused on video.', github: 'https://github.com/vitrivr', demo: 'https://vitrivr.org/vitrivr.html' },
  { title: 'RamDoc', image: 'images/RamDoc.png', description: 'A local, encrypted macOS application for Swiss patient record management with AES-256-GCM encryption, Swiss healthcare standards, and on-device LLM integration.', github: 'https://github.com/vGsteiger/RamDoc', demo: 'https://github.com/vGsteiger/RamDoc/releases' },
];

const stack = [
  { name: 'OpenCode', icon: <Code /> }, { name: 'Codex', icon: <Bot /> }, { name: 'Claude Code', icon: <Braces /> }, { name: 'Terminal', icon: <Terminal /> }, { name: 'Langfuse', icon: <Activity /> }, { name: 'MCP', icon: <Workflow /> },
  { name: 'Python', icon: <Code /> }, { name: 'TypeScript', icon: <FileCode /> }, { name: 'SQL', icon: <Database /> }, { name: 'Docker', icon: <Box /> }, { name: 'Kubernetes', icon: <Layers /> }, { name: 'Terraform', icon: <Building /> }, { name: 'Foundry', icon: <Server /> }, { name: 'React', icon: <Atom /> }, { name: 'GCP', icon: <Cloud /> }, { name: 'AWS', icon: <Cloud /> },
];

const papers = [
  { name: 'Evaluating Algorithms for Temporal Queries in Ad-Hoc Video Retrieval', year: 2021, type: 'Bachelor Thesis', link: 'https://dbis.dmi.unibas.ch/teaching/studentprojects/evaluating-algorithms-for-temporal-queries-in-ad-hoc-video-retrieval/Thesis.pdf' },
  { name: 'Interactive video retrieval evaluation at a distance: comparing sixteen interactive video search systems in a remote setting at the 10th video browser showdown', year: 2022, type: 'Paper', link: 'https://link.springer.com/article/10.1007/s13735-021-00225-2' },
  { name: 'Multi-modal interactive video retrieval with temporal queries', year: 2022, type: 'Paper', link: 'https://www.zora.uzh.ch/id/eprint/217472/1/VBS22_vitrivr.pdf' },
  { name: 'Towards a platform and benchmark suite for model training on dynamic datasets', year: 2023, type: 'Paper', link: 'https://dl.acm.org/doi/pdf/10.1145/3578356.3592585' },
  { name: 'Modyn: A Platform for Model Training on Dynamic Datasets With Sample-Level Data Selection', year: 2023, type: 'Paper', link: 'https://arxiv.org/pdf/2312.06254' },
  { name: 'Holistically Optimizing Geospatial Serverless Workflow Deployment for Sustainable Computing', year: 2024, type: 'Master Thesis', link: 'https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/695846/Gsteiger_Viktor.pdf' },
  { name: 'Caribou: Fine-Grained Geospatial Shifting of Serverless Applications for Sustainability', year: 2024, type: 'Paper', link: 'https://cirrus.ece.ubc.ca/papers/sosp24_caribou.pdf' },
  { name: 'Modyn: Data-Centric Machine Learning Pipeline Orchestration', year: 2024, type: 'Paper', link: 'https://www.mboether.com/assets/pdf/bother2025modyn.pdf' },
  { name: 'Mixtera: A Data Plane for Foundation Model Training', year: 2025, type: 'Paper', link: 'https://arxiv.org/pdf/2502.19790' },
];

const folios = [
  { number: '00', label: 'Personal index' },
  { number: '01', label: 'Field practice' },
  { number: '02', label: 'Selected work' },
  { number: '03', label: 'Research index' },
  { number: '04', label: 'Working set' },
];

function Home() {
  const [activeFolio, setActiveFolio] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [scrollTurn, setScrollTurn] = useState<{ number: string; label: string; direction: 'forward' | 'back' } | null>(null);
  const touchStart = useRef<{ x: number; y: number; atTop: boolean; atBottom: boolean } | null>(null);
  const openFolio = useCallback((nextIndex: number) => {
    if (isTurning || nextIndex === activeFolio || nextIndex < 0 || nextIndex >= folios.length) return;
    const target = folios[nextIndex];
    setIsTurning(true);
    setScrollTurn({ number: target.number, label: target.label, direction: nextIndex > activeFolio ? 'forward' : 'back' });
    window.setTimeout(() => {
      setActiveFolio(nextIndex);
      window.requestAnimationFrame(() => document.querySelector<HTMLElement>('.folio-page.is-active')?.scrollTo({ top: 0 }));
    }, 1500);
    window.setTimeout(() => { setScrollTurn(null); setIsTurning(false); }, 2300);
  }, [activeFolio, isTurning]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (isTurning) {
        event.preventDefault();
        return;
      }
      if (Math.abs(event.deltaY) < 4) return;
      const currentPage = document.querySelector<HTMLElement>('.folio-page.is-active');
      if (!currentPage) return;
      const atTop = currentPage.scrollTop <= 2;
      const atBottom = currentPage.scrollTop + currentPage.clientHeight >= currentPage.scrollHeight - 2;
      if (event.deltaY > 0 && atBottom && activeFolio < folios.length - 1) {
        event.preventDefault();
        openFolio(activeFolio + 1);
      }
      if (event.deltaY < 0 && atTop && activeFolio > 0) {
        event.preventDefault();
        openFolio(activeFolio - 1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeFolio, isTurning, openFolio]);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || isTurning) {
        touchStart.current = null;
        return;
      }

      const currentPage = document.querySelector<HTMLElement>('.folio-page.is-active');
      if (!currentPage) return;

      const touch = event.touches[0];
      touchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        atTop: currentPage.scrollTop <= 2,
        atBottom: currentPage.scrollTop + currentPage.clientHeight >= currentPage.scrollHeight - 2,
      };
    };

    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start || event.changedTouches.length !== 1 || isTurning) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;
      const isVerticalSwipe = Math.abs(deltaY) >= 56 && Math.abs(deltaY) > Math.abs(deltaX) * 1.25;
      if (!isVerticalSwipe) return;

      if (deltaY < 0 && start.atBottom && activeFolio < folios.length - 1) {
        openFolio(activeFolio + 1);
      } else if (deltaY > 0 && start.atTop && activeFolio > 0) {
        openFolio(activeFolio - 1);
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeFolio, isTurning, openFolio]);

  return <>
    <a href="#projects" className="skip-to-content">Skip to content</a>
    {scrollTurn && <PageTurn number={scrollTurn.number} label={scrollTurn.label} direction={scrollTurn.direction} />}
    <header className="site-header">
      <button className="wordmark" onClick={() => openFolio(0)} aria-label="Viktor Gsteiger, home">VG<span>—</span>01</button>
      <nav aria-label="Primary navigation">
        <button onClick={() => openFolio(2)}>Work</button>
        <button onClick={() => openFolio(3)}>Research</button>
        <button onClick={() => openFolio(4)}>Tools</button>
      </nav>
      <span className="header-status"><i /> Available for difficult problems</span>
    </header>
    <main className="folio-deck">
      <section id="top" className={`hero folio-page ${activeFolio === 0 ? 'is-active' : ''}`} aria-labelledby="page-title">
        <p className="eyebrow">Forward-deployed engineering / 47.3744° N, 8.5411° E</p>
        <div className="hero-copy">
          <h1 id="page-title">Viktor<br />Gsteiger<span className="signal-dot">.</span></h1>
          <p className="hero-intro">Forward-deployed engineer and systems builder—working with customers, people, and intelligent machines to turn difficult work into useful systems.</p>
        </div>
        <div className="hero-ledger" aria-label="Roles">
          <span>01 / Customer-side builder</span><span>02 / Humans × machines</span><span>03 / Agentic systems</span><span>04 / Systems research</span>
        </div>
        <div className="hero-footer">
          <div className="social-links" aria-label="Elsewhere">
            <a href="https://www.linkedin.com/in/viktor-gsteiger/" target="_blank" rel="noopener noreferrer"><Linkedin /> LinkedIn</a>
            <a href="https://github.com/vGsteiger" target="_blank" rel="noopener noreferrer"><Github /> GitHub</a>
            <a href="https://www.goodreads.com/user/show/62284336-viktor" target="_blank" rel="noopener noreferrer"><BookOpen /> Reading</a>
            <a href="https://orcid.org/0000-0002-6750-5500" target="_blank" rel="noopener noreferrer"><GraduationCap /> ORCID</a>
          </div>
          <button className="scroll-cue" onClick={() => openFolio(1)}>Open index <ArrowDown /></button>
        </div>
      </section>

      <section id="practice" className={`practice-section folio-page ${activeFolio === 1 ? 'is-active' : ''}`} aria-labelledby="practice-heading">
        <div className="practice-kicker"><span>01</span><span>Field practice</span></div>
        <div className="practice-intro"><h2 id="practice-heading">Close to the work.<br /><em>Close to the people.</em></h2><p>The best systems work starts where it will be used: alongside customers, domain experts, and the teams carrying the operational reality.</p></div>
        <div className="practice-principles">
          <article><span>01 / Listen first</span><h3>Find the constraint that matters.</h3><p>Translate ambiguous, human problems into a problem a system can actually help solve.</p></article>
          <article><span>02 / Build the bridge</span><h3>Make humans and machines useful to each other.</h3><p>Design workflows that respect judgement, reveal context, and make adoption feel natural.</p></article>
          <article><span>03 / Put agents to work</span><h3>Move from capability to dependable practice.</h3><p>Connect agents, tools, and data into systems that can earn trust in the real world.</p></article>
        </div>
      </section>

      <section id="projects" className={`content-section folio-page ${activeFolio === 2 ? 'is-active' : ''}`} aria-labelledby="projects-heading">
        <SectionHeading number="02" title="Selected work" caption="Systems research, deployed software, and work shaped in the field." />
        <div className="project-grid">
          {projects.map((project, index) => <article key={project.title} className="project-card">
            <div className="project-image"><img src={project.image} alt="" loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div>
            <div className="project-content"><h3>{project.title}</h3><p>{project.description}</p><div><a href={project.github} target="_blank" rel="noopener noreferrer">Repository <ArrowUpRight /></a><a href={project.demo} target="_blank" rel="noopener noreferrer">Read more <ArrowUpRight /></a></div></div>
          </article>)}
        </div>
      </section>

      <section id="papers" className={`content-section research-section folio-page ${activeFolio === 3 ? 'is-active' : ''}`} aria-labelledby="papers-heading">
        <SectionHeading number="03" title="Research index" caption="Papers, theses, and contributions in systems research." />
        <ol className="paper-list">
          {papers.slice().reverse().map((paper, index) => <li key={paper.name}><span className="paper-number">{String(index + 1).padStart(2, '0')}</span><div><span className="paper-meta">{paper.type} / {paper.year}</span><h3>{paper.name}</h3></div><a href={paper.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${paper.name}`}><ArrowUpRight /></a></li>)}
        </ol>
      </section>

      <section id="stack" className={`content-section tools-section folio-page ${activeFolio === 4 ? 'is-active' : ''}`} aria-labelledby="stack-heading">
        <SectionHeading number="04" title="Working set" caption="Agentic workflows, observability, and the tools I return to when the job calls for them." />
        <div className="stack-grid">{stack.map((tech, index) => <div className="stack-item" key={tech.name}><span>{String(index + 1).padStart(2, '0')}</span>{tech.icon}<strong>{tech.name}</strong></div>)}</div>
        <footer><span>VG / Personal index</span><span>Built with care in the quiet hours.</span><button onClick={() => openFolio(0)}>Back to start ↑</button></footer>
      </section>
    </main>
    <nav className="mobile-folio-nav" aria-label="Page navigation">
      <button onClick={() => openFolio(activeFolio - 1)} disabled={activeFolio === 0 || isTurning} aria-label="Previous page">←</button>
      <span aria-live="polite">{folios[activeFolio].number} / {folios[activeFolio].label}</span>
      <button onClick={() => openFolio(activeFolio + 1)} disabled={activeFolio === folios.length - 1 || isTurning} aria-label="Next page">→</button>
    </nav>
  </>;
}

function SectionHeading({ number, title, caption }: { number: string; title: string; caption: string }) {
  return <div className="section-heading"><span>{number}</span><div><h2>{title}</h2><p>{caption}</p></div></div>;
}

function PageTurn({ number, label, direction }: { number: string; label: string; direction: 'forward' | 'back' }) {
  return <div className={`page-turn ${direction === 'back' ? 'page-turn--back' : ''}`} aria-hidden="true">
    <div className="page-turn-sheet">
      <div className="page-face page-front"><span>VG / Personal index</span><strong>{number}</strong><p>{label}</p></div>
      <div className="page-face page-back"><span>Turning the page</span><i /></div>
    </div>
  </div>;
}

function App() {
  return <Router><div className="site-shell"><AnimatedBackground /><BackToTop /><Routes><Route path="/" element={<Home />} /><Route path="/blog/:slug" element={<Suspense fallback={<div className="loading">Loading index…</div>}><BlogPost /></Suspense>} /></Routes></div></Router>;
}

export default App;
