import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles"; // Assuming you want to reuse styles from your navbar
import { navLinks } from "../constants";
import { nodejs, threejs, tailwind } from "../assets"; // You can also use a logo or any other relevant image

// Helper component for dropdown menu (Copied from Navbar.jsx)
const DropdownMenu = ({ subLinks }) => {
  return (
    <ul className="absolute bottom-full right-0 bg-white shadow-lg rounded-md mb-2 py-1 z-20">
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

const Footer = () => {
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Find the resume navLink entry
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
    <footer className={`${styles.paddingX} w-full py-5 bg-primary text-white`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side with logo and small info */}
        <div className="flex flex-col items-start">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => window.scrollTo(0, 0)}
          >
            <p className="text-black text-[18px] cursor-pointer">
              Ishan Apte | Powered By: 
            </p>
            <img src={nodejs} alt="NodeJs" className="w-9 h-9 object-contain" />
            <img src={threejs} alt="threejs" className="w-9 h-9 object-contain" />
            <img src={tailwind} alt="tailwind" className="w-9 h-9 object-contain" />

            
          </Link>
        </div>

        {/* Links in the footer */}
        {/* Resume Dropdown */}
        {resumeLink && resumeLink.subLinks && (
          <div className="relative" ref={dropdownRef}>
            <button
              className={`cursor-pointer ${resumeLink.color ? resumeLink.color : 'text-black'} flex items-center`}
              onClick={() => {
                setResumeDropdownOpen(!resumeDropdownOpen);
              }}
            >
              {resumeLink.title}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {resumeDropdownOpen && <DropdownMenu subLinks={resumeLink.subLinks} />}
          </div>
        )}
        
      </div>

    </footer>
  );
};

export default Footer;
