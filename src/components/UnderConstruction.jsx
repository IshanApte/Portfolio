import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';

const UnderConstruction = () => {
  return (
    <div className={`${styles.paddingX} w-full h-screen flex items-center justify-center bg-primary`}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-tertiary p-8 rounded-2xl w-full max-w-md text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">🚧 Under Construction</h1>
        <p className="text-secondary text-lg mb-6">
          My blog is currently being built. Please check back soon!
        </p>
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white rounded-full border-t-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction; 