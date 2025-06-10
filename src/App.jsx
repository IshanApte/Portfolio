import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, CursorFilter, AnimatedSection} from "./components";
import Footer from "./components/Footer";
import BlogLayout from "./components/BlogLayout";
import BlogPost from "./components/BlogPost";
import Chatbot from "./components/Chatbot";

const App = () => {
  useEffect(() => {
    // Ensure page always starts at the top
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Also handle any route changes
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <BrowserRouter>
      <Analytics />
      {/* <CursorFilter /> */}
      <Routes>
        <Route path="/" element={
          <div className='relative z-0 animated-gradient-background'>
            {/* Hero Section - Landing Page with gradient background */}
            <div id="top" className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
              <Navbar />
              <Hero />
            </div>
            
            {/* About Section - Gray background */}
            {/* <AnimatedSection isGray={true} delay={0.1}>
              <About />
            </AnimatedSection> */}
            
            {/* Experience Section - Dark background */}
            <AnimatedSection isGray={false} delay={0.2}>
              <Experience />
            </AnimatedSection>
            
            {/* Works Section - Gray background */}
            <AnimatedSection isGray={true} delay={0.3}>
              <Works />
            </AnimatedSection>
            
            <span className="hash-span" id="chatbot-section">&nbsp;</span>
            {/* Interactive Chatbot Section - Dark background */}
            <AnimatedSection
              id="chatbot-container" 
              isGray={false} 
              className='pt-32 pb-16' 
              delay={0.4}
            >
              <div className='max-w-7xl mx-auto px-6 text-center'>
                <div className='mb-12'>
                  <h2 className='text-3xl font-bold text-blue-900 inline-flex items-center gap-3
                                 transition-colors duration-300 hover:text-blue-700'
                      style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 12H5.17L4 15.17V4h16v10z"></path>
                      <path d="M6 12h12v-2H6v2zm0-3h12V7H6v2zm0-3h12V4H6v2z"></path>
                    </svg>
                    Meet Agentic Ishan
                  </h2>
                </div>
                <Chatbot />
              </div>
            </AnimatedSection>
            
            <span className="hash-span" id="contact">&nbsp;</span>
            {/* Contact Section - Gray background */}
            <AnimatedSection isGray={true} delay={0.5}>
              <Contact />
            </AnimatedSection>
            
            <Footer />
          </div>
        } />
        <Route path="/blog" element={
          <div className="bg-[#f8fafc]">
            <Navbar />
            <BlogLayout />
            <Footer />
          </div>
        } />
        <Route path="/blog/:id" element={
          <div className="bg-[#f8fafc]">
            <Navbar />
            <BlogPost />
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
