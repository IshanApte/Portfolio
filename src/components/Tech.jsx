import React from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology, index) => (
        <motion.div 
          key={technology.name}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut" 
          }}
          whileHover={{ scale: 1.1 }}
          className='w-20 h-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300'
        >
          <img 
            src={technology.icon} 
            alt={technology.name}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
