import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const PrivacyPolicy = () => {
  // Extract the HTML content from your privacy policy
  const privacyContent = `
    <h1>Nerdling Privacy Policy</h1>
    <p class="last-updated"><strong>Last Updated:</strong> January 2025</p>

    <h2>Introduction</h2>
    <p>Nerdling ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you use the Nerdling Chrome extension.</p>

    <h2>Information We Collect</h2>

    <h3>1. Selected Text and Page Context</h3>
    <p>When you explicitly activate Nerdling by right-clicking on selected text or using the keyboard shortcut (Ctrl+Shift+E / Cmd+Shift+E), we collect:</p>
    <ul>
        <li><strong>Selected text</strong>: The text you have chosen on a webpage</li>
        <li><strong>Surrounding context</strong>: Approximately 500 characters of text before and after your selection to provide contextually relevant explanations</li>
    </ul>
    <p>This information is collected only when you explicitly invoke the extension. We do not automatically collect or monitor any content from web pages.</p>

    <h3>2. IP Address and User Agent</h3>
    <p>When you request an explanation, our API server automatically receives:</p>
    <ul>
        <li><strong>IP address</strong>: Collected via HTTP request headers for rate limiting purposes</li>
        <li><strong>User Agent</strong>: Browser information used to create an anonymous hash for rate limiting</li>
    </ul>
    <p>These are standard HTTP headers automatically transmitted with all web requests. We use this information solely for rate limiting (10 requests per day per user) and do not use it for tracking or identification purposes.</p>

    <h3>3. User Preferences (Stored Locally Only)</h3>
    <p>Nerdling stores the following preferences locally in your browser using Chrome's storage API:</p>
    <ul>
        <li>Dialogue box position preference (top, bottom, left, right, or center)</li>
        <li>Theme preference (light or dark mode)</li>
        <li>Default explanation mode preference</li>
        <li>Whether to show mode selection each time</li>
        <li>Onboarding completion status</li>
    </ul>
    <div class="highlight">
        <p><strong>This information is stored only on your device and is never transmitted to our servers.</strong></p>
    </div>

    <h2>How We Use Your Information</h2>
    <p>We use the collected information solely for the following purposes:</p>
    <ol>
        <li><strong>Providing Explanations</strong>: Selected text and context are sent to our API to generate AI-powered explanations, definitions, analogies, and examples based on your chosen mode.</li>
        <li><strong>Rate Limiting</strong>: IP address and user agent information are used to enforce usage limits (10 requests per day) to ensure fair usage and service availability.</li>
        <li><strong>Service Improvement</strong>: We may analyze usage patterns in aggregate, anonymized form to improve our service. Individual user data is not analyzed or used for this purpose.</li>
    </ol>

    <h2>Information Sharing and Disclosure</h2>
    <div class="highlight">
        <p><strong>We do not sell, trade, or rent your personal information to third parties.</strong></p>
    </div>
    <p>We share information only in the following limited circumstances:</p>
    <ul>
        <li><strong>With our service providers</strong>: We use Cloudflare Workers to host our API and Cloudflare KV for rate limiting. These services process your data on our behalf under strict contractual obligations.</li>
        <li><strong>AI service provider</strong>: We use OpenAI's API to generate explanations. Your selected text and context are sent to OpenAI to generate responses. Please review <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">OpenAI's Privacy Policy</a> for information about how they handle data.</li>
    </ul>
    <p>We do not share information with:</p>
    <ul>
        <li>Advertising networks</li>
        <li>Data brokers</li>
        <li>Analytics services (beyond standard server logs)</li>
        <li>Any third parties for marketing purposes</li>
    </ul>

    <h2>Data Security</h2>
    <p>We take data security seriously:</p>
    <ul>
        <li><strong>Encryption in Transit</strong>: All data transmitted between the extension and our servers is encrypted using HTTPS/TLS encryption.</li>
        <li><strong>Encryption at Rest</strong>: Rate limiting data stored in Cloudflare KV is encrypted.</li>
        <li><strong>Minimal Data Collection</strong>: We collect only the data necessary to provide the service.</li>
        <li><strong>No Persistent Tracking</strong>: We do not create persistent user profiles or track users across sessions.</li>
    </ul>

    <h2>Data Retention</h2>
    <ul>
        <li><strong>Selected text and context</strong>: Transmitted to our API for immediate processing. We do not store the text content after generating the explanation response.</li>
        <li><strong>Rate limiting data</strong>: Stored in Cloudflare KV for approximately 24 hours, after which it automatically expires and is deleted.</li>
        <li><strong>User preferences</strong>: Stored locally in your browser using Chrome's sync storage. You can delete this data at any time by uninstalling the extension or clearing Chrome's storage.</li>
    </ul>

    <h2>Your Rights and Choices</h2>
    <p>You have control over your data:</p>
    <ul>
        <li><strong>Stop Using the Extension</strong>: Simply uninstall the extension to stop all data collection.</li>
        <li><strong>Clear Local Data</strong>: You can clear stored preferences by uninstalling the extension or using Chrome's storage management tools.</li>
        <li><strong>Rate Limit</strong>: The 10 requests per day limit applies per user (identified by IP address and user agent). This limit resets daily at midnight UTC.</li>
    </ul>

    <h2>Information We Do NOT Collect</h2>
    <div class="no-list">
        <p>We do <strong>not</strong> collect:</p>
        <ul>
            <li>Your browsing history or a list of websites you visit</li>
            <li>Personal information such as your name, email address, or contact details</li>
            <li>Payment or financial information</li>
            <li>Authentication credentials or passwords</li>
            <li>Health information</li>
            <li>Personal communications (emails, messages, etc.)</li>
            <li>Information about other browser extensions or applications</li>
            <li>Keystrokes or mouse movements beyond text selection</li>
            <li>Any data automatically without your explicit action</li>
        </ul>
    </div>

    <h2>Children's Privacy</h2>
    <p>Nerdling is not intended for children under 13 years of age. We do not knowingly collect information from children under 13.</p>

    <h2>Changes to This Privacy Policy</h2>
    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
    <ul>
        <li>Updating the "Last Updated" date at the top of this policy</li>
        <li>Publishing the updated policy on our website</li>
        <li>Notifying users through the Chrome Web Store listing if changes are material</li>
    </ul>
    <p>Your continued use of Nerdling after changes become effective constitutes acceptance of the updated Privacy Policy.</p>

    <h2>Compliance with Chrome Web Store Policies</h2>
    <p>This Privacy Policy complies with the Chrome Web Store User Data Policy requirements:</p>
    <ul>
        <li>We collect only the minimum data necessary for our core functionality</li>
        <li>All data transmission is encrypted using HTTPS</li>
        <li>We use collected data only for user-facing features (generating explanations)</li>
        <li>We do not use data for advertising, retargeting, or monetization</li>
        <li>We do not allow human review of user data except as necessary for security or legal compliance</li>
    </ul>

    <h2>Chrome Web Store Permission Justifications</h2>
    <p>Nerdling requires the following Chrome extension permissions to function. Below is a detailed explanation of why each permission is necessary:</p>

    <h3>1. contextMenus</h3>
    <p><strong>Justification:</strong></p>
    <p>Nerdling adds a "Nerdling" option to the browser's right-click context menu when users select text. This is the primary way users access the extension's core functionality - selecting text and getting instant definitions and explanations. The context menu integration allows users to seamlessly activate Nerdling without leaving their current page or interrupting their reading flow.</p>
    <p><strong>Code Reference:</strong> <code>background.js</code> lines 2-7 - Creates context menu item for text selections.</p>

    <h3>2. scripting</h3>
    <p><strong>Justification:</strong></p>
    <p>The extension needs to inject content scripts (<code>content.js</code>) and styles (<code>styles.css</code>) into web pages dynamically when the user activates the extension. This is essential for the core user experience - showing definitions and explanations in an overlay without navigating away. The scripting permission is used in combination with <code>activeTab</code> to inject scripts and capture selected text and page context when users activate the extension via right-click or keyboard shortcut. This approach is more secure than using broad host permissions, as scripts are only injected when explicitly requested by the user.</p>
    <p><strong>Code Reference:</strong> <code>background.js</code> - Dynamically injects scripts and CSS when user activates extension via context menu or keyboard shortcut.</p>

    <h3>3. activeTab</h3>
    <p><strong>Justification:</strong></p>
    <p>The <code>activeTab</code> permission provides temporary access to the currently active tab only when the user explicitly invokes the extension. This is used for both:</p>
    <ol>
        <li><strong>Right-click context menu:</strong> When users right-click on selected text and choose "Nerdling"</li>
        <li><strong>Keyboard shortcut:</strong> When users press Ctrl+Shift+E (Windows) or Cmd+Shift+E (Mac)</li>
    </ol>
    <p>The activeTab permission is more secure than broad host permissions because it only grants access when the user takes an explicit action, and the access is temporary. This allows Nerdling to work on any webpage while maintaining user privacy and security. The extension uses activeTab in combination with the scripting permission to inject content scripts and read selected text.</p>
    <p><strong>Code Reference:</strong> <code>background.js</code> - Context menu and keyboard command handlers that access the active tab to read selections and inject scripts.</p>

    <h3>4. storage</h3>
    <p><strong>Justification:</strong></p>
    <p>Nerdling stores user preferences to personalize the experience across browsing sessions. This includes: dialogue box position (top, bottom, left, right, center), theme preference (light/dark mode), default explanation mode, and whether to show mode selection each time. Without storage, users would need to reconfigure these settings every time they use the extension, significantly degrading the user experience.</p>
    <p><strong>Code Reference:</strong> <code>content.js</code> lines 349-502 - Multiple storage operations to save and load user preferences for position, theme, default mode, and onboarding status.</p>

    <h3>Summary</h3>
    <p>All four permissions are essential for Nerdling's core functionality:</p>
    <ul>
        <li><strong>contextMenus:</strong> Right-click menu integration</li>
        <li><strong>scripting:</strong> Inject dialogue box UI and capture selections (used with activeTab)</li>
        <li><strong>activeTab:</strong> Provides secure, temporary access to the active tab when user explicitly invokes the extension (via right-click or keyboard shortcut)</li>
        <li><strong>storage:</strong> Save user preferences</li>
    </ul>
    <p>The extension uses the <code>activeTab</code> permission instead of broad host permissions (<code>&lt;all_urls&gt;</code>), which is more secure and privacy-friendly. The <code>activeTab</code> permission provides temporary access to the currently active tab only when the user explicitly invokes the extension (right-click or keyboard shortcut), ensuring the extension works on any webpage while maintaining user privacy and security.</p>
    <p>The extension follows privacy best practices by only accessing content when explicitly invoked by the user and not collecting browsing history or personal data.</p>

    <h2>Limited Use Disclosure</h2>
    <p>Nerdling's use of information received from Google APIs (if applicable) will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>

    <h2>Contact Us</h2>
    <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
    <ul>
        <li><strong>Email:</strong> ishan.apte01@gmail.com</li>

    </ul>

    <hr>

    <div class="note">
        <p><strong>Note:</strong> This privacy policy is specific to the Nerdling Chrome extension. Your use of other services or websites may be subject to different privacy policies.</p>
    </div>
  `;

  return (
    <>
      <style>{`
        .privacy-content h1 {
          color: #2563EB;
          font-size: 2.5em;
          margin-bottom: 10px;
          border-bottom: 3px solid #2563EB;
          padding-bottom: 15px;
          font-weight: bold;
        }

        .privacy-content .last-updated {
          color: #64748B;
          font-size: 0.9em;
          margin-bottom: 30px;
          font-style: italic;
        }

        .privacy-content h2 {
          color: #2563EB;
          font-size: 1.8em;
          margin-top: 40px;
          margin-bottom: 20px;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 10px;
          font-weight: bold;
        }

        .privacy-content h3 {
          color: #475569;
          font-size: 1.3em;
          margin-top: 25px;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .privacy-content p {
          margin-bottom: 15px;
          line-height: 1.8;
        }

        .privacy-content ul, .privacy-content ol {
          margin-left: 30px;
          margin-bottom: 20px;
        }

        .privacy-content li {
          margin-bottom: 10px;
          line-height: 1.6;
        }

        .privacy-content strong {
          color: #1e293b;
          font-weight: 600;
        }

        .privacy-content a {
          color: #2563EB;
          text-decoration: none;
        }

        .privacy-content a:hover {
          text-decoration: underline;
        }

        .privacy-content code {
          background-color: #f1f5f9;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #1e293b;
        }

        .privacy-content .highlight {
          background-color: #fff3cd;
          padding: 15px;
          border-left: 4px solid #ffc107;
          margin: 20px 0;
          border-radius: 4px;
        }

        .privacy-content .no-list {
          background-color: #f8f9fa;
          padding: 15px;
          border-left: 4px solid #dc3545;
          margin: 20px 0;
          border-radius: 4px;
        }

        .privacy-content .note {
          background-color: #e7f3ff;
          padding: 15px;
          border-left: 4px solid #2563EB;
          margin: 20px 0;
          font-size: 0.95em;
          border-radius: 4px;
        }

        .privacy-content hr {
          border: none;
          border-top: 1px solid #e0e0e0;
          margin: 30px 0;
        }

        @media (max-width: 768px) {
          .privacy-content h1 {
            font-size: 2em;
          }

          .privacy-content h2 {
            font-size: 1.5em;
          }

          .privacy-content ul, .privacy-content ol {
            margin-left: 20px;
          }
        }
      `}</style>
      
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white bg-opacity-60 rounded-3xl p-8 lg:p-12 shadow-lg">
            <div 
              className="privacy-content text-text-secondary"
              dangerouslySetInnerHTML={{ __html: privacyContent }}
            />
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link 
                to="/" 
                className="text-accent hover:text-accent/80 font-semibold flex items-center gap-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
