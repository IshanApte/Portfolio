import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { openaiService } from '../utils/openaiService';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [displayedSuggestions, setDisplayedSuggestions] = useState([]);
  const [remainingSuggestions, setRemainingSuggestions] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const hasLoadedIntro = useRef(false);
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);

  const introMessages = [
    { from: 'bot', text: "Hi there! 👋" },
    { from: 'bot', text: "Welcome to my Website that will help you know me better" },
    { from: 'bot', text: "Feel free to ask me anything!" },
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
    // Define the first 5 specific suggestions
    const prioritySuggestions = [
      { display: "Experience?", fullQuestion: "What work experience does he have?" },
      { display: "Projects?", fullQuestion: "What projects has he worked on?" },
      { display: "Skills?", fullQuestion: "What are his technical skills?" },
      { display: "Contact?", fullQuestion: "How can I get in touch with him?" },
      { display: "Resume?", fullQuestion: "Where can I download his resume?" }
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

  useEffect(() => {
    // Check if AI is enabled
    setIsAIEnabled(openaiService.isAIEnabled());
    
    // Initialize suggestions
    initializeSuggestions();
    
    // Set up intersection observer to detect when chatbot section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          setShowChatbot(true);
          
          // Load intro messages when chatbot becomes visible
          const prepareIntroMessages = async () => {
            if (hasLoadedIntro.current) return;
            hasLoadedIntro.current = true;
            
            await new Promise(resolve => setTimeout(resolve, 300));
            
            for (let i = 0; i < introMessages.length; i++) {
              await new Promise(resolve => setTimeout(resolve, i === 0 ? 500 : 1000));
              setMessages(prev => [...prev, introMessages[i]]);
            }
            
            // Add AI status message if enabled
            if (openaiService.isAIEnabled()) {
              await new Promise(resolve => setTimeout(resolve, 500));
              setMessages(prev => [...prev, { 
                from: 'bot', 
                text: "🤖 **AI-Enhanced Mode**: I'm powered by OpenAI for more intelligent responses!"
              }]);
            }
            
            setShowSuggestions(true);
          };
          
          prepareIntroMessages();
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the chatbot is visible
        rootMargin: '0px 0px -100px 0px' // Start loading a bit before it's fully visible
      }
    );

    if (chatbotRef.current) {
      observer.observe(chatbotRef.current);
    }

    return () => {
      if (chatbotRef.current) {
        observer.unobserve(chatbotRef.current);
      }
    };
  }, [isInView]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessage = (text) => {
    return text
      // Convert markdown links [text](url) to HTML links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-blue-100 underline">$1</a>')
      // Convert **bold** to HTML bold
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Convert bullet points • to HTML
      .replace(/^• /gm, '&bull; ')
      // Convert line breaks to HTML br tags
      .replace(/\n/g, '<br/>')
      // Convert emoji and preserve spacing
      .replace(/ {2,}/g, (match) => '&nbsp;'.repeat(match.length));
  };

  const handleSend = async () => {
    if (inputValue.trim() === '' || isLoading) return;
    
    const userMessage = { from: 'user', text: inputValue };
    const userInput = inputValue;
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await openaiService.getResponse(userInput, conversationHistory);
      
      // Update conversation history
      const newHistory = [
        ...conversationHistory,
        { role: 'user', content: userInput },
        { role: 'assistant', content: response.answer }
      ];
      setConversationHistory(newHistory.slice(-12)); // Keep last 12 messages
      
      // Add bot response after delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let botResponseText = response.answer;
      if (response.error) {
        botResponseText += `\n\n⚠️ *${response.error}*`;
      }
      
      setMessages(prev => [...prev, { from: 'bot', text: botResponseText }]);
      
      // Update suggestions if available
      if (response.suggestions && response.suggestions.length > 0) {
        // Convert suggestions to the format expected by the UI
        const newSuggestions = response.suggestions.map(suggestion => ({
          display: suggestion.length > 20 ? suggestion.substring(0, 17) + '...' : suggestion,
          fullQuestion: suggestion
        }));
        // You could update the suggestedQuestions state here if you want dynamic suggestions
      }
      
    } catch (error) {
      console.error('Error getting response:', error);
      await new Promise(resolve => setTimeout(resolve, 800));
      setMessages(prev => [...prev, { 
        from: 'bot', 
        text: "I apologize, but I'm having trouble processing your question right now. Please try asking about Ishan's projects, skills, or experience!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = async (fullQuestion, suggestionIndex) => {
    if (isLoading) return;
    
    const userMessage = { from: 'user', text: fullQuestion };
    
    // Replace the clicked suggestion with a new one
    replaceSuggestion(suggestionIndex);
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await openaiService.getResponse(fullQuestion, conversationHistory);
      
      // Update conversation history
      const newHistory = [
        ...conversationHistory,
        { role: 'user', content: fullQuestion },
        { role: 'assistant', content: response.answer }
      ];
      setConversationHistory(newHistory.slice(-12));
      
      // Add bot response after delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let botResponseText = response.answer;
      if (response.error) {
        botResponseText += `\n\n⚠️ *${response.error}*`;
      }
      
      setMessages(prev => [...prev, { from: 'bot', text: botResponseText }]);
      
    } catch (error) {
      console.error('Error getting response:', error);
      await new Promise(resolve => setTimeout(resolve, 800));
      setMessages(prev => [...prev, { 
        from: 'bot', 
        text: "I apologize, but I'm having trouble processing your question right now. Please try asking about Ishan's projects, skills, or experience!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={chatbotRef} className="w-full max-w-4xl mx-auto flex flex-col h-[80vh] text-white space-y-6 relative">
      <AnimatePresence mode="wait">
        {/* Chatbot Placeholder */}
        {!showChatbot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <div className="text-center space-y-4">
              <div className="text-2xl">💬</div>
              <p className="text-gray-400">Interactive chat will load when you scroll here...</p>
            </div>
          </motion.div>
        )}
        
        {/* Chatbot Interface */}
        {showChatbot && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            className="flex flex-col h-full space-y-6"
          >
            {/* Messages - Floating */}
            <div className="flex-1 p-4 overflow-y-auto scroll-smooth">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex my-4 ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`p-4 rounded-2xl max-w-xs lg:max-w-md shadow-lg ${
                        msg.from === 'bot'
                          ? 'bg-blue-600 bg-opacity-90 backdrop-blur-sm'
                          : 'bg-gray-700 bg-opacity-90 backdrop-blur-sm'
                      }`}
                    >
                      <div 
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                      />
                    </div>
                  </motion.div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start my-4"
                  >
                    <div className="p-4 rounded-2xl bg-blue-600 bg-opacity-90 backdrop-blur-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {showSuggestions && !isLoading && displayedSuggestions.length > 0 && (
              <div className="px-4">
                <div className="flex gap-2 justify-end flex-wrap mb-4">
                  {displayedSuggestions.map((question, index) => (
                    <motion.button
                      key={`${question.display}-${index}`}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                      onClick={() => handleSuggestedQuestion(question.fullQuestion, index)}
                      className="px-4 py-2 bg-gray-500 bg-opacity-60 backdrop-blur-sm text-white rounded-full text-sm hover:bg-opacity-80 hover:scale-105 transition-all duration-200 border border-gray-400 disabled:opacity-50 transform"
                      disabled={isLoading}
                    >
                      {question.display}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input - Floating */}
            <div className="space-y-3 mx-4">
              <div className="p-4 flex bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-full shadow-lg">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isLoading ? "Processing..." : "Ask about skills, projects..."}
                  className="flex-1 p-3 rounded-l-full bg-transparent text-white placeholder-gray-300 focus:outline-none disabled:opacity-50"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors focus:outline-none shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || inputValue.trim() === ''}
                >
                  {isLoading ? '...' : 'Send'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot; 