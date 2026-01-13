*This portfolio represents not just my technical projects, but my approach to building intelligent, user-centered applications that solve real-world problems.*

## About the Developer

MS Computer Science student at Indiana University Bloomington with a passion for AI engineering and full-stack development. Currently developing iOS applications and seeking opportunities in Software Development and AI Engineering roles.

## Project Impact

**For Recruiters**: Immediate demonstration of AI engineering capabilities and professional communication skills

**For Developers**: Example of innovative portfolio design combining technical skill showcase with practical AI implementation

**For Collaboration**: Clear pathways to connect and discuss potential projects or opportunities

## Technical Demonstrations

This portfolio showcases practical application of skills mentioned in my academic and professional experience:

- **AI Engineering**: Knowledge base architecture similar to my 85% accurate NLP systems
- **Full-Stack Development**: React frontend demonstrating my MERN stack expertise
- **User Experience**: Interactive design reflecting mobile app development experience
- **Software Architecture**: Clean, maintainable code structure


## Setup Instructions

### Environment Variables

The chatbot uses OpenAI API through a secure serverless function. To enable it:

1. **Get your OpenAI API key** from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

2. **For Vercel deployment (Production):**
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add: `OPENAI_API_KEY` with your actual API key
   - Redeploy your site

3. **For local development:**
   - The API route only works when deployed to Vercel
   - In local dev, the chatbot will use basic keyword matching (fallback mode)
   - To test the full AI functionality, deploy to Vercel or use `vercel dev` command

**Security Note:** The API key is stored server-side only and never exposed to the browser. The `/api/chat` route handles all OpenAI requests securely.

**Note:** If you see "AI service temporarily unavailable" in local development, this is expected. The chatbot will work with full AI capabilities once deployed to Vercel with the `OPENAI_API_KEY` environment variable set.

## Connect With Me

- **Email**: [ishan.apte01@gmail.com](mailto:ishan.apte01@gmail.com)
- **LinkedIn**: [linkedin.com/in/IshanApte](https://www.linkedin.com/in/ishan-apte-1489a9213/)
- **GitHub**: [github.com/IshanApte](https://github.com/IshanApte)