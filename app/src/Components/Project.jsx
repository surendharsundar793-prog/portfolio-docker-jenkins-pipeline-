import React from 'react'
import ScrollFloat from './ScrollFloat'
import '../assets/Styles/project.css'
import fashion from '../assets/fashion.png'
import weather from '../assets/weather.png'
import tech from '../assets/tech.png'
import shop from '../assets/shopease.png'
import { ExternalLink, Terminal, Github, Code2, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    img: shop,
    title: "ShopEase",
    category: "FEATURED_BUILD",
    desc: "React based shopping engine with dynamic state hydration and enterprise-grade architecture.",
    link: "https://github.com/surendharsundar793-prog/Shopease.git",
    gridSize: "large"
  },
  {
    id: 2,
    img: tech,
    title: "TechMonitor",
    category: "SYSTEM_TOOL",
    desc: "Low-overhead developer activity tracking service for metrics and skill growth monitoring.",
    link: "https://github.com/surendharsundar793-prog/Tech-monitor.git",
    gridSize: "small"
  },
  {
    id: 3,
    img: fashion,
    title: "Fashion Store",
    category: "UI_MODULE",
    desc: "CSS-driven luxury interface focusing on high-performance animations and minimal paint cycles.",
    link: "https://github.com/surendharsundar793-prog/Fashion-Shop",
    gridSize: "small"
  },
  {
    id: 4,
    img: weather,
    title: "WeatherForecast",
    category: "API_SERVICE",
    desc: "Weather integration service using real-time data ingestion and adaptive visualization layers.",
    link: "https://github.com/surendharsundar793-prog/Weather-Forecasting",
    gridSize: "medium"
  }
];

const Project = () => {
  const handleRedirect = (e, type, url) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('trigger-redirect', { 
      detail: { type, url } 
    }));
  };

  return (
    <section className="project-section" id="project">
      <div className="project-container">
        <div className="terminal-header">
           <span className="prompt">suren@portfolio:~/projects$</span>
        </div>

        <div className="bento-terminal-grid">
          {projects.map((project, index) => (
            <motion.div 
              className={`terminal-window bento-${project.gridSize}`} 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="window-topbar">
                <div className="window-controls">
                </div>
                <div className="window-title">
                  {project.title.toLowerCase()}.sh
                </div>
              </div>
              
              <div className="window-content">
                <div className="project-preview-area">
                  <img src={project.img} alt={project.title} className="bento-image" />
                </div>
                
                <div className="project-meta-area">
                  <div className="project-type-tag">
                    <Cpu size={12} /> {project.category}
                  </div>
                  <h4 className="bento-project-title">{project.title}</h4>
                  <p className="bento-desc">{project.desc}</p>
                  
                  <div className="bento-links">
                    <a 
                      href={project.link} 
                      onClick={(e) => handleRedirect(e, 'github', project.link, `FETCHING_${project.title.toUpperCase()}_SRC...`, `CLONING_REPOSITORY — ${project.title.toUpperCase()}`)} 
                      className="bento-link cursor-target"
                    >
                      <Github size={14} /> source_code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Project