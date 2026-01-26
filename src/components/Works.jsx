import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

const ProjectCard = ({
  name,
  subtitle,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
  case_study_link,
  index,
}) => {
  const handleCodeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(source_code_link, '_blank', 'noopener,noreferrer');
  };

  const handleLiveDemoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (live_demo_link) {
      window.open(live_demo_link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCaseStudyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (case_study_link) {
      window.open(case_study_link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGitHubIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(source_code_link, '_blank', 'noopener,noreferrer');
  };

  // Convert tags array to stack line text
  const stackLine = tags.map(tag => tag.name).join(' · ');

  // Determine secondary button: prioritize case study, fallback to code
  const hasCaseStudy = case_study_link && case_study_link.trim() !== '';
  const hasSourceCode = source_code_link && source_code_link.trim() !== '';
  const secondaryButtonLink = hasCaseStudy ? case_study_link : (hasSourceCode ? source_code_link : null);
  const secondaryButtonText = hasCaseStudy ? 'Case Study →' : (hasSourceCode ? 'Code →' : '');
  const secondaryButtonHandler = hasCaseStudy ? handleCaseStudyClick : (hasSourceCode ? handleCodeClick : null);

  // Custom premium easing: cubic-bezier(0.16, 1, 0.3, 1)
  const premiumEase = [0.16, 1, 0.3, 1];
  
  // State to track card hover for button animations
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "tween", index * 0.15, 0.6)}
      className="group"
    >
      <motion.div
        className="relative h-full bg-white bg-opacity-60 rounded-3xl overflow-hidden
                    shadow-lg flex flex-col"
        whileHover={{
          y: -8,
          transition: {
            duration: 0.3,
            ease: premiumEase,
          },
        }}
        style={{
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
        onHoverStart={(e) => {
          e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
          setIsCardHovered(true);
        }}
        onHoverEnd={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          setIsCardHovered(false);
        }}
      >
        {/* Thumbnail Section */}
        <div className="relative w-full h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <motion.img
            src={image}
            alt={`${name} project`}
            className="w-full h-full object-contain p-4"
            whileHover={{
              scale: 1.05,
              transition: {
                duration: 0.5,
                ease: premiumEase,
              },
            }}
          />
          {/* GitHub Icon Overlay */}
          {source_code_link && source_code_link.trim() !== '' && (
            <div className="absolute top-4 right-4">
              <button
                onClick={handleGitHubIconClick}
                className="w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center 
                         hover:bg-black hover:scale-110 transition-all duration-300 shadow-lg z-10"
                aria-label="View source code"
              >
                <img src={github} alt="GitHub" className="w-5 h-5" style={{ filter: 'invert(1)' }} />
              </button>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-text-primary font-bold text-2xl lg:text-3xl mb-1">
            {name}
          </h3>

          {/* Subtitle */}
          <p className="text-text-secondary text-sm lg:text-base mb-4 font-medium">
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-text-secondary text-base leading-relaxed mb-4 flex-grow">
            {description}
          </p>

          {/* Stack Line */}
          <p className="text-text-secondary text-xs lg:text-sm mb-5 opacity-70">
            {stackLine}
          </p>

          {/* Buttons */}
          <motion.div
            className="flex gap-3"
            animate={{
              y: isCardHovered ? -2 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: premiumEase,
            }}
          >
            {live_demo_link && (
              <motion.button
                onClick={handleLiveDemoClick}
                className="flex-1 bg-accent text-white font-semibold px-4 py-2.5 rounded-full
                         hover:bg-accent/90 text-sm"
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                    ease: premiumEase,
                  },
                }}
              >
                Live Demo →
              </motion.button>
            )}
            {secondaryButtonLink && secondaryButtonHandler && (
              <motion.button
                onClick={secondaryButtonHandler}
                className={`${live_demo_link ? 'px-4' : 'flex-1'} bg-white text-text-primary font-semibold py-2.5 rounded-full
                         border-2 border-text-primary/20 hover:border-accent text-sm`}
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                    ease: premiumEase,
                  },
                }}
              >
                {secondaryButtonText}
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>Selected Works.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          the weird and wonderful...
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-20"
      >
        {/* 2-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              {...project}
            />
          ))}
        </div>
      </motion.div>

      <div className="mt-16 text-center">
        <a
          href="https://github.com/IshanApte"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white font-bold py-4 px-10 rounded-full
                     hover:bg-accent/90 transition-all duration-300
                     shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          View More on GitHub
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
