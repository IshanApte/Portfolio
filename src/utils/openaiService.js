import OpenAI from 'openai';
import { knowledgeBase } from '../constants/knowledgeBase';
import { linkDatabase, findRelevantLinks, formatLink } from '../constants/links';

class OpenAIService {
  constructor() {
    this.openai = null;
    this.initialized = false;
    this.monthlyBudget = 1.00; // $1 monthly budget
    this.tokensPerDollar = 500000; // Approximate tokens per $1 for GPT-3.5-turbo
    this.maxMonthlyTokens = this.monthlyBudget * this.tokensPerDollar;
    this.initializeOpenAI();
  }

  initializeOpenAI() {
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        console.warn('OpenAI API key not found. Falling back to basic keyword matching.');
        return;
      }

      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
      
      this.initialized = true;
      console.log('OpenAI service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize OpenAI service:', error);
    }
  }

  // Convert knowledge base to context string for OpenAI
  getKnowledgeBaseContext() {
    const knowledgeContext = knowledgeBase.map(item => 
      `Keywords: ${item.keywords.join(', ')}\nAnswer: ${item.answer}\nSuggestions: ${item.suggestions ? item.suggestions.join(', ') : 'None'}\n`
    ).join('\n---\n');

    // Add links database context
    const linksContext = `\n\nAVAILABLE LINKS DATABASE:\n${JSON.stringify(linkDatabase, null, 2)}

LINK USAGE INSTRUCTIONS:
- Always include relevant links in your responses using markdown format [text](url)
- For projects, include GitHub links when discussing them
- For contact requests, use appropriate action links (schedule_call, discuss_collaboration)
- For professional inquiries, include LinkedIn and email links
- For technical discussions, include relevant project repositories
- Use the exact URL and text from the links database above`;

    return knowledgeContext + linksContext;
  }

  // Usage tracking methods
  getUsageKey() {
    const now = new Date();
    return `openai_usage_${now.getFullYear()}_${now.getMonth()}`;
  }

  getCurrentUsage() {
    const key = this.getUsageKey();
    const usage = localStorage.getItem(key);
    return usage ? JSON.parse(usage) : { tokens: 0, requests: 0, cost: 0 };
  }

  updateUsage(tokensUsed) {
    const key = this.getUsageKey();
    const usage = this.getCurrentUsage();
    const cost = (tokensUsed / this.tokensPerDollar) * this.monthlyBudget;
    
    usage.tokens += tokensUsed;
    usage.requests += 1;
    usage.cost += cost;
    
    localStorage.setItem(key, JSON.stringify(usage));
    return usage;
  }

  isWithinBudget() {
    const usage = this.getCurrentUsage();
    return usage.tokens < this.maxMonthlyTokens;
  }

  getBudgetStatus() {
    const usage = this.getCurrentUsage();
    const percentUsed = (usage.tokens / this.maxMonthlyTokens) * 100;
    const remainingBudget = this.monthlyBudget - usage.cost;
    
    return {
      tokensUsed: usage.tokens,
      maxTokens: this.maxMonthlyTokens,
      percentUsed: Math.round(percentUsed),
      costUsed: usage.cost.toFixed(4),
      remainingBudget: remainingBudget.toFixed(4),
      requestsThisMonth: usage.requests
    };
  }

  // Basic keyword matching fallback
  findBasicResponse(userInput) {
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    knowledgeBase.forEach(item => {
      let score = 0;
      item.keywords.forEach(keyword => {
        if (input.includes(keyword.toLowerCase())) {
          score += keyword.length;
        }
      });
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    });

    return bestMatch ? {
      answer: bestMatch.answer,
      suggestions: bestMatch.suggestions || []
    } : {
      answer: `I'd love to help you learn more about Ishan! Try asking about:
      
• **"AI projects"** - BrainstormAI, Super Agent, ML research
• **"technical skills"** - Programming languages and frameworks  
• **"experience"** - Current role and previous work
• **"contact"** - How to get in touch

Or ask something specific about his background!`,
      suggestions: ["Tell me about his AI projects", "What are his technical skills?", "How can I contact him?"]
    };
  }

  // Generate intelligent response using OpenAI
  async generateIntelligentResponse(userInput, conversationHistory = []) {
    if (!this.initialized || !this.openai) {
      return this.findBasicResponse(userInput);
    }

    // Check budget before making API call
    if (!this.isWithinBudget()) {
      const status = this.getBudgetStatus();
      const fallbackResponse = this.findBasicResponse(userInput);
      return {
        ...fallbackResponse,
        budgetExceeded: true,
        error: `Monthly budget limit reached (${status.percentUsed}% used). Using basic responses.`
      };
    }

    try {
      const systemPrompt = `You are Ishan's AI assistant on his portfolio website. Your job is to help visitors learn about Ishan Apte, his projects, skills, and experience.

IMPORTANT GUIDELINES:
1. Keep the answer to 100 words 
2. Use the knowledge base information below as your PRIMARY source of truth
3. ALWAYS include relevant links from the links database when appropriate
5. If asked about something not in the knowledge base, politely redirect to topics you know about
7. Maintain Ishan's professional tone while being friendly
8. Be conversational, helpful, and enthusiastic about Ishan's work
9. Always format responses with markdown formatting, and clear structure
10. Never give incomplete answers

CRITICAL LINK USAGE RULES:
- Make sure the links are selected from the links database
- When discussing ANY project, ALWAYS include the GitHub repository link
- For contact/hiring questions, include action links (Schedule a Call, Discuss Collaboration)
- For resume requests, include both SDE and AI resume download links
- For professional networking, include LinkedIn profile link
- Use EXACT markdown format from links database: [Link Text](URL)
- Include 2-3 relevant links per response when applicable

KNOWLEDGE BASE:
${this.getKnowledgeBaseContext()}

Remember: You represent Ishan professionally, so be accurate and helpful! ALWAYS provide actionable links!`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-6), // Keep last 6 messages for context
        { role: 'user', content: userInput }
      ];

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7,
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      });

      // Track usage after successful API call
      const tokensUsed = response.usage?.total_tokens || 150; // Fallback to max_tokens if usage not available
      const updatedUsage = this.updateUsage(tokensUsed);
      
      const aiResponse = response.choices[0].message.content;
      
      // Add budget warning if approaching limit
      let budgetWarning = '';
      if (updatedUsage.tokens > this.maxMonthlyTokens * 0.8) {
        const status = this.getBudgetStatus();
        budgetWarning = `\n\n⚠️ *Budget: ${status.percentUsed}% used this month*`;
      }
      
      // Extract suggestions from the response (look for bullet points or numbered lists at the end)
      const suggestionMatches = aiResponse.match(/(?:Suggestions?|Try asking|Ask about|Questions?):\s*\n?([•\-*]\s*.+(?:\n[•\-*]\s*.+)*)/i);
      let suggestions = [];
      
      if (suggestionMatches) {
        suggestions = suggestionMatches[1]
          .split(/\n[•\-*]\s*/)
          .filter(s => s.trim())
          .map(s => s.replace(/^[•\-*]\s*/, '').trim())
          .slice(0, 3);
      } else {
        // Default suggestions based on content
        if (aiResponse.toLowerCase().includes('project')) {
          suggestions = ["Tell me about his AI work", "What are his technical skills?", "How can I contact him?"];
        } else if (aiResponse.toLowerCase().includes('skill')) {
          suggestions = ["Show me his projects", "Tell me about his experience", "Is he available for work?"];
        } else {
          suggestions = ["Tell me about his projects", "What are his skills?", "How can I reach out?"];
        }
      }

      return {
        answer: aiResponse + budgetWarning,
        suggestions: suggestions,
        isAIGenerated: true,
        budgetStatus: this.getBudgetStatus()
      };

    } catch (error) {
      console.error('OpenAI API error:', error);
      
      // Fallback to basic matching on API error
      const fallbackResponse = this.findBasicResponse(userInput);
      return {
        ...fallbackResponse,
        error: 'AI service temporarily unavailable - using basic matching'
      };
    }
  }

  // Main method to get response
  async getResponse(userInput, conversationHistory = []) {
    if (this.initialized) {
      return await this.generateIntelligentResponse(userInput, conversationHistory);
    } else {
      return this.findBasicResponse(userInput);
    }
  }

  // Check if OpenAI is available
  isAIEnabled() {
    return this.initialized;
  }

  // Get detailed budget information for debugging
  logBudgetStatus() {
    const status = this.getBudgetStatus();
    console.log('📊 OpenAI Budget Status:', {
      'Monthly Budget': `$${this.monthlyBudget}`,
      'Cost Used': `$${status.costUsed}`,
      'Remaining': `$${status.remainingBudget}`,
      'Tokens Used': `${status.tokensUsed.toLocaleString()}`,
      'Max Tokens': `${status.maxTokens.toLocaleString()}`,
      'Percent Used': `${status.percentUsed}%`,
      'Requests This Month': status.requestsThisMonth
    });
    return status;
  }
}

// Export singleton instance
export const openaiService = new OpenAIService();
export default openaiService; 