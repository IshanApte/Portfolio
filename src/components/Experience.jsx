import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const educationColor = "#003366";
const workColor = "#014d4e";
const defaultColor = "#03346E";

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

const ExperienceRow = ({ experience, isLast }) => {
  const dotColor =
    experience.type === 'education' ? educationColor :
    experience.type === 'work' ? workColor :
    defaultColor;

  return (
    <div className='relative flex gap-5 pb-8'>
      <div className='relative flex flex-col items-center'>
        <span
          className='w-3.5 h-3.5 rounded-full mt-1 shrink-0 ring-4 ring-white'
          style={{ backgroundColor: dotColor }}
        />
        {!isLast && (
          <span className='w-px flex-1 mt-1' style={{ backgroundColor: '#64748B33' }} />
        )}
      </div>

      <div className='pb-1'>
        <p className='text-[13px] font-semibold tracking-wide' style={{ color: '#64748B' }}>
          {experience.date}
        </p>
        <h3 className='text-text-primary text-[18px] font-bold mt-0.5'>{experience.title}</h3>
        <p className='text-text-secondary text-[14px] font-medium'>{experience.company_name}</p>

        {experience.points.length > 0 && (
          <ul className='mt-2 list-disc ml-5 space-y-1'>
            {experience.points.map((point, index) => (
              <li
                key={`experience-point-${index}`}
                className='text-text-secondary text-[13px] pl-1 tracking-wide'
                dangerouslySetInnerHTML={{ __html: boldImportantWords(point) }}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
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
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
