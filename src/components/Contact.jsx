import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  return (
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-8">
      <div class="w-full mb-6 lg:mb-0">
        <h1 class="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">Like something you see? Get in touch.</h1>
        <div class="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
    </div>
    <div class="flex flex-wrap -m-4 text-center">
      <div class="p-4 sm:w-1/4 w-1/2">
        <div class="bg-indigo-500 rounded-lg p-2 xl:p-6 hover:shadow-xl transition-all duration-200">
          <a href="https://www.linkedin.com/in/ishan-apte-1489a9213/">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">Linkedin</h2></a>
            {/* <p class="leading-relaxed text-gray-100 font-bold">Linkedin</p> */}
        </div>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <div class="bg-indigo-500 rounded-lg p-2 xl:p-6 hover:shadow-xl transition-all duration-200">
          <a href="https://github.com/IshanApte">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">Github</h2></a>
            {/* <p class="leading-relaxed text-gray-100 font-bold"><img class="object-contain" src="src/assets/github.png"/></p> */}
        </div>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <div class="bg-indigo-500 rounded-lg p-2 xl:p-6 hover:shadow-xl transition-all duration-200">
          <a href="mailto: ishan.apte01@gmail.com">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">Gmail</h2></a>
            {/* <p class="leading-relaxed text-gray-100 font-bold"><img class="object-contain" src="src/assets/gmail.png"/></p> */}
        </div>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <div class="bg-indigo-500 rounded-lg p-2 xl:p-6 hover:shadow-xl transition-all duration-200">
        <a href="src/assets/IshanApteResume.pdf" target="_blank">

            <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">Resume</h2></a>
            {/* <p class="leading-relaxed text-gray-100 font-bold">Download</p> */}
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
export default SectionWrapper(Contact, "contact");
