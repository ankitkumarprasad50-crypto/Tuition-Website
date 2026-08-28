// ============================================================================
//  Vidya Vriksh Tuition — shared header/footer, site config, and a simple
//  English ⇄ Telugu translator (a language toggle in the menu).
//  Translatable text uses data-i18n / data-i18n-html / data-i18n-ph attributes.
// ============================================================================

const SITE = {
  name: "Vidya Vriksh Tuition",
  phoneDisplay: "+91 83400 77114",
  phoneLink: "+918340077114",
  whatsapp: "918340077114",
  email: "jyotiprasad980307@gmail.com",
  address: "D.No 15-10-27, Bapuji Nagar, Near Railway Station, Kovvur, East Godavari, Andhra Pradesh",
  mapQuery: "Bapuji Nagar, Near Railway Station, Kovvur, East Godavari, Andhra Pradesh",
  timings: "6:00 PM – 8:00 PM · Monday to Saturday",
};
window.SITE = SITE;

const NAV = [
  { href: "/",         key: "nav.home" },
  { href: "/about",    key: "nav.about" },
  { href: "/courses",  key: "nav.courses" },
  { href: "/fees",     key: "nav.fees" },
  { href: "/faq",      key: "nav.faq" },
  { href: "/contact",  key: "nav.contact" },
];

// ---- Translations ----------------------------------------------------------
window.I18N = {
  en: {
    "nav.home": "Home", "nav.about": "About", "nav.courses": "Courses", "nav.fees": "Fees",
    "nav.faq": "FAQ", "nav.contact": "Contact", "nav.enrol": "Enrol Now",
    "footer.tagline": "Caring, all-subject tuition from Pre-KG to Intermediate in Kovvur",
    "footer.explore": "Explore", "footer.reach": "Reach us", "footer.wa": "WhatsApp us",
    "footer.guide": "User Guide", "footer.parentLogin": "Parent login", "footer.teacherLogin": "Teacher login",
    "footer.by": "Website by",

    "home.pill": "Now enrolling · Pre-KG to Intermediate",
    "home.tagline": "Caring, all-subject tuition from Pre-KG to Intermediate in Kovvur",
    "home.enrol": "Enrol Your Child", "home.seeCourses": "See Courses",
    "chip.range": "Pre-KG – Intermediate", "chip.allsub": "All Subjects", "chip.spoken": "Spoken English",
    "h.expTitle": "Experienced Teacher", "h.expBody": "Taught by a qualified school teacher — not part-timers.",
    "h.batchTitle": "Small Batches", "h.batchBody": "Limited students per batch so every child gets attention.",
    "h.updTitle": "Regular Updates", "h.updBody": "Parents get frequent feedback on their child's progress.",
    "h.spokenTitle": "Spoken English", "h.spokenBody": "Optional Spoken English coaching, available on request.",
    "about.eyebrow": "Meet your teacher",
    "about.creds": "B.Tech (ECE) · Teaching at Kovvur Bhashyam since 2020",
    "about.bio": "Jyoti started Vidya Vriksh because she believes every child learns differently and deserves patient, one-on-one attention. She helps students from Pre-KG to Intermediate build strong fundamentals across all subjects.",
    "about.more": "More about Jyoti",
    "courses.eyebrow": "What we teach", "courses.h2": "All Subjects, Pre-KG to Intermediate",
    "courses.sub": "Help with every school subject — plus Spoken English coaching on request.",
    "c.mathsT": "Mathematics", "c.mathsB": "Strong number sense and everyday problem-solving.",
    "c.engT": "English", "c.engB": "Reading, grammar, writing and confident communication.",
    "c.spokenT": "Spoken English", "c.spokenB": "Optional coaching to speak clearly and confidently.",
    "courses.viewAll": "View all courses",
    "time.eyebrow": "When we meet", "time.h2": "Class Timings", "time.note": "Monday to Saturday · Pre-KG to Intermediate",
    "test.eyebrow": "Kind words", "test.h2": "What parents say",
    "test.q1": "“My daughter's confidence has completely changed. She actually looks forward to class now!”",
    "test.a1": "— Parent of a Class 4 student",
    "test.q2": "“Very patient and caring. Regular updates keep us informed about our son's progress.”",
    "test.a2": "— Parent of a Class 8 student",
    "cta.h2": "Give your child a caring start", "cta.p": "Book a trial class or ask us anything — we'd love to help.",
    "cta.btn": "Enrol Now",

    "crumb.about": "About",
    "about.h1": "About Vidya Vriksh",
    "about.heroP": "A caring neighbourhood tuition from Pre-KG to Intermediate, run by an experienced teacher.",
    "about.bioFull": "I'm Jyoti Prasad. I started Vidya Vriksh because I believe every child learns differently and deserves patient, one-on-one attention. In small batches, I help students from Pre-KG to Intermediate build strong fundamentals across all subjects — with confidence, care, and a genuine love of learning. Spoken English coaching is also available on request.",
    "about.trial": "Book a Trial Class",
    "ap.eyebrow": "Our approach", "ap.h2": "Why parents choose us",
    "ap.c1t": "Small batches", "ap.c1b": "Every child is seen, heard and helped — no one gets left behind.",
    "ap.c2t": "Patience first", "ap.c2b": "A calm, encouraging space where children aren't afraid to ask.",
    "ap.c3t": "Strong basics", "ap.c3b": "We focus on fundamentals so later years feel easy, not scary.",
    "ap.c4t": "Regular updates", "ap.c4b": "Parents hear how their child is really doing, often.",
    "ap.c5t": "All subjects", "ap.c5b": "One trusted teacher for everything, plus daily homework help.",
    "ap.c6t": "Close to home", "ap.c6b": "Right near Kovvur railway station — easy for families to reach.",
    "about.ctaH": "Come say hello", "about.ctaP": "Visit us, call, or send an enquiry — we're happy to answer your questions.", "about.ctaBtn": "Get in touch",

    "co.h1": "Courses & Subjects",
    "co.heroP": "Help with every school subject from Pre-KG to Intermediate — with caring, personal attention.",
    "co.maths": "Mathematics", "co.mathsB": "Number sense, tables, and everyday problem-solving built step by step.",
    "co.eng": "English", "co.engB": "Reading, phonics, grammar, writing and confident communication.",
    "co.sci": "Science", "co.sciB": "EVS in the early years; Physics, Chemistry & Biology basics made simple later.",
    "co.social": "Social Studies", "co.socialB": "Our world, people and places — made easy to understand and remember.",
    "co.lang": "Languages", "co.langB": "Telugu & Hindi reading, writing and comprehension at every level.",
    "co.hw": "Homework & Exam Help", "co.hwB": "Daily doubt-clearing and revision so school tests feel easy.",
    "co.spoken": "Spoken English", "co.spokenB": "Optional coaching to speak clearly and confidently — available on request.",
    "co.howEyebrow": "How classes work", "co.howH2": "Simple, steady, supportive",
    "co.d1": "Daily practice", "co.d1b": "Classes run 6:00–8:00 PM, Monday to Saturday, so learning stays consistent.",
    "co.d2": "Weekly tests", "co.d2b": "Short, friendly tests build confidence and show what to revise.",
    "co.d3": "Personal attention", "co.d3b": "Small batches mean lessons adapt to each child's pace.",
    "co.ctaH": "Not sure where your child fits?", "co.ctaP": "Tell us their class and we'll guide you — a trial class is the easiest way to start.", "co.ctaBtn": "Enrol or Ask Us",

    "fee.h1": "Timings & Fees", "fee.heroP": "Honest, simple pricing and convenient evening timings — six days a week.",
    "fee.timeNote": "Monday to Saturday · 6 days a week · Pre-KG to Intermediate",
    "fee.eyebrow": "Simple pricing", "fee.h2": "Monthly Fees", "fee.p": "All subjects included. Please contact us for exact details and sibling discounts.",
    "fee.prekg": "Pre-KG", "fee.c15": "Class 1 – 5", "fee.c69": "Class 6 – 9", "fee.c1012": "Class 10 – 12",
    "fee.perMonth": "per month", "fee.6days": "6 days a week", "fee.play": "Play-based learning", "fee.readnum": "Reading & numbers",
    "fee.hwhelp": "Homework help", "fee.weekly": "Weekly tests", "fee.board": "Board & Inter exam prep", "fee.popular": "Most popular", "fee.enrol": "Enrol",
    "fee.note": "💡 Spoken English coaching available on request · Sibling & long-term discounts — just ask.",
    "fee.ctaH": "Ready to enrol?", "fee.ctaP": "Send a quick enquiry and we'll confirm the details for your child's class.",

    "faq.h1": "Frequently Asked Questions", "faq.heroP": "Quick answers to the things parents ask us most.",
    "faq.q1": "Which classes and subjects do you teach?",
    "faq.a1": "We teach students from <strong>Pre-KG up to Intermediate (Class 12)</strong>, and cover <strong>all subjects</strong> — Maths, English, Science, Social Studies, Telugu &amp; Hindi — plus daily homework help and optional Spoken English.",
    "faq.q2": "What are the class timings?",
    "faq.a2": "Classes run <strong>6:00 PM – 8:00 PM</strong>, <strong>Monday to Saturday</strong> (six days a week).",
    "faq.q3": "How much are the fees?",
    "faq.a3": "<strong>₹400/month</strong> for Pre-KG, <strong>₹700/month</strong> for Classes 1–5, <strong>₹900/month</strong> for Classes 6–9 and <strong>₹1,100/month</strong> for Classes 10–12 — all subjects included. Sibling and long-term discounts are available — just ask.",
    "faq.q4": "Can my child attend a trial class first?",
    "faq.a4": "Absolutely. Send an enquiry or call us and we'll arrange a trial class so your child can settle in comfortably before you decide.",
    "faq.q5": "How big are the batches?",
    "faq.a5": "We keep batches <strong>small on purpose</strong>, so every child gets personal attention and no one falls behind.",
    "faq.q6": "What should my child bring?",
    "faq.a6": "Just their school books, notebooks and homework. We'll take care of the rest with extra practice and guidance.",
    "faq.q7": "Do you offer Spoken English?",
    "faq.a7": "Yes — a <strong>Spoken English</strong> course is available <strong>on request</strong>, to help students speak clearly and confidently. Just ask us about it.",
    "faq.q8": "Where are you located?",
    "faq.a8": "D.No 15-10-27, Bapuji Nagar, near the railway station, Kovvur, East Godavari, Andhra Pradesh. See the <a href=\"/contact\">Contact page</a> for a map.",
    "faq.ctaH": "Still have a question?", "faq.ctaP": "We're happy to help — reach out any time.", "faq.ctaBtn": "Ask Us",

    "ct.h1": "Contact & Enrol", "ct.heroP": "Call, message us on WhatsApp, or send the enquiry form below — we'll get back to you quickly.",
    "ct.call": "Call", "ct.wa": "WhatsApp", "ct.visit": "Visit", "ct.email": "Email", "ct.timings": "Timings", "ct.timeVal": "6:00 PM – 8:00 PM · Mon to Sat",
    "ct.eyebrow": "Ready to start?", "ct.h2": "Enrolment Enquiry", "ct.p": "Fill in the form and we'll get back to you. It only takes a minute.",
    "ct.parentName": "Parent's name", "ph.parentName": "Your name",
    "ct.studentName": "Student's name", "ph.studentName": "Child's name",
    "ct.class": "Class / Standard", "ct.selectClass": "Select class",
    "ct.subjects": "Subjects needed", "ph.subjects": "e.g. Maths, English (or 'All')",
    "ct.phone": "Phone number", "ph.phone": "Your contact number",
    "ct.msg": "Anything else? (optional)", "ph.msg": "Tell us about your child's needs",
    "ct.submit": "Submit Enquiry", "ct.sendWa": "Send on WhatsApp",
    "ct.err": "Sorry, something went wrong sending the form. Please try the WhatsApp button or call us instead.",
    "ct.thankH": "Thank you!", "ct.thankP": "We've received your enquiry and will contact you very soon.", "ct.done": "Done",
    "g.print": "🖨️ Save as PDF / Print", "g.badge": "User Guide", "g.title": "How to use Vidya Vriksh",
    "g.intro": "A simple, step-by-step guide for <strong>teachers</strong> and <strong>parents</strong>. Works on phones and computers.",
    "g.contents": "Contents",
    "g.toc1": "👩‍🏫 <a href=\"#teacher\">Teacher Portal</a> — sign in, students, tests, marks, reports, emailing, parent access, settings",
    "g.toc2": "👪 <a href=\"#parent\">Parent Portal</a> — sign in and view your child's progress",
    "g.toc3": "📱 <a href=\"#tips\">Tips for phone &amp; browser</a>",
    "g.tHead": "👩‍🏫 Teacher Portal", "g.tIntro": "The Teacher Portal is where you manage students, record test marks, and share progress with parents.",
    "g.t1h": "1. Signing in",
    "g.t1a": "<strong>Easiest — tap <span class=\"kbd\">Sign in with Google</span></strong> and pick your account. No password needed (your Google email just has to match your teacher account). ✅",
    "g.t1b": "Or enter your <strong>email</strong> and <strong>password</strong> (tap the 👁️ to see what you typed) and tap <span class=\"kbd\">Sign in</span>.",
    "g.t1note": "🔑 Using a password? First time, use the temporary one you were given, then change it in <em>Settings</em>. Forgot it? Ask the tuition to reset it — or just use <strong>Sign in with Google</strong>.",
    "g.t2h": "2. Dashboard",
    "g.t2p": "After signing in you'll see the <strong>Dashboard</strong>: quick counts (students, tests, class average) and a list of your students. Tap <span class=\"kbd\">Open</span> on any student to view their page.",
    "g.t3h": "3. Students — add &amp; manage",
    "g.t3a": "Go to <strong>Students</strong> → tap <span class=\"kbd\">+ Add Student</span>.",
    "g.t3b": "Fill in the child's <strong>name</strong> and <strong>class</strong>.",
    "g.t3c": "Add the <strong>parent's name, phone</strong>, and especially the <strong>parent's email</strong> — this is needed to email reports and to give parents a login.",
    "g.t3d": "Tap <span class=\"kbd\">Save</span>.",
    "g.t3p": "Use <span class=\"kbd\">Edit</span> to update details or <span class=\"kbd\">✕</span> to remove a student. Each teacher only sees their own students.",
    "g.t4h": "4. Tests — create them first",
    "g.t4a": "Go to <strong>Tests</strong> → tap <span class=\"kbd\">+ Add Test</span>.",
    "g.t4b": "Enter the <strong>test name</strong> (e.g. \"Unit Test 1\"), <strong>subject</strong>, <strong>date</strong>, and <strong>maximum marks</strong>.",
    "g.t4c": "Tap <span class=\"kbd\">Save</span>. Repeat for each test.",
    "g.t5h": "5. Recording marks",
    "g.t5a": "Open a student (Students → <span class=\"kbd\">Open</span>).",
    "g.t5b": "Scroll to <strong>Record marks</strong> — you'll see a row for every test.",
    "g.t5c": "Type the score in the <strong>Score</strong> box and <strong>click away</strong> — it <strong>saves automatically</strong> (you'll see a \"Saved\" note).",
    "g.t5d": "Add an optional remark. To remove a mark, clear the box.",
    "g.t6h": "6. Reports &amp; charts",
    "g.t6p": "On the student's page you'll see their <strong>overall average</strong>, a short <strong>verdict</strong>, and two charts that update as you add marks:",
    "g.t6a": "<strong>Marks by test</strong> — a bar for each test's percentage.",
    "g.t6b": "<strong>Progress trend</strong> — a line showing whether results are improving.",
    "g.t7h": "7. Send a report to the parent",
    "g.t7a": "<strong>WhatsApp (free):</strong> tap <span class=\"kbd\">📲 WhatsApp report</span> — WhatsApp opens with the report already typed out to the parent's number. Just tap <strong>Send</strong>. (Needs the student's <strong>parent phone</strong>.)",
    "g.t7b": "<strong>Email:</strong> tap <span class=\"kbd\">✉️ Email report</span> to email a neat report with scores and bars. (Needs the <strong>parent email</strong> + email connected in <em>Settings → Sending email</em>.)",
    "g.t8h": "8. Give a parent their own login",
    "g.t8a": "Open the student (they must have a parent email).",
    "g.t8b": "In the <strong>Parent login access</strong> box, type a password and tap <span class=\"kbd\">Save</span>.",
    "g.t8c": "Share the <strong>parent's email + that password</strong> with them. They sign in at <strong>hrm99.com/parent</strong>.",
    "g.t9h": "9. Add another teacher",
    "g.t9p": "Go to <strong>Teachers</strong> → <span class=\"kbd\">+ Add Teacher</span> → enter their name, email and a temporary password → share it with them. Any teacher can add teachers.",
    "g.t10h": "10. Settings",
    "g.t10a": "<strong>Login email</strong> — change the email you sign in with.",
    "g.t10b": "<strong>Change password</strong> — set a new password anytime.",
    "g.t10c": "<strong>Sending email</strong> — connect the Gmail that report/enquiry emails are sent from: turn on 2-Step Verification, create a Google <strong>App Password</strong>, paste it here, and tap <span class=\"kbd\">Connect &amp; verify</span>. (Steps are shown on the page.)",
    "g.pHead": "👪 Parent Portal", "g.pIntro": "Parents can sign in to see their child's marks and progress — anytime, on any device. It's <strong>view-only</strong>.",
    "g.p1h": "1. Signing in",
    "g.p1a": "Open <strong>hrm99.com/parent</strong>.",
    "g.p1b": "<strong>Easiest — tap <span class=\"kbd\">Sign in with Google</span></strong> and pick your account. No password needed, as long as the tuition has your Google email on file. ✅",
    "g.p1c": "Or enter the <strong>email</strong> and <strong>password</strong> the tuition gave you (tap 👁️ to reveal) and tap <span class=\"kbd\">Sign in</span>.",
    "g.p1note": "Don't see your child after signing in? Ask the tuition to add your email to your child's record.",
    "g.p2h": "2. Viewing your child's progress",
    "g.p2p": "You'll see a card for <strong>each of your children</strong>, showing:",
    "g.p2a": "<strong>Overall average</strong> and a short <strong>verdict</strong>.",
    "g.p2b": "<strong>Marks by test</strong> — a bar per test. <span style=\"color:#5E927B;font-weight:800\">Green</span> = strong, <span style=\"color:#b98a2a;font-weight:800\">amber</span> = okay, <span style=\"color:#C65B42;font-weight:800\">red</span> = needs support.",
    "g.p2c": "<strong>Progress trend</strong> — is your child improving over time?",
    "g.p2d": "A <strong>table of every test</strong> with the exact score.",
    "g.p3h": "3. Logging out",
    "g.p3p": "Tap <span class=\"kbd\">Log out</span> (top-right). Have a question about the marks? Contact the tuition directly.",
    "g.tipsHead": "📱 Tips for phone &amp; browser",
    "g.tip1": "<strong>On a phone:</strong> tap the <span class=\"kbd\">☰</span> menu (top-right) to move between pages. Everything works on phones.",
    "g.tip2": "<strong>Browser:</strong> use an up-to-date <strong>Chrome</strong> or <strong>Safari</strong>. If a page looks out of date, refresh it.",
    "g.tip3": "<strong>Saving:</strong> marks save automatically — no \"save\" button needed.",
    "g.tip4": "<strong>Security:</strong> keep your password private and log out on shared devices.",
    "g.tip5": "<strong>Need this on paper?</strong> Tap <strong>🖨️ Save as PDF / Print</strong> at the top of this page.",
    "g.footer": "Vidya Vriksh Tuition · Kovvur — need help? Contact the tuition.",
  },
  te: {
    "nav.home": "హోమ్", "nav.about": "మా గురించి", "nav.courses": "కోర్సులు", "nav.fees": "ఫీజులు",
    "nav.faq": "ప్రశ్నలు", "nav.contact": "సంప్రదించండి", "nav.enrol": "ఇప్పుడే చేర్పించండి",
    "footer.tagline": "కొవ్వూరులో ప్రీ-కేజీ నుండి ఇంటర్ వరకు అన్ని సబ్జెక్టులకూ శ్రద్ధతో ట్యూషన్",
    "footer.explore": "పేజీలు", "footer.reach": "మమ్మల్ని సంప్రదించండి", "footer.wa": "వాట్సాప్ చేయండి",
    "footer.guide": "వినియోగ మార్గదర్శి", "footer.parentLogin": "తల్లిదండ్రుల లాగిన్", "footer.teacherLogin": "టీచర్ లాగిన్",
    "footer.by": "వెబ్‌సైట్:",

    "home.pill": "ఇప్పుడు చేర్పింపులు · ప్రీ-కేజీ నుండి ఇంటర్",
    "home.tagline": "కొవ్వూరులో ప్రీ-కేజీ నుండి ఇంటర్ వరకు అన్ని సబ్జెక్టులకూ శ్రద్ధతో ట్యూషన్",
    "home.enrol": "మీ పిల్లను చేర్పించండి", "home.seeCourses": "కోర్సులు చూడండి",
    "chip.range": "ప్రీ-కేజీ – ఇంటర్", "chip.allsub": "అన్ని సబ్జెక్టులు", "chip.spoken": "స్పోకెన్ ఇంగ్లీష్",
    "h.expTitle": "అనుభవజ్ఞులైన టీచర్", "h.expBody": "అర్హత గల స్కూల్ టీచర్ చేత బోధన — పార్ట్‌టైమ్ వారు కాదు.",
    "h.batchTitle": "చిన్న బ్యాచ్‌లు", "h.batchBody": "ప్రతి బ్యాచ్‌లో తక్కువ మంది విద్యార్థులు — ప్రతి పిల్లకూ శ్రద్ధ.",
    "h.updTitle": "క్రమం తప్పని అప్‌డేట్లు", "h.updBody": "మీ పిల్ల ప్రగతిపై తల్లిదండ్రులకు తరచూ సమాచారం.",
    "h.spokenTitle": "స్పోకెన్ ఇంగ్లీష్", "h.spokenBody": "కావాలంటే స్పోకెన్ ఇంగ్లీష్ కోచింగ్ కూడా అందుబాటులో ఉంది.",
    "about.eyebrow": "మీ టీచర్‌ని కలవండి",
    "about.creds": "బి.టెక్ (ECE) · 2020 నుండి కొవ్వూరు భాష్యంలో బోధన",
    "about.bio": "ప్రతి పిల్లవాడు వేరుగా నేర్చుకుంటాడని, ఓపికతో వ్యక్తిగత శ్రద్ధ అవసరమని నమ్మి జ్యోతి విద్యా వృక్ష్‌ను ప్రారంభించారు. ప్రీ-కేజీ నుండి ఇంటర్ వరకు విద్యార్థులకు అన్ని సబ్జెక్టులలో బలమైన పునాదిని ఆమె నేర్పిస్తారు.",
    "about.more": "జ్యోతి గురించి మరింత",
    "courses.eyebrow": "మేము ఏం బోధిస్తాము", "courses.h2": "అన్ని సబ్జెక్టులు, ప్రీ-కేజీ నుండి ఇంటర్",
    "courses.sub": "ప్రతి స్కూల్ సబ్జెక్ట్‌లో సహాయం — కావాలంటే స్పోకెన్ ఇంగ్లీష్ కూడా.",
    "c.mathsT": "గణితం", "c.mathsB": "సంఖ్యలపై మంచి అవగాహన, రోజువారీ సమస్యల పరిష్కారం.",
    "c.engT": "ఇంగ్లీష్", "c.engB": "చదవడం, గ్రామర్, రాయడం, ధైర్యంగా మాట్లాడటం.",
    "c.spokenT": "స్పోకెన్ ఇంగ్లీష్", "c.spokenB": "స్పష్టంగా, ధైర్యంగా మాట్లాడేందుకు కోచింగ్ (కావాలంటే).",
    "courses.viewAll": "అన్ని కోర్సులు చూడండి",
    "time.eyebrow": "మేము ఎప్పుడు కలుస్తాము", "time.h2": "క్లాస్ సమయాలు", "time.note": "సోమవారం నుండి శనివారం · ప్రీ-కేజీ నుండి ఇంటర్",
    "test.eyebrow": "మంచి మాటలు", "test.h2": "తల్లిదండ్రులు ఏమంటున్నారు",
    "test.q1": "“నా కూతురి ఆత్మవిశ్వాసం పూర్తిగా మారిపోయింది. ఇప్పుడు తను క్లాస్‌కి ఎదురుచూస్తోంది!”",
    "test.a1": "— 4వ తరగతి విద్యార్థి తల్లిదండ్రులు",
    "test.q2": "“చాలా ఓపిక, శ్రద్ధ. క్రమం తప్పని అప్‌డేట్లతో మా అబ్బాయి ప్రగతి మాకు తెలుస్తోంది.”",
    "test.a2": "— 8వ తరగతి విద్యార్థి తల్లిదండ్రులు",
    "cta.h2": "మీ పిల్లకు శ్రద్ధగల ప్రారంభం ఇవ్వండి", "cta.p": "ట్రయల్ క్లాస్ బుక్ చేయండి లేదా ఏదైనా అడగండి — సహాయం చేయడానికి సిద్ధం.",
    "cta.btn": "ఇప్పుడే చేర్పించండి",

    "crumb.about": "మా గురించి",
    "about.h1": "విద్యా వృక్ష్ గురించి",
    "about.heroP": "అనుభవజ్ఞురాలైన టీచర్ నడిపే, ప్రీ-కేజీ నుండి ఇంటర్ వరకు శ్రద్ధగల స్థానిక ట్యూషన్.",
    "about.bioFull": "నేను జ్యోతి ప్రసాద్. ప్రతి పిల్లవాడు వేరుగా నేర్చుకుంటాడని, ఓపికతో వ్యక్తిగత శ్రద్ధ అవసరమని నమ్మి విద్యా వృక్ష్‌ను ప్రారంభించాను. చిన్న బ్యాచ్‌లలో, ప్రీ-కేజీ నుండి ఇంటర్ వరకు విద్యార్థులకు అన్ని సబ్జెక్టులలో బలమైన పునాదిని — ఆత్మవిశ్వాసం, శ్రద్ధ, నేర్చుకోవడంపై నిజమైన ఇష్టంతో — నేర్పిస్తాను. కావాలంటే స్పోకెన్ ఇంగ్లీష్ కోచింగ్ కూడా అందుబాటులో ఉంది.",
    "about.trial": "ట్రయల్ క్లాస్ బుక్ చేయండి",
    "ap.eyebrow": "మా విధానం", "ap.h2": "తల్లిదండ్రులు మమ్మల్ని ఎందుకు ఎంచుకుంటారు",
    "ap.c1t": "చిన్న బ్యాచ్‌లు", "ap.c1b": "ప్రతి పిల్లవాడిని గమనిస్తాం, వింటాం, సహాయం చేస్తాం — ఎవరూ వెనుకబడరు.",
    "ap.c2t": "ముందుగా ఓపిక", "ap.c2b": "పిల్లలు నిర్భయంగా అడగగలిగే ప్రశాంతమైన, ప్రోత్సాహకరమైన వాతావరణం.",
    "ap.c3t": "బలమైన ప్రాథమికాలు", "ap.c3b": "పునాది అంశాలపై దృష్టి పెడతాం — తద్వారా పై తరగతులు సులభంగా అనిపిస్తాయి.",
    "ap.c4t": "క్రమం తప్పని అప్‌డేట్లు", "ap.c4b": "మీ పిల్ల నిజంగా ఎలా చదువుతున్నారో తల్లిదండ్రులకు తరచూ తెలుస్తుంది.",
    "ap.c5t": "అన్ని సబ్జెక్టులు", "ap.c5b": "అన్నింటికీ ఒకే నమ్మకమైన టీచర్, రోజువారీ హోంవర్క్ సహాయం కూడా.",
    "ap.c6t": "ఇంటికి దగ్గర", "ap.c6b": "కొవ్వూరు రైల్వే స్టేషన్ దగ్గరే — కుటుంబాలకు సులభంగా చేరుకోవచ్చు.",
    "about.ctaH": "ఒకసారి వచ్చి కలవండి", "about.ctaP": "మమ్మల్ని సందర్శించండి, కాల్ చేయండి, లేదా విచారణ పంపండి — మీ ప్రశ్నలకు సమాధానం ఇవ్వడానికి సిద్ధం.", "about.ctaBtn": "సంప్రదించండి",

    "co.h1": "కోర్సులు & సబ్జెక్టులు",
    "co.heroP": "ప్రీ-కేజీ నుండి ఇంటర్ వరకు ప్రతి స్కూల్ సబ్జెక్ట్‌లో సహాయం — శ్రద్ధగల, వ్యక్తిగత శ్రద్ధతో.",
    "co.maths": "గణితం", "co.mathsB": "సంఖ్యల అవగాహన, ఎక్కాలు, రోజువారీ సమస్యల పరిష్కారం — దశలవారీగా.",
    "co.eng": "ఇంగ్లీష్", "co.engB": "చదవడం, ఫొనిక్స్, గ్రామర్, రాయడం, ధైర్యంగా మాట్లాడటం.",
    "co.sci": "సైన్స్", "co.sciB": "చిన్న తరగతుల్లో EVS; తర్వాత ఫిజిక్స్, కెమిస్ట్రీ, బయాలజీ ప్రాథమిక అంశాలు సులభంగా.",
    "co.social": "సోషల్ స్టడీస్", "co.socialB": "మన ప్రపంచం, ప్రజలు, ప్రదేశాలు — అర్థమయ్యేలా, గుర్తుండేలా సులభంగా.",
    "co.lang": "భాషలు", "co.langB": "తెలుగు & హిందీ చదవడం, రాయడం, అవగాహన — అన్ని స్థాయిలలో.",
    "co.hw": "హోంవర్క్ & పరీక్షల సహాయం", "co.hwB": "రోజువారీ సందేహ నివృత్తి, రివిజన్ — పరీక్షలు సులభంగా అనిపించేలా.",
    "co.spoken": "స్పోకెన్ ఇంగ్లీష్", "co.spokenB": "స్పష్టంగా, ధైర్యంగా మాట్లాడేందుకు కోచింగ్ — కావాలంటే.",
    "co.howEyebrow": "క్లాసులు ఎలా జరుగుతాయి", "co.howH2": "సరళం, స్థిరం, సహకారం",
    "co.d1": "రోజువారీ ప్రాక్టీస్", "co.d1b": "క్లాసులు సోమ-శని 6:00–8:00 PM — నేర్చుకోవడం స్థిరంగా సాగేలా.",
    "co.d2": "వారానికో పరీక్ష", "co.d2b": "చిన్న, స్నేహపూర్వక పరీక్షలు ఆత్మవిశ్వాసాన్ని పెంచి, ఏం రివైజ్ చేయాలో చూపిస్తాయి.",
    "co.d3": "వ్యక్తిగత శ్రద్ధ", "co.d3b": "చిన్న బ్యాచ్‌లు కాబట్టి పాఠాలు ప్రతి పిల్ల వేగానికి తగ్గట్టుగా ఉంటాయి.",
    "co.ctaH": "మీ పిల్ల ఏ తరగతికి సరిపోతారో తెలియడం లేదా?", "co.ctaP": "వారి తరగతి చెప్పండి, మేము మార్గనిర్దేశం చేస్తాం — ట్రయల్ క్లాస్ మొదలుపెట్టేందుకు సులభమైన మార్గం.", "co.ctaBtn": "చేర్పించండి లేదా అడగండి",

    "fee.h1": "సమయాలు & ఫీజులు", "fee.heroP": "నిజాయితీగా, సరళమైన ధరలు, అనుకూలమైన సాయంత్రం సమయాలు — వారంలో ఆరు రోజులు.",
    "fee.timeNote": "సోమవారం నుండి శనివారం · వారంలో 6 రోజులు · ప్రీ-కేజీ నుండి ఇంటర్",
    "fee.eyebrow": "సరళమైన ధరలు", "fee.h2": "నెలవారీ ఫీజులు", "fee.p": "అన్ని సబ్జెక్టులు కలిపి. ఖచ్చితమైన వివరాలు, తోబుట్టువుల డిస్కౌంట్ల కోసం మమ్మల్ని సంప్రదించండి.",
    "fee.prekg": "ప్రీ-కేజీ", "fee.c15": "1 – 5 తరగతులు", "fee.c69": "6 – 9 తరగతులు", "fee.c1012": "10 – 12 తరగతులు",
    "fee.perMonth": "నెలకు", "fee.6days": "వారంలో 6 రోజులు", "fee.play": "ఆటల ద్వారా నేర్పడం", "fee.readnum": "చదవడం & సంఖ్యలు",
    "fee.hwhelp": "హోంవర్క్ సహాయం", "fee.weekly": "వారానికో పరీక్ష", "fee.board": "బోర్డ్ & ఇంటర్ పరీక్షల ప్రిపరేషన్", "fee.popular": "అత్యధిక ప్రాచుర్యం", "fee.enrol": "చేర్పించండి",
    "fee.note": "💡 కావాలంటే స్పోకెన్ ఇంగ్లీష్ కోచింగ్ · తోబుట్టువుల & దీర్ఘకాల డిస్కౌంట్లు — అడగండి.",
    "fee.ctaH": "చేర్పించేందుకు సిద్ధమా?", "fee.ctaP": "ఒక చిన్న విచారణ పంపండి, మీ పిల్ల తరగతి వివరాలను మేము నిర్ధారిస్తాం.",

    "faq.h1": "తరచుగా అడిగే ప్రశ్నలు", "faq.heroP": "తల్లిదండ్రులు ఎక్కువగా అడిగే ప్రశ్నలకు త్వరిత సమాధానాలు.",
    "faq.q1": "మీరు ఏ తరగతులు, సబ్జెక్టులు బోధిస్తారు?",
    "faq.a1": "మేము <strong>ప్రీ-కేజీ నుండి ఇంటర్ (12వ తరగతి) వరకు</strong> విద్యార్థులకు బోధిస్తాం, <strong>అన్ని సబ్జెక్టులు</strong> — గణితం, ఇంగ్లీష్, సైన్స్, సోషల్, తెలుగు &amp; హిందీ — తో పాటు రోజువారీ హోంవర్క్ సహాయం, కావాలంటే స్పోకెన్ ఇంగ్లీష్ కూడా.",
    "faq.q2": "క్లాస్ సమయాలు ఏమిటి?",
    "faq.a2": "క్లాసులు <strong>6:00 PM – 8:00 PM</strong>, <strong>సోమవారం నుండి శనివారం</strong> (వారంలో ఆరు రోజులు) జరుగుతాయి.",
    "faq.q3": "ఫీజు ఎంత?",
    "faq.a3": "ప్రీ-కేజీకి <strong>₹400/నెల</strong>, 1–5 తరగతులకు <strong>₹700/నెల</strong>, 6–9 తరగతులకు <strong>₹900/నెల</strong>, 10–12 తరగతులకు <strong>₹1,100/నెల</strong> — అన్ని సబ్జెక్టులు కలిపి. తోబుట్టువుల &amp; దీర్ఘకాల డిస్కౌంట్లు ఉన్నాయి — అడగండి.",
    "faq.q4": "ముందుగా నా పిల్లవాడు ట్రయల్ క్లాస్‌కి రావచ్చా?",
    "faq.a4": "తప్పకుండా. విచారణ పంపండి లేదా కాల్ చేయండి — మీరు నిర్ణయించుకునే ముందు మీ పిల్లవాడు హాయిగా అలవాటు పడేందుకు ట్రయల్ క్లాస్ ఏర్పాటు చేస్తాం.",
    "faq.q5": "బ్యాచ్‌లు ఎంత పెద్దవి?",
    "faq.a5": "మేము బ్యాచ్‌లను <strong>ఉద్దేశపూర్వకంగా చిన్నవిగా</strong> ఉంచుతాం — తద్వారా ప్రతి పిల్లకూ వ్యక్తిగత శ్రద్ధ, ఎవరూ వెనుకబడరు.",
    "faq.q6": "నా పిల్లవాడు ఏం తీసుకురావాలి?",
    "faq.a6": "వారి స్కూల్ పుస్తకాలు, నోట్‌బుక్‌లు, హోంవర్క్ చాలు. మిగతాది అదనపు ప్రాక్టీస్, మార్గదర్శనంతో మేము చూసుకుంటాం.",
    "faq.q7": "మీరు స్పోకెన్ ఇంగ్లీష్ అందిస్తారా?",
    "faq.a7": "అవును — విద్యార్థులు స్పష్టంగా, ధైర్యంగా మాట్లాడేందుకు <strong>స్పోకెన్ ఇంగ్లీష్</strong> కోర్సు <strong>కావాలంటే</strong> అందుబాటులో ఉంది. మమ్మల్ని అడగండి.",
    "faq.q8": "మీరు ఎక్కడ ఉన్నారు?",
    "faq.a8": "D.No 15-10-27, బాపూజీ నగర్, రైల్వే స్టేషన్ దగ్గర, కొవ్వూరు, తూర్పు గోదావరి, ఆంధ్రప్రదేశ్. మ్యాప్ కోసం <a href=\"/contact\">సంప్రదింపు పేజీ</a> చూడండి.",
    "faq.ctaH": "ఇంకా ప్రశ్న ఉందా?", "faq.ctaP": "సహాయం చేయడానికి సిద్ధం — ఎప్పుడైనా సంప్రదించండి.", "faq.ctaBtn": "అడగండి",

    "ct.h1": "సంప్రదింపు & చేర్పింపు", "ct.heroP": "కాల్ చేయండి, వాట్సాప్‌లో సందేశం పంపండి, లేదా కింది ఫారం నింపండి — మేము త్వరగా స్పందిస్తాం.",
    "ct.call": "కాల్", "ct.wa": "వాట్సాప్", "ct.visit": "సందర్శించండి", "ct.email": "ఇమెయిల్", "ct.timings": "సమయాలు", "ct.timeVal": "6:00 PM – 8:00 PM · సోమ-శని",
    "ct.eyebrow": "ప్రారంభించడానికి సిద్ధమా?", "ct.h2": "చేర్పింపు విచారణ", "ct.p": "ఫారం నింపండి, మేము మిమ్మల్ని సంప్రదిస్తాం. ఒక నిమిషమే పడుతుంది.",
    "ct.parentName": "తల్లిదండ్రుల పేరు", "ph.parentName": "మీ పేరు",
    "ct.studentName": "విద్యార్థి పేరు", "ph.studentName": "పిల్ల పేరు",
    "ct.class": "తరగతి", "ct.selectClass": "తరగతి ఎంచుకోండి",
    "ct.subjects": "కావలసిన సబ్జెక్టులు", "ph.subjects": "ఉదా: గణితం, ఇంగ్లీష్ (లేదా 'అన్నీ')",
    "ct.phone": "ఫోన్ నంబర్", "ph.phone": "మీ ఫోన్ నంబర్",
    "ct.msg": "ఇంకేమైనా? (ఐచ్ఛికం)", "ph.msg": "మీ పిల్ల అవసరాల గురించి చెప్పండి",
    "ct.submit": "విచారణ పంపండి", "ct.sendWa": "వాట్సాప్‌లో పంపండి",
    "ct.err": "క్షమించండి, ఫారం పంపడంలో ఏదో పొరపాటు జరిగింది. దయచేసి వాట్సాప్ బటన్ వాడండి లేదా కాల్ చేయండి.",
    "ct.thankH": "ధన్యవాదాలు!", "ct.thankP": "మీ విచారణ అందింది, త్వరలో మిమ్మల్ని సంప్రదిస్తాం.", "ct.done": "సరే",
    "g.print": "🖨️ PDF గా సేవ్ / ప్రింట్", "g.badge": "వినియోగదారు గైడ్", "g.title": "విద్యా వృక్ష్‌ను ఎలా వాడాలి",
    "g.intro": "<strong>టీచర్లు</strong> మరియు <strong>తల్లిదండ్రుల</strong> కోసం సరళమైన, దశలవారీ గైడ్. ఫోన్లు, కంప్యూటర్లలో పనిచేస్తుంది.",
    "g.contents": "విషయసూచిక",
    "g.toc1": "👩‍🏫 <a href=\"#teacher\">టీచర్ పోర్టల్</a> — సైన్ ఇన్, విద్యార్థులు, పరీక్షలు, మార్కులు, రిపోర్టులు, ఇమెయిల్, తల్లిదండ్రుల యాక్సెస్, సెట్టింగ్స్",
    "g.toc2": "👪 <a href=\"#parent\">తల్లిదండ్రుల పోర్టల్</a> — సైన్ ఇన్ చేసి మీ పిల్లల ప్రగతిని చూడండి",
    "g.toc3": "📱 <a href=\"#tips\">ఫోన్ &amp; బ్రౌజర్ కోసం చిట్కాలు</a>",
    "g.tHead": "👩‍🏫 టీచర్ పోర్టల్", "g.tIntro": "టీచర్ పోర్టల్ ద్వారా మీరు విద్యార్థులను నిర్వహించడం, పరీక్ష మార్కులు నమోదు చేయడం, ప్రగతిని తల్లిదండ్రులతో పంచుకోవడం చేయవచ్చు.",
    "g.t1h": "1. సైన్ ఇన్ చేయడం",
    "g.t1a": "<strong>సులభమైనది — <span class=\"kbd\">Google తో సైన్ ఇన్</span> నొక్కి</strong> మీ ఖాతాను ఎంచుకోండి. పాస్‌వర్డ్ అవసరం లేదు (మీ Google ఇమెయిల్ మీ టీచర్ ఖాతాతో సరిపోతే చాలు). ✅",
    "g.t1b": "లేదా మీ <strong>ఇమెయిల్</strong> మరియు <strong>పాస్‌వర్డ్</strong> నమోదు చేసి (టైప్ చేసింది చూడటానికి 👁️ నొక్కండి) <span class=\"kbd\">సైన్ ఇన్</span> నొక్కండి.",
    "g.t1note": "🔑 పాస్‌వర్డ్ వాడుతున్నారా? మొదటిసారి మీకు ఇచ్చిన తాత్కాలిక పాస్‌వర్డ్ వాడి, తర్వాత <em>సెట్టింగ్స్</em>లో మార్చండి. మర్చిపోయారా? రీసెట్ చేయమని ట్యూషన్‌ను అడగండి — లేదా <strong>Google తో సైన్ ఇన్</strong> వాడండి.",
    "g.t2h": "2. డాష్‌బోర్డ్",
    "g.t2p": "సైన్ ఇన్ అయిన తర్వాత మీకు <strong>డాష్‌బోర్డ్</strong> కనిపిస్తుంది: శీఘ్ర లెక్కలు (విద్యార్థులు, పరీక్షలు, క్లాస్ సగటు), మీ విద్యార్థుల జాబితా. ఏ విద్యార్థి పేజీ చూడటానికైనా <span class=\"kbd\">తెరవండి</span> నొక్కండి.",
    "g.t3h": "3. విద్యార్థులు — చేర్చడం &amp; నిర్వహణ",
    "g.t3a": "<strong>విద్యార్థులు</strong> కి వెళ్ళి <span class=\"kbd\">+ విద్యార్థిని చేర్చండి</span> నొక్కండి.",
    "g.t3b": "పిల్లల <strong>పేరు</strong> మరియు <strong>తరగతి</strong> నింపండి.",
    "g.t3c": "<strong>తల్లిదండ్రుల పేరు, ఫోన్</strong>, ముఖ్యంగా <strong>తల్లిదండ్రుల ఇమెయిల్</strong> చేర్చండి — రిపోర్టులు ఇమెయిల్ చేయడానికి, తల్లిదండ్రులకు లాగిన్ ఇవ్వడానికి ఇది అవసరం.",
    "g.t3d": "<span class=\"kbd\">సేవ్</span> నొక్కండి.",
    "g.t3p": "వివరాలు మార్చడానికి <span class=\"kbd\">సవరించండి</span>, విద్యార్థిని తొలగించడానికి <span class=\"kbd\">✕</span> వాడండి. ప్రతి టీచర్ తమ విద్యార్థులను మాత్రమే చూస్తారు.",
    "g.t4h": "4. పరీక్షలు — ముందుగా వీటిని సృష్టించండి",
    "g.t4a": "<strong>పరీక్షలు</strong> కి వెళ్ళి <span class=\"kbd\">+ పరీక్ష చేర్చండి</span> నొక్కండి.",
    "g.t4b": "<strong>పరీక్ష పేరు</strong> (ఉదా. \"యూనిట్ టెస్ట్ 1\"), <strong>సబ్జెక్ట్</strong>, <strong>తేదీ</strong>, <strong>గరిష్ఠ మార్కులు</strong> నమోదు చేయండి.",
    "g.t4c": "<span class=\"kbd\">సేవ్</span> నొక్కండి. ప్రతి పరీక్షకు పునరావృతం చేయండి.",
    "g.t5h": "5. మార్కులు నమోదు చేయడం",
    "g.t5a": "ఒక విద్యార్థిని తెరవండి (విద్యార్థులు → <span class=\"kbd\">తెరవండి</span>).",
    "g.t5b": "<strong>మార్కులు నమోదు చేయండి</strong> వరకు స్క్రోల్ చేయండి — ప్రతి పరీక్షకు ఒక వరుస కనిపిస్తుంది.",
    "g.t5c": "<strong>స్కోర్</strong> బాక్స్‌లో స్కోర్ టైప్ చేసి <strong>బయట క్లిక్ చేయండి</strong> — అది <strong>ఆటోమేటిక్‌గా సేవ్ అవుతుంది</strong> (\"సేవ్ అయింది\" గమనిక కనిపిస్తుంది).",
    "g.t5d": "ఐచ్ఛిక వ్యాఖ్య చేర్చండి. మార్క్ తీసివేయడానికి బాక్స్ ఖాళీ చేయండి.",
    "g.t6h": "6. రిపోర్టులు &amp; చార్టులు",
    "g.t6p": "విద్యార్థి పేజీలో వారి <strong>మొత్తం సగటు</strong>, చిన్న <strong>అభిప్రాయం</strong>, మీరు మార్కులు చేర్చిన కొద్దీ నవీకరించే రెండు చార్టులు కనిపిస్తాయి:",
    "g.t6a": "<strong>పరీక్షల వారీగా మార్కులు</strong> — ప్రతి పరీక్ష శాతానికి ఒక బార్.",
    "g.t6b": "<strong>ప్రగతి ధోరణి</strong> — ఫలితాలు మెరుగవుతున్నాయో చూపే గీత.",
    "g.t7h": "7. తల్లిదండ్రులకు రిపోర్ట్ పంపండి",
    "g.t7a": "<strong>వాట్సాప్ (ఉచితం):</strong> <span class=\"kbd\">📲 వాట్సాప్ రిపోర్ట్</span> నొక్కండి — తల్లిదండ్రుల నంబర్‌కు రిపోర్ట్ ఇప్పటికే టైప్ చేసి వాట్సాప్ తెరుచుకుంటుంది. <strong>పంపండి</strong> నొక్కితే చాలు. (విద్యార్థి <strong>తల్లిదండ్రుల ఫోన్</strong> అవసరం.)",
    "g.t7b": "<strong>ఇమెయిల్:</strong> స్కోర్లు, బార్లతో చక్కని రిపోర్ట్ ఇమెయిల్ చేయడానికి <span class=\"kbd\">✉️ ఇమెయిల్ రిపోర్ట్</span> నొక్కండి. (<strong>తల్లిదండ్రుల ఇమెయిల్</strong> + <em>సెట్టింగ్స్ → పంపే ఇమెయిల్</em>లో కనెక్ట్ చేసిన ఇమెయిల్ అవసరం.)",
    "g.t8h": "8. తల్లిదండ్రులకు స్వంత లాగిన్ ఇవ్వండి",
    "g.t8a": "విద్యార్థిని తెరవండి (వారికి తల్లిదండ్రుల ఇమెయిల్ ఉండాలి).",
    "g.t8b": "<strong>తల్లిదండ్రుల లాగిన్ యాక్సెస్</strong> బాక్స్‌లో పాస్‌వర్డ్ టైప్ చేసి <span class=\"kbd\">సేవ్</span> నొక్కండి.",
    "g.t8c": "<strong>తల్లిదండ్రుల ఇమెయిల్ + ఆ పాస్‌వర్డ్</strong>ను వారితో పంచుకోండి. వారు <strong>hrm99.com/parent</strong> వద్ద సైన్ ఇన్ చేస్తారు.",
    "g.t9h": "9. మరో టీచర్‌ను చేర్చండి",
    "g.t9p": "<strong>టీచర్లు</strong> → <span class=\"kbd\">+ టీచర్‌ను చేర్చండి</span> → వారి పేరు, ఇమెయిల్, తాత్కాలిక పాస్‌వర్డ్ నమోదు చేసి → వారితో పంచుకోండి. ఏ టీచరైనా టీచర్లను చేర్చవచ్చు.",
    "g.t10h": "10. సెట్టింగ్స్",
    "g.t10a": "<strong>లాగిన్ ఇమెయిల్</strong> — మీరు సైన్ ఇన్ చేసే ఇమెయిల్ మార్చండి.",
    "g.t10b": "<strong>పాస్‌వర్డ్ మార్చండి</strong> — ఎప్పుడైనా కొత్త పాస్‌వర్డ్ సెట్ చేయండి.",
    "g.t10c": "<strong>పంపే ఇమెయిల్</strong> — రిపోర్ట్/విచారణ ఇమెయిల్‌లు పంపే జీమెయిల్ కనెక్ట్ చేయండి: 2-స్టెప్ వెరిఫికేషన్ ఆన్ చేసి, Google <strong>యాప్ పాస్‌వర్డ్</strong> సృష్టించి, ఇక్కడ పేస్ట్ చేసి, <span class=\"kbd\">కనెక్ట్ &amp; ధృవీకరించండి</span> నొక్కండి. (దశలు పేజీలో చూపబడతాయి.)",
    "g.pHead": "👪 తల్లిదండ్రుల పోర్టల్", "g.pIntro": "తల్లిదండ్రులు తమ పిల్లల మార్కులు, ప్రగతిని ఎప్పుడైనా, ఏ పరికరంలోనైనా చూడటానికి సైన్ ఇన్ చేయవచ్చు. ఇది <strong>చూడటానికి మాత్రమే</strong>.",
    "g.p1h": "1. సైన్ ఇన్ చేయడం",
    "g.p1a": "<strong>hrm99.com/parent</strong> తెరవండి.",
    "g.p1b": "<strong>సులభమైనది — <span class=\"kbd\">Google తో సైన్ ఇన్</span> నొక్కి</strong> మీ ఖాతాను ఎంచుకోండి. ట్యూషన్ వద్ద మీ Google ఇమెయిల్ ఉంటే పాస్‌వర్డ్ అవసరం లేదు. ✅",
    "g.p1c": "లేదా ట్యూషన్ ఇచ్చిన <strong>ఇమెయిల్</strong> మరియు <strong>పాస్‌వర్డ్</strong> నమోదు చేసి (చూడటానికి 👁️ నొక్కండి) <span class=\"kbd\">సైన్ ఇన్</span> నొక్కండి.",
    "g.p1note": "సైన్ ఇన్ తర్వాత మీ పిల్లవాడు కనిపించడం లేదా? మీ పిల్లవాడి రికార్డుకు మీ ఇమెయిల్ చేర్చమని ట్యూషన్‌ను అడగండి.",
    "g.p2h": "2. మీ పిల్లల ప్రగతిని చూడటం",
    "g.p2p": "<strong>మీ ప్రతి పిల్లవాడికి</strong> ఒక కార్డు కనిపిస్తుంది, ఇందులో:",
    "g.p2a": "<strong>మొత్తం సగటు</strong> మరియు చిన్న <strong>అభిప్రాయం</strong>.",
    "g.p2b": "<strong>పరీక్షల వారీగా మార్కులు</strong> — ప్రతి పరీక్షకు ఒక బార్. <span style=\"color:#5E927B;font-weight:800\">ఆకుపచ్చ</span> = బలంగా, <span style=\"color:#b98a2a;font-weight:800\">పసుపు</span> = ఫర్వాలేదు, <span style=\"color:#C65B42;font-weight:800\">ఎరుపు</span> = మద్దతు అవసరం.",
    "g.p2c": "<strong>ప్రగతి ధోరణి</strong> — మీ పిల్లవాడు కాలక్రమేణా మెరుగవుతున్నాడా?",
    "g.p2d": "ఖచ్చితమైన స్కోర్‌తో <strong>ప్రతి పరీక్ష పట్టిక</strong>.",
    "g.p3h": "3. లాగ్ అవుట్ చేయడం",
    "g.p3p": "<span class=\"kbd\">లాగ్ అవుట్</span> (కుడి-పైన) నొక్కండి. మార్కుల గురించి ప్రశ్న ఉందా? నేరుగా ట్యూషన్‌ను సంప్రదించండి.",
    "g.tipsHead": "📱 ఫోన్ &amp; బ్రౌజర్ కోసం చిట్కాలు",
    "g.tip1": "<strong>ఫోన్‌లో:</strong> పేజీల మధ్య తిరగడానికి <span class=\"kbd\">☰</span> మెనూ (కుడి-పైన) నొక్కండి. ఫోన్లలో అన్నీ పనిచేస్తాయి.",
    "g.tip2": "<strong>బ్రౌజర్:</strong> తాజా <strong>Chrome</strong> లేదా <strong>Safari</strong> వాడండి. పేజీ పాతదిగా కనిపిస్తే రిఫ్రెష్ చేయండి.",
    "g.tip3": "<strong>సేవ్:</strong> మార్కులు ఆటోమేటిక్‌గా సేవ్ అవుతాయి — \"సేవ్\" బటన్ అవసరం లేదు.",
    "g.tip4": "<strong>భద్రత:</strong> మీ పాస్‌వర్డ్ గోప్యంగా ఉంచండి, పంచుకున్న పరికరాలలో లాగ్ అవుట్ చేయండి.",
    "g.tip5": "<strong>కాగితంపై కావాలా?</strong> ఈ పేజీ పైన <strong>🖨️ PDF గా సేవ్ / ప్రింట్</strong> నొక్కండి.",
    "g.footer": "విద్యా వృక్ష్ ట్యూషన్ · కొవ్వూరు — సహాయం కావాలా? ట్యూషన్‌ను సంప్రదించండి.",
  },
};

function getLang() { try { return localStorage.getItem("lang") === "te" ? "te" : "en"; } catch { return "en"; } }
function tr(key, lang) {
  const d = window.I18N[lang] || window.I18N.en;
  return d[key] != null ? d[key] : (window.I18N.en[key] != null ? window.I18N.en[key] : null);
}
window.applyI18n = function () {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { const v = tr(el.getAttribute("data-i18n"), lang); if (v != null) el.textContent = v; });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { const v = tr(el.getAttribute("data-i18n-html"), lang); if (v != null) el.innerHTML = v; });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { const v = tr(el.getAttribute("data-i18n-ph"), lang); if (v != null) el.setAttribute("placeholder", v); });
  document.querySelectorAll(".lang-toggle").forEach((b) => { b.textContent = lang === "te" ? "English" : "తెలుగు"; });
};
window.setLang = function (l) { try { localStorage.setItem("lang", l); } catch {} window.applyI18n(); };
window.toggleLang = function () { window.setLang(getLang() === "te" ? "en" : "te"); };

function isActive(href) {
  let p = location.pathname.toLowerCase();
  if (p.endsWith("/index.html")) p = "/";
  return href === "/" ? p === "/" : p === href.toLowerCase();
}

function buildHeader() {
  const links = NAV.map((l) => `<a href="${l.href}" data-i18n="${l.key}"${isActive(l.href) ? ' class="is-active"' : ""}>${l.key}</a>`).join("");
  return `
    <header class="nav">
      <a class="nav__brand" href="/"><span class="nav__logo" aria-hidden="true">🌳</span><span class="nav__name">${SITE.name}</span></a>
      <button class="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="nav__links" id="navLinks">
        ${links}
        <button class="lang-toggle" type="button" onclick="toggleLang()">తెలుగు</button>
        <a class="nav__cta" href="/contact#enquiry" data-i18n="nav.enrol">Enrol Now</a>
      </nav>
    </header>`;
}

function buildFooter() {
  const quickLinks = NAV.map((l) => `<a href="${l.href}" data-i18n="${l.key}">${l.key}</a>`).join("");
  const emailLine = SITE.email ? `<a href="mailto:${SITE.email}">${SITE.email}</a>` : "";
  return `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__col">
          <strong class="footer__name"><span aria-hidden="true">🌳</span> ${SITE.name}</strong>
          <p data-i18n="footer.tagline">A caring tuition in Kovvur</p>
          <p>${SITE.timings}</p>
        </div>
        <div class="footer__col"><h4 data-i18n="footer.explore">Explore</h4>${quickLinks}</div>
        <div class="footer__col">
          <h4 data-i18n="footer.reach">Reach us</h4>
          <a href="tel:${SITE.phoneLink}">${SITE.phoneDisplay}</a>
          <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" data-i18n="footer.wa">WhatsApp us</a>
          ${emailLine}
          <p>${SITE.address}</p>
        </div>
      </div>
      <p class="footer__copy">© <span id="yr"></span> ${SITE.name} · <span data-i18n="footer.by">Website by</span> <strong>Ankit Kumar</strong><br>
        <a href="/guide" style="color:rgba(255,255,255,.6)" data-i18n="footer.guide">User Guide</a> ·
        <a href="/parent/" style="color:rgba(255,255,255,.6)" data-i18n="footer.parentLogin">Parent login</a> ·
        <a href="/admin/" style="color:rgba(255,255,255,.6)" data-i18n="footer.teacherLogin">Teacher login</a></p>
    </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const h = document.getElementById("site-header"); if (h) h.innerHTML = buildHeader();
  const f = document.getElementById("site-footer"); if (f) f.innerHTML = buildFooter();
  const yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear();

  window.applyI18n();

  const toggle = document.getElementById("navToggle"), links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => { const open = links.classList.toggle("is-open"); toggle.setAttribute("aria-expanded", String(open)); });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }));
  }

  document.querySelectorAll(".faq__q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq__item"), wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq__item.is-open").forEach((i) => i.classList.remove("is-open"));
      if (!wasOpen) item.classList.add("is-open");
    });
  });
});
