import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';  // Import from react-scroll

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-black text-[18px] font-bold cursor-pointer flex '>
            Ishan &nbsp;
            <span className='sm:block hidden'> | Portfolio</span>
          </p>
        </RouterLink>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li key={nav.id} className={`${nav.id === active ? 'text-active' : ''}`}>
              {/* Handle internal scroll links */}
              {nav.href.startsWith("http") ? (
                <a
                  href={nav.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={nav.color ? nav.color : ''}
                >
                  {nav.title}
                </a>
              ) : (
                <ScrollLink
                to={nav.href}
                smooth={true}
                duration={500}  // Consistent scroll speed (500ms)
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
      <a
        href={nav.href}
        target={nav.id === "resume" ? "_blank" : "_self"} // Open in a new tab for external links
        rel={nav.id === "resume" ? "noopener noreferrer" : ""}
        className={nav.color ? nav.color : ''}  // Apply color class only if it exists
      >
        {nav.title}
      </a>
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
