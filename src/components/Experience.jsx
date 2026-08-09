import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const premiumEase = [0.16, 1, 0.3, 1];

// Jewel-toned category colors — the only two colors that carry meaning here.
const eduColor = "#4338CA"; // indigo
const workColor = "#0F766E"; // teal

const pageBg = "#F9FAFB";
const inkPrimary = "#12141C";
const inkSecondary = "#6B7280";

const fontSerif = "'Fraunces', serif";
const fontSans = "'Inter', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

const placeholderPoints = [
  "Placeholder highlight — details coming soon.",
  "Placeholder highlight — details coming soon.",
];
const placeholderTags = ["Tag 1", "Tag 2", "Tag 3"];

const isOngoing = (dateStr) => (dateStr || "").toLowerCase().includes("ongoing");

const parseMonthYear = (str) => {
  const d = new Date(str.trim());
  return isNaN(d.getTime()) ? null : d;
};

const getDuration = (dateStr) => {
  if (!dateStr || !dateStr.includes(" - ")) return null;
  const [startStr, endStr] = dateStr.split(" - ");
  const start = parseMonthYear(startStr);
  const end = isOngoing(endStr) ? new Date() : parseMonthYear(endStr);
  if (!start || !end) return null;

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remMonths > 0 || years === 0) parts.push(`${remMonths} mo${remMonths !== 1 ? "s" : ""}`);
  return parts.join(" ");
};

const entryKey = (experience) => `${experience.title}-${experience.company_name}`;

const TimelineCard = ({ experience, index, isLast, isOpen, onToggle }) => {
  const color = experience.type === "education" ? eduColor : workColor;
  const points = (experience.points?.length ?? 0) > 0 ? experience.points : placeholderPoints;
  const summary = experience.summary;
  const tags = (experience.tags?.length ?? 0) > 0 ? experience.tags : placeholderTags;
  const ongoing = isOngoing(experience.date);
  const duration = getDuration(experience.date);

  return (
    <motion.div
      className="relative flex gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      {/* Spine + node */}
      <div className="relative flex flex-col items-center">
        <div className="relative mt-1.5 shrink-0">
          {ongoing && (
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: color }}
              animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <span
            className="relative block w-3 h-3 rounded-full ring-4"
            style={{ backgroundColor: color, boxShadow: `0 0 0 4px ${pageBg}` }}
          />
        </div>
        {!isLast && <span className="w-px flex-1 mt-1" style={{ backgroundColor: "#D1D5DB" }} />}
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 mb-6 rounded-2xl bg-white overflow-hidden border"
        style={{
          borderColor: "#E2E4E9",
          borderLeft: `3px solid ${color}`,
          boxShadow: "0 1px 2px rgba(18,20,28,0.05), 0 8px 24px rgba(18,20,28,0.08)",
        }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: premiumEase }}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-start justify-between gap-4 text-left px-5 py-4 rounded-2xl
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ outlineColor: color }}
        >
          <div className="min-w-0">
            <h3
              className="text-[17px] font-semibold leading-snug"
              style={{ color: inkPrimary, fontFamily: fontSans }}
            >
              {experience.title}
            </h3>
            <p className="text-[14px] mt-0.5" style={{ color: inkSecondary, fontFamily: fontSans }}>
              {experience.company_name}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span
                className="text-[11px] px-2 py-0.5 rounded-full"
                style={{ fontFamily: fontMono, color, backgroundColor: `${color}14` }}
              >
                {experience.date}
              </span>
              {duration && (
                <span className="text-[11px]" style={{ fontFamily: fontMono, color: inkSecondary }}>
                  {duration}
                </span>
              )}
            </div>
          </div>

          <motion.span
            className="shrink-0 mt-1"
            style={{ color }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: premiumEase }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: premiumEase }}
            >
              <div className="px-5 pb-5">
                {summary && (
                  <p
                    className="text-[13.5px] leading-relaxed"
                    style={{ color: inkSecondary, fontFamily: fontSans }}
                  >
                    {summary}
                  </p>
                )}

                <ul className={`${summary ? "mt-3" : ""} pl-4 list-disc space-y-1`}>
                  {points.map((point, pointIndex) => (
                    <li
                      key={`experience-point-${pointIndex}`}
                      className="text-[13px] tracking-wide"
                      style={{ color: inkSecondary, fontFamily: fontSans }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tags.map((tag, tagIndex) => (
                    <span
                      key={`experience-tag-${tagIndex}`}
                      className="text-[11px] px-2 py-1 rounded-md border"
                      style={{ fontFamily: fontMono, color: inkPrimary, borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const filters = [
  { key: "all", label: "All" },
  { key: "work", label: "Experience" },
  { key: "education", label: "Education" },
];

const Experience = () => {
  const [filter, setFilter] = useState("all");
  const defaultOpenKey = useMemo(() => {
    const ongoingEntry = experiences.find((experience) => isOngoing(experience.date));
    return ongoingEntry ? entryKey(ongoingEntry) : null;
  }, []);
  const [openKey, setOpenKey] = useState(defaultOpenKey);

  const visibleExperiences =
    filter === "all" ? experiences : experiences.filter((experience) => experience.type === filter);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`} style={{ fontFamily: fontMono }}>
          What I have done so far
        </p>
        <h2
          className="font-medium md:text-[56px] sm:text-[46px] xs:text-[36px] text-[28px] text-center"
          style={{ fontFamily: fontSerif }}
        >
          <span style={{ color: eduColor }}>Education</span>{" "}
          <span style={{ color: inkPrimary }}>&</span>{" "}
          <span style={{ color: workColor }}>Work Experience</span>
          <span style={{ color: inkPrimary }}>.</span>
        </h2>
      </motion.div>

      <div className="mt-10 max-w-2xl mx-auto">
        <div className="flex justify-center gap-2 mb-8" role="group" aria-label="Filter timeline">
          {filters.map(({ key, label }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={active}
                className="text-[13px] px-4 py-1.5 rounded-full transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  fontFamily: fontSans,
                  fontWeight: 600,
                  color: active ? "#FFFFFF" : inkSecondary,
                  backgroundColor: active ? inkPrimary : "#FFFFFF",
                  outlineColor: inkPrimary,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div>
          {visibleExperiences.map((experience, index) => (
            <TimelineCard
              key={entryKey(experience)}
              experience={experience}
              index={index}
              isLast={index === visibleExperiences.length - 1}
              isOpen={openKey === entryKey(experience)}
              onToggle={() =>
                setOpenKey((current) => (current === entryKey(experience) ? null : entryKey(experience)))
              }
            />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
};

export default SectionWrapper(Experience, "work");
