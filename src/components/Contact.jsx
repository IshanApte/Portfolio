import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import linkedin from "../assets/linkedin.svg";
import github from "../assets/github.png";
import gmail from "../assets/gmail.png";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "ishan.apte01@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="text-center py-4 sm:py-8 px-4">
      <motion.div variants={fadeIn("up", "tween", 0.2, 1)}>
        <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          Get in Touch
        </h2>
        <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
      </motion.div>
      
      <motion.div 
        variants={fadeIn("up", "tween", 0.4, 1)}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        {/* Email Button */}
        <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm border border-gray-200">
          <img src={gmail} alt="Email" loading="lazy" decoding="async" className="w-8 h-8 mx-2"/>
          <span className="text-gray-800 font-mono text-lg px-3">{email}</span>
          <button
            onClick={handleCopy}
            className="bg-accent text-white font-semibold py-2 px-5 rounded-full shadow-md hover:bg-accent/90 transition-all duration-300"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3 mt-6 sm:mt-0">
          <a
            href="https://www.linkedin.com/in/ishan-apte-1489a9213/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white rounded-full w-12 h-12 shadow-md hover:bg-gray-50 transition-all duration-300"
          >
            <img src={linkedin} alt="LinkedIn" loading="lazy" decoding="async" className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/IshanApte"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-black rounded-full w-12 h-12 shadow-md hover:bg-gray-800 transition-all duration-300"
          >
            <img src={github} alt="GitHub" loading="lazy" decoding="async" className="w-7 h-7 object-contain" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
