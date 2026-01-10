import React from 'react';
import { motion } from 'framer-motion';
import { navLinks } from '../constants';

const LandingPage = () => {
  const resumeLink = navLinks.find(link => link.id === 'resume');

  return (
    <>
      {/* Hero Section with Background Image */}
      <div 
        className="relative w-full h-[50vh] md:h-[67vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/1.png)',
          backgroundPosition: 'center center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#F9FAFB',
        }}
      >
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/40" />
      </div>

      {/* Content Section Below Hero */}
      <div 
        className="w-full py-16 px-6"
        style={{ backgroundColor: '#F9FAFB' }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-4xl font-black mb-3 tracking-tight leading-tight"
            style={{ color: '#0F172A' }}
          >
            Product Engineer
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl mb-3 leading-normal font-normal max-w-2xl mx-auto"
            style={{ color: '#64748B' }}
          >
            Designing and shipping AI-powered products end-to-end.
          </motion.p>

          {/* Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-4"
          >
            <div className="flex flex-wrap justify-center items-center gap-2 text-sm" style={{ color: '#64748B' }}>
              <span>San Jose, CA</span>
              <span>·</span>
              <span>Actively interviewing</span>
              <span>·</span>
              <span>Software Engineer roles</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-4"
          >
            {/* Primary CTA */}
            <a
              href="#projects"
              className="font-semibold py-3 px-6 rounded-full text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              style={{ backgroundColor: '#2563EB' }}
            >
              View my products
            </a>

            {/* Secondary CTA - Download resume */}
            <a
              href={resumeLink?.href || "/IshanApte_Resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold py-3 px-6 rounded-full border-2 transition-all duration-300 hover:bg-opacity-10 transform hover:scale-105"
              style={{ 
                borderColor: '#2563EB',
                color: '#2563EB'
              }}
            >
              Download resume
            </a>

            {/* Secondary CTA - LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ishan-apte-1489a9213/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold py-3 px-6 rounded-full border-2 transition-all duration-300 hover:bg-opacity-10 transform hover:scale-105"
              style={{ 
                borderColor: '#2563EB',
                color: '#2563EB'
              }}
            >
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default LandingPage; 