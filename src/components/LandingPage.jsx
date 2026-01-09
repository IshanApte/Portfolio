import React from 'react';
import { motion } from 'framer-motion';
import { navLinks } from '../constants';

const LandingPage = () => {
  const resumeLink = navLinks.find(link => link.id === 'resume');

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Profile Photo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-60 h-60 mx-auto rounded-full overflow-hidden shadow-lg">
            <img 
              src="/LinkedIn_Profile.jpeg" 
              alt="Ishan Apte"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Name/Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-text-primary mb-2 tracking-tight">
            Hey! I'm{' '}
            <span className="text-accent font-extrabold">
              Ishan
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-text-secondary tracking-wide">
            Product Engineer
          </p>
        </motion.div>

        {/* One-line description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-text-secondary leading-relaxed font-normal mb-4 max-w-2xl mx-auto"
        >
          Designing and shipping AI‑powered products.
        </motion.p>

        {/* Capability chips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-text-secondary">
            <span>"San Jose, CA"</span>
            <span>·</span>
            <span>"Actively interviewing"</span>
            <span>·</span>
            <span>"Software Engineer roles"</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            className="bg-accent text-white font-semibold py-3 px-6 rounded-full hover:bg-accent/90 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            View my products
          </a>

          {/* Secondary CTA (Ghost button) */}
          <a
            href={resumeLink?.href || "/IshanApte_Resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-accent text-accent font-semibold py-3 px-6 rounded-full hover:bg-accent/10 transition-colors duration-300"
          >
            Download resume
          </a>

          {/* LinkedIn CTA */}
          <a
            href="https://www.linkedin.com/in/ishan-apte-1489a9213/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-accent text-accent font-semibold py-3 px-6 rounded-full hover:bg-accent/10 transition-colors duration-300"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage; 