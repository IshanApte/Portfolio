import React from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { nodejs, threejs, tailwind } from "../assets";

const Footer = () => {

  return (
    <footer className={`${styles.paddingX} w-full py-5 bg-background`}>
      <div className="w-full flex flex-col items-center max-w-7xl mx-auto">
        {/* Center with logo and info */}
        <div className="flex flex-col items-center">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => window.scrollTo(0, 0)}
          >
            <p className="text-text-primary text-[18px] cursor-pointer">
              Ishan Apte | Powered By: 
            </p>
            <img src={nodejs} alt="NodeJs" className="w-9 h-9 object-contain" />
            <img src={threejs} alt="threejs" className="w-9 h-9 object-contain" />
            <img src={tailwind} alt="tailwind" className="w-9 h-9 object-contain" />
          </Link>
          
          {/* Privacy Policy Link */}
          <div className="mt-3">
            <Link
              to="/privacy-policy"
              className="text-text-secondary hover:text-accent text-sm transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
