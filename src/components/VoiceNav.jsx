import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scroller } from 'react-scroll';
import { voiceNavService } from '../utils/voiceNavService';

// idle -> listening -> thinking -> (idle | error)
const STATUS = {
  IDLE: 'idle',
  LISTENING: 'listening',
  THINKING: 'thinking',
  ERROR: 'error'
};

const SpeechRecognitionImpl =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

const VoiceNav = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [message, setMessage] = useState('');
  const recognitionRef = useRef(null);

  const navigateToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -80
    });
  };

  const handleTranscript = useCallback(async (heard) => {
    setStatus(STATUS.THINKING);
    setMessage(`Heard: "${heard}"`);

    const { section } = await voiceNavService.resolveSection(heard);

    if (section) {
      navigateToSection(section);
      setStatus(STATUS.IDLE);
      setTimeout(() => setMessage(''), 1500);
    } else {
      setStatus(STATUS.ERROR);
      setMessage(`Didn't quite catch that, try again`);
      setTimeout(() => {
        setStatus(STATUS.IDLE);
        setMessage('');
      }, 3000);
    }
  }, []);

  const startListening = () => {
    if (!SpeechRecognitionImpl) {
      setStatus(STATUS.ERROR);
      setMessage('Voice navigation is not supported in this browser');
      setTimeout(() => {
        setStatus(STATUS.IDLE);
        setMessage('');
      }, 3000);
      return;
    }

    const recognition = new SpeechRecognitionImpl();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setStatus(STATUS.LISTENING);
      setMessage('Listening...');
    };

    recognition.onresult = (event) => {
      const result = event.results[0];
      const heard = result[0].transcript;
      setMessage(`Heard: "${heard}"`);

      if (result.isFinal) {
        handleTranscript(heard);
      }
    };

    recognition.onerror = () => {
      setStatus(STATUS.ERROR);
      setMessage(`Didn't catch that, try again`);
      setTimeout(() => {
        setStatus(STATUS.IDLE);
        setMessage('');
      }, 2500);
    };

    recognition.onend = () => {
      setStatus((current) => (current === STATUS.LISTENING ? STATUS.IDLE : current));
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleClick = () => {
    if (status === STATUS.LISTENING) {
      recognitionRef.current?.stop();
      return;
    }
    if (status === STATUS.THINKING) {
      return;
    }
    startListening();
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex flex-col items-start gap-2">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-white text-gray-700 text-xs sm:text-sm rounded-lg shadow-lg px-3 py-2 border border-gray-200 max-w-[200px]"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-center gap-1">
        <motion.button
          onClick={handleClick}
          aria-label="Voice navigation"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative rounded-full p-4 shadow-lg transition-colors duration-200 text-white ${
            status === STATUS.LISTENING
              ? 'bg-red-500 hover:bg-red-600'
              : status === STATUS.ERROR
              ? 'bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {status === STATUS.LISTENING && (
            <motion.span
              className="absolute inset-0 rounded-full bg-red-500"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}

          {status === STATUS.THINKING ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <svg className="relative w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              />
            </svg>
          )}
        </motion.button>

        <span
          className="text-gray-500 select-none"
          style={{ fontSize: '11px', letterSpacing: '2px', fontWeight: 500 }}
        >
          JEV
        </span>
      </div>
    </div>
  );
};

export default VoiceNav;
