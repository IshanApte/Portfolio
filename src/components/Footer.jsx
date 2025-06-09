import React from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { nodejs, threejs, tailwind } from "../assets";

const Footer = () => {

  return (
    <footer className={`${styles.paddingX} w-full py-5 bg-primary text-white`}>
      <div className="w-full flex justify-center items-center max-w-7xl mx-auto">
        {/* Center with logo and info */}
        <div className="flex flex-col items-center">
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
      </div>
    </footer>
  );
};

export default Footer;
