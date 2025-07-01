import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, CursorFilter, AnimatedSection} from "./components";
import Footer from "./components/Footer";
import BlogLayout from "./components/BlogLayout";
import BlogPost from "./components/BlogPost";
import FloatingChatbot from "./components/FloatingChatbot";

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
              
            <span className="hash-span" id="contact">&nbsp;</span>
            {/* Contact Section - Gray background */}
            <AnimatedSection isGray={true} delay={0.4}>
              <Contact />
            </AnimatedSection>
            
            <Footer />
            
            {/* Add the floating chatbot */}
            <FloatingChatbot />
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
