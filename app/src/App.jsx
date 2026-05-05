import React, { useEffect } from 'react'
import './App.css'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import Home from './Components/Home'
import About from './Components/About'
import Skills from './Components/Skills'
import Navbar from './Components/Navbar/Navbar'
import Project from './Components/Project'
import Contact from './Components/Contact'
import Footer from './Components/Footer/Footer'

import Target from './Components/Target'
import TerminalGateway from './Components/TerminalGateway'

import { ToastContainer } from 'react-toastify'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scrolls to section matching URL hash — compatible with Lenis
function ScrollToSection() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        setTimeout(() => {
          const top = el.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top, behavior: 'smooth' })
          history.replaceState(null, '', location.pathname)
        }, 150)
      }
    }
  }, [location])

  return null
}

// Updates browser tab title as user scrolls between sections
const sectionTitles = {
  home:    'Surendhar - Portfolio',
  project: 'Projects - Surendhar',
  about:   'About Me - Surendhar',
  skills:  'Skills - Surendhar',
  contact: 'Contact - Surendhar',
}

function SectionTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = 'Terminal Portfolio By Surendhar';
      return;
    }

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.title = sectionTitles[id] || 'Surendhar - Portfolio';
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}

function App() {

  useEffect(() => {
    // Always start at top on load/refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.05,
      duration: 1.5,
      smoothTouch: true
    })

    lenis.scrollTo(0, { immediate: true })
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Global scroll fade-in
    let observer;
    const fadeEls = document.querySelectorAll('.scroll-fade')
    
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          } else {
            entry.target.classList.remove('in-view')
          }
        })
      },
      { threshold: 0.1 } // Increased threshold slightly for better trigger
    )
    
    fadeEls.forEach(el => observer.observe(el))

    return () => {
      if (observer) observer.disconnect()
      lenis.destroy()
      gsap.ticker.remove((time) => { lenis.raf(time * 1000) })
    }
  }, [])

  return (
    <>
      <ToastContainer />
      <Target />
      <ScrollToSection />
      <SectionTitleUpdater />
      <Routes>
        <Route path="/" element={<TerminalGateway />} />
        <Route path="/portfolio" element={
          <div className="port">
            <Navbar />
            <section id="home">
              <Home />
            </section>
            <section id="project">
              <Project />
            </section>
            <section id="about" className="scroll-fade">
              <About />
            </section>
            <section id="skills" className="scroll-fade">
              <Skills />
            </section>
            <section id="contact" className="scroll-fade">
              <Contact />
            </section>
            <Footer />

          </div>
        } />
        <Route path="/connecting" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
