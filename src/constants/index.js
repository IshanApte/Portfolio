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


export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
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
    icon: 'src/assets/tech/reactjs.png',
  },
  {
    title: "AI/ML Engineer",
    icon:"src/assets/tech/aiml.png",
  },
];

const technologies = [
  {
    name: "Python",
    icon: 'src/assets/tech/pythonlogo.png',
  },
  {
    name: "C++ Programmer",
    icon: "src/assets/tech/cpplogo.png",
  },
  {
    name: "SQL",
    icon: "src/assets/tech/sql.png",
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
    title: "Pune Institute Of Computer Technology",
    company_name: "Undergraduate",
    icon: "src/assets/company/pict.png",
    iconBg: "#ffffff",
    date: "August 2019 - May 2023",
    points: [
      "PICT Hackathon 2022 Runner Up - Home Security Device using old smartphones",
      "Conducted Talk on Basics of Web Development - MERN Stack",
      "Machine Learning Paper Published - Sentiment Analysis",
    ],
  },
  {
    title: "Web Developer Intern",
    company_name: "Finquest (Indian Economics Updates)",
    iconBg: "#ffffff",
    date: "June 2021- September 2021",
    points: [
      "Designed the front-end of a website that showcases news articles produced by FinQuest",
      "Experimented with Bootstrap to produce an eye-catching grid display of articles using the ReactJs Framework",
    ],
  },
  {
    title: "Research Assistant Intern",
    company_name: "Pune Institute of Computer Technology",
    icon: "src/assets/company/pict.png",
    iconBg: "#ffffff",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Implemented a Convolutional Neural Network for weather condition classification with an 88% accuracy, contributing key findings to the project",
    ],
  },
  {
    title: "Indiana University Bloomington",
    company_name: "Graduate",
    icon: 'src/assets/company/iu.png',
    iconBg: "#ffffff",
    date: "August 2023 - May 2025 (Ongoing)",
    points: [
      "Applied Algorithms, Advanced Database Concepts",
      "Knowledge based AI, Software Engineering",
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

const projects = [
  {
    name: "SportConnect",
    description:
    "A full-stack social media application built using the MERN stack, designed to help users find people with similar sporting interests. Key features include Login, Posts, Comments, and Chat functionalities.",
    tags: [
      {
        name: "MERN",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "docker",
        color: "pink-text-gradient",
      },
    ],
    image: "src/assets/sports.jpg",
    source_code_link: "https://github.com/",
  },
  {
    name: "AI Planning - Event Management",
    description:
    "An AI-driven event planning system developed using Python and Case-Based Reasoning, helping IMU Catering streamline the planning of over 15 events per month with reduced overhead. Integrated with a user-friendly interface using Tkinter.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "cbr",
        color: "green-text-gradient",
      },
      {
        name: "tkinter",
        color: "pink-text-gradient",
      },
    ],
    image: "src/assets/planning.png",
    source_code_link: "https://github.com/",
  },
  {
    name: "Hydroponics Project",
    description:
    "An autonomous hydroponic system using Raspberry Pi, Python, and physical sensors to optimize environmental conditions. This project resulted in a 30% higher vegetable yield while utilizing 40% less space compared to traditional farming methods.",
    tags: [
      {
        name: "raspberrypi",
        color: "blue-text-gradient",
      },
      {
        name: "python",
        color: "green-text-gradient",
      },
      {
        name: "sensors",
        color: "pink-text-gradient",
      },
    ],
    image: "src/assets/plant.png",
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
