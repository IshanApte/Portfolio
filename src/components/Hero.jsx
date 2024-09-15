import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import React from 'react';
import Typical from 'react-typical';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#ffffff]' />
          <div className='w-1 sm:h-80 h-40 line-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-black`}>
            Hi, I'm <span className='text-[black]'>Ishan Apte</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-black-100`}>
            I am a 
            <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        ' Graduate Computer Science Student',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        ' Software Developer',
        1000,
        ' Disappointed Man Utd supporter',
        1000,
      ]}
      wrapper="span"
      speed={50}
      // style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />

          </p>
          {/* Type, delete, and retype animation */}
          <div className="text-black-100 mt-4">
      
      </div>
        </div>
      </div>

      <ComputersCanvas />

      {/* <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div> */}
    </section>
  );
};

export default Hero;
