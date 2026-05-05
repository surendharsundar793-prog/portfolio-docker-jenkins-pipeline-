import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../assets/Styles/navbar.css'
import { Terminal, X, User, Briefcase, Cpu, Send, Menu } from 'lucide-react'

const navLinks = [
  { name: 'IDENTITY', id: '#about', icon: <User size={18} /> },
  { name: 'STACK',   id: '#skills', icon: <Cpu size={18} /> },
  { name: 'BUILD', id: '#project', icon: <Briefcase size={18} /> },
  { name: 'LINK',  id: '#contact', icon: <Send size={18} /> }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [globalRedirect, setGlobalRedirect] = useState({ active: false, title: '', msg: '', url: '' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const handleTrigger = (e) => {
      const { type, url, customTitle, customMsg } = e.detail;
      triggerRedirect(type, url, customTitle, customMsg);
    };
    window.addEventListener('trigger-redirect', handleTrigger);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('trigger-redirect', handleTrigger);
    }
  }, []);

  const triggerRedirect = (type, url, customTitle, customMsg) => {
    const config = {
      resume: { title: 'FETCHING_DOCUMENT...', msg: 'REDIRECTING_TO_FILE — SECURE_LINK' },
      contact: { title: 'INITIATING_COMMS...', msg: 'OPENING_ENCRYPTED_CHANNEL' },
      github: { title: 'OPENING_REPOSITORY...', msg: 'ESTABLISHING_HTTPS_Link' },
      linkedin: { title: 'FETCHING_PROFILE...', msg: 'LINKING_TO_NETWORK' },
      instagram: { title: 'ACCESSING_GRID...', msg: 'SYNCING_MEDIA_STREAM' },
      mail: { title: 'PREPARING_MAIL...', msg: 'ENCRYPTING_SECURE_CHANNEL' },
      nav: { title: 'SEEKING_COORDINATES...', msg: 'SYNCHRONIZING_LOCATION' },
      // demo: { title: 'INITIALIZING_DEMO...', msg: 'ESTABLISHING_VIRTUAL_SESSION' },
      // shutdown: { title: 'SHUTTING DOWN...', msg: 'TERMINATING_ALL_PROCESSES' },
      gateway: { title: 'CONNECTING...', msg: 'ESTABLISHING_GATEWAY_CONNECTION' }
    };

    const configItem = config[type] || { title: 'PROCESSING...', msg: 'REDIRECTING_TO_URL' };
    const title = customTitle || configItem.title;
    const msg = customMsg || configItem.msg;
    
    setGlobalRedirect({ active: true, title, msg, url });
    setOpen(false);
    
    setTimeout(() => {
      setGlobalRedirect({ active: false, title: '', msg: '', url: '' });
      if (type === 'shutdown' || type === 'gateway') {
        window.location.href = '/';
        return;
      }

      if (url.startsWith('#')) {
        const el = document.querySelector(url);
        if (el) {
          const offset = (window.innerWidth > 1024 ? 0 : 80);
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } else if (url) {
        window.open(url, '_blank');
      }
    }, 2800);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    triggerRedirect('nav', id);
  };

  const goHome = (e) => {
    e.preventDefault();
    triggerRedirect('nav', '#home');
  };

  return (
    <>
      {/* Global Redirect Overlay */}
      <AnimatePresence>
        {globalRedirect.active && (
          <motion.div 
            className="download-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 200000 }}
          >
            <div className="download-loader-content">
               <Terminal size={40} className="loader-icon" />
               <div className="loader-title">{globalRedirect.title}</div>
               <div className="loader-bar-wrap">
                  <motion.div 
                    className="loader-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.6, ease: "linear" }}
                  />
               </div>
               <div className="loader-msg">{globalRedirect.msg}...</div>
               {globalRedirect.url && (
                 <div className="loader-url-log">
                   PATH_LINK: {globalRedirect.url}
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop HUD Elements */}
      <motion.a 
        href="/" 
        title="Home" 
        className="sidebar-brand" 
        onClick={goHome}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        SURENDHAR.~/
      </motion.a>
      
      <motion.div 
        className="status-indicator"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >

        <span className="status-text">SYSTEM_OK</span>

      </motion.div>

      {/* Desktop Vertical Floating Sidebar (Icons Only) */}
      <motion.aside 
        className="desktop-sidebar"
        initial={{ x: -150, opacity: 0, y: '-50%' }}
        animate={{ x: 0, opacity: 1, y: '-50%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="sidebar-nav">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href="/" 
              className="sidebar-link cursor-target"
              onClick={(e) => scrollToSection(e, link.id)}
            >
              <div className="link-icon">{link.icon}</div>
              <span className="link-label">{link.name}</span>
            </a>
          ))}
        </nav>
      </motion.aside>

      {/* Mobile Top Bar */}
      <div className={`mobile-top-bar ${scrolled ? 'scrolled' : ''}`}>
         <a href="/" className="mobile-brand" onClick={goHome}>SURENDHAR:~</a>
         


          <div className="mobile-actions" style={{ display: 'flex', gap: '10px' }}>

            <div className="mobile-toggle" onClick={() => setOpen(!open)}>
               {open ? <X size={22} className="cursor-target" /> : <Menu size={22} className="cursor-target" />}
            </div>
          </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {open && (
            <motion.div 
              className={`mobile-nav-dropdown ${scrolled ? 'scrolled' : ''}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href="/"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="cursor-target mobile-dropdown-link"
                >
                  {link.name}
                  <span className="nav-num">/0{i+1}</span>
                </motion.a>
              ))}

              <motion.div 
                className="mobile-dropdown-footer"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="side-label">Secure Channel</p>
                <a href="mailto:surendharsunadr793@gmail.com" className="side-email cursor-target">
                  surendharsunadr793@gmail.com
                </a>
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar