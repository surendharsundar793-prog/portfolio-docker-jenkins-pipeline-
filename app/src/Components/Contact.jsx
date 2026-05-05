import React, { useState } from 'react'
import '../assets/Styles/contact.css'
import { toast } from 'react-toastify';
import AnimatedContent from './AnimatedContent';
import { Send } from 'lucide-react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("ERROR: INVALID_EMAIL_FORMAT");
      return;
    }

    setIsSubmitting(true);
    formData.append("access_key", "b203957a-a3e0-49f2-b095-6a67572705ef");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        toast.success("SUCCESS: MESSAGE_TRANSMITTED");
        event.target.reset();
      } else {
        toast.error("FAILURE: SERVER_UNREACHABLE");
      }
    } catch (error) {
      toast.error("FAILURE: NETWORK_INTERFACE_ERROR");
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        <div className="contact-terminal-wrap">
          {/* Header Title */}
          <div className="contact-header">
             <span className="prompt">suren@portfolio:~/contact$</span>
          </div>

          <div className="contact-grid">
            {/* Left: Info & Nodes */}
            <AnimatedContent distance={40} direction="horizontal" reverse duration={0.8} threshold={0.1} once className="contact-info-panel">
              <div className="contact-module">
                 <div className="module-title-bar">NETWORK_NODES</div>
                 <div className="social-nodes">
                    <a href="https://www.linkedin.com/in/surendhar-s-8a40b6312/" className="node-link cursor-target" target="_blank" rel="noreferrer">
                      /usr/linkedin.ext
                    </a>
                    <a href="https://www.instagram.com/_surendharr?igsh=MWU2ajRtcG5wODd2dw==" className="node-link cursor-target" target="_blank" rel="noreferrer">
                      /usr/instagram.app
                    </a>
                    <a href="https://github.com/surendharsundar793-prog" className="node-link cursor-target" target="_blank" rel="noreferrer">
                      /usr/github.io
                    </a>
                 </div>
              </div>

              <div className="contact-module">
                 <div className="module-title-bar">DIRECT_ADDRESS</div>
                 <a href="mailto:surendharsunadr793@gmail.com" className="email-node cursor-target">
                   surendharsunadr793@gmail.com
                 </a>
              </div>
            </AnimatedContent>

            {/* Right: Input Shell */}
            <AnimatedContent distance={40} direction="horizontal" duration={0.8} delay={0.2} threshold={0.1} once className="contact-form-panel">
              <form className="terminal-form" onSubmit={onSubmit} noValidate>
                <div className="terminal-input-wrap">
                   <label>NAME:</label>
                   <input type="text" name='name' required />
                </div>
                
                <div className="terminal-input-wrap">
                   <label>EMAIL_ADDR:</label>
                   <input type="email" name='email' required />
                </div>
                
                <div className="terminal-input-wrap">
                   <label>MESSAGE_BUFFER:</label>
                   <textarea name="message" rows="4" required></textarea>
                </div>
                
                <button type='submit' className="terminal-execute-btn cursor-target" disabled={isSubmitting}>
                  {isSubmitting ? '[ TRANSMITTING... ]' : '[ EXECUTE_SEND ]'}
                  <Send size={14} style={{ marginLeft: '12px' }} />
                </button>
              </form>
            </AnimatedContent>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
