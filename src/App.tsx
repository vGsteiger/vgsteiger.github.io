import { useState } from 'react';
import { Github, Linkedin, BookOpen, GraduationCap, FileCode, ChevronDown, Code, Database, Box, Layers, Building, Atom, Cloud, Server } from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';

function App() {
  const [activeSection, setActiveSection] = useState<'projects' | 'stack' | 'papers' | null>(null);

  const scrollToSection = (section: 'projects' | 'stack' | 'papers') => {
    setActiveSection(section);
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
      title: "vitrivr",
      image: "images/vitrivr.png",
      description: "vitrivr is an open source full-stack content-based multimedia retrieval system with a focus on video.",
      github: "https://github.com/vitrivr",
      demo: "https://vitrivr.org/vitrivr.html"
    },
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
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-900/90 to-gray-800/90 min-h-screen">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">Viktor Gsteiger</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12">Code Wrangler | System Builder | Tech Explorer | Book Worm</p>
        
        {/* Main Buttons */}
        <div className="flex flex-col gap-4 mb-12">
          <button
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
            className="px-8 py-3 border-2 border-blue-600 hover:border-blue-700 rounded-lg text-lg font-semibold transition-colors w-48 text-blue-600 hover:text-blue-700 bg-transparent"
          >
            Projects
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('papers');
            }}
            className="px-8 py-3 border-2 border-green-600 hover:border-green-700 rounded-lg text-lg font-semibold transition-colors w-48 text-green-600 hover:text-green-700 bg-transparent"
          >
            Papers
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('stack');
            }}
            className="px-8 py-3 border-2 border-purple-600 hover:border-purple-700 rounded-lg text-lg font-semibold transition-colors w-48 text-purple-600 hover:text-purple-700 bg-transparent"
          >
            Stack
          </button>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 text-white">
          <a href="https://www.linkedin.com/in/viktor-gsteiger/" 
             target="_blank"
             rel="noopener noreferrer"
             className="hover:text-blue-400 transition-colors">
            <Linkedin size={30} />
          </a>
          <a href="https://github.com/vGsteiger" 
             target="_blank"
             rel="noopener noreferrer"
             className="hover:text-gray-400 transition-colors">
            <Github size={30} />
          </a>
          <a href="https://www.goodreads.com/user/show/62284336-viktor" 
             target="_blank"
             rel="noopener noreferrer"
             className="hover:text-yellow-400 transition-colors">
            <BookOpen size={30} />
          </a>
          <a href="https://orcid.org/0000-0002-6750-5500" 
             target="_blank"
             rel="noopener noreferrer"
             className="hover:text-green-400 transition-colors">
            <GraduationCap size={30} />
          </a>
        </div>

        <ChevronDown 
          className="absolute bottom-8 animate-bounce cursor-pointer text-white"
          size={32}
          onClick={() => scrollToSection('projects')}
        />
      </div>

      {/* Projects Section */}
      <div id="projects" className="py-20 px-4 md:px-8 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Projects</h2>
        <h3 className="text-2xl font-semibold text-center mb-12 text-gray-300">I actively contributed or initiated the following projects:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-4">
                  <a href={project.github}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-400 hover:text-blue-300">GitHub</a>
                  <a href={project.demo}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-purple-400 hover:text-purple-300">Live Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Papers Section */}
      <div id="papers" className="py-20 px-4 md:px-8 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Papers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {papers.slice().reverse().map((paper, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{paper.name}</h3>
                <p className="text-gray-300 mb-4">{paper.type} ({paper.year})</p>
                <a href={paper.link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-blue-400 hover:text-blue-300">Read Paper</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stack Section */}
      <div id="stack" className="py-20 px-4 md:px-8 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {stack.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-3xl">{tech.icon}</span>
              <span className="font-medium text-white text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;