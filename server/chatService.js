// College Website - AI Chatbot Service
// 1) Tries Anthropic API (ANTHROPIC_API_KEY) if configured — API key stays server-side.
// 2) Grounds answers on the site's own content (admissions, deadlines, programs, campus life).
// 3) Falls back to a rule-based assistant; anything it can't answer routes to "contact admissions".

const db = require('./database');

const DISCLAIMER =
  '⚠️ I am an AI assistant, not a human. For official answers, please contact the Admissions Office at admissions@college.edu or call +1 (555) 010-2000.';

// ─── Knowledge base (grounded in site content) ───
const FAQ = [
  {
    keywords: ['apply', 'application', 'admission', 'admissions', 'how do i apply', 'enroll', 'enrollment'],
    answer: 'You can apply through our Admissions page. The process is: 1) Submit the online application, 2) Provide transcripts and test scores, 3) Complete the interview (for select programs), 4) Receive your decision. The application deadline for Fall 2026 is December 1, 2025. Visit /admissions for the full step-by-step guide.'
  },
  {
    keywords: ['deadline', 'due date', 'when', 'cutoff', 'due'],
    answer: 'Key deadlines: Fall 2026 priority application — December 1, 2025; Regular decision — February 1, 2026; Financial aid — March 1, 2026; Tuition deposit — May 1, 2026. See the /admissions page deadline calendar for the full list.'
  },
  {
    keywords: ['tuition', 'cost', 'fee', 'fees', 'price', 'expensive', 'how much'],
    answer: 'Tuition for the 2026–2027 academic year is $12,400 per year for in-state students and $24,800 for out-of-state. There are also fees for housing, dining, and course materials. Over 80% of students receive some form of financial aid or scholarship. See /admissions for the full tuition breakdown.'
  },
  {
    keywords: ['scholarship', 'financial aid', 'grant', 'aid', 'money', 'funding'],
    answer: 'We offer merit-based scholarships, need-based grants, work-study, and athletic scholarships. The financial aid application deadline is March 1, 2026. Visit /admissions and contact the Financial Aid Office at finaid@college.edu for details.'
  },
  {
    keywords: ['program', 'major', 'minor', 'degree', 'course', 'academic', 'study', 'curriculum', 'department'],
    answer: 'We offer 60+ undergraduate programs across the College of Arts & Sciences, College of Engineering, College of Business, and College of Health Sciences. Popular majors include Computer Science, Business Administration, Nursing, and Psychology. See /academics for the full program listing.'
  },
  {
    keywords: ['sport', 'athletic', 'team', 'football', 'basketball', 'soccer', 'club', 'extracurricular'],
    answer: 'We have 15 NCAA Division III varsity teams plus over 120 student clubs and organizations. Student life includes intramural sports, club sports, and our student government. See /student-life for team schedules and club listings.'
  },
  {
    keywords: ['housing', 'dorm', 'residence', 'on campus', 'live on campus', 'room'],
    answer: 'About 85% of first-year students live on campus. We have 6 residence halls with a mix of traditional and suite-style rooms. Housing applications open in March. See /student-life for details on residential life.'
  },
  {
    keywords: ['campus', 'visit', 'tour', 'location', 'where', 'address', 'map'],
    answer: 'We are located at 100 University Avenue, Springfield. You can take a self-guided campus tour or book a guided tour with our admissions team. See /contact for the map and visitor information.'
  },
  {
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'office'],
    answer: 'General inquiries: info@college.edu or +1 (555) 010-2000. Admissions: admissions@college.edu. Financial Aid: finaid@college.edu. You can also use the contact form on /contact.'
  },
  {
    keywords: ['portal', 'login', 'sign in', 'password', 'account', 'student portal', 'dashboard'],
    answer: 'Students can sign in to the Student Portal at /portal/signin. New students register at /portal/signup. If you forgot your password, use the "Forgot password" link on the sign-in page. For a hands-on tour, use the demo account: demo@student.college.edu (password: demo1234).'
  },
  {
    keywords: ['librar', 'books', 'media center', 'research'],
    answer: 'The College Library is open Mon–Fri 8am–10pm and Sat–Sun 10am–6pm. It offers a digital catalog, research databases, study rooms, and a media center. See /library for hours and borrowing policies.'
  },
  {
    keywords: ['counsel', 'health', 'support', 'wellness', 'mental', 'help'],
    answer: 'Our Counseling & Health Services provide mental health counseling, health clinic services, and accessibility resources. All services are confidential. See /support-services for contact options and hours.'
  },
  {
    keywords: ['board', 'governance', 'trustees', 'meeting', 'minutes'],
    answer: 'The Board of Trustees governs the college and meets monthly. Agendas and approved minutes are published on the /board page. Meetings are open to the public.'
  },
  {
    keywords: ['calendar', 'holiday', 'exam', 'schedule', 'semester', 'break'],
    answer: 'The academic calendar includes the Fall (Aug–Dec) and Spring (Jan–May) semesters, plus Winter and Summer sessions. Filterable by category on /calendar, and you can export it as iCal.'
  },
  {
    keywords: ['staff', 'directory', 'teacher', 'professor', 'faculty', 'instructor'],
    answer: 'You can search our staff directory by name, department, or room number on /staff-directory. Each listing includes email and contact details.'
  },
  {
    keywords: ['news', 'event', 'announcement', 'what is happening', 'activity'],
    answer: 'Check /news for the latest news and press releases, and /events for upcoming campus events with a filterable calendar and photo/video galleries.'
  }
];

// ─── Rule-based matching ───
function lookupAnswer(text) {
  const lower = (text || '').toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const item of FAQ) {
    let score = 0;
    for (const kw of item.keywords) {
      if (lower.includes(kw)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return bestScore > 0 ? best : null;
}

function greetings(text) {
  const lower = (text || '').toLowerCase();
  if (/(^|\s)(hi|hello|hey|good (morning|afternoon|evening))\b/.test(lower)) {
    return 'Hello! 👋 Welcome to College. I can help with admissions, deadlines, programs, tuition, campus life, and portal logins. What would you like to know?';
  }
  if (/(thank|thanks|awesome|great|perfect)/.test(lower)) {
    return "You're welcome! 😊 Is there anything else I can help you with?";
  }
  return null;
}

function ruleBasedReply(text) {
  const greet = greetings(text);
  if (greet) return { text: greet, answered: true };

  const match = lookupAnswer(text);
  if (match) {
    return {
      text: `${match.answer}\n\n${DISCLAIMER}`,
      answered: true
    };
  }

  // Fallback: route to admissions
  return {
    text: `I'm not entirely sure about that one. 🤔 For an official answer, please contact the Admissions Office at admissions@college.edu or call +1 (555) 010-2000. You can also browse /admissions, /academics, and /student-life for more info.\n\n${DISCLAIMER}`,
    answered: false
  };
}

// ─── Anthropic API (server-side key) ───
async function claudeReply(text, history) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const match = lookupAnswer(text);
  const context = match
    ? match.answer
    : 'No exact match found. If the user asks something outside the site, politely route them to the Admissions Office.';

  const system = [
    'You are the College admissions & campus assistant. You give friendly, professional information about the college.',
    'You must:',
    '1) Answer using ONLY the provided site knowledge base.',
    '2) If the question is not covered, route to the Admissions Office (admissions@college.edu / +1 (555) 010-2000).',
    '3) ALWAYS include this exact disclaimer at the end: ' + DISCLAIMER,
    '4) Keep answers concise (under ~160 words) and use short paragraphs/bullets.',
    '5) Never invent facts about the college outside the knowledge base.'
  ].join('\n');

  const user = [
    `SITE KNOWLEDGE BASE:\n${context}`,
    '---',
    `VISITOR: ${text}`,
    ...history.slice(-6).map(h => `${h.sender === 'user' ? 'VISITOR' : 'ASSISTANT'}: ${h.message}`)
  ].join('\n');

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 400,
        system,
        messages: [{ role: 'user', content: user }]
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.warn('Claude API error', response.status);
      return null;
    }
    const data = await response.json();
    const content = data.content?.[0]?.text;
    if (!content) return null;
    return { text: content, answered: true };
  } catch (err) {
    console.warn('Claude API failed, using fallback:', err.message);
    return null;
  }
}

async function getChatReply(text, history = []) {
  const claude = await claudeReply(text, history);
  if (claude) return claude;
  return ruleBasedReply(text);
}

module.exports = { getChatReply, DISCLAIMER };
