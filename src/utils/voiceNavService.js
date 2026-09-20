// Client-side voice navigation service.
// Sends the Web Speech API transcript + section list to the secure /api/voice-nav
// route (Jev proxy). The Jev API key never touches the client.

const CONFIDENCE_THRESHOLD = 0.6;

class VoiceNavService {
  constructor() {
    this.apiRoute = '/api/voice-nav';
    // Section id -> description Jev uses to match the transcript against.
    // Ids match the scroll anchors used in constants/index.js navLinks (Navbar.jsx).
    this.sections = {
      top: 'The top/home of the page, hero/landing section, his name, current job title, what he does, brief intro',
      projects: 'Projects section, things built, apps, code, GitHub repos, demos, portfolio work, selected works, what has been made or shipped',
      experience: 'Work experience and education section, job history, roles, companies worked at, internships, skills, technologies used professionally, college, university, school, degree, what he studied, where he went to college, academic background',
      contact: 'Contact section, how to get in touch, email, hire, schedule a call, collaborate, reach out'
    };
  }

  // Resolve a transcript to a section id, or null if confidence is too low
  // or the request fails for any reason.
  async resolveSection(transcript) {
    if (!transcript || !transcript.trim()) {
      return { section: null, confidence: 0 };
    }

    const apiUrl = `${window.location.origin}${this.apiRoute}`;

    let response;
    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          criteria: this.sections
        })
      });
    } catch (fetchError) {
      console.warn('Voice-nav API route not available (normal in local dev).', fetchError);
      return { section: null, confidence: 0 };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('Voice-nav API error:', response.status, errorData);
      return { section: null, confidence: 0 };
    }

    const data = await response.json();
    const confidence = data.confidence ?? 0;

    if (import.meta.env.DEV) {
      console.log('[voice-nav] transcript:', transcript, '-> choice:', data.choice, 'confidence:', confidence, 'probabilities:', data.probabilities);
    }

    if (confidence < CONFIDENCE_THRESHOLD || !data.choice || !(data.choice in this.sections)) {
      return { section: null, confidence };
    }

    return { section: data.choice, confidence };
  }
}

export const voiceNavService = new VoiceNavService();
export default voiceNavService;
