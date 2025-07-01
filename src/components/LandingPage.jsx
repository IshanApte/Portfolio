import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { navLinks } from '../constants';
import { github } from '../assets';
import linkedin from '../assets/linkedin.svg';
import resumeIcon from '../assets/resume.svg';

const LandingPage = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const dropdownRef = useRef(null);



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
  const sdeResume = navLinks.find(link => link.id === 'resume')?.subLinks?.[0];

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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-2 tracking-tight">
            Hey! I'm{' '}
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent font-extrabold">
              Ishan
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-700 tracking-wide">
            AI Engineer & Software Developer
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-8 max-w-2xl mx-auto"
        >
          Passionate about building{' '}
          <span className="font-semibold text-gray-800">intelligent systems</span> and creating{' '}
          <span className="font-semibold text-gray-800">innovative solutions</span>. I love exploring the intersection of artificial 
          intelligence and practical applications that make a real difference.
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="space-y-6"
        >
                      <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
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

            {/* Resume Dropdown Icon */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsResumeOpen(prev => !prev)} className="hover:opacity-75 transition-opacity">
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
                          href={subLink.href}
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
          

        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage; 