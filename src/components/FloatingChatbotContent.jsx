import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { openaiService } from '../utils/openaiService';

const FloatingChatbotContent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [displayedSuggestions, setDisplayedSuggestions] = useState([]);
  const [remainingSuggestions, setRemainingSuggestions] = useState([]);
  const hasLoadedIntro = useRef(false);
  const messagesEndRef = useRef(null);

  const introMessages = [
    { from: 'bot', text: "Hi there! 👋" },
    { from: 'bot', text: "I'm here to help you learn about Ishan's experience and projects!" },
    { from: 'bot', text: "What would you like to know?" },
  ];

  const suggestedQuestions = [
    // === TECHNICAL COMPETENCY ===
    { display: "Projects?", fullQuestion: "What projects has he worked on?" },
    { display: "AI Experience?", fullQuestion: "Tell me about his AI and machine learning experience" },
    { display: "Skills?", fullQuestion: "What are his technical skills?" },
    { display: "BrainstormAI?", fullQuestion: "What is BrainstormAI and how does it work?" },
    
    // === PROVEN RESULTS & METRICS ===
    { display: "Achievements?", fullQuestion: "What are his key achievements and metrics?" },
    { display: "85% accuracy?", fullQuestion: "Tell me about the 85% accuracy in his Super Agent project" },
    { display: "Scale handled?", fullQuestion: "What kind of traffic and scale has he handled?" },
    { display: "Published work?", fullQuestion: "Has he published any research or papers?" },
    
    // === CURRENT WORK & AVAILABILITY ===
    { display: "Available when?", fullQuestion: "When is he available to start work?" },
    { display: "Current role?", fullQuestion: "What is he working on currently?" },
    { display: "Graduation?", fullQuestion: "When does he graduate?" },
    { display: "iOS development?", fullQuestion: "Tell me about his mobile development experience" },
    
    // === SYSTEM DESIGN & ARCHITECTURE ===
    { display: "Architecture?", fullQuestion: "How does he approach system design and architecture?" },
    { display: "MERN stack?", fullQuestion: "Tell me about his full-stack development experience" },
    { display: "APIs designed?", fullQuestion: "What APIs and microservices has he built?" },
    { display: "Database experience?", fullQuestion: "What databases and data systems has he worked with?" },
    
    // === AI/ML SPECIFIC ===
    { display: "LangChain expertise?", fullQuestion: "What's his experience with LangChain and LangGraph?" },
    { display: "NLP projects?", fullQuestion: "Tell me about his natural language processing work" },
    { display: "Computer vision?", fullQuestion: "What computer vision projects has he worked on?" },
    { display: "Model deployment?", fullQuestion: "How does he deploy and scale AI models?" },
    
    // === PROBLEM SOLVING ===
    { display: "Biggest challenge?", fullQuestion: "What was the most challenging technical problem he solved?" },
    { display: "Performance optimization?", fullQuestion: "How does he approach performance optimization?" },
    { display: "Team collaboration?", fullQuestion: "How does he work in team environments?" },
    { display: "Code quality?", fullQuestion: "How does he ensure code quality and maintainability?" },
    
    // === SPECIFIC TECHNOLOGIES ===
    { display: "React experience?", fullQuestion: "What's his experience with React and modern web frameworks?" },
    { display: "Python expertise?", fullQuestion: "Tell me about his Python development experience" },
    { display: "AWS/Cloud?", fullQuestion: "What cloud platforms and services has he used?" },
    { display: "Docker/DevOps?", fullQuestion: "What's his experience with containerization and DevOps?" },
    
    // === SOFT SKILLS & FIT ===
    { display: "Leadership?", fullQuestion: "Tell me about his leadership and mentoring experience" },
    { display: "Learning approach?", fullQuestion: "How does he stay updated with new technologies?" },
    { display: "Work style?", fullQuestion: "What's his preferred work environment and style?" },
    { display: "Long-term goals?", fullQuestion: "What are his career goals and aspirations?" },
    
    // === PRACTICAL LOGISTICS ===
    { display: "Contact info?", fullQuestion: "How can I get in touch with him?" },
    { display: "Resume download?", fullQuestion: "Where can I download his resume?" },
    { display: "Portfolio demo?", fullQuestion: "Can I see live demos of his projects?" },
    { display: "GitHub links?", fullQuestion: "Where can I see his code repositories?" },
    
    // === COMPETITIVE DIFFERENTIATORS ===
    { display: "What makes him unique?", fullQuestion: "What sets him apart from other candidates?" },
    { display: "Industry knowledge?", fullQuestion: "How does he stay current with industry trends?" },
    { display: "Open source?", fullQuestion: "Has he contributed to open source projects?" },
    { display: "Hackathons?", fullQuestion: "Tell me about his hackathon and competition experience" }
  ];

  // Function to shuffle and get initial suggestions
  const initializeSuggestions = () => {
    // Define the first 4 priority suggestions
    const prioritySuggestions = [
      { display: "Experience?", fullQuestion: "What work experience does he have?" },
      { display: "Projects?", fullQuestion: "What projects has he worked on?" },
      { display: "Skills?", fullQuestion: "What are his technical skills?" },
      { display: "Contact?", fullQuestion: "How can I get in touch with him?" }
    ];
    
    // Filter out the priority suggestions from the main list to avoid duplicates
    const otherSuggestions = suggestedQuestions.filter(question => 
      !prioritySuggestions.some(priority => priority.display === question.display)
    );
    
    // Shuffle the remaining suggestions
    const shuffledOthers = [...otherSuggestions].sort(() => Math.random() - 0.5);
    
    setDisplayedSuggestions(prioritySuggestions);
    setRemainingSuggestions(shuffledOthers);
  };

  // Function to replace a clicked suggestion with a new one
  const replaceSuggestion = (clickedIndex) => {
    if (remainingSuggestions.length === 0) {
      // If no remaining suggestions, just remove the clicked one
      setDisplayedSuggestions(prev => prev.filter((_, index) => index !== clickedIndex));
      return;
    }

    // Get a random suggestion from remaining ones
    const randomIndex = Math.floor(Math.random() * remainingSuggestions.length);
    const newSuggestion = remainingSuggestions[randomIndex];

    // Update displayed suggestions (replace clicked one)
    setDisplayedSuggestions(prev => {
      const updated = [...prev];
      updated[clickedIndex] = newSuggestion;
      return updated;
    });

    // Remove the used suggestion from remaining ones
    setRemainingSuggestions(prev => prev.filter((_, index) => index !== randomIndex));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // Load persisted conversation from sessionStorage
  useEffect(() => {
    setIsAIEnabled(openaiService.isAIEnabled());
    
    // Check for existing conversation in sessionStorage
    const savedMessages = sessionStorage.getItem('chatbot_messages');
    const savedHistory = sessionStorage.getItem('chatbot_conversation_history');
    const savedSuggestions = sessionStorage.getItem('chatbot_displayed_suggestions');
    const savedRemaining = sessionStorage.getItem('chatbot_remaining_suggestions');
    
    if (savedMessages) {
      try {
        // Restore previous conversation
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
        
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          setConversationHistory(parsedHistory);
        }
        
        if (savedSuggestions && savedRemaining) {
          const parsedSuggestions = JSON.parse(savedSuggestions);
          const parsedRemaining = JSON.parse(savedRemaining);
          setDisplayedSuggestions(parsedSuggestions);
          setRemainingSuggestions(parsedRemaining);
        } else {
          initializeSuggestions();
        }
        
        setShowSuggestions(true);
        hasLoadedIntro.current = true;
        
        // Scroll to bottom after restoring conversation
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      } catch (error) {
        console.error('Error loading saved conversation:', error);
        // If there's an error, clear corrupted data and start fresh
        sessionStorage.removeItem('chatbot_messages');
        sessionStorage.removeItem('chatbot_conversation_history');
        sessionStorage.removeItem('chatbot_displayed_suggestions');
        sessionStorage.removeItem('chatbot_remaining_suggestions');
        
        // Initialize normally
        initializeSuggestions();
        const loadIntro = async () => {
          if (hasLoadedIntro.current) return;
          hasLoadedIntro.current = true;
          
          for (let i = 0; i < introMessages.length; i++) {
            await new Promise(resolve => setTimeout(resolve, i === 0 ? 300 : 800));
            setMessages(prev => [...prev, introMessages[i]]);
          }
          
          setShowSuggestions(true);
        };
        loadIntro();
      }
    } else {
      // First time - initialize normally
      initializeSuggestions();
      
      // Load intro messages
      const loadIntro = async () => {
        if (hasLoadedIntro.current) return;
        hasLoadedIntro.current = true;
        
        for (let i = 0; i < introMessages.length; i++) {
          await new Promise(resolve => setTimeout(resolve, i === 0 ? 300 : 800));
          setMessages(prev => [...prev, introMessages[i]]);
        }
        
        setShowSuggestions(true);
      };
      
      loadIntro();
    }
  }, []);

  // Save conversation state to sessionStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem('chatbot_messages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages to sessionStorage:', error);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (conversationHistory.length > 0) {
      try {
        sessionStorage.setItem('chatbot_conversation_history', JSON.stringify(conversationHistory));
      } catch (error) {
        console.error('Error saving conversation history to sessionStorage:', error);
      }
    }
  }, [conversationHistory]);

  useEffect(() => {
    if (displayedSuggestions.length > 0) {
      try {
        sessionStorage.setItem('chatbot_displayed_suggestions', JSON.stringify(displayedSuggestions));
      } catch (error) {
        console.error('Error saving displayed suggestions to sessionStorage:', error);
      }
    }
  }, [displayedSuggestions]);

  useEffect(() => {
    try {
      sessionStorage.setItem('chatbot_remaining_suggestions', JSON.stringify(remainingSuggestions));
    } catch (error) {
      console.error('Error saving remaining suggestions to sessionStorage:', error);
    }
  }, [remainingSuggestions]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
      .replace(/\n/g, '<br />');
  };

  const handleSend = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage = { from: 'user', text: inputValue.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const response = await openaiService.getResponse(userMessage.text, conversationHistory);
      
      const newHistory = [
        ...conversationHistory,
        { role: 'user', content: userMessage.text },
        { role: 'assistant', content: response.answer }
      ];
      setConversationHistory(newHistory.slice(-8));

      await new Promise(resolve => setTimeout(resolve, 600));
      
      let botResponseText = response.answer;
      if (response.error) {
        botResponseText += `\n\n⚠️ *${response.error}*`;
      }
      
      setMessages(prev => [...prev, { from: 'bot', text: botResponseText }]);
      
    } catch (error) {
      console.error('Error getting response:', error);
      await new Promise(resolve => setTimeout(resolve, 600));
      setMessages(prev => [...prev, { 
        from: 'bot', 
        text: "I apologize, but I'm having trouble right now. Please try asking about Ishan's projects or experience!" 
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowSuggestions(true), 500);
    }
  };

  const handleSuggestedQuestion = async (fullQuestion, suggestionIndex) => {
    if (isLoading) return;
    
    const userMessage = { from: 'user', text: fullQuestion };
    
    // Replace the clicked suggestion with a new one
    replaceSuggestion(suggestionIndex);
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowSuggestions(false);
    
    try {
      const response = await openaiService.getResponse(fullQuestion, conversationHistory);
      
      const newHistory = [
        ...conversationHistory,
        { role: 'user', content: fullQuestion },
        { role: 'assistant', content: response.answer }
      ];
      setConversationHistory(newHistory.slice(-8));
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      let botResponseText = response.answer;
      if (response.error) {
        botResponseText += `\n\n⚠️ *${response.error}*`;
      }
      
      setMessages(prev => [...prev, { from: 'bot', text: botResponseText }]);
      
    } catch (error) {
      console.error('Error getting response:', error);
      await new Promise(resolve => setTimeout(resolve, 600));
      setMessages(prev => [...prev, { 
        from: 'bot', 
        text: "I apologize, but I'm having trouble right now. Please try asking about Ishan's projects or experience!" 
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowSuggestions(true), 500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`px-4 py-3 max-w-[80%] text-sm leading-relaxed shadow-sm ${
                  msg.from === 'bot'
                    ? 'bg-white text-gray-800 rounded-2xl rounded-tl-md border border-gray-100'
                    : 'bg-blue-600 text-white rounded-2xl rounded-tr-md'
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
              </div>
            </motion.div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white text-gray-800 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {showSuggestions && !isLoading && displayedSuggestions.length > 0 && (
        <div className="px-4 pb-2">
          <div className="flex gap-2 flex-wrap">
                         <AnimatePresence mode="popLayout">
               {displayedSuggestions.map((question, index) => (
                 <motion.button
                   key={`${question.display}-${index}`}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ duration: 0.2 }}
                   layout
                   onClick={() => handleSuggestedQuestion(question.fullQuestion, index)}
                   className="px-3 py-2 bg-white text-gray-700 rounded-full text-xs font-medium hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-gray-200 shadow-sm"
                   disabled={isLoading}
                 >
                   {question.display}
                 </motion.button>
               ))}
             </AnimatePresence>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isLoading ? "Processing..." : "Ask me anything..."}
            className="flex-1 bg-transparent border-none outline-none text-gray-800 text-sm placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            disabled={isLoading || inputValue.trim() === ''}
            title="Send message"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 3 3 9-3 9 19-9Z"/>
                <path d="m6 12 13 0"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingChatbotContent; 