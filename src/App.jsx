import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
      {/* <CursorFilter /> */}
      <Routes>
        <Route path="/" element={
          <div className='relative z-0'>
            {/* Hero Section - Landing Page with gradient background */}
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
              <Navbar />
              <Hero />
            </div>
            
            {/* About Section - Gray background */}
            <AnimatedSection isGray={true} delay={0.1}>
              <About />
            </AnimatedSection>
            
            {/* Experience Section - Dark background */}
            <AnimatedSection isGray={false} delay={0.2}>
              <Experience />
            </AnimatedSection>
            
            {/* Works Section - Gray background */}
            <AnimatedSection isGray={true} delay={0.3}>
              <Works />
            </AnimatedSection>
            
            {/* Interactive Chatbot Section - Dark background */}
            <AnimatedSection 
              id="chatbot-section" 
              isGray={false} 
              className='py-16' 
              delay={0.4}
            >
              <div className='max-w-7xl mx-auto px-6'>
                <Chatbot />
              </div>
            </AnimatedSection>
            
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
