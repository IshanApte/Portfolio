import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { navLinks } from "../constants";

const DropdownMenu = ({ subLinks }) => {
  return (
    <ul className="absolute bottom-full right-0 md:left-0 bg-white shadow-lg rounded-md mb-2 py-1 z-20 min-w-max">
      {subLinks.map((subLink) => (
        <li key={subLink.id}>
          <a
            href={subLink.href}
            target={subLink.target || "_self"}
            rel="noopener noreferrer"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            {subLink.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Contact = () => {
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const resumeLink = navLinks.find(link => link.id === 'resume');

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResumeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-8">
      <div className="w-full mb-6 lg:mb-0">
        <h1 className="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">Like something you see? Get in touch.</h1>
        <div className="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
    </div>
    <div className="flex flex-wrap -m-4 text-center">
      <div className="p-4 sm:w-1/4 w-1/2">
        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6 hover:shadow-xl transition-all duration-200">
          <a href="https://www.linkedin.com/in/ishan-apte-1489a9213/">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">Linkedin</h2></a>
            {/* <p className="leading-relaxed text-gray-100 font-bold">Linkedin</p> */}
        </div>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6 hover:shadow-xl transition-all duration-200">
          <a href="https://github.com/IshanApte">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">Github</h2></a>
            {/* <p className="leading-relaxed text-gray-100 font-bold"><img className="object-contain" src="src/assets/github.png"/></p> */}
        </div>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <div className="bg-indigo-500 rounded-lg p-2 xl:p-6 hover:shadow-xl transition-all duration-200">
          <a href="mailto: ishan.apte01@gmail.com">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">Gmail</h2></a>
            {/* <p className="leading-relaxed text-gray-100 font-bold"><img className="object-contain" src="src/assets/gmail.png"/></p> */}
        </div>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        {resumeLink && resumeLink.subLinks ? (
          <div className="relative" ref={dropdownRef}>
            <div className="bg-indigo-500 rounded-lg p-2 xl:p-6 hover:shadow-xl transition-all duration-200">
              <button
                onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                className={`title-font font-medium sm:text-4xl text-3xl text-white w-full flex items-center justify-center`}
              >
                {resumeLink.title}
                <svg className="w-4 h-4 sm:w-6 sm:h-6 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            {resumeDropdownOpen && <DropdownMenu subLinks={resumeLink.subLinks} />}
          </div>
        ) : (
          <div className="bg-indigo-500 rounded-lg p-2 xl:p-6 hover:shadow-xl transition-all duration-200">
            <a href="#" target="_blank">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">Resume</h2>
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
  );
}
export default SectionWrapper(Contact, "contact");
