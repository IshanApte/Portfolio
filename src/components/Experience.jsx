import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  // Define colors based on experience type
  const educationColor = "#003366";
  const workColor = "#014d4e";
  const defaultColor = "#03346E";

  // Determine background color
  const backgroundColor = 
    experience.type === 'education' ? educationColor :
    experience.type === 'work' ? workColor :
    defaultColor;

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: backgroundColor, // Use the dynamic color
        color: "#ffffff",
        borderRadius: "10px", // Added for rounded edges
      }}
      contentArrowStyle={{ borderRight: `7px solid ${backgroundColor}` }} // Match arrow color to box color
      date={experience.date}
      dateClassName="date-class" // Add a class for custom date styling if needed
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-white text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => {
          // Function to bold important words
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

          return (
            <li
              key={`experience-point-${index}`}
              className='text-white-100 text-[14px] pl-1 tracking-wider'
              dangerouslySetInnerHTML={{ __html: boldImportantWords(point) }}
            />
          );
        })}
      </ul>
    </VerticalTimelineElement>
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
          <span style={{ color: '#003366' }}>Education</span> & <span style={{ color: '#014d4e' }}>Work Experience</span>.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline lineColor='#000000'> {/* Set the line color to black */}
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
