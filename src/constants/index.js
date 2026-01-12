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
import brainstormAIImage from '../assets/BrainstormAI.png';
import remindImage from '../assets/remind.png'; // placeholder - update when image is provided
// import resumefile from '/IshanApteResume.pdf';



export const navLinks = [
  {
    id: "about",
    title: "About",
    href: "top",
  },
  {
    id: "projects",
    title: "Selected Works",
    href: "projects",
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
    title: "Machine Learning Engineer",
    company_name: "Pune Institute of Computer Technology",
    icon: pictLogo,
    iconBg: "#ffffff",
    date: "Jan 2023 - Aug 2023",
    type: "work",
    points: [
      "Implemented a Convolutional Neural Network for weather condition classification with an 88% accuracy, contributing key findings to the project",
    ],
  },
  {
    title: "Web Developer",
    company_name: "FinQuest India",
    iconBg: "#ffffff",
    date: "Jan 2022 - Sep 2022",
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
    name: "ReMind",
    subtitle: "AI-powered research assistant",
    impact: "A dynamic memory system for AI that adapts to topic flow, keeping retrieval aligned with the current conversation context.",
    description: "ReMind turns dense textbooks into a chat you can actually follow, keeping the conversation locked onto whatever topic you're on right now instead of repeating stale answers. It remembers what you keep asking about, gently forgets the rest.",
    tags: [
      { name: "RAG", color: "blue-text-gradient" },
      { name: "Next.js", color: "green-text-gradient" },
      { name: "LangChain", color: "pink-text-gradient" },
    ],
  image: remindImage,
  source_code_link: "https://github.com/IshanApte/ReMind",
  live_demo_link: "https://remind-iota.vercel.app/",
    case_study_link: "",
  },
  {
    name: "Brainstorm AI",
    subtitle: "Honest AI brainstorming partner",
    impact: "A system designed to reduce AI pandering and simulate the candid, creative energy of brainstorming with friends.",
    description: "Brainstorm AI gives you a roundtable of AIs—idea generator, analyst, visionary, and skeptic—so your ideas are challenged from multiple angles instead of just being agreed with.",
    tags: [
      { name: "Node.js", color: "blue-text-gradient" },
      { name: "LangChain.js", color: "green-text-gradient" },
      { name: "RESTful APIs", color: "pink-text-gradient" },
    ],
    image: brainstormAIImage,
    source_code_link: "https://github.com/IshanApte/BrainstormAI",
    live_demo_link: "https://brainstorm-ai-seven.vercel.app/",
    case_study_link: "",
  },
  {
    name: "BloomingtonBuzz",
    subtitle: "Real-time campus event discovery",
    impact: "An iOS mobile app for real-time event discovery at Indiana University.",
    description: "SwiftUI app featuring interactive mapping with MapKit and personalized, location-based event recommendations via CoreLocation, tested with over 20 peers.",
    tags: [
      { name: "SwiftUI", color: "blue-text-gradient" },
      { name: "MapKit", color: "green-text-gradient" },
      { name: "CoreLocation", color: "pink-text-gradient" },
    ],
    image: bloomingtonBuzzImage,
    source_code_link: "https://github.com/IshanApte/BloomingtonBuzz",
    live_demo_link: "",
    case_study_link: "",
  },
  {
    name: "SportConnect",
    subtitle: "Social network for athletes",
    impact: "A full-stack MERN social application enabling users to connect based on shared sports interests.",
    description: "Full-stack social platform with secure JWT & OAuth authentication, real-time chat via Socket.io, and robust RESTful APIs handling high user request volumes.",
    tags: [
      { name: "MERN Stack", color: "blue-text-gradient" },
      { name: "Docker", color: "green-text-gradient" },
      { name: "Socket.io", color: "pink-text-gradient" },
    ],
    image: sportsImage,
    source_code_link: "https://github.com/IshanApte/SportsConnect",
    // live_demo_link: "https://sport-connect.onrender.com/",
    case_study_link: "https://medium.com/@ishanapte/sportconnect-connecting-sports-enthusiasts-through-a-full-stack-mern-application-36946979568b",
  },
] ;

export { services, technologies, experiences, testimonials, projects };
