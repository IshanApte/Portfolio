import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, CursorFilter, AnimatedSection} from "./components";
import Footer from "./components/Footer";

// Route-level and below-the-fold code splitting: none of these are needed
// for the initial home page paint, so keep them out of the main bundle.
const BlogLayout = lazy(() => import("./components/BlogLayout"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const PrivacyPolicy = lazy(() => import("./components/legal/PrivacyPolicy"));
const FloatingChatbot = lazy(() => import("./components/FloatingChatbot"));

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
            <Suspense fallback={null}>
              <FloatingChatbot />
            </Suspense>
          </div>
        } />
        <Route path="/blog" element={
          <div className="bg-background">
            <Navbar />
            <Suspense fallback={null}>
              <BlogLayout />
            </Suspense>
            <Footer />
          </div>
        } />
        <Route path="/blog/:id" element={
          <div className="bg-background">
            <Navbar />
            <Suspense fallback={null}>
              <BlogPost />
            </Suspense>
            <Footer />
          </div>
        } />
        <Route path="/privacy-policy" element={
          <Suspense fallback={null}>
            <PrivacyPolicy />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
