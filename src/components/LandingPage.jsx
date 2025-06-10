import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { navLinks } from '../constants';
import { github } from '../assets';
import linkedin from '../assets/linkedin.svg';
import resumeIcon from '../assets/resume.svg';

const LandingPage = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleExploreClick = () => {
    // Scroll to the chatbot section
    const chatbotContainer = document.getElementById('chatbot-container');
    if (chatbotContainer) {
      chatbotContainer.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const toggleResume = () => {
    setIsResumeOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsResumeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-gray-600 overflow-hidden shadow-lg">
            <img 
              src="/LinkedIn_Profile.jpeg" 
              alt="Ishan Apte"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Name/Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
        >
          Hey! I'm Ishan
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto"
        >
          I'm an AI Engineer & Software Developer passionate about building intelligent systems 
          and creating innovative solutions. I love exploring the intersection of artificial 
          intelligence and practical applications that make a real difference.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="space-y-6"
        >
          <button
            onClick={handleExploreClick}
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <span className="text-lg font-medium">
              Chat with Agentic Ishan
            </span>
          </button>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex justify-center items-center space-x-6 pt-4"
          >
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/ishan-apte-1489a9213/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
              <img src={linkedin} alt="LinkedIn" className="w-8 h-8"/>
            </a>

            {/* GitHub */}
            <a href="https://github.com/IshanApte" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
               <img src={github} alt="GitHub" className="w-8 h-8 p-1 bg-black rounded-full" />
            </a>

            {/* Resume Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleResume} className="hover:opacity-75 transition-opacity">
                <img src={resumeIcon} alt="Resume" className="w-8 h-8" />
              </button>
              {isResumeOpen && resumeLink && resumeLink.subLinks && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                >
                  <ul>
                    {resumeLink.subLinks.map((subLink, index) => (
                      <li key={index}>
                        <a
                          href={subLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => setIsResumeOpen(false)}
                        >
                          {subLink.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Handwritten-style scroll suggestion */}
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative"
          >
            <div className="flex items-center justify-center space-x-2">
              <span 
                className="text-gray-500 text-sm transform -rotate-2"
                style={{ 
                  fontFamily: 'Comic Sans MS, cursive, sans-serif',
                  fontWeight: '400'
                }}
              >
                scroll for the old school experience
              </span>
            </div>
            
            {/* Simple Down Arrow */}
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.8, duration: 1.0, ease: "easeInOut" }}
              className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2"
            >
              <svg 
                width="40" 
                height="50" 
                viewBox="0 0 40 50" 
                className="text-gray-400"
              >
                {/* Vertical line */}
                <motion.path
                  d="M20 5 L20 35"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.8, duration: 0.8, ease: "easeInOut" }}
                />
                
                {/* Arrow head pointing down */}
                <motion.path
                  d="M20 35 L12 27 M20 35 L28 27"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.4, duration: 0.4, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage; 