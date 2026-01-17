export const linkDatabase = {
  // Professional Links
  professional: {
    linkedin: {
      url: "https://www.linkedin.com/in/ishan-apte-1489a9213/",
      text: "Connect on LinkedIn",
      description: "Professional networking and career updates"
    },
    github: {
      url: "https://github.com/IshanApte",
      text: "View GitHub Profile",
      description: "All code repositories and projects"
    },
    email: {
      url: "mailto:ishan.apte01@gmail.com",
      text: "Send Email",
      description: "Direct contact for opportunities"
    }
  },

  // Portfolio Internal Navigation
  portfolio: {
    home: {
      url: "/",
      text: "Home",
      description: "Main portfolio page with hero section"
    },
    about: {
      url: "/#about",
      text: "About Section",
      description: "Learn about Ishan's background and skills"
    },
    experience: {
      url: "/#work",
      text: "Experience Section",
      description: "Work experience and education timeline"
    },
    projects: {
      url: "/#projects",
      text: "Projects Section", 
      description: "Featured projects and technical work"
    },
    contact: {
      url: "/#contact",
      text: "Contact Section",
      description: "Get in touch with Ishan"
    },
    blog: {
      url: "/blog",
      text: "Blog",
      description: "Technical blog and insights"
    }
  },

  // Project Links
  projects: {
    brainstormai: {
      url: "https://github.com/IshanApte/BrainstormAI",
      text: "BrainstormAI Repository",
      description: "Anti-pandering AI system with LangGraph"
    },
    superagent: {
      url: "https://github.com/IshanApte/SuperAgent", 
      text: "Super Agent Project",
      description: "85% accuracy NLP intent detection system"
    },
    sportconnect: {
      url: "https://github.com/IshanApte/SportConnect",
      text: "SportConnect App",
      description: "Full-stack MERN social application"
    },
    eventcraft: {
      url: "https://github.com/IshanApte/EventCraft",
      text: "EventCraft System",
      description: "Case-based reasoning for event planning"
    },
    bloomingtonbuzz: {
      url: "https://github.com/IshanApte/BloomingtonBuzz",
      text: "BloomingtonBuzz iOS App", 
      description: "Event discovery app for Indiana University"
    }
  },

  // External Resources
  external: {
    openai_platform: {
      url: "https://platform.openai.com",
      text: "OpenAI Platform",
      description: "For getting API keys and documentation"
    },
    indiana_university: {
      url: "https://www.indiana.edu",
      text: "Indiana University",
      description: "Current university"
    }
  },

  // Quick Actions (mailto and specific contacts)
  actions: {
    schedule_call: {
      url: "mailto:ishan.apte01@gmail.com?subject=Let's%20Schedule%20a%20Call",
      text: "Schedule a Call", 
      description: "Set up a conversation"
    },
    discuss_collaboration: {
      url: "mailto:ishan.apte01@gmail.com?subject=Collaboration%20Opportunity",
      text: "Discuss Collaboration",
      description: "Talk about working together"
    },
    ask_about_projects: {
      url: "mailto:ishan.apte01@gmail.com?subject=Tell%20me%20about%20your%20projects",
      text: "Ask About Projects",
      description: "Learn more about specific work"
    }
  }
};

// Helper function to get links by category
export const getLinksByCategory = (category) => {
  return linkDatabase[category] || {};
};

// Helper function to find relevant links based on keywords
export const findRelevantLinks = (keywords) => {
  const relevant = [];
  
  Object.entries(linkDatabase).forEach(([category, links]) => {
    Object.entries(links).forEach(([key, link]) => {
      const searchText = `${key} ${link.text} ${link.description}`.toLowerCase();
      if (keywords.some(keyword => searchText.includes(keyword.toLowerCase()))) {
        relevant.push({
          ...link,
          category,
          key
        });
      }
    });
  });
  
  return relevant;
};

// Helper function to format link for markdown
export const formatLink = (linkObj) => {
  return `[${linkObj.text}](${linkObj.url})`;
}; 