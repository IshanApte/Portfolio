import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const premiumEase = [0.16, 1, 0.3, 1];

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const {
    name,
    tagline,
    description,
    tags = [],
    image,
    videoSrc,
    frame,
    source_code_link,
    live_demo_link,
    case_study_link,
  } = project;

  const hasCaseStudy = case_study_link && case_study_link.trim() !== "";
  const hasSourceCode = source_code_link && source_code_link.trim() !== "";
  const secondaryLink = hasCaseStudy ? case_study_link : hasSourceCode ? source_code_link : null;
  const secondaryText = hasCaseStudy ? "Case Study" : hasSourceCode ? "Code" : "";
  const isPhone = frame === "phone";

  const mediaEl = videoSrc ? (
    <video
      src={videoSrc}
      controls
      autoPlay
      playsInline
      className={isPhone ? "w-full h-full object-cover" : "w-full h-full object-contain"}
    />
  ) : image ? (
    <img
      src={image}
      alt={`${name} demo`}
      loading="lazy"
      decoding="async"
      className={isPhone ? "w-full h-full object-cover" : "w-full h-full object-contain"}
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-text-primary via-[#132347] to-accent" />
  );

  const textContent = (
    <>
      <h3 className="text-white font-bold text-xl lg:text-2xl">{name}</h3>
      <p className="text-white/70 text-sm lg:text-base">{tagline}</p>
      {description && (
        <p className="text-white/60 text-sm lg:text-base leading-relaxed">{description}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className="text-white/80 text-xs px-3 py-1 rounded-full border border-white/20"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-3">
        {live_demo_link && (
          <a
            href={live_demo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-text-primary font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-white/90 transition-colors"
          >
            Live demo ↗
          </a>
        )}
        {secondaryLink && (
          <a
            href={secondaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-white font-semibold px-5 py-2.5 rounded-full text-sm border border-white/30 hover:border-white/60 transition-colors"
          >
            {secondaryText}
          </a>
        )}
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: premiumEase }}
          onClick={onClose}
        >
          <motion.div
            className={`relative w-full ${isPhone ? "max-w-3xl" : "max-w-2xl"} max-h-[90vh] rounded-2xl bg-text-primary shadow-2xl overflow-hidden`}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: premiumEase }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {isPhone ? (
              <div className="flex flex-col md:flex-row max-h-[90vh]">
                <div className="md:w-[42%] shrink-0 bg-gradient-to-b from-accent/25 via-text-primary to-text-primary flex items-center justify-center p-6 md:p-8">
                  <div className="relative w-full max-w-[220px] aspect-[9/19.5] rounded-[2rem] overflow-hidden ring-1 ring-white/10 shadow-xl bg-black">
                    <div className="absolute top-0 inset-x-0 h-5 z-10 bg-black flex items-end justify-center pb-0.5 pointer-events-none">
                      <div className="w-10 h-1.5 bg-[#1c1c1e] rounded-full ring-1 ring-white/10" />
                    </div>
                    {mediaEl}
                  </div>
                </div>
                <div className="flex-1 p-6 lg:p-7 flex flex-col justify-center gap-3 overflow-y-auto">
                  {textContent}
                </div>
              </div>
            ) : (
              <div className="max-h-[90vh] overflow-y-auto">
                <div className="w-full aspect-video bg-gradient-to-b from-accent/25 via-text-primary to-text-primary flex items-center justify-center">
                  {mediaEl}
                </div>
                <div className="p-6 lg:p-7 flex flex-col gap-3">{textContent}</div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
