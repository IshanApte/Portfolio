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
            
            {/* Works Section - Dark background (originally Experience) */}
            <AnimatedSection isGray={false} delay={0.2}>
              <Works />
            </AnimatedSection>
            
            {/* Experience Section - Gray background (originally Works) */}
            <AnimatedSection isGray={true} delay={0.3}>
              <Experience />
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-icon lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
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
