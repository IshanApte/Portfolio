import {
  javascript,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
} from "../assets";


import pythonLogo from '../assets/tech/pythonlogo.png';
import cppLogo from '../assets/tech/cpplogo.png';
import reactLogo from '../assets/tech/reactjs.png';
import aimlLogo from '../assets/tech/aiml.png';
import sqlLogo from '../assets/tech/sql.png';

import pictLogo from '../assets/company/pict.png';
import iuLogo from '../assets/company/iu.png';

import sportsImage from '../assets/sports.jpg';
import planningImage from '../assets/planning.png';
// import plantImage from '../assets/plant.png';
import bloomingtonBuzzImage from '../assets/BloomingtonBuzz.png';
import superAgentImage from '../assets/gmailagent.png';
// import resumefile from '/IshanApteResume.pdf';



export const navLinks = [
  {
    id: "about",
    title: "About",
    href: "about",
  },
  {
    id: "work",
    title: "Work",
    href: "work",
  },
  {
    id: "contact",
    title: "Contact",
    href: "contact",
  },
  // {
  //   id: "blog",
  //   title: "Blog",
  //   href: "/blog",
  //   color: "text-[#2962FF]",
  // },
  // {
  //   id: "resume",
  //   title: "Resume",
  //   color: "blue-text-gradient",
  //   subLinks: [
  //     {
  //       id: "resume-swe",
  //       title: "Software Developer",
  //       href: "/IshanApte_SDE_Resume.pdf",
  //       target: "_blank",
  //     },
  //     {
  //       id: "resume-ai",
  //       title: "AI / ML",
  //       href: "/IshanApte_AI_Resume.pdf",
  //       target: "_blank",
  //     },
  //   ],
  // }
];

const services = [
  {
    title: "Python Programmer",
    icon: pythonLogo,
  },
  {
    title: "C++ Programmer",
    icon: cppLogo,
  },
  {
    title: "Web Developer",
    icon: reactLogo,
  },
  {
    title: "AI/ML Engineer",
    icon: aimlLogo,
  },
];

const technologies = [
  {
    name: "Python",
    icon: pythonLogo,
  },
  {
    name: "C++ Programmer",
    icon: cppLogo,
  },
  {
    name: "SQL",
    icon: sqlLogo,
  },

  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
  
];

const experiences = [
  {
    title: "Software Developer",
    company_name: "Indiana University Bloomington",
    icon: iuLogo,
    iconBg: "#ffffff",
    date: "June 2025 - Ongoing",
    type: "work",
    points: [
      "Developing an iOS event discovery app for Indiana University using SwiftUI, implementing 5 key features including interactive mapping (MapKit) and location-based recommendations (CoreLocation).",
      "Conducted user testing with 20+ peers, incorporating feedback that enhances user experience by streamlining event discovery for the campus community.",
    ],
  },
  {
    title: "Indiana University Bloomington",
    company_name: "Graduate",
    icon: iuLogo,
    iconBg: "#ffffff",
    date: "August 2023 - May 2025",
    type: "education",
    points: [
      "Applied Algorithms, Advanced Database Concepts",
      "Knowledge based AI, Software Engineering",
    ],
  },
  {
    title: "Research Assistant Intern",
    company_name: "Pune Institute of Computer Technology",
    icon: pictLogo,
    iconBg: "#ffffff",
    date: "Jan 2022 - Jan 2023",
    type: "work",
    points: [
      "Implemented a Convolutional Neural Network for weather condition classification with an 88% accuracy, contributing key findings to the project",
    ],
  },
  {
    title: "Web Developer Intern",
    company_name: "Finquest (Indian Economics Updates)",
    iconBg: "#ffffff",
    date: "June 2021 - September 2021",
    type: "work",
    points: [
      "Designed the front-end of a website that showcases news articles produced by FinQuest",
      "Experimented with Bootstrap to produce an eye-catching grid display of articles using the ReactJs Framework",
    ],
  },
  {
    title: "Pune Institute Of Computer Technology",
    company_name: "Undergraduate",
    icon: pictLogo,
    iconBg: "#ffffff",
    date: "August 2019 - May 2023",
    type: "education",
    points: [
      "PICT Hackathon 2022 Runner Up - Home Security Device using old smartphones",
      "Conducted Talk on Basics of Web Development - MERN Stack",
      "Machine Learning Paper Published - Sentiment Analysis",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "XXXXXXXXXX",
    name: "XXXXXXXXXX",
    designation: "XXXXXXXXXX",
    company: "XXXXXXXXXX",
    image: "XXXXXXXXXX",
  },
  {
    testimonial:
      "XXXXXXXXXX",
    name: "XXXXXXXXXX",
    designation: "XXXXXXXXXX",
    company: "XXXXXXXXXX",
    image: "XXXXXXXXXX",
  },
  {
    testimonial:
      "XXXXXXXXXX",
    name: "XXXXXXXXXX",
    designation: "XXXXXXXXXX",
    company: "XXXXXXXXXX",
    image: "XXXXXXXXXX",
  },
];

// ... (other imports like sportsImage, planningImage should be kept)
// Make sure to import images for BloomingtonBuzz and Super Agent Project here
// e.g., import bloomingtonBuzzImage from '../assets/bloomingtonbuzz.jpg';
// import superAgentImage from '../assets/superagent.png';

// ... (navLinks, services, technologies, experiences, testimonials arrays)

const projects = [
  {
    name: "SportConnect",
    description:
    "Full-stack MERN social application enabling users to connect based on shared sports interests.",
    tags: [
      {
        name: "MERN Stack",
        color: "blue-text-gradient",
      },
      {
        name: "Docker",
        color: "green-text-gradient",
      },
      {
        name: "CI/CD pipelines",
        color: "pink-text-gradient",
      },
      {
        name: "OAuth",
        color: "blue-text-gradient",
      },
    ],
    image: sportsImage, // Keep if this is the correct image
    source_code_link: "https://github.com/IshanApte/SportsConnect", // Update if necessary
  },
  {
    name: "EventCraft",
    description:
    "CBR system for IMU Catering, automating logistical planning for events.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Case-Based Reasoning",
        color: "green-text-gradient",
      },
      {
        name: "Tkinter",
        color: "pink-text-gradient",
      },
      {
        name: "Pandas",
        color: "blue-text-gradient",
      },
    ],
    image: planningImage, // Keep if this is the correct image
    source_code_link: "https://github.com/IshanApte/Event_Planning", // Update if necessary
  },
  {
    name: "BloomingtonBuzz",
    description:
    "iOS event discovery app for Indiana University.",
    tags: [
      {
        name: "SwiftUI",
        color: "blue-text-gradient",
      },
      {
        name: "CoreLocation",
        color: "green-text-gradient",
      },
      {
        name: "MapKit",
        color: "pink-text-gradient",
      },
      {
        name: "MVVM",
        color: "blue-text-gradient",
      },
    ],
    image: bloomingtonBuzzImage,
    source_code_link: "https://github.com/IshanApte/BloomingtonBuzz", // Update with actual link
  },
  {
    name: "Super Agent Project",
    description:
    "Advanced NLP system for intent detection using OpenAI's GPT-3.5.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
      {
        name: "NLP (GPT-3.5)",
        color: "pink-text-gradient",
      },
      {
        name: "RESTful APIs",
        color: "blue-text-gradient",
      },
      {
        name: "OAuth2",
        color: "green-text-gradient",
      },
    ],
    image: superAgentImage,
    source_code_link: "https://github.com/IshanApte/SuperAgent", // Update with actual link
  },
];

export { services, technologies, experiences, testimonials, projects };
