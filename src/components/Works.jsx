import React from "react";
// import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

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

  const handleInnerLinkClick = (e, url) => {
    e.preventDefault(); // Prevent the parent link from navigating
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <a href={source_code_link} target="_blank" rel="noopener noreferrer"
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
            className='black-gradient w-10 h-10 rounded-full flex justify-center items-center'
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
                <span onClick={(e) => handleInnerLinkClick(e, live_demo_link)}
                   className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors z-10 relative">
                    View Live Demo →
                </span>
            )}
          </div>
        </div>
      </div>
    </a>
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
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          the weird and wonderful...
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
        {projects.slice(0, 3).map((project, index) => (
          <motion.div
            key={`project-${index}`}
            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
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
