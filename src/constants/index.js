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

import nerdlingImage from '../assets/NerdlingThumbnail.png';
import planningImage from '../assets/planning.png';
// import plantImage from '../assets/plant.png';
import bloomingtonBuzzImage from '../assets/Bloomington_buzz_app_img.jpeg';
import superAgentImage from '../assets/gmailagent.png';
import brainstormAIImage from '../assets/BrainstormAI.png';
import remindImage from '../assets/remind.png'; // placeholder - update when image is provided
import fallIntoFlowImage from '../assets/IndigoBooking.jpeg';



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
    title: "Software Engineer",
    company_name: "Copart",
    date: "April 2026 - Ongoing",
    type: "work",
    points: [],
  },
  {
    title: "Software Developer",
    company_name: "Indiana University Bloomington",
    date: "June 2025 - March 2026",
    type: "work",
    points: [],
  },
  {
    title: "Indiana University Bloomington",
    company_name: "Graduate",
    date: "August 2023 - May 2025",
    type: "education",
    points: [
      "Applied Algorithms, Advanced Database Concepts",
      "Knowledge based AI, Software Engineering",
    ],
  },
  {
    title: "Software Developer",
    company_name: "Pune Institute of Computer Technology",
    date: "Jan 2023 - Aug 2023",
    type: "work",
    points: [],
  },
  {
    title: "Software Developer",
    company_name: "FinQuest India",
    date: "Jan 2022 - Sep 2022",
    type: "work",
    points: [],
  },
  {
    title: "Pune Institute Of Computer Technology",
    company_name: "Undergraduate",
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
    tagline: "Turns dense textbooks into a chat that stays locked onto your current topic.",
    impact: "A dynamic memory system for AI that adapts to topic flow, keeping retrieval aligned with the current conversation context.",
    description: "ReMind turns dense textbooks into a chat you can actually follow, keeping the conversation locked onto whatever topic you're on right now instead of repeating stale answers. It remembers what you keep asking about, gently forgets the rest.",
    tags: [
      { name: "RAG", color: "blue-text-gradient" },
      { name: "Next.js", color: "green-text-gradient" },
      { name: "LangChain", color: "pink-text-gradient" },
    ],
  image: remindImage,
  imagePosition: "top",
  imageScale: 0.84,
  frame: "browser",
  source_code_link: "https://github.com/IshanApte/ReMind",
  live_demo_link: "https://remind-iota.vercel.app/",
    case_study_link: "",
  },
  {
    name: "Brainstorm AI",
    subtitle: "Honest AI brainstorming partner",
    tagline: "A roundtable of AIs that challenge your ideas instead of just agreeing.",
    impact: "A system designed to reduce AI pandering and simulate the candid, creative energy of brainstorming with friends.",
    description: "Brainstorm AI gives you a roundtable of AIs—idea generator, analyst, visionary, and skeptic—so your ideas are challenged from multiple angles instead of just being agreed with.",
    tags: [
      { name: "Node.js", color: "blue-text-gradient" },
      { name: "LangChain.js", color: "green-text-gradient" },
      { name: "REST", color: "pink-text-gradient" },
    ],
    image: brainstormAIImage,
    imagePosition: "top",
    imageScale: 0.8,
    frame: "browser",
    source_code_link: "https://github.com/IshanApte/BrainstormAI",
    live_demo_link: "https://brainstorm-ai-seven.vercel.app/",
    case_study_link: "",
  },
  {
    name: "BloomingtonBuzz",
    subtitle: "Real-time campus event discovery",
    tagline: "Real-time campus event discovery with location-based recommendations.",
    impact: "An iOS mobile app for real-time event discovery at Indiana University.",
    description: "SwiftUI app featuring interactive mapping with MapKit and personalized, location-based event recommendations via CoreLocation, tested with over 20 peers.",
    tags: [
      { name: "SwiftUI", color: "blue-text-gradient" },
      { name: "MapKit", color: "green-text-gradient" },
      { name: "CoreLocation", color: "pink-text-gradient" },
    ],
    image: bloomingtonBuzzImage,
    imagePosition: "top",
    imageScale: 0.84,
    frame: "phone",
    source_code_link: "https://github.com/IshanApte/BloomingtonBuzz",
    live_demo_link: "",
    case_study_link: "",
  },
  {
    name: "Nerdling",
    subtitle: "In-page definition assistant",
    tagline: "Highlight any text and get it explained your way — simple, technical, or by analogy.",
    impact: "Nerdling drops instant explanations right where you're reading, so you never lose your place switching tabs to look up a word.",
    description: "Select any text, pick how you want to understand it (simple, technical, analogy, or example), and keep moving.",
    tags: [
      { name: "Chrome Extension", color: "blue-text-gradient" },
      { name: "Cloudflare Workers", color: "green-text-gradient" },
      { name: "LLM", color: "purple-text-gradient" },
    ],
    image: nerdlingImage,
    imagePosition: "bottom",
    imageScale: 0.8,
    frame: "browser",
    source_code_link: "",
    live_demo_link: "https://chromewebstore.google.com/detail/nerdling-in-page-definiti/akkknmodhphepelgkikghbhphgaokdop",
    case_study_link: "",
  },
  {
    name: "Fall Into Flow",
    subtitle: "Adaptive focus music for iOS",
    tagline: "Background music that fades to your focus — custom volume curves and a study session timer.",
    impact: "",
    description: "",
    tags: [
      { name: "iOS", color: "blue-text-gradient" },
      { name: "SwiftUI", color: "green-text-gradient" },
      { name: "AVAudioEngine", color: "pink-text-gradient" },
    ],
    image: fallIntoFlowImage,
    imagePosition: "top",
    imageScale: 0.84,
    frame: "phone",
    source_code_link: "",
    live_demo_link: "",
    case_study_link: "",
  },
] ;

const processTile = {
  text: "eclectic collection of projects",
};

export { services, technologies, experiences, testimonials, projects, processTile };
