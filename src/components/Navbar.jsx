import React, { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';  // Import from react-scroll

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

// Helper component for dropdown menu
const DropdownMenu = ({ subLinks }) => {
  return (
    <ul className="absolute bg-primary shadow-lg rounded-md mt-2 py-1 z-20">
      {subLinks.map((subLink) => (
        <li key={subLink.id}>
          <a
            href={subLink.href}
            target={subLink.target || "_self"} // Default to _self if target is not specified
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

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <RouterLink
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.location.reload();
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          {/* <p className='text-black text-[18px] font-bold cursor-pointer flex '>
            Ishan &nbsp;
            <span className='sm:block hidden'> | Portfolio</span>
          </p> */}
        </RouterLink>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li key={nav.id} className={`relative group ${nav.id === active ? 'text-active' : ''}`} ref={nav.id === 'resume' ? dropdownRef : null}>
              {nav.subLinks ? (
                <>
                  <button 
                    className={`cursor-pointer ${nav.color ? nav.color : ''} flex items-center`}
                    onClick={() => {
                      setActive(nav.id);
                      setResumeDropdownOpen(!resumeDropdownOpen);
                    }}
                  >
                    {nav.title}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {resumeDropdownOpen && <DropdownMenu subLinks={nav.subLinks} />}
                </>
              ) : nav.href && nav.href.startsWith("http") ? (
                <a
                  href={nav.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={nav.color ? nav.color : ''}
                >
                  {nav.title}
                </a>
              ) : nav.href.startsWith("/") ? (
                <RouterLink
                  to={nav.href}
                  className={nav.color ? nav.color : ''}
                  onClick={() => setActive(nav.id)}
                >
                  {nav.title}
                </RouterLink>
              ) : (
                <ScrollLink
                  to={nav.href}
                  smooth={true}
                  duration={500}
                  className="cursor-pointer"
                  onClick={() => setActive(nav.id)}
                >
                  {nav.title}
                </ScrollLink>
              )}
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className={`w-[28px] h-[28px] object-contain ${toggle ? "text-white" : "text-black"}`}
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } 
            p-6 bg-[#C0C0C0] absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  {nav.subLinks ? (
                    <span 
                      className={`font-medium cursor-default ${nav.color ? nav.color : ''}`}
                      onClick={() => {
                        setActive(nav.id); 
                      }}
                    >
                      {nav.title}
                    </span>
                  ) : nav.href && nav.href.startsWith("http") ? (
                    <a
                      href={nav.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={nav.color ? nav.color : ''}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.id);
                      }}
                    >
                      {nav.title}
                    </a>
                  ) : nav.href && nav.href.startsWith("/") ? (
                    <RouterLink
                      to={nav.href}
                      className={nav.color ? nav.color : ''}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.id);
                      }}
                    >
                      {nav.title}
                    </RouterLink>
                  ) : (
                    <a
                      href={`#${nav.href}`}
                      className={nav.color ? nav.color : ''}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.id);
                      }}
                    >
                      {nav.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
