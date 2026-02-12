import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';

const JobBuddy = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! I'm Job Buddy 👋 Your AI assistant for internship guidance. Ask me anything about finding internships, preparing applications, or career advice!"
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Quick suggestion buttons
    const quickSuggestions = [
        "How do I find internships?",
        "Tips for resume writing",
        "How to prepare for interviews?",
        "What skills should I learn?"
    ];

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // Check if user is asking about available internships
            const lowerQuery = userMessage.toLowerCase();
            const isAskingAboutInternships =
                lowerQuery.includes('available internship') ||
                lowerQuery.includes('show internship') ||
                lowerQuery.includes('list internship') ||
                lowerQuery.includes('what internship') ||
                lowerQuery.includes('current internship') ||
                lowerQuery.includes('open position') ||
                lowerQuery.includes('job opening') ||
                (lowerQuery.includes('internship') && (lowerQuery.includes('available') || lowerQuery.includes('show') || lowerQuery.includes('list')));

            // If asking about available internships, fetch from database
            if (isAskingAboutInternships) {
                const sharedInternships = JSON.parse(localStorage.getItem('sharedInternships') || '[]');

                if (sharedInternships.length === 0) {
                    setTimeout(() => {
                        setMessages(prev => [...prev, {
                            role: 'assistant',
                            content: `📭 **No Internships Available Currently**\n\nThere are no active internship postings at the moment. Here's what you can do:\n\n✅ Check back regularly - new opportunities are posted frequently\n✅ Set up job alerts on LinkedIn and other platforms\n✅ Network with professionals in your field\n✅ Build your skills and portfolio in the meantime\n✅ Consider reaching out to companies directly\n\nWould you like tips on how to find internships or prepare your application materials?`
                        }]);
                        setIsLoading(false);
                    }, 800);
                    return;
                }

                // Format internships for display
                let internshipsText = `🎯 **Available Internships (${sharedInternships.length})**\n\n`;

                sharedInternships.slice(0, 5).forEach((job, index) => {
                    internshipsText += `**${index + 1}. ${job.title}** at **${job.company}**\n`;
                    internshipsText += `📍 Location: ${job.location}\n`;
                    internshipsText += `⏱️ Duration: ${job.duration || 'Not specified'}\n`;
                    internshipsText += `💼 Type: ${job.type || 'Internship'}\n`;
                    if (job.skills && job.skills.length > 0) {
                        internshipsText += `🔧 Skills: ${job.skills.slice(0, 3).join(', ')}${job.skills.length > 3 ? '...' : ''}\n`;
                    }
                    internshipsText += `\n`;
                });

                if (sharedInternships.length > 5) {
                    internshipsText += `\n_...and ${sharedInternships.length - 5} more opportunities!_\n`;
                }

                internshipsText += `\n✨ **Ready to apply?**\nGo to the "Browse Opportunities" section to see full details and submit your application!\n\nNeed help with:\n• Resume tips?\n• Cover letter writing?\n• Interview preparation?`;

                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        content: internshipsText
                    }]);
                    setIsLoading(false);
                }, 800);
                return;
            }

            // Enhanced knowledge base with comprehensive responses
            const knowledgeBase = {
                // Finding Internships
                internship: {
                    keywords: ['internship', 'find internship', 'search internship', 'get internship', 'looking for internship', 'internship opportunities'],
                    response: `🎯 **Finding Internships - Complete Guide**

**1. Online Platforms:**
• InternMatch+ (this platform!) - Browse curated opportunities
• LinkedIn - Set job alerts and network
• Indeed, Glassdoor - Major job boards
• AngelList - For startup internships
• Company career pages - Direct applications

**2. Networking:**
• Attend career fairs and industry events
• Connect with alumni in your field
• Join professional groups on LinkedIn
• Reach out to professionals for informational interviews
• Participate in hackathons and competitions

**3. Campus Resources:**
• Career services office
• Professor recommendations
• Student organizations
• On-campus recruiting events

**4. Best Practices:**
• Start early (3-6 months before desired start date)
• Apply to 20-30 positions
• Follow up on applications
• Keep track of deadlines
• Customize each application

Would you like specific advice for any industry?`
                },

                // Resume Writing
                resume: {
                    keywords: ['resume', 'cv', 'curriculum vitae', 'resume tips', 'resume writing', 'resume help', 'build resume', 'create resume'],
                    response: `📄 **Resume Writing - Expert Tips**

**Structure (1 page):**
• Header: Name, contact, LinkedIn, GitHub
• Summary: 2-3 lines highlighting your value
• Education: Degree, GPA (if >3.0), relevant coursework
• Experience: Internships, projects, leadership
• Skills: Technical and soft skills
• Awards/Certifications (if applicable)

**Content Tips:**
✅ Use action verbs (Developed, Implemented, Led, Designed)
✅ Quantify achievements (Increased efficiency by 30%)
✅ Tailor to each job description
✅ Include relevant keywords for ATS
✅ Highlight impact, not just duties
✅ Show progression and growth

**Common Mistakes to Avoid:**
❌ Typos and grammatical errors
❌ Generic, one-size-fits-all content
❌ Irrelevant information
❌ Poor formatting/hard to read
❌ Lying or exaggerating

**Pro Tips:**
• Use a clean, professional template
• Save as PDF to preserve formatting
• Get feedback from 3+ people
• Update regularly with new skills/projects

Need help with a specific section?`
                },

                // Interview Preparation
                interview: {
                    keywords: ['interview', 'interview tips', 'interview prep', 'interview preparation', 'interview questions', 'job interview', 'prepare for interview'],
                    response: `💼 **Interview Preparation - Complete Guide**

**Before the Interview:**
1. Research the company (mission, values, recent news)
2. Understand the role requirements
3. Prepare STAR method examples
4. Practice common questions
5. Prepare 3-5 thoughtful questions to ask
6. Plan your outfit and route

**Common Interview Questions:**
• Tell me about yourself
• Why this company/role?
• What are your strengths/weaknesses?
• Describe a challenge you overcame
• Where do you see yourself in 5 years?
• Why should we hire you?

**STAR Method (for behavioral questions):**
• **S**ituation: Set the context
• **T**ask: Describe your responsibility
• **A**ction: Explain what you did
• **R**esult: Share the outcome (quantify if possible)

**During the Interview:**
✓ Arrive 10-15 minutes early
✓ Bring copies of your resume
✓ Make eye contact and smile
✓ Listen carefully before answering
✓ Be specific with examples
✓ Show enthusiasm and curiosity

**After the Interview:**
• Send thank-you email within 24 hours
• Reference specific conversation points
• Reiterate your interest
• Follow up if you don't hear back in 1-2 weeks

What type of interview are you preparing for?`
                },

                // Skills Development
                skills: {
                    keywords: ['skills', 'learn', 'skill development', 'what skills', 'technical skills', 'soft skills', 'improve skills', 'skills needed'],
                    response: `🚀 **In-Demand Skills for 2024**

**Technical Skills (by field):**

**Software Development:**
• Programming: Python, JavaScript, Java, C++
• Web: React, Node.js, HTML/CSS, TypeScript
• Mobile: React Native, Flutter, Swift
• Database: SQL, MongoDB, PostgreSQL
• Tools: Git, Docker, AWS, CI/CD

**Data Science/Analytics:**
• Python (NumPy, Pandas, Scikit-learn)
• SQL and database management
• Data visualization (Tableau, PowerBI)
• Machine Learning basics
• Statistics and probability

**Design:**
• Figma, Adobe Creative Suite
• UI/UX principles
• Prototyping and wireframing
• User research methods
• Responsive design

**Universal Technical Skills:**
• Version control (Git/GitHub)
• Command line basics
• Problem-solving and debugging
• Testing and quality assurance
• Agile/Scrum methodologies

**Essential Soft Skills:**
• Communication (written and verbal)
• Teamwork and collaboration
• Time management
• Adaptability
• Critical thinking
• Leadership

**How to Learn:**
1. Online courses (Coursera, Udemy, freeCodeCamp)
2. Build projects (portfolio pieces)
3. Contribute to open source
4. Join coding communities
5. Practice on LeetCode/HackerRank
6. Read documentation and blogs

Which skill area interests you most?`
                },

                // Cover Letter
                cover_letter: {
                    keywords: ['cover letter', 'cover letter tips', 'write cover letter', 'cover letter help', 'application letter'],
                    response: `✉️ **Cover Letter Writing Guide**

**Structure (3-4 paragraphs):**

**1. Opening (Hook):**
• Address hiring manager by name if possible
• State the position you're applying for
• Brief compelling reason why you're interested
• Mention how you found the opportunity

**2. Body (Why You):**
• Highlight 2-3 relevant achievements
• Connect your experience to job requirements
• Show you understand the company's needs
• Use specific examples with results

**3. Body (Why Them):**
• Demonstrate company knowledge
• Explain why you're excited about this role
• Show cultural fit
• Mention specific projects/values that resonate

**4. Closing:**
• Reiterate enthusiasm
• Thank them for consideration
• Call to action (looking forward to discussing)
• Professional sign-off

**Best Practices:**
✓ Keep it to one page (3-4 paragraphs)
✓ Customize for each application
✓ Match tone to company culture
✓ Use active voice and strong verbs
✓ Proofread multiple times
✓ Save as PDF

**Common Mistakes:**
❌ Generic, template-sounding content
❌ Repeating your resume verbatim
❌ Focusing on what you want vs. what you offer
❌ Typos or wrong company name
❌ Being too long or too short

**Pro Tip:** Research the company's recent projects or news and reference them to show genuine interest!

Need help with a specific part?`
                },

                // Networking
                networking: {
                    keywords: ['network', 'networking', 'linkedin', 'connect', 'professional network', 'build network', 'networking tips'],
                    response: `🤝 **Networking Guide for Career Success**

**Why Network?**
• 70-85% of jobs are filled through networking
• Learn about hidden opportunities
• Get industry insights and advice
• Build professional reputation
• Find mentors and collaborators

**Where to Network:**
1. **LinkedIn:**
   • Optimize your profile (professional photo, headline)
   • Connect with alumni, classmates, professionals
   • Engage with content (like, comment, share)
   • Join relevant groups
   • Share your own insights

2. **Events:**
   • Career fairs and industry conferences
   • Meetups and workshops
   • Hackathons and competitions
   • Alumni events
   • Virtual webinars

3. **Campus:**
   • Student organizations
   • Professor office hours
   • Guest speaker events
   • Study groups

**How to Network Effectively:**

**Online:**
• Personalize connection requests
• Engage before asking for favors
• Share valuable content
• Congratulate others on achievements
• Ask thoughtful questions

**In-Person:**
• Prepare your elevator pitch (30 seconds)
• Ask open-ended questions
• Listen more than you talk
• Exchange contact information
• Follow up within 48 hours

**Informational Interview Tips:**
1. Request 15-20 minutes of their time
2. Prepare 5-7 thoughtful questions
3. Ask about their career path and advice
4. Don't ask for a job directly
5. Send thank-you note
6. Keep them updated on your progress

**Follow-Up Template:**
"Hi [Name], it was great connecting at [event/platform]. I really enjoyed learning about [specific topic]. I'd love to stay in touch and learn more about [their field]. Would you be open to a brief call?"

**Remember:** Networking is about building genuine relationships, not just collecting contacts!

What aspect of networking would you like to focus on?`
                },

                // Portfolio Building
                portfolio: {
                    keywords: ['portfolio', 'build portfolio', 'portfolio projects', 'github', 'showcase work', 'project portfolio'],
                    response: `💻 **Building a Standout Portfolio**

**Why You Need a Portfolio:**
• Demonstrates practical skills
• Shows problem-solving ability
• Proves you can complete projects
• Differentiates you from other candidates
• Gives interviewers talking points

**What to Include:**

**1. Personal Website/Portfolio Site:**
• About section (bio, skills, interests)
• Project showcase (3-5 quality projects)
• Resume/CV download
• Contact information
• Links to GitHub, LinkedIn

**2. GitHub Profile:**
• Pinned repositories (your best work)
• Clear README files for each project
• Consistent commit history
• Contribution to open source
• Clean, organized code

**3. Project Selection (3-5 projects):**
Choose projects that show:
• Different skills and technologies
• Problem-solving ability
• Complexity and depth
• Real-world applications
• Your interests and passion

**Project Types to Consider:**
• Full-stack web application
• Mobile app
• Data analysis/visualization project
• API or backend service
• Chrome extension or tool
• Open source contribution
• Hackathon project

**For Each Project Include:**
✓ Live demo link (deploy on Vercel, Netlify, Heroku)
✓ GitHub repository
✓ Clear description of purpose
✓ Technologies used
✓ Your role (if team project)
✓ Challenges overcome
✓ Screenshots/demo video
✓ Setup instructions

**README Best Practices:**
• Project title and description
• Features and functionality
• Tech stack
• Installation steps
• Usage examples
• Screenshots
• Future improvements
• Contact info

**Portfolio Website Tips:**
• Keep design clean and professional
• Make it responsive (mobile-friendly)
• Fast loading times
• Easy navigation
• Show personality but stay professional
• Include call-to-action (hire me, contact)

**Platforms to Host:**
• GitHub Pages (free, easy)
• Vercel (great for React/Next.js)
• Netlify (simple deployment)
• Custom domain (more professional)

**Pro Tips:**
• Quality over quantity (3 great projects > 10 mediocre ones)
• Update regularly with new skills
• Get feedback from peers and mentors
• Test on different devices
• Include a blog (optional but impressive)

Need specific advice on project ideas or technologies?`
                },

                // Career Path
                career: {
                    keywords: ['career', 'career path', 'career advice', 'career choice', 'career development', 'job role', 'career options'],
                    response: `🎯 **Career Path Guidance**

**Popular Tech Career Paths:**

**1. Software Engineering:**
• Frontend Developer → Senior Frontend → Lead
• Backend Developer → Senior Backend → Architect
• Full-Stack Developer → Senior Full-Stack → Tech Lead
• Average starting salary: $70-90k

**2. Data Science/Analytics:**
• Data Analyst → Data Scientist → Senior DS → Lead
• ML Engineer → Senior ML Engineer → ML Architect
• Average starting salary: $75-95k

**3. Product Management:**
• Associate PM → PM → Senior PM → Director
• Requires: Tech knowledge + business acumen
• Average starting salary: $80-100k

**4. Design:**
• UI/UX Designer → Senior Designer → Design Lead
• Product Designer → Principal Designer
• Average starting salary: $60-80k

**5. DevOps/Cloud:**
• DevOps Engineer → Senior DevOps → Platform Architect
• Cloud Engineer → Cloud Architect
• Average starting salary: $75-95k

**How to Choose Your Path:**

**1. Self-Assessment:**
• What do you enjoy doing?
• What are your strengths?
• What impact do you want to make?
• Work-life balance preferences?

**2. Exploration:**
• Try different projects
• Take online courses
• Talk to professionals in the field
• Do internships in different areas
• Attend industry events

**3. Consider:**
• Job market demand
• Growth potential
• Salary expectations
• Required skills and education
• Industry trends

**Career Development Tips:**
✓ Set short-term (1 year) and long-term (5 year) goals
✓ Continuously learn and upskill
✓ Build a strong professional network
✓ Seek mentorship
✓ Document your achievements
✓ Stay updated with industry trends
✓ Be open to pivoting

**Remember:** Career paths aren't linear! Many successful professionals have changed directions multiple times.

What specific career area interests you?`
                },

                // Salary Negotiation
                salary: {
                    keywords: ['salary', 'negotiation', 'negotiate salary', 'pay', 'compensation', 'salary negotiation', 'how much'],
                    response: `💰 **Salary Negotiation Guide**

**Research Phase:**
1. **Know Your Worth:**
   • Use Glassdoor, levels.fyi, Payscale
   • Consider: location, company size, experience
   • Factor in: benefits, equity, bonuses
   • Talk to people in similar roles

2. **Typical Internship Ranges (US, 2024):**
   • Tech internships: $20-50/hour
   • FAANG companies: $40-60/hour
   • Startups: $15-30/hour
   • Non-tech: $12-25/hour

**When to Negotiate:**
✓ After receiving a written offer
✓ When you have competing offers
✓ If offer is below market rate
✓ For full-time positions (more room than internships)

**How to Negotiate:**

**1. Express Enthusiasm:**
"I'm very excited about this opportunity and working with the team!"

**2. State Your Case:**
"Based on my research and experience with [specific skills], I was expecting a range of [X-Y]. Is there flexibility in the offer?"

**3. Provide Evidence:**
• Market research data
• Competing offers
• Unique skills/experience
• Cost of living considerations

**4. Be Professional:**
• Stay positive and collaborative
• Don't make ultimatums
• Be willing to compromise
• Consider total compensation

**What to Negotiate:**
• Base salary
• Signing bonus
• Stock options/equity
• Start date
• Remote work options
• Professional development budget
• Vacation time
• Relocation assistance

**Email Template:**
"Thank you for the offer! I'm excited about [specific aspect]. After researching similar roles in [location/industry], I was hoping for a salary in the range of [X-Y]. Given my experience with [relevant skills], would there be room for adjustment?"

**If They Say No:**
• Ask about performance review timeline
• Negotiate other benefits
• Request feedback for future
• Accept gracefully if offer is fair

**For Internships:**
• Less negotiation room than full-time
• Focus on learning and experience
• Negotiate if you have competing offers
• Consider: housing stipends, return offers

**Red Flags:**
❌ Offer significantly below market
❌ Unwillingness to discuss compensation
❌ Pressure to accept immediately
❌ Vague about benefits

**Remember:** Negotiation shows you value yourself and understand your worth. Most companies expect it!

Need help with a specific negotiation scenario?`
                },

                // Remote Work
                remote: {
                    keywords: ['remote', 'remote work', 'work from home', 'wfh', 'remote internship', 'virtual internship', 'online work'],
                    response: `🏠 **Remote Work & Internships Guide**

**Finding Remote Opportunities:**
• Remote-specific job boards: We Work Remotely, Remote.co
• Filter on LinkedIn/Indeed for "remote"
• Look for fully distributed companies
• Virtual internship programs
• Freelance platforms (Upwork, Fiverr)

**Benefits of Remote Work:**
✓ Location flexibility
✓ No commute time
✓ Cost savings
✓ Better work-life balance
✓ Access to global opportunities
✓ Comfortable environment

**Challenges:**
• Communication barriers
• Time zone differences
• Self-motivation required
• Potential isolation
• Home distractions
• Harder to build relationships

**Succeeding in Remote Internships:**

**1. Communication:**
• Over-communicate your progress
• Use video calls when possible
• Respond promptly to messages
• Ask questions proactively
• Set clear expectations

**2. Workspace Setup:**
• Dedicated work area
• Good internet connection
• Proper lighting and ergonomics
• Minimal distractions
• Professional background for calls

**3. Time Management:**
• Set regular working hours
• Use time-blocking techniques
• Take regular breaks
• Use productivity tools (Notion, Trello)
• Track your tasks and progress

**4. Building Relationships:**
• Schedule virtual coffee chats
• Participate in team activities
• Be present in team channels
• Share wins and learnings
• Ask for feedback regularly

**Essential Tools:**
• Communication: Slack, Microsoft Teams
• Video: Zoom, Google Meet
• Project Management: Jira, Asana, Trello
• Documentation: Notion, Confluence
• Code Collaboration: GitHub, GitLab

**Best Practices:**
✓ Maintain professional appearance on video
✓ Test tech before important meetings
✓ Keep camera on when possible
✓ Respect time zones
✓ Document everything
✓ Set boundaries (work hours)

**Red Flags in Remote Positions:**
❌ No clear onboarding process
❌ Lack of communication tools
❌ Unrealistic expectations
❌ No team interaction
❌ Poor documentation

**Making the Most of It:**
• Treat it like an in-person role
• Build your portfolio with projects
• Network with team members
• Ask for recommendation letters
• Seek mentorship opportunities

Interested in specific remote work tips?`
                },

                // Application Process
                application: {
                    keywords: ['apply', 'application', 'application process', 'how to apply', 'applying', 'submit application', 'job application'],
                    response: `📝 **Job Application Process - Step by Step**

**Before You Apply:**

**1. Preparation (1-2 weeks):**
• Update resume and LinkedIn
• Prepare cover letter template
• Gather references (3-4 people)
• Create a tracking spreadsheet
• Set up professional email
• Build/update portfolio

**2. Research (per application):**
• Company mission and values
• Recent news and projects
• Company culture and reviews
• Role requirements
• Team structure
• Growth opportunities

**Application Strategy:**

**1. Where to Apply:**
• Company career pages (best)
• LinkedIn Easy Apply
• Job boards (Indeed, Glassdoor)
• Referrals (highest success rate)
• Recruiting events
• Direct emails to recruiters

**2. How Many to Apply:**
• Quality over quantity
• Aim for 20-30 targeted applications
• 5-10 "reach" companies
• 10-15 "target" companies
• 5-10 "safety" companies

**3. Timing:**
• Apply early in posting (first 2 weeks)
• Best days: Tuesday-Thursday
• Best time: Morning (8-11 AM)
• Avoid: Late Friday, weekends

**Application Components:**

**1. Resume:**
• Tailored to job description
• Keywords from posting
• Quantified achievements
• Relevant skills highlighted
• Error-free, PDF format

**2. Cover Letter:**
• Personalized to company
• Addresses key requirements
• Shows enthusiasm
• Tells your story
• 3-4 paragraphs max

**3. Portfolio (if applicable):**
• Relevant projects
• Live demos
• Clean code on GitHub
• Professional presentation

**4. Application Form:**
• Fill completely and accurately
• Use keywords from job description
• Proofread before submitting
• Save confirmation email

**After Applying:**

**Week 1:**
• Send confirmation to yourself
• Update tracking sheet
• Connect with recruiter on LinkedIn (optional)

**Week 2:**
• Follow up if you have a referral
• Continue applying to other positions

**Week 3-4:**
• Send polite follow-up email
• Check application status

**Tracking Spreadsheet Columns:**
• Company name
• Position title
• Date applied
• Application link
• Status (applied, interview, rejected, offer)
• Follow-up dates
• Notes
• Contacts

**Follow-Up Email Template:**
"Hi [Recruiter Name],

I applied for the [Position] role on [Date] and wanted to express my continued interest. I'm particularly excited about [specific aspect]. 

I'd love to discuss how my experience with [relevant skill] could contribute to [company goal].

Thank you for your consideration!

Best,
[Your Name]"

**Common Mistakes:**
❌ Generic applications
❌ Typos or wrong company name
❌ Not following instructions
❌ Applying to too many roles at one company
❌ Incomplete applications
❌ Not proofreading

**Success Tips:**
✓ Customize each application
✓ Use referrals when possible
✓ Apply early and often
✓ Follow up professionally
✓ Stay organized
✓ Don't get discouraged by rejections
✓ Learn from each application

**Average Timeline:**
• Application to response: 1-3 weeks
• Interview process: 2-6 weeks
• Total process: 1-2 months

Remember: Rejection is normal! Even strong candidates face 80-90% rejection rates.

Need help with a specific part of your application?`
                },

                // General/Default
                general: {
                    keywords: ['help', 'hi', 'hello', 'hey', 'thanks', 'thank you', 'what can you do', 'who are you'],
                    response: `👋 **Hello! I'm Job Buddy, your AI career assistant!**

I can help you with:

🎯 **Finding Internships** - Search strategies, platforms, networking
📄 **Resume Writing** - Structure, content, formatting tips
💼 **Interview Prep** - Common questions, STAR method, follow-up
🚀 **Skills Development** - Technical and soft skills to learn
✉️ **Cover Letters** - Writing compelling application letters
🤝 **Networking** - Building professional connections
💻 **Portfolio Building** - Showcasing your projects
💰 **Salary Negotiation** - Research and negotiation strategies
🏠 **Remote Work** - Finding and succeeding in remote roles
📝 **Application Process** - Step-by-step application guidance
🎯 **Career Paths** - Exploring different career options

**Just ask me anything!** For example:
• "How do I find internships in tech?"
• "What should I include in my resume?"
• "How do I prepare for a technical interview?"
• "What skills should I learn for data science?"

I'm here to help you succeed in your career journey! 🌟`
                }
            };

            // Smart question matching
            // lowerQuery already declared above
            let matchedResponse = null;
            let highestMatchScore = 0;

            // Find the best matching topic
            for (const [topic, data] of Object.entries(knowledgeBase)) {
                let matchScore = 0;

                for (const keyword of data.keywords) {
                    if (lowerQuery.includes(keyword)) {
                        // Longer keyword matches get higher scores
                        matchScore += keyword.length;
                    }
                }

                if (matchScore > highestMatchScore) {
                    highestMatchScore = matchScore;
                    matchedResponse = data.response;
                }
            }

            // If no good match found, use general response
            if (highestMatchScore === 0) {
                matchedResponse = knowledgeBase.general.response;
            }

            // Add a small delay to simulate thinking
            await new Promise(resolve => setTimeout(resolve, 800));

            setMessages(prev => [...prev, { role: 'assistant', content: matchedResponse }]);

        } catch (error) {
            console.error('Error in chatbot:', error);

            // Fallback error message
            const errorMessage = `I apologize, but I encountered an error. However, I'm still here to help! 

I can assist you with:
• Finding internships and job opportunities
• Resume and cover letter writing
• Interview preparation
• Skills development
• Career guidance
• And much more!

Please try asking your question again, or ask me about any career-related topic! 🌟`;

            setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickSuggestion = (suggestion) => {
        setInputMessage(suggestion);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center gap-2 group"
                    >
                        <Sparkles className="h-6 w-6 animate-pulse" />
                        <MessageCircle className="h-6 w-6" />
                        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold">
                            Chat with Job Buddy
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -100, scale: 0.8 }}
                        className="fixed top-6 right-6 z-50 w-96 h-[600px] bg-[#112240] rounded-2xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                                    <Sparkles className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Job Buddy</h3>
                                    <p className="text-green-100 text-xs">Your AI Career Assistant</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a192f]">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                            : 'bg-[#112240] text-gray-300 border border-gray-700'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-[#112240] text-gray-300 border border-gray-700 p-3 rounded-2xl flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-green-400" />
                                        <span className="text-sm">Job Buddy is thinking...</span>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Suggestions */}
                        {messages.length === 1 && (
                            <div className="p-3 bg-[#0a192f] border-t border-gray-700">
                                <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickSuggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickSuggestion(suggestion)}
                                            className="text-xs bg-[#112240] text-green-400 px-3 py-1.5 rounded-full hover:bg-green-600 hover:text-white transition-colors border border-gray-700"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 bg-[#112240] border-t border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask Job Buddy anything..."
                                    className="flex-1 bg-[#0a192f] text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm placeholder-gray-500"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim() || isLoading}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Powered by AI • Always here to help 24/7
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default JobBuddy;
