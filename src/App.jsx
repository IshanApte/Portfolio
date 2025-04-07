import { BrowserRouter, Routes, Route } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas} from "./components";
import Footer from "./components/Footer";
import BlogLayout from "./components/BlogLayout";
import BlogPost from "./components/BlogPost";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className='relative z-0 bg-primary'>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
              <Navbar />
              <Hero />
            </div>
            <About />
            <Experience />
            <Tech />
            <Works />
            {/* <Feedbacks /> */}
            <div className='relative z-0'>
              <Contact />
              <StarsCanvas />
            </div>
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
