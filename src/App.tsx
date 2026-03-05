import { lazy, Suspense } from 'react';
import { Github, Linkedin, FileCode, BookOpen, GraduationCap, ChevronDown, Code, Database, Box, Layers, Building, Atom, Cloud, Server } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatedBackground } from './components/AnimatedBackground';
import { BackToTop } from './components/BackToTop';

const BlogPost = lazy(() => import('./pages/BlogPost').then(module => ({ default: module.BlogPost })));

function App() {
  const scrollToSection = (section: 'projects' | 'stack' | 'papers' ) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      title: "Caribou",
      image: "images/Caribou.png",
      description: "Caribou is a framework for running and deploying complex serverless workflows multi-constraint and multi-objective aware on hyper-scalers over multiple regions.",
      github: "https://github.com/ubc-cirrus-lab/caribou",
      demo: "https://cirrus.ece.ubc.ca/papers/sosp24_caribou.pdf"
    },
    {
      title: "modyn",
      image: "images/Modyn.png",
      description: "Modyn is a research-platform for training ML models on dynamic datasets.",
      github: "https://github.com/eth-easl/modyn",
      demo: "https://systems.ethz.ch/research/blog/modyn.html"
    },
    {
      title: "Mixtera",
      image: "images/mixtera.png",
      description: "Mixtera is an open-source data-centric training data plane built for modern LLM/VLM training.",
      github: "https://github.com/eth-easl/mixtera",
      demo: "https://github.com/eth-easl/mixtera/blob/main/examples/torchtitan.md"
    },
    {
      title: "vitrivr",
      image: "images/vitrivr.png",
      description: "vitrivr is an open source full-stack content-based multimedia retrieval system with a focus on video.",
      github: "https://github.com/vitrivr",
      demo: "https://vitrivr.org/vitrivr.html"
    },
    {
      title: "DokAssist",
      image: "images/dokassist.svg",
      description: "A local, encrypted macOS application for Swiss patient record management with AES-256-GCM encryption, Swiss healthcare standards, and on-device LLM integration.",
      github: "https://github.com/vGsteiger/IbexDoc",
      demo: "https://github.com/vGsteiger/IbexDoc/releases"
    }
  ];

  const stack = [
    { name: "Python", icon: <Code size={30}/> },
    { name: "TypeScript", icon: <FileCode size={30}/> },
    { name: "SQL", icon: <Database size={30}/> },
    { name: "Docker", icon: <Box size={30}/> },
    { name: "Kubernetes", icon: <Layers size={30}/> },
    { name: "Terraform", icon: <Building size={30}/> },
    { name: "Foundry", icon: <Server size={30}/> },
    { name: "React", icon: <Atom size={30}/> },
    { name: "GCP", icon: <Cloud size={30}/> },
    { name: "AWS", icon: <Cloud size={30}/> },
  ];

  const papers = [
    { 
      name: "Evaluating Algorithms for Temporal Queries in Ad-Hoc Video Retrieval",
      year: 2021,
      type: "Bachelor Thesis",
      link: "https://dbis.dmi.unibas.ch/teaching/studentprojects/evaluating-algorithms-for-temporal-queries-in-ad-hoc-video-retrieval/Thesis.pdf"
    },
    {
      name: "Interactive video retrieval evaluation at a distance: comparing sixteen interactive video search systems in a remote setting at the 10th video browser showdown",
      year: 2022,
      type: "Paper",
      link: "https://link.springer.com/article/10.1007/s13735-021-00225-2"
    },
    {
      name: "Multi-modal interactive video retrieval with temporal queries",
      year: 2022,
      type: "Paper",
      link: "https://www.zora.uzh.ch/id/eprint/217472/1/VBS22_vitrivr.pdf"
    },
    {
      name: "Towards a platform and benchmark suite for model training on dynamic datasets",
      year: 2023,
      type: "Paper",
      link: "https://dl.acm.org/doi/pdf/10.1145/3578356.3592585"
    },
    {
      name: "Modyn: A Platform for Model Training on Dynamic Datasets With Sample-Level Data Selection",
      year: 2023,
      type: "Paper",
      link: "https://arxiv.org/pdf/2312.06254"
    },
    {
      name: "Holistically Optimizing Geospatial Serverless Workflow Deployment for Sustainable Computing",
      year: 2024,
      type: "Master Thesis",
      link: "https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/695846/Gsteiger_Viktor.pdf"
    },
    {
      name: "Caribou: Fine-Grained Geospatial Shifting of Serverless Applications for Sustainability",
      year: 2024,
      type: "Paper",
      link: "https://cirrus.ece.ubc.ca/papers/sosp24_caribou.pdf"
    },
    {
      name: "Modyn: Data-Centric Machine Learning Pipeline Orchestration",
      year: 2024,
      type: "Paper",
      link: "https://www.mboether.com/assets/pdf/bother2025modyn.pdf"
    },
    {
      name: "Mixtera: A Data Plane for Foundation Model Training",
      year: 2025,
      type: "Paper",
      link: "https://arxiv.org/pdf/2502.19790"
    }
  ];

  return (
    <Router>
      <div className="relative bg-gradient-to-b from-gray-900/90 to-gray-800/90 min-h-screen">
        <AnimatedBackground />
        <BackToTop />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <a href="#projects" className="skip-to-content">Skip to content</a>
                {/* Hero Section */}
                <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight animate-slide-in-up">Viktor Gsteiger</h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl leading-relaxed">
                    <span className="inline-block">Code Wrangler</span>
                    <span className="text-gray-500 mx-2">|</span>
                    <span className="inline-block">System Builder</span>
                    <span className="text-gray-500 mx-2">|</span>
                    <span className="inline-block">Tech Explorer</span>
                    <span className="text-gray-500 mx-2">|</span>
                    <span className="inline-block">Book Worm</span>
                  </p>
                  
                  {/* Main Buttons */}
                  <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12 w-full max-w-2xl">
                    {['projects', 'papers', 'stack'].map((section) => (
                      <button
                        key={section}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(section as 'projects' | 'stack' | 'papers');
                        }}
                        className={`px-6 sm:px-8 py-3 border-2 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 flex-1 sm:flex-initial min-w-[140px] bg-transparent hover:scale-105 hover:shadow-lg ${
                          section === 'projects' ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400' :
                          section === 'papers' ? 'border-green-500 text-green-400 hover:bg-green-500/10 hover:border-green-400' :
                          'border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400'
                        }`}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 text-white">
                    <a href="https://www.linkedin.com/in/viktor-gsteiger/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                      <Linkedin size={24} />
                    </a>
                    <a href="https://github.com/vGsteiger"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50 hover:text-gray-300 transition-all duration-300 hover:scale-110">
                      <Github size={24} />
                    </a>
                    <a href="https://www.goodreads.com/user/show/62284336-viktor"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Goodreads Profile"
                      className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-yellow-500/10 hover:border-yellow-500/50 hover:text-yellow-400 transition-all duration-300 hover:scale-110">
                      <BookOpen size={24} />
                    </a>
                    <a href="https://orcid.org/0000-0002-6750-5500"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="ORCID Profile"
                      className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-400 transition-all duration-300 hover:scale-110">
                      <GraduationCap size={24} />
                    </a>
                  </div>

                  <button
                    onClick={() => scrollToSection('projects')}
                    aria-label="Scroll to projects section"
                    className="absolute bottom-8 animate-bounce cursor-pointer text-white hover:text-blue-400 transition-colors"
                  >
                    <ChevronDown size={32} />
                  </button>
                </div>

                {/* Projects Section */}
                <section id="projects" className="py-20 px-4 md:px-8 relative z-10" aria-labelledby="projects-heading">
                  <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Projects</h2>
                  <p className="text-xl text-center mb-12 text-gray-400 max-w-3xl mx-auto">Open-source projects I've actively contributed to or initiated</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                      <div key={index} className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-102 hover:shadow-lg transition-all duration-300 border border-gray-700/50">
                        <div className="relative overflow-hidden">
                          <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold mb-3 text-white transition-colors">{project.title}</h3>
                          <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                          <div className="flex gap-4">
                            <a href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center px-4 py-2 bg-blue-500/10 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 font-medium">
                              GitHub
                            </a>
                            <a href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center px-4 py-2 bg-purple-500/10 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 font-medium">
                              Demo
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Papers Section */}
                <section id="papers" className="py-20 px-4 md:px-8 relative z-10" aria-labelledby="papers-heading">
                  <h2 id="papers-heading" className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Publications</h2>
                  <p className="text-xl text-center mb-12 text-gray-400 max-w-3xl mx-auto">Research papers and academic contributions</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {papers.slice().reverse().map((paper, index) => (
                      <div key={index} className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-102 hover:shadow-lg transition-all duration-300 border border-gray-700/50">
                        <div className="p-6 flex flex-col h-full">
                          <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/50 text-green-400 rounded-full text-sm font-medium">
                              {paper.type}
                            </span>
                            <span className="ml-2 text-gray-400 text-sm">{paper.year}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-4 text-white transition-colors leading-tight flex-grow">{paper.name}</h3>
                          <a href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 bg-green-500/10 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/20 hover:border-green-400 transition-all duration-300 font-medium">
                            Read Paper →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Stack Section */}
                <section id="stack" className="py-20 px-4 md:px-8 relative z-10" aria-labelledby="stack-heading">
                  <h2 id="stack-heading" className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Tech Stack</h2>
                  <p className="text-xl text-center mb-12 text-gray-400 max-w-3xl mx-auto">Technologies and tools I work with</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                    {stack.map((tech, index) => (
                      <div
                        key={index}
                        className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center gap-3 hover:transform hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gray-700/50 cursor-default"
                      >
                        <span className="text-purple-400 transition-colors">{tech.icon}</span>
                        <span className="font-semibold text-white text-sm transition-colors">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-white text-xl">Loading...</div>
                </div>
              }>
                <BlogPost />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
