import React, { useRef } from "react";
// import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {

  const handleGitHubClick = (e) => {
    e.preventDefault(); // Prevent the parent link from navigating
    e.stopPropagation();
    window.open(source_code_link, '_blank', 'noopener,noreferrer');
  };

  // Use live demo link as main card link if available, otherwise use source code
  const mainCardLink = live_demo_link || source_code_link;

  return (
    <a href={mainCardLink} target="_blank" rel="noopener noreferrer"
       className='block bg-white bg-opacity-60 p-5 rounded-2xl w-full sm:w-[360px] h-full
                    shadow-lg flex flex-col cursor-pointer
                    transition-all duration-300 ease-in-out 
                    hover:bg-opacity-80 hover:shadow-2xl hover:-translate-y-2'>
      <div className='relative w-full h-[230px]'>
        <img
          src={image}
          alt='project_image'
          className='w-full h-full object-contain rounded-xl bg-gray-100'
        />
        <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
          <div
            onClick={handleGitHubClick}
            className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform'
          >
            <img src={github} alt='source code' className='w-1/2 h-1/2 object-contain' />
          </div>
        </div>
      </div>

      <div className='mt-5 flex flex-col flex-grow'>
        <div>
          <h3 className='text-slate-800 font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-slate-600 text-[14px]'>{description}</p>
        </div>

        <div className='flex-grow'></div>

        <div>
          <div className='mt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className='px-3 py-1 bg-gray-200 text-gray-800 text-sm font-medium rounded-full'
              >
                {tag.name}
              </p>
            ))}
          </div>
          
          <div className="mt-5 min-h-[28px]">
            {live_demo_link && (
                <span className="text-blue-600 font-semibold text-sm">
                    Live Demo →
                </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

const Works = () => {
  const scrollRef = useRef(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>Selected Works.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          the weird and wonderful...
        </motion.p>
      </div>

      <div className='mt-20 relative'>
        {/* Scroll container */}
        <div
          ref={scrollRef}
          className='flex gap-7 overflow-x-auto pb-4 scrollbar-hide'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div
              key={`project-${index}`}
              className='flex-shrink-0'
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4
                     w-10 h-10 bg-slate-800 text-white rounded-full
                     flex items-center justify-center shadow-lg
                     hover:bg-slate-900 transition-colors duration-300
                     hover:scale-110 z-10'
          aria-label="Previous project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4
                     w-10 h-10 bg-slate-800 text-white rounded-full
                     flex items-center justify-center shadow-lg
                     hover:bg-slate-900 transition-colors duration-300
                     hover:scale-110 z-10'
          aria-label="Next project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <div className="mt-16 text-center">
        <a
          href="https://github.com/IshanApte"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-800 text-white font-bold py-3 px-8 rounded-full
                     hover:bg-slate-900 transition-colors duration-300
                     shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          View More on GitHub
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
