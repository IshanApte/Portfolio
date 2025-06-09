import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ 
  children, 
  isGray = false, 
  className = '', 
  id = '',
  delay = 0 
}) => {
  const baseClasses = "relative z-0 transition-colors duration-1000 ease-in-out";
  const backgroundClass = isGray 
    ? "bg-gradient-to-br from-gray-50 to-gray-100" 
    : "bg-primary";

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: "easeOut" 
      }}
      className={`${baseClasses} ${backgroundClass} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.2 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default AnimatedSection; 