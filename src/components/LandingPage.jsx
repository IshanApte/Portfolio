import React, { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText } from '../utils/gsap';

const LandingPage = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const chipsRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image gently recedes as the page scrolls past it
      gsap.to(heroRef.current, {
        scale: 0.94,
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text intro timeline, skipped entirely for reduced-motion users
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        SplitText.create(headingRef.current, {
          type: 'words',
          mask: 'words',
          onSplit(self) {
            return gsap
              .timeline({ defaults: { ease: 'power3.out' } })
              .from(self.words, {
                yPercent: 120,
                opacity: 0,
                stagger: 0.08,
                duration: 0.8,
              })
              .from(subTextRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
              .from(chipsRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
              .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section with Background Image */}
      <div
        ref={heroRef}
        className="relative w-full h-[50vh] md:h-[67vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/1.png)',
          backgroundPosition: 'center center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#F9FAFB',
        }}
      >
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/40" />
      </div>

      {/* Content Section Below Hero */}
      <div
        className="w-full py-16 px-6"
        style={{ backgroundColor: '#F9FAFB' }}
      >
        <div className="text-center max-w-3xl mx-auto">
          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-4xl font-black mb-3 tracking-tight leading-tight"
            style={{ color: '#0F172A' }}
          >
            Software Engineer
          </h1>

          {/* Subtext */}
          <p
            ref={subTextRef}
            className="text-lg md:text-xl mb-3 leading-normal font-normal max-w-2xl md:max-w-none mx-auto md:whitespace-nowrap"
            style={{ color: '#64748B' }}
          >
            Full-stack engineer shipping end-to-end systems in React and Java.
          </p>

          {/* Chips */}
          <div ref={chipsRef} className="mb-4">
            <div className="flex flex-wrap justify-center items-center gap-2 text-sm" style={{ color: '#64748B' }}>
              <span>Dallas, TX</span>
              <span>·</span>
              <span>
                Software Engineer <span style={{ color: '#1254FF', fontWeight: 600 }}>@ Copart</span>
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap justify-center items-center gap-4">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="font-semibold py-3 px-6 rounded-full text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              style={{ backgroundColor: '#2563EB' }}
            >
              View my work
            </a>

            {/* Secondary CTA - LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ishan-apte-1489a9213/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold py-3 px-6 rounded-full border-2 transition-all duration-300 hover:bg-opacity-10 transform hover:scale-105"
              style={{
                borderColor: '#2563EB',
                color: '#2563EB'
              }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
