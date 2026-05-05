import React, { useState, useEffect } from 'react'
import '../assets/Styles/home.css'
import resume from '../assets/Surendhar_Resume.pdf'
import profile from '../assets/profile-pic.png'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Download, Send } from 'lucide-react'

const Home = () => {
  const [lines, setLines] = useState([]);

  const fullText = [
    "> suren --identity",
    "NAME: Surendhar S",
    "LOC: India",
    "STATUS: System Active [OK]",
    "> suren --mission",
    "Building clean, efficient applications with a focus on performance and architectural excellence."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < fullText.length) {
        setLines(prev => [...prev, fullText[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleRedirect = (e, type, url) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('trigger-redirect', { 
      detail: { type, url } 
    }));
  };

  return (
    <div className="home-terminal-section">
      <div className="home-terminal-container">
        
        {/* Left: Terminal Interface */}
        <div className="hero-shell">
          <div className="terminal-window hero-window">
            <div className="window-topbar">
              <div className="window-controls">
              </div>
              <div className="window-title">bash — terminal_hero</div>
            </div>
            <div className="window-content hero-content-shell" data-lenis-prevent>
               <div className="shell-lines">
                  <AnimatePresence>
                    {lines.map((line, index) => (
                      <motion.div 
                         initial={{ opacity: 0, x: -10 }} 
                         animate={{ opacity: 1, x: 0 }} 
                         key={index} 
                         className={line?.startsWith('>') ? 'shell-cmd' : 'shell-output'}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div className="shell-cursor">
                     <ChevronRight size={14} /> <span className="blinking-box"></span>
                  </div>
               </div>
            </div>
          </div>

          <div className="hero-actions">
            <motion.a 
              href="#contact" 
              onClick={(e) => handleRedirect(e, 'contact', '#contact')}
              className="terminal-btn primary-btn cursor-target"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              [ CONNECT_SYSTEM ] <Send size={14} />
            </motion.a>
            <motion.button 
              onClick={(e) => handleRedirect(e, 'resume', resume)}
              className="terminal-btn secondary-btn cursor-target"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
            >
              [ DOWNLOAD_RESUME ] <Download size={14} />
            </motion.button>
          </div>
        </div>

        {/* Right: Technical Profile Visual */}
        <div className="hero-visual">
          <motion.div 
            className="profile-terminal-frame"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="scanner-line"></div>
            <img src={profile} alt="Surendhar" className="technical-profile-img" />
            
            <div className="visual-stats">
               <div className="stat-row"><span>UID:</span> <span>S-793</span></div>
               <div className="stat-row"><span>PRC:</span> <span>0x03FF</span></div>
               <div className="stat-row"><span>NET:</span> <span>STABLE</span></div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default Home