import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { projects, processTile } from "../constants";
import { gsap } from "../utils/gsap";
import ShinyText from "./ShinyText";
import ProjectModal from "./ProjectModal";

// Custom premium easing: cubic-bezier(0.16, 1, 0.3, 1)
const premiumEase = [0.16, 1, 0.3, 1];

const popHover = {
  scale: 1.03,
  y: -6,
  transition: { duration: 0.3, ease: premiumEase },
};

// Phone bezel: covers the screenshot's real status bar with a fake one,
// so it reads as "shot inside a device frame" instead of a sloppy crop.
const PhoneFrameChrome = () => (
  <div className="absolute top-0 inset-x-0 h-7 lg:h-8 z-10 bg-black flex items-end justify-center pb-1.5 pointer-events-none">
    <div className="w-16 h-2.5 lg:w-20 lg:h-3 bg-[#1c1c1e] rounded-full ring-1 ring-white/10" />
  </div>
);

// Minimal browser chrome: signals "web app" with a slim traffic-light bar.
const BrowserFrameChrome = () => (
  <div className="absolute top-0 inset-x-0 h-6 lg:h-7 z-10 bg-[#e8e8ec] flex items-center gap-1.5 px-3 pointer-events-none">
    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
  </div>
);

const BentoTile = ({
  name,
  tagline,
  tags,
  image,
  imagePosition = "center",
  imageScale = 1.05,
  frame,
  source_code_link,
  live_demo_link,
  case_study_link,
  className,
  cardRef,
  onOpen,
}) => {
  const handleLiveDemoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(live_demo_link, "_blank", "noopener,noreferrer");
  };

  const hasCaseStudy = case_study_link && case_study_link.trim() !== "";
  const hasSourceCode = source_code_link && source_code_link.trim() !== "";
  const secondaryLink = hasCaseStudy ? case_study_link : hasSourceCode ? source_code_link : null;
  const secondaryText = hasCaseStudy ? "Case Study →" : hasSourceCode ? "Code →" : "";

  const handleSecondaryClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(secondaryLink, "_blank", "noopener,noreferrer");
  };

  const tagLine = tags.map((tag) => tag.name).join(" · ");

  return (
    <div
      ref={cardRef}
      onClick={onOpen}
      className={`group relative h-72 lg:h-full hover:z-10 cursor-pointer ${className}`}
    >
      <motion.div className="relative w-full h-full" whileHover={popHover}>
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg">
          {/* Background layer: real screenshot or styled placeholder. Solid matte behind the
              image so scaling it down to "zoom out" reveals a clean edge instead of a gap. */}
          <div className="absolute inset-0 bg-text-primary">
            {image ? (
              <motion.img
                src={image}
                alt={`${name} project screenshot`}
                className="w-full h-full object-cover rounded-3xl"
                style={{ objectPosition: imagePosition }}
                loading="lazy"
                decoding="async"
                initial={{ scale: imageScale }}
                whileHover={{ scale: imageScale + 0.06, transition: { duration: 0.5, ease: premiumEase } }}
              />
            ) : (
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-text-primary via-[#132347] to-accent" />
            )}
          </div>

          {frame === "phone" && <PhoneFrameChrome />}
          {frame === "browser" && <BrowserFrameChrome />}

          {/* Legibility scrim: precisely-tuned gradient, strong enough to sit behind text over any screenshot */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.93) 22%, rgba(0,0,0,0.6) 48%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0) 100%)",
            }}
          />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5 flex flex-col gap-1">
            <h3 className="text-white font-bold text-lg lg:text-xl truncate drop-shadow-md">{name}</h3>
            <p className="hidden lg:block text-white/90 text-xs lg:text-sm drop-shadow-md lg:opacity-0 lg:group-hover:opacity-100 lg:max-h-0 lg:group-hover:max-h-10 overflow-hidden transition-all duration-300">
              {tagline}
            </p>

            {/* Tags: least essential info, so they're the one thing dropped on mobile and hover-only on desktop */}
            <p className="hidden lg:block text-white/70 text-[10px] lg:text-xs uppercase tracking-wide drop-shadow-md lg:opacity-0 lg:group-hover:opacity-100 lg:max-h-0 lg:group-hover:max-h-6 lg:group-hover:mt-1 overflow-hidden transition-all duration-300">
              {tagLine}
            </p>

            {(live_demo_link || secondaryLink) && (
              <div className="flex gap-2 mt-1 lg:mt-0 lg:group-hover:mt-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:max-h-0 lg:group-hover:max-h-10 overflow-hidden transition-all duration-300">
                {live_demo_link && (
                  <motion.button
                    onClick={handleLiveDemoClick}
                    className="bg-accent text-white font-semibold px-3 py-1.5 rounded-full hover:bg-accent/90 text-xs"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2, ease: premiumEase } }}
                  >
                    Live Demo →
                  </motion.button>
                )}
                {secondaryLink && (
                  <motion.button
                    onClick={handleSecondaryClick}
                    className="bg-white text-text-primary font-semibold px-3 py-1.5 rounded-full border-2 border-text-primary/20 hover:border-accent text-xs"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2, ease: premiumEase } }}
                  >
                    {secondaryText}
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProcessTile = ({ className, cardRef }) => (
  <div ref={cardRef} className={`relative h-72 lg:h-full hover:z-10 ${className}`}>
    <motion.div className="relative w-full h-full" whileHover={popHover}>
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-text-primary to-[#132347] flex items-center justify-center p-6 lg:p-8">
        <h3 className="text-center leading-tight">
          <ShinyText
            text={processTile.text}
            className="font-black text-3xl lg:text-5xl"
            color="#8a94a6"
            shineColor="#ffffff"
            speed={2.5}
            spread={120}
            direction="left"
          />
        </h3>
      </div>
    </motion.div>
  </div>
);

// Explicit bento layout — DOM order doubles as mobile stacking order, independent
// of the `projects` array's declaration order.
const bentoLayout = [
  {
    key: "bloomingtonbuzz",
    projectName: "BloomingtonBuzz",
    lgClasses: "lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-2",
  },
  {
    key: "remind",
    projectName: "ReMind",
    lgClasses: "lg:col-start-2 lg:row-start-1 lg:col-span-2 lg:row-span-1",
  },
  {
    key: "fallintoflow",
    projectName: "Fall Into Flow",
    lgClasses: "lg:col-start-4 lg:row-start-1 lg:col-span-1 lg:row-span-2",
  },
  {
    key: "process",
    isProcessTile: true,
    lgClasses: "lg:col-start-2 lg:row-start-2 lg:col-span-2 lg:row-span-1",
  },
  {
    key: "brainstormai",
    projectName: "Brainstorm AI",
    lgClasses: "lg:col-start-1 lg:row-start-3 lg:col-span-2 lg:row-span-1",
  },
  {
    key: "nerdling",
    projectName: "Nerdling",
    lgClasses: "lg:col-start-3 lg:row-start-3 lg:col-span-2 lg:row-span-1",
  },
];

const projectsByName = Object.fromEntries(projects.map((p) => [p.name, p]));

const Works = () => {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];
  const [selectedProject, setSelectedProject] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(cardsRef.current, {
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:auto-rows-[14rem] lg:gap-5"
      >
        {bentoLayout.map((tile, index) =>
          tile.isProcessTile ? (
            <ProcessTile
              key={tile.key}
              className={tile.lgClasses}
              cardRef={(el) => (cardsRef.current[index] = el)}
            />
          ) : (
            <BentoTile
              key={tile.key}
              {...projectsByName[tile.projectName]}
              className={tile.lgClasses}
              cardRef={(el) => (cardsRef.current[index] = el)}
              onOpen={() => setSelectedProject(projectsByName[tile.projectName])}
            />
          )
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <div className="mt-16 text-center">
        <a
          href="https://github.com/IshanApte"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white font-bold py-4 px-10 rounded-full
                     hover:bg-accent/90 transition-all duration-300
                     shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          View More on GitHub
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
