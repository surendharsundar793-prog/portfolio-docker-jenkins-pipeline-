import React from 'react';
import '../../assets/Styles/footer.css';
import { Github, Linkedin, Facebook, MessageSquare, ChevronUp } from 'lucide-react';

const Footer = () => {
  const handleRedirect = (e, type, url) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('trigger-redirect', { 
      detail: { type, url } 
    }));
  };

  return (
    <footer className="minimal-footer">
      <div className="footer-decorations">
      </div>

      <div className="footer-content">
        <div className="footer-credits">
          <div className="footer-social-row">
            <a href="https://github.com/surendharsundar793-prog" className="cursor-target" onClick={(e) => handleRedirect(e, 'github', 'https://github.com/surendharsundar793-prog')}>
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/surendhar-s-8a40b6312/" className="cursor-target" onClick={(e) => handleRedirect(e, 'linkedin', 'https://www.linkedin.com/in/surendhar-s-8a40b6312/')}>
              <Linkedin size={20} />
            </a>
            <a href="https://facebook.com" className="cursor-target" onClick={(e) => handleRedirect(e, 'facebook', 'https://facebook.com')}>
              <Facebook size={20} />
            </a>
          </div>
          <p className="coded-by">
            Coded with <span className="heart">❤️</span> by Surendhar S
          </p>
        </div>

        <div className="footer-social-dock">
          <div className="social-icons-vertical">
            <a href="https://github.com/surendharsundar793-prog" className="cursor-target" onClick={(e) => handleRedirect(e, 'github', 'https://github.com/surendharsundar793-prog')}>
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/surendhar-s-8a40b6312/" className="cursor-target" onClick={(e) => handleRedirect(e, 'linkedin', 'https://www.linkedin.com/in/surendhar-s-8a40b6312/')}>
              <Linkedin size={22} />
            </a>
            <a href="https://facebook.com" className="cursor-target" onClick={(e) => handleRedirect(e, 'facebook', 'https://facebook.com')}>
              <Facebook size={22} />
            </a>
          </div>
          <div className="footer-vertical-line"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;