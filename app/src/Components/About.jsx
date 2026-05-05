import React from 'react'
import '../assets/Styles/about.css'
import codingImg from '../assets/coding.png'
import { Power } from 'lucide-react'
import AnimatedContent from './AnimatedContent'
import ScrollReveal from './ScrollReveal'

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* System Header */}
        <div className="about-header">
           <span className="prompt">suren@portfolio:~/about$</span>
        </div>

        <div className="about-terminal-window">
          <div className="window-topbar">
            <div className="window-controls">
            </div>
            <div className="window-title">identity.sh — 140x50</div>
          </div>
          
          <div className="about-content-split">
            {/* Left Side: Image */}
            <AnimatedContent distance={80} direction="horizontal" reverse duration={1.1} ease="power3.out" threshold={0.15} once className="about-visual-left">
              <div className="terminal-image-frame">
                <img src={codingImg} alt="Coding Workspace" className="terminal-image" />
                <div className="image-overlay-label">SRC: PROD_ENV</div>
              </div>
            </AnimatedContent>

            {/* Right Side: Description */}
            <div className="about-description-right">
              <AnimatedContent distance={40} duration={1} ease="power3.out" threshold={0.15} once>
                <ScrollReveal
                  start="top 85%"
                  end="top 50%"
                  textClassName="reveal-paragraph-large"
                >
                  I approach software development with a focus on clean architecture, performance optimization, and long-term system reliability.  
                </ScrollReveal>
              </AnimatedContent>

              <AnimatedContent distance={30} duration={1} delay={0.3} ease="power3.out" threshold={0.15} once className="about-secondary-desc">
                <p>
                  With a strong foundation in both frontend and backend technologies, I focus on bridging the gap between technical architecture and seamless user interactions.
                </p>
                <p>
                  My expertise lies in building systems that are not just functional, but optimized for growth and reliability. Whether it's developing interactive interfaces or architecting secure server-side logic, I approach every project with a meticulous focus on quality and innovation.
                </p>
              </AnimatedContent>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
