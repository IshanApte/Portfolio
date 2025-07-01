import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingChatbotContent from './FloatingChatbotContent';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Show the initial prompt after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPrompt(true);
        setHasNewMessage(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Hide prompt after 5 seconds
  useEffect(() => {
    if (showPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showPrompt]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
    setShowPrompt(false);
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Chat Prompt Bubble */}
        <AnimatePresence>
          {showPrompt && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 max-w-xs border border-gray-200 mb-2"
            >
              <div className="text-sm text-gray-700">
                <p className="font-medium text-blue-600">👋 Want to learn more about my experience?</p>
                <p className="text-xs text-gray-500 mt-1">Ask me anything!</p>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Button */}
        <motion.button
          onClick={handleToggleChat}
          className="relative bg-orange-500 hover:bg-orange-600 text-white rounded-full p-5 shadow-lg transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 10px 25px rgba(249, 115, 22, 0.3)",
              "0 10px 25px rgba(249, 115, 22, 0.6), 0 0 30px rgba(249, 115, 22, 0.4)",
              "0 10px 25px rgba(249, 115, 22, 0.3)",
              "0 10px 25px rgba(249, 115, 22, 0.6), 0 0 30px rgba(249, 115, 22, 0.4)",
              "0 10px 25px rgba(249, 115, 22, 0.3)",
              "0 10px 25px rgba(249, 115, 22, 0.6), 0 0 30px rgba(249, 115, 22, 0.4)",
              "0 10px 25px rgba(249, 115, 22, 0.3)"
            ]
          }}
          transition={{
            boxShadow: {
              duration: 8,
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 15
            }
          }}
        >
          {/* Notification Badge */}
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          )}
          
          {/* Chat Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="8" cy="12" r="1" />
                <circle cx="16" cy="12" r="1" />
              </>
            )}
          </svg>
        </motion.button>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4 sm:items-end sm:justify-end sm:p-6"
            onClick={handleToggleChat}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-lg shadow-2xl w-full max-w-lg h-[600px] sm:h-[700px] max-h-[90vh] sm:max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg min-h-[72px]">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">IA</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">Agentic Ishan</h3>
                    <p className="text-xs text-green-600 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                      Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleToggleChat}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-200 rounded-full flex-shrink-0 ml-3"
                  title="Close chat"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-hidden">
                <FloatingChatbotContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot; 