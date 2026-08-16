import React from "react";
// import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
// import {profilepic} from "/Users/ishanapte/Documents/Portfolio/src/assets/LinkedIn_Profile.jpeg";
const ServiceCard = ({ index, title, icon }) => (
  <div className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full black-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          loading='lazy'
          decoding='async'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </div>
);

const About = () => {
  return (
    <>
      {/* <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div> */}

      {/* Responsive layout for image and text */}
      <div className='flex flex-col lg:flex-row items-center lg:items-start mt-4'>
        {/* Your image */}
        

        {/* Overview paragraph */}
        {/* <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          I'm Ishan Apte, a <span className="font-semibold">software developer</span> and <span className="font-semibold">graduate student</span> at Indiana University Bloomington, driven by an interest in building intelligent, real-world applications. 
          While I have broad expertise in <span className="font-semibold">full-stack development</span> using <span className="font-semibold">Python</span>, <span className="font-semibold">JavaScript</span>, and the <span className="font-semibold">MERN stack</span>, my recent focus has been on <span className="font-semibold">AI and Machine Learning</span>. 
          I've developed solutions involving <span className="font-semibold">NLP (GPT-3.5, RAG)</span>, <span className="font-semibold">Case-Based Reasoning</span>, and <span className="font-semibold">Computer Vision (CNNs)</span>, utilizing libraries like <span className="font-semibold">Langchain</span>, <span className="font-semibold">PyTorch</span>, and <span className="font-semibold">TensorFlow</span>. 
          From architecting social platforms to automating planning processes with AI, I enjoy creating <span className="font-semibold">efficient</span>, <span className="font-semibold">scalable</span>, and <span className="font-semibold">user-centric software</span>.
        </motion.p> */}


        <img
          src='/LinkedIn_Profile.jpeg'
          alt='Ishan Apte'
          loading='lazy'
          decoding='async'
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
