import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const educationColor = "#003366";
const workColor = "#014d4e";

const boldImportantWords = (text) => {
  const importantWords = [
    // Technologies & Frameworks
    'iOS', 'SwiftUI', 'MapKit', 'CoreLocation', 'ReactJs', 'Bootstrap', 'MERN Stack',
    // Programming Languages
    'Python', 'JavaScript', 'C\\+\\+', 'SQL',
    // AI/ML Terms
    'Convolutional Neural Network', 'CNN', 'Machine Learning', 'AI', 'NLP',
    'Sentiment Analysis', 'Neural Network',
    // Databases & Tools
    'MongoDB', 'Database', 'Docker', 'Git',
    // Concepts
    'user testing', 'user experience', 'front-end', 'API', 'OAuth', 'authentication',
    // Achievements & Metrics
    '88% accuracy', '20\\+ peers', '5 key features', 'Runner Up', 'Published',
    // Academic Subjects
    'Applied Algorithms', 'Advanced Database Concepts', 'Knowledge based AI',
    'Software Engineering',
    // Events & Recognition
    'PICT Hackathon 2022', 'Talk', 'Web Development'
  ];

  let formattedText = text;
  importantWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    formattedText = formattedText.replace(regex, `<strong>$&</strong>`);
  });
  return formattedText;
};

const ExperienceRow = ({ experience, isLast, index }) => {
  const dotColor = experience.type === 'education' ? educationColor : workColor;
  const hasPoints = (experience.points?.length ?? 0) > 0;

  return (
    <motion.div
      className={`relative flex gap-4 ${isLast ? '' : 'pb-5'}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
    >
      <div className='relative flex flex-col items-center'>
        <span
          className='w-3 h-3 rounded-full mt-4 shrink-0 ring-4 ring-white'
          style={{ backgroundColor: dotColor }}
        />
        {!isLast && (
          <span className='w-px flex-1 mt-1' style={{ backgroundColor: '#64748B40' }} />
        )}
      </div>

      <div
        className='flex-1 rounded-xl border border-black/5 bg-white/60 px-4 py-3 shadow-sm'
        style={{ borderLeft: `3px solid ${dotColor}` }}
      >
        <h3 className='text-text-primary text-[17px] font-bold leading-snug'>
          {experience.title}
          <span className='text-text-secondary text-[13px] font-normal ml-2'>
            {experience.date}
          </span>
        </h3>
        <p className='text-text-secondary text-[14px] font-medium mt-0.5'>{experience.company_name}</p>

        {hasPoints && (
          <ul className='mt-1.5 list-disc pl-4 space-y-1'>
            {experience.points.map((point, index) => (
              <li
                key={`experience-point-${index}`}
                className='text-text-secondary text-[13px] tracking-wide'
                dangerouslySetInnerHTML={{ __html: boldImportantWords(point) }}
              />
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          <span className="text-accent">Education</span> & <span className="text-accent">Work Experience</span>.
        </h2>
      </motion.div>

      <div className='mt-12 max-w-2xl mx-auto'>
        {experiences.map((experience, index) => (
          <ExperienceRow
            key={`experience-${index}`}
            experience={experience}
            isLast={index === experiences.length - 1}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
