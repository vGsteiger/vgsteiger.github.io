import { Github, Linkedin, FileCode, BookOpen, GraduationCap, ArrowDown, ArrowUpRight, Code, Database, Box, Layers, Building, Atom, Cloud, Server, Terminal, Bot, Activity, Workflow, Braces } from 'lucide-react';
import { BackToTop } from './components/BackToTop';

const projects = [
  { title: 'Caribou', image: 'images/Caribou.png', description: 'A framework for running and deploying complex serverless workflows, multi-constraint and multi-objective aware, across hyper-scalers and regions.', github: 'https://github.com/ubc-cirrus-lab/caribou', demo: 'https://cirrus.ece.ubc.ca/papers/sosp24_caribou.pdf' },
  { title: 'modyn', image: 'images/Modyn.png', description: 'A research platform for training ML models on dynamic datasets.', github: 'https://github.com/eth-easl/modyn', demo: 'https://systems.ethz.ch/research/blog/modyn.html' },
  { title: 'Mixtera', image: 'images/mixtera.png', description: 'An open-source data-centric training data plane for modern LLM/VLM training.', github: 'https://github.com/eth-easl/mixtera', demo: 'https://github.com/eth-easl/mixtera/blob/main/examples/torchtitan.md' },
  { title: 'vitrivr', image: 'images/vitrivr.png', description: 'An open-source, full-stack content-based multimedia retrieval system focused on video.', github: 'https://github.com/vitrivr', demo: 'https://vitrivr.org/vitrivr.html' },
  { title: 'RamDoc', image: 'images/RamDoc.png', description: 'A local, encrypted macOS application for Swiss patient record management with AES-256-GCM encryption, Swiss healthcare standards, and on-device LLM integration.', github: 'https://github.com/vGsteiger/RamDoc', demo: 'https://github.com/vGsteiger/RamDoc/releases' },
];

const stack = [
  { name: 'OpenCode', icon: <Terminal /> }, { name: 'Codex', icon: <Bot /> }, { name: 'Claude Code', icon: <Braces /> }, { name: 'Langfuse', icon: <Activity /> }, { name: 'MCP', icon: <Workflow /> },
  { name: 'Python', icon: <Code /> }, { name: 'TypeScript', icon: <FileCode /> }, { name: 'SQL', icon: <Database /> }, { name: 'Docker', icon: <Box /> }, { name: 'Kubernetes', icon: <Layers /> },
  { name: 'Terraform', icon: <Building /> }, { name: 'Foundry', icon: <Server /> }, { name: 'React', icon: <Atom /> }, { name: 'GCP', icon: <Cloud /> }, { name: 'AWS', icon: <Cloud /> },
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

function SectionHeading({ number, title, caption }: { number: string; title: string; caption: string }) {
  return <div className="section-heading"><span>{number}</span><div><h2>{title}</h2><p>{caption}</p></div></div>;
}

function App() {
  return <div className="site-shell">
    <div className="paper-grain" aria-hidden="true" />
    <BackToTop />
    <a href="#projects" className="skip-to-content">Skip to content</a>
    <header className="site-header">
      <a className="wordmark" href="#top">VG<span>.</span></a>
      <nav aria-label="Primary navigation">
        <a href="#projects">Work</a>
        <a href="#papers">Research</a>
        <a href="#stack">Tools</a>
      </nav>
      <span className="header-status">Available for difficult problems</span>
    </header>
    <main>
      <section id="top" className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Forward-deployed engineering / Zurich, Switzerland</p>
        <div className="hero-copy">
          <h1 id="page-title">Viktor<br />Gsteiger<span className="signal-dot">.</span></h1>
          <p className="hero-intro">Forward-deployed engineer and systems builder—working with customers, people, and intelligent machines to turn difficult work into useful systems.</p>
        </div>
        <div className="hero-ledger" aria-label="Roles">
          <span>Customer-side builder</span><span>Humans × machines</span><span>Agentic systems</span><span>Systems research</span>
        </div>
        <div className="hero-footer">
          <div className="social-links" aria-label="Elsewhere">
            <a href="https://www.linkedin.com/in/viktor-gsteiger/" target="_blank" rel="noopener noreferrer"><Linkedin /> LinkedIn</a>
            <a href="https://github.com/vGsteiger" target="_blank" rel="noopener noreferrer"><Github /> GitHub</a>
            <a href="https://www.goodreads.com/user/show/62284336-viktor" target="_blank" rel="noopener noreferrer"><BookOpen /> Reading</a>
            <a href="https://orcid.org/0000-0002-6750-5500" target="_blank" rel="noopener noreferrer"><GraduationCap /> ORCID</a>
          </div>
          <a className="scroll-cue" href="#practice">Read on <ArrowDown /></a>
        </div>
      </section>

      <section id="practice" className="practice-section" aria-labelledby="practice-heading">
        <div className="practice-kicker"><span>01</span><span>Field practice</span></div>
        <div className="practice-intro"><h2 id="practice-heading">Close to the work.<br /><em>Close to the people.</em></h2><p>The best systems work starts where it will be used: alongside customers, domain experts, and the teams carrying the operational reality.</p></div>
        <div className="practice-principles">
          <article><span>Listen first</span><h3>Find the constraint that matters.</h3><p>Translate ambiguous, human problems into a problem a system can actually help solve.</p></article>
          <article><span>Build the bridge</span><h3>Make humans and machines useful to each other.</h3><p>Design workflows that respect judgement, reveal context, and make adoption feel natural.</p></article>
          <article><span>Put agents to work</span><h3>Move from capability to dependable practice.</h3><p>Connect agents, tools, and data into systems that can earn trust in the real world.</p></article>
        </div>
      </section>

      <section id="projects" className="content-section" aria-labelledby="projects-heading">
        <SectionHeading number="02" title="Selected work" caption="Systems research, deployed software, and work shaped in the field." />
        <div className="project-grid">
          {projects.map(project => <article key={project.title} className="project-card">
            <div className="project-image"><img src={project.image} alt="" loading="lazy" /></div>
            <div className="project-content"><h3>{project.title}</h3><p>{project.description}</p><div><a href={project.github} target="_blank" rel="noopener noreferrer">Repository <ArrowUpRight /></a><a href={project.demo} target="_blank" rel="noopener noreferrer">Read more <ArrowUpRight /></a></div></div>
          </article>)}
        </div>
      </section>

      <section id="papers" className="content-section research-section" aria-labelledby="papers-heading">
        <SectionHeading number="03" title="Research index" caption="Papers, theses, and contributions in systems research." />
        <ol className="paper-list">
          {papers.slice().reverse().map((paper, index) => <li key={paper.name}><span className="paper-number">{String(index + 1).padStart(2, '0')}</span><div><span className="paper-meta">{paper.type} / {paper.year}</span><h3>{paper.name}</h3></div><a href={paper.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${paper.name}`}><ArrowUpRight /></a></li>)}
        </ol>
      </section>

      <section id="stack" className="content-section tools-section" aria-labelledby="stack-heading">
        <SectionHeading number="04" title="Working set" caption="Agentic workflows, observability, and the tools I return to when the job calls for them." />
        <div className="stack-grid">{stack.map(tech => <div className="stack-item" key={tech.name}>{tech.icon}<strong>{tech.name}</strong></div>)}</div>
        <footer><span>Viktor Gsteiger</span><a href="#top">Back to start ↑</a></footer>
      </section>
    </main>
  </div>;
}

export default App;
