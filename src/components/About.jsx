import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
// import {profilepic} from "/Users/ishanapte/Documents/Portfolio/src/assets/LinkedIn_Profile.jpeg";
const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full black-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {/* Responsive layout for image and text */}
      <div className='flex flex-col lg:flex-row items-center lg:items-start mt-4'>
        {/* Your image */}
        

        {/* Overview paragraph */}
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          I'm Ishan Apte, a passionate software developer driven by a deep interest in 
          solving real-world problems through technology. With expertise in Python, JavaScript, and the MERN stack, 
          I have developed full-stack applications, machine learning models, and autonomous systems. 
          From building a social media platform for sports enthusiasts to automating hydroponic farming, 
          I focus on creating scalable, efficient, and user-friendly solutions. 
          I love finding innovative solutions to complex problems.
        </motion.p>


        <img
          src='/LinkedIn_Profile.jpeg' 
          alt='Ishan Apte'
          className='w-48 h-48 rounded-full object-cover lg:ml-10 ml-4 lg:mr-8 mb-4 lg:mb-0'
          />
      </div>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
