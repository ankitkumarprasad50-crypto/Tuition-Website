// ============================================================================
//  Milestone Tuitions Teacher Portal — shared helpers, auth guard, and SVG charts
// ============================================================================

const ADMIN_NAV = [
  { href: "/admin/", key: "a.nav.dash" },
  { href: "/admin/today", key: "a.nav.today" },
  { href: "/admin/students", key: "a.nav.students" },
  { href: "/admin/tests", key: "a.nav.tests" },
  { href: "/admin/teachers", key: "a.nav.teachers" },
  { href: "/admin/settings", key: "a.nav.settings" },
];

// ---- English ⇄ Telugu (shares the 'lang' choice with the rest of the site) --
window.AI18N = {
  en: {
    "a.nav.dash": "Dashboard", "a.nav.today": "Today", "a.nav.students": "Students", "a.nav.tests": "Tests", "a.nav.teachers": "Teachers", "a.nav.settings": "Settings",
    "a.hi": "Hi,", "a.logout": "Log out",
    "a.today.title": "Today", "a.today.sub": "Mark arrival & leaving times, note what each student did, then send the day's report.",
    "a.today.date": "Date", "a.today.endDay": "📤 End of day — send reports",
    "a.th.arrived": "Arrived", "a.th.left": "Left", "a.th.reachedHome": "Reached home", "a.th.activity": "What they did today", "a.th.homework": "Homework",
    "a.today.in": "In", "a.today.out": "Out", "a.today.markHome": "Mark home",
    "a.today.waiting": "waiting…", "a.today.byParent": "confirmed by parent", "a.today.byTeacher": "entered by you",
    "a.today.none": "No students yet. Add students first.",
    "a.today.activityPh": "e.g. Maths — fractions; English reading", "a.today.homeworkPh": "e.g. Worksheet 3, page 12",
    "a.today.saved": "Saved", "a.today.sending": "Sending…",
    "a.today.sendTitle": "Send today's reports", "a.today.sendDesc": "Choose each parent's language, then send. Nothing goes out until you tap a button.",
    "a.today.langAll": "Set all to:", "a.today.emailAll": "✉️ Email all", "a.today.waBtn": "📲 WhatsApp", "a.today.emailBtn": "✉️ Email",
    "a.today.sentEmail": "Emailed", "a.today.emailing": "Sending…",
    "a.today.sendWa": "📲 Send to", "a.today.emailedNote": "Emailed", "a.today.noEmailNote": "no email on file",
    "a.today.nothing": "No students are marked for this day yet — tap “In” on the students who came.",
    "a.today.emailOff": "⚠️ Email isn't connected yet — set it up in Settings so parents get the report by email too.",
    "a.today.close": "Close",
    "a.login.title": "Teacher Portal", "a.login.sub": "Welcome back — please sign in",
    "a.email": "Email", "a.password": "Password", "a.signin": "Sign in", "a.back": "← Back to website", "a.or": "or",
    "a.dash.title": "Dashboard", "a.dash.welcome": "Welcome back,", "a.dash.manage": "+ Manage Students", "a.dash.today": "📅 Today's attendance", "a.howto": "❔ How to use",
    "a.stat.students": "Students", "a.stat.tests": "Tests created", "a.stat.avg": "Class average", "a.stat.teachers": "Teachers",
    "a.dash.yourStudents": "Your students", "a.viewAll": "View all",
    "a.th.name": "Name", "a.th.class": "Class", "a.th.tests": "Tests", "a.th.avg": "Average", "a.th.parent": "Parent", "a.th.phone": "Phone",
    "a.th.email": "Email", "a.th.students": "Students", "a.th.test": "Test", "a.th.subject": "Subject", "a.th.date": "Date",
    "a.th.maxmarks": "Max marks", "a.th.score": "Score", "a.th.remark": "Remark",
    "a.open": "Open", "a.edit": "Edit", "a.delete": "✕ Delete", "a.remove": "✕ Remove", "a.cancel": "Cancel", "a.save": "Save",
    "a.dash.noStudents": "No students yet.", "a.dash.addFirst": "Add your first student",
    "a.students.title": "Students", "a.students.sub": "Add and manage the students in your batch.", "a.addStudent": "+ Add Student",
    "a.students.none": "No students yet. Click “Add Student”.",
    "a.modal.addStudent": "Add Student", "a.modal.editStudent": "Edit Student",
    "a.f.studentNameReq": "Student's name *", "a.f.className": "Class", "a.f.parentName": "Parent's name", "a.f.parentPhone": "Parent's phone",
    "a.f.parentEmail": "Parent's email (for reports)", "a.f.notes": "Notes",
    "a.tests.title": "Tests", "a.tests.sub": "Create tests, then record each student's marks from their page.", "a.addTest": "+ Add Test",
    "a.tests.none": "No tests yet. Click “Add Test”.",
    "a.modal.addTest": "Add Test", "a.f.testNameReq": "Test name *", "a.f.subject": "Subject", "a.f.date": "Date", "a.f.maxmarksLabel": "Maximum marks",
    "a.teachers.title": "Teachers", "a.teachers.sub": "Anyone here can add another teacher. Each teacher manages their own students.",
    "a.addTeacher": "+ Add Teacher", "a.modal.addTeacher": "Add Teacher", "a.f.nameReq": "Name *", "a.f.teacherEmailReq": "Email *",
    "a.f.tempPwReq": "Temporary password *", "a.teachers.pwnote": "Share this password with the teacher — they can use it to sign in.", "a.teachers.addbtn": "Add teacher", "a.you": "you",
    "a.settings.title": "Settings", "a.settings.sub": "Manage your account and how emails are sent.",
    "a.yourAccount": "Your account", "a.loginEmail": "Login email", "a.updateEmail": "Update login email",
    "a.changePw": "Change password", "a.curPw": "Current password", "a.newPw": "New password (min 6 chars)", "a.updatePw": "Update password",
    "a.sendingEmail": "Sending email", "a.sending.desc": "Parent enquiry alerts and student report emails are sent from this Gmail account. Connect your own Gmail using a Google App Password (a one-off 16-character code — never your normal Gmail password).",
    "a.status.checking": "Checking…", "a.status.no": "⚠️ Not set up yet — connect a Gmail below", "a.status.okPrefix": "✅ Sending from",
    "a.gmailAddr": "Gmail address", "a.appPw": "App Password (16 characters)", "a.senderName": "Sender name (shown to parents)", "a.connect": "Connect & verify",
    "a.help.summary": "How do I get an App Password?",
    "a.help.s1": "Turn on 2-Step Verification for your Gmail.", "a.help.s2": "Create an App Password and copy the 16-character code.", "a.help.s3": "Paste it above and click Connect & verify — we'll send a quick test and switch sending over.",
    "a.back.students": "← Students", "a.waReport": "📲 WhatsApp report", "a.emailReport": "✉️ Email report",
    "a.overall": "Overall average", "a.marksByTest": "Marks by test", "a.marksSub": "Percentage scored in each test", "a.trend": "Progress trend", "a.trendSub": "How results are changing over time",
    "a.recordMarks": "Record marks", "a.manageTests": "Manage tests", "a.marksTip": "💡 Type a score and click away — it saves automatically. Clear a box to remove that mark.",
    "a.parentAccess": "Parent login access", "a.pa.loading": "Loading…", "a.pa.needEmail": "Add a parent email (Edit the student) to enable parent login.", "a.pa.pwPlaceholder": "Set a parent password (min 6 chars)",
    "a.tour.menuT": "The menu", "a.tour.menuMobileB": "Tap this <strong>☰ button</strong> to open the menu and move between pages.", "a.tour.menuDeskB": "Use these links to move between <strong>Dashboard, Students, Tests, Teachers</strong> and <strong>Settings</strong>.",
    "a.tour.welcomeT": "Welcome to your portal", "a.tour.welcomeB": "Quick tour — I'll point out each part. Tap <strong>Skip</strong> anytime.",
    "a.tour.overviewT": "Your overview", "a.tour.overviewB": "At a glance: how many students and tests you have, and the class average.",
    "a.tour.studentsT": "Students", "a.tour.studentsB": "Add and open students here. Include the <strong>parent's email</strong> so you can email reports and give parents a login.",
    "a.tour.replayT": "Replay anytime", "a.tour.replayB": "Tap <strong>How to use</strong> to see this tour again, or open the <a href='/guide' target='_blank'>full written guide</a>.",
    "a.tour.testsT": "Then: tests & marks", "a.tour.testsB": "1) Open <strong>Tests</strong> to create tests. 2) Open a student to <strong>record marks</strong> (they auto-save) and see <strong>charts</strong>.",
    "a.tour.reportsT": "Reports & parent login", "a.tour.reportsB": "On a student's page: <strong>✉️ Email report to parent</strong>, and set a password under <strong>Parent login access</strong> so parents can sign in at milestonetuitions.com/parent.",
    "a.tour.settingsT": "Settings", "a.tour.settingsB": "Change your password, connect the sending email, and enable <strong>Sign in with Google</strong>. Enjoy! 🎉",
  },
  te: {
    "a.nav.dash": "డాష్‌బోర్డ్", "a.nav.today": "నేడు", "a.nav.students": "విద్యార్థులు", "a.nav.tests": "పరీక్షలు", "a.nav.teachers": "టీచర్లు", "a.nav.settings": "సెట్టింగ్స్",
    "a.hi": "హాయ్,", "a.logout": "లాగ్ అవుట్",
    "a.today.title": "నేడు", "a.today.sub": "వచ్చిన, వెళ్ళిన సమయాలు గుర్తించండి, ప్రతి విద్యార్థి ఏం చేశారో రాయండి, తర్వాత రోజు నివేదిక పంపండి.",
    "a.today.date": "తేదీ", "a.today.endDay": "📤 రోజు ముగింపు — నివేదికలు పంపండి",
    "a.th.arrived": "వచ్చారు", "a.th.left": "వెళ్ళారు", "a.th.reachedHome": "ఇంటికి చేరారు", "a.th.activity": "ఈ రోజు ఏం చేశారు", "a.th.homework": "ఇంటి పని",
    "a.today.in": "వచ్చారు", "a.today.out": "వెళ్ళారు", "a.today.markHome": "ఇంటికి చేరారు",
    "a.today.waiting": "వేచి ఉంది…", "a.today.byParent": "తల్లిదండ్రులు నిర్ధారించారు", "a.today.byTeacher": "మీరు నమోదు చేశారు",
    "a.today.none": "ఇంకా విద్యార్థులు లేరు. ముందుగా విద్యార్థులను చేర్చండి.",
    "a.today.activityPh": "ఉదా. గణితం — భిన్నాలు; ఇంగ్లీష్ చదవడం", "a.today.homeworkPh": "ఉదా. వర్క్‌షీట్ 3, పేజీ 12",
    "a.today.saved": "సేవ్ అయింది", "a.today.sending": "పంపుతోంది…",
    "a.today.sendTitle": "ఈ రోజు నివేదికలు పంపండి", "a.today.sendDesc": "ప్రతి తల్లిదండ్రులకు భాష ఎంచుకుని పంపండి. మీరు బటన్ నొక్కేవరకు ఏదీ వెళ్ళదు.",
    "a.today.langAll": "అందరికీ:", "a.today.emailAll": "✉️ అందరికీ ఇమెయిల్", "a.today.waBtn": "📲 వాట్సాప్", "a.today.emailBtn": "✉️ ఇమెయిల్",
    "a.today.sentEmail": "ఇమెయిల్ చేయబడింది", "a.today.emailing": "పంపుతోంది…",
    "a.today.sendWa": "📲 వీరికి పంపండి:", "a.today.emailedNote": "ఇమెయిల్ చేయబడింది", "a.today.noEmailNote": "ఇమెయిల్ లేదు",
    "a.today.nothing": "ఈ రోజుకి ఇంకా విద్యార్థులు గుర్తించబడలేదు — వచ్చిన విద్యార్థులపై “వచ్చారు” నొక్కండి.",
    "a.today.emailOff": "⚠️ ఇమెయిల్ ఇంకా కనెక్ట్ కాలేదు — తల్లిదండ్రులకు ఇమెయిల్ ద్వారా కూడా నివేదిక వెళ్ళేలా సెట్టింగ్స్‌లో సెటప్ చేయండి.",
    "a.today.close": "మూసివేయండి",
    "a.login.title": "టీచర్ పోర్టల్", "a.login.sub": "తిరిగి స్వాగతం — దయచేసి సైన్ ఇన్ చేయండి",
    "a.email": "ఇమెయిల్", "a.password": "పాస్‌వర్డ్", "a.signin": "సైన్ ఇన్", "a.back": "← వెబ్‌సైట్‌కి తిరిగి", "a.or": "లేదా",
    "a.dash.title": "డాష్‌బోర్డ్", "a.dash.welcome": "తిరిగి స్వాగతం,", "a.dash.manage": "+ విద్యార్థులను నిర్వహించండి", "a.dash.today": "📅 నేటి హాజరు", "a.howto": "❔ ఎలా వాడాలి",
    "a.stat.students": "విద్యార్థులు", "a.stat.tests": "సృష్టించిన పరీక్షలు", "a.stat.avg": "క్లాస్ సగటు", "a.stat.teachers": "టీచర్లు",
    "a.dash.yourStudents": "మీ విద్యార్థులు", "a.viewAll": "అన్నీ చూడండి",
    "a.th.name": "పేరు", "a.th.class": "తరగతి", "a.th.tests": "పరీక్షలు", "a.th.avg": "సగటు", "a.th.parent": "తల్లిదండ్రులు", "a.th.phone": "ఫోన్",
    "a.th.email": "ఇమెయిల్", "a.th.students": "విద్యార్థులు", "a.th.test": "పరీక్ష", "a.th.subject": "సబ్జెక్ట్", "a.th.date": "తేదీ",
    "a.th.maxmarks": "గరిష్ఠ మార్కులు", "a.th.score": "స్కోర్", "a.th.remark": "వ్యాఖ్య",
    "a.open": "తెరవండి", "a.edit": "సవరించండి", "a.delete": "✕ తొలగించండి", "a.remove": "✕ తొలగించండి", "a.cancel": "రద్దు", "a.save": "సేవ్",
    "a.dash.noStudents": "ఇంకా విద్యార్థులు లేరు.", "a.dash.addFirst": "మొదటి విద్యార్థిని చేర్చండి",
    "a.students.title": "విద్యార్థులు", "a.students.sub": "మీ బ్యాచ్‌లో విద్యార్థులను చేర్చి, నిర్వహించండి.", "a.addStudent": "+ విద్యార్థిని చేర్చండి",
    "a.students.none": "ఇంకా విద్యార్థులు లేరు. “విద్యార్థిని చేర్చండి” నొక్కండి.",
    "a.modal.addStudent": "విద్యార్థిని చేర్చండి", "a.modal.editStudent": "విద్యార్థిని సవరించండి",
    "a.f.studentNameReq": "విద్యార్థి పేరు *", "a.f.className": "తరగతి", "a.f.parentName": "తల్లిదండ్రుల పేరు", "a.f.parentPhone": "తల్లిదండ్రుల ఫోన్",
    "a.f.parentEmail": "తల్లిదండ్రుల ఇమెయిల్ (రిపోర్టుల కోసం)", "a.f.notes": "గమనికలు",
    "a.tests.title": "పరీక్షలు", "a.tests.sub": "పరీక్షలు సృష్టించండి, తర్వాత ప్రతి విద్యార్థి పేజీ నుండి మార్కులు నమోదు చేయండి.", "a.addTest": "+ పరీక్ష చేర్చండి",
    "a.tests.none": "ఇంకా పరీక్షలు లేవు. “పరీక్ష చేర్చండి” నొక్కండి.",
    "a.modal.addTest": "పరీక్ష చేర్చండి", "a.f.testNameReq": "పరీక్ష పేరు *", "a.f.subject": "సబ్జెక్ట్", "a.f.date": "తేదీ", "a.f.maxmarksLabel": "గరిష్ఠ మార్కులు",
    "a.teachers.title": "టీచర్లు", "a.teachers.sub": "ఇక్కడ ఎవరైనా మరో టీచర్‌ను చేర్చవచ్చు. ప్రతి టీచర్ తమ విద్యార్థులను నిర్వహిస్తారు.",
    "a.addTeacher": "+ టీచర్‌ను చేర్చండి", "a.modal.addTeacher": "టీచర్‌ను చేర్చండి", "a.f.nameReq": "పేరు *", "a.f.teacherEmailReq": "ఇమెయిల్ *",
    "a.f.tempPwReq": "తాత్కాలిక పాస్‌వర్డ్ *", "a.teachers.pwnote": "ఈ పాస్‌వర్డ్‌ను టీచర్‌తో పంచుకోండి — దానితో వారు సైన్ ఇన్ చేయవచ్చు.", "a.teachers.addbtn": "టీచర్‌ను చేర్చండి", "a.you": "మీరు",
    "a.settings.title": "సెట్టింగ్స్", "a.settings.sub": "మీ ఖాతా, ఇమెయిల్ పంపకాన్ని నిర్వహించండి.",
    "a.yourAccount": "మీ ఖాతా", "a.loginEmail": "లాగిన్ ఇమెయిల్", "a.updateEmail": "లాగిన్ ఇమెయిల్ మార్చండి",
    "a.changePw": "పాస్‌వర్డ్ మార్చండి", "a.curPw": "ప్రస్తుత పాస్‌వర్డ్", "a.newPw": "కొత్త పాస్‌వర్డ్ (కనీసం 6 అక్షరాలు)", "a.updatePw": "పాస్‌వర్డ్ మార్చండి",
    "a.sendingEmail": "పంపే ఇమెయిల్", "a.sending.desc": "తల్లిదండ్రుల విచారణ అలర్ట్‌లు, విద్యార్థి రిపోర్ట్ ఇమెయిల్‌లు ఈ జీమెయిల్ నుండి పంపబడతాయి. Google యాప్ పాస్‌వర్డ్‌తో మీ జీమెయిల్‌ను కనెక్ట్ చేయండి (16 అక్షరాల ప్రత్యేక కోడ్ — మీ సాధారణ జీమెయిల్ పాస్‌వర్డ్ కాదు).",
    "a.status.checking": "తనిఖీ చేస్తోంది…", "a.status.no": "⚠️ ఇంకా సెటప్ కాలేదు — కింద జీమెయిల్ కనెక్ట్ చేయండి", "a.status.okPrefix": "✅ దీని నుండి పంపబడుతోంది:",
    "a.gmailAddr": "జీమెయిల్ చిరునామా", "a.appPw": "యాప్ పాస్‌వర్డ్ (16 అక్షరాలు)", "a.senderName": "పంపేవారి పేరు (తల్లిదండ్రులకు కనిపిస్తుంది)", "a.connect": "కనెక్ట్ & ధృవీకరించండి",
    "a.help.summary": "యాప్ పాస్‌వర్డ్ ఎలా పొందాలి?",
    "a.help.s1": "మీ జీమెయిల్‌కి 2-స్టెప్ వెరిఫికేషన్ ఆన్ చేయండి.", "a.help.s2": "యాప్ పాస్‌వర్డ్ సృష్టించి 16 అక్షరాల కోడ్‌ను కాపీ చేయండి.", "a.help.s3": "పైన పేస్ట్ చేసి 'కనెక్ట్ & ధృవీకరించండి' నొక్కండి — మేము ఒక పరీక్ష పంపి, పంపకాన్ని మారుస్తాం.",
    "a.back.students": "← విద్యార్థులు", "a.waReport": "📲 వాట్సాప్ రిపోర్ట్", "a.emailReport": "✉️ ఇమెయిల్ రిపోర్ట్",
    "a.overall": "మొత్తం సగటు", "a.marksByTest": "పరీక్షల వారీగా మార్కులు", "a.marksSub": "ప్రతి పరీక్షలో సాధించిన శాతం", "a.trend": "ప్రగతి ధోరణి", "a.trendSub": "కాలక్రమేణా ఫలితాలు ఎలా మారుతున్నాయి",
    "a.recordMarks": "మార్కులు నమోదు చేయండి", "a.manageTests": "పరీక్షలు నిర్వహించండి", "a.marksTip": "💡 స్కోర్ టైప్ చేసి బయట క్లిక్ చేయండి — ఆటోమేటిక్‌గా సేవ్ అవుతుంది. మార్క్ తీసివేయడానికి బాక్స్ ఖాళీ చేయండి.",
    "a.parentAccess": "తల్లిదండ్రుల లాగిన్ యాక్సెస్", "a.pa.loading": "లోడ్ అవుతోంది…", "a.pa.needEmail": "తల్లిదండ్రుల లాగిన్ కోసం తల్లిదండ్రుల ఇమెయిల్ చేర్చండి (విద్యార్థిని సవరించండి).", "a.pa.pwPlaceholder": "తల్లిదండ్రుల పాస్‌వర్డ్ సెట్ చేయండి (కనీసం 6 అక్షరాలు)",
    "a.tour.menuT": "మెనూ", "a.tour.menuMobileB": "పేజీల మధ్య తిరగడానికి ఈ <strong>☰ బటన్</strong> నొక్కి మెనూ తెరవండి.", "a.tour.menuDeskB": "<strong>డాష్‌బోర్డ్, విద్యార్థులు, పరీక్షలు, టీచర్లు</strong> మరియు <strong>సెట్టింగ్స్</strong> మధ్య తిరగడానికి ఈ లింక్‌లను వాడండి.",
    "a.tour.welcomeT": "మీ పోర్టల్‌కి స్వాగతం", "a.tour.welcomeB": "శీఘ్ర పర్యటన — నేను ప్రతి భాగాన్ని చూపిస్తాను. ఎప్పుడైనా <strong>స్కిప్</strong> నొక్కండి.",
    "a.tour.overviewT": "మీ సారాంశం", "a.tour.overviewB": "ఒక చూపులో: మీకు ఎంతమంది విద్యార్థులు, ఎన్ని పరీక్షలు ఉన్నాయి, క్లాస్ సగటు.",
    "a.tour.studentsT": "విద్యార్థులు", "a.tour.studentsB": "ఇక్కడ విద్యార్థులను చేర్చి, తెరవండి. రిపోర్టులు ఇమెయిల్ చేయడానికి, తల్లిదండ్రులకు లాగిన్ ఇవ్వడానికి <strong>తల్లిదండ్రుల ఇమెయిల్</strong> చేర్చండి.",
    "a.tour.replayT": "ఎప్పుడైనా మళ్ళీ చూడండి", "a.tour.replayB": "ఈ పర్యటన మళ్ళీ చూడటానికి <strong>ఎలా వాడాలి</strong> నొక్కండి, లేదా <a href='/guide' target='_blank'>పూర్తి రాతపూర్వక గైడ్</a> తెరవండి.",
    "a.tour.testsT": "తర్వాత: పరీక్షలు & మార్కులు", "a.tour.testsB": "1) పరీక్షలు సృష్టించడానికి <strong>పరీక్షలు</strong> తెరవండి. 2) విద్యార్థిని తెరిచి <strong>మార్కులు నమోదు</strong> చేయండి (ఆటో-సేవ్ అవుతాయి), <strong>చార్టులు</strong> చూడండి.",
    "a.tour.reportsT": "రిపోర్టులు & తల్లిదండ్రుల లాగిన్", "a.tour.reportsB": "విద్యార్థి పేజీలో: <strong>✉️ తల్లిదండ్రులకు రిపోర్ట్ ఇమెయిల్</strong>, మరియు <strong>తల్లిదండ్రుల లాగిన్ యాక్సెస్</strong> కింద పాస్‌వర్డ్ సెట్ చేయండి, తద్వారా తల్లిదండ్రులు milestonetuitions.com/parent వద్ద సైన్ ఇన్ చేయవచ్చు.",
    "a.tour.settingsT": "సెట్టింగ్స్", "a.tour.settingsB": "మీ పాస్‌వర్డ్ మార్చండి, పంపే ఇమెయిల్ కనెక్ట్ చేయండి, <strong>Google తో సైన్ ఇన్</strong> ఎనేబుల్ చేయండి. ఆనందించండి! 🎉",
  },
};
function aLang() { try { return localStorage.getItem("lang") === "te" ? "te" : "en"; } catch { return "en"; } }
function tr(key) { const d = AI18N[aLang()] || AI18N.en; return d[key] != null ? d[key] : (AI18N.en[key] != null ? AI18N.en[key] : key); }
window.tr = tr;
window.applyAI18n = function () {
  const lang = aLang();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { const v = tr(el.getAttribute("data-i18n")); if (v != null) el.textContent = v; });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { const v = tr(el.getAttribute("data-i18n-ph")); if (v != null) el.setAttribute("placeholder", v); });
  document.querySelectorAll(".lang-toggle").forEach((b) => { b.textContent = lang === "te" ? "English" : "తెలుగు"; });
};
window.toggleAdminLang = function () { try { localStorage.setItem("lang", aLang() === "te" ? "en" : "te"); } catch {} location.reload(); };
// Map the server's English verdict sentences to Telugu (used on report pages)
window.aVerdict = function (v) {
  if (aLang() !== "te" || !v) return v;
  const m = {
    "No tests recorded yet.": "ఇంకా పరీక్షలు నమోదు కాలేదు.",
    "Excellent — consistently strong performance. 🌟": "అద్భుతం — స్థిరంగా బలమైన ప్రదర్శన. 🌟",
    "Very good — doing well with room to shine further. 👍": "చాలా బాగుంది — మరింత రాణించే అవకాశంతో బాగా చేస్తున్నారు. 👍",
    "Good progress — steady improvement with regular practice. 📈": "మంచి ప్రగతి — క్రమమైన అభ్యాసంతో స్థిరమైన మెరుగుదల. 📈",
    "Needs support — extra practice and attention recommended. 🤝": "మద్దతు అవసరం — అదనపు అభ్యాసం, శ్రద్ధ సిఫార్సు. 🤝",
  };
  return m[v] || v;
};
document.addEventListener("DOMContentLoaded", window.applyAI18n);

// ---- API helper ------------------------------------------------------------
async function api(path, opts = {}) {
  const res = await fetch(path, {
    method: opts.method || "GET",
    headers: opts.body ? { "Content-Type": "application/json" } : undefined,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (res.status === 401 && !opts.noRedirect) {
    location.href = "/admin/login";
    throw { status: 401, error: "Not signed in" };
  }
  let data = null;
  try { data = await res.json(); } catch { /* empty body */ }
  if (!res.ok) throw { status: res.status, error: (data && data.error) || `Error ${res.status}` };
  return data;
}

// ---- Shell (top bar) -------------------------------------------------------
async function initShell(activeHref) {
  let me;
  try { me = await api("/api/auth/me"); }
  catch { return null; }

  const nav = ADMIN_NAV.map(
    (n) => `<a href="${n.href}"${samePath(n.href, activeHref) ? ' class="is-active"' : ""}>${tr(n.key)}</a>`
  ).join("");

  const bar = document.createElement("div");
  bar.className = "topbar";
  bar.innerHTML = `
    <a class="topbar__brand" href="/admin/"><span class="topbar__logo">🌳</span> Milestone Tuitions</a>
    <button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
    <nav class="topbar__nav" id="topnav">${nav}</nav>
    <div class="topbar__user"><span class="who">${tr("a.hi")} ${escapeHtml(me.name)}</span>
      <button class="lang-toggle" type="button" onclick="toggleAdminLang()"></button>
      <button class="btn btn--ghost btn--sm" id="logoutBtn">${tr("a.logout")}</button></div>`;
  document.body.prepend(bar);
  applyAI18n();

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await api("/api/auth/logout", { method: "POST" });
    location.href = "/admin/login";
  });
  const menuBtn = document.getElementById("menuBtn");
  menuBtn && menuBtn.addEventListener("click", () => document.getElementById("topnav").classList.toggle("show"));
  return me;
}

function samePath(a, b) {
  const norm = (p) => (p.endsWith("/index") ? p.slice(0, -10) : p).toLowerCase();
  return norm(a) === norm(b || location.pathname);
}

// ---- UI helpers ------------------------------------------------------------
function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
let toastTimer;
function toast(msg, isErr = false) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = "toast show" + (isErr ? " err" : "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.className = "toast"), 2600);
}
function openModal(id) { document.getElementById(id).classList.add("is-open"); }
function closeModal(id) { document.getElementById(id).classList.remove("is-open"); }
function pillClass(pct) { return pct >= 70 ? "pill--good" : pct >= 50 ? "pill--mid" : pct > 0 ? "pill--low" : "pill--muted"; }
function qs(name) { return new URLSearchParams(location.search).get(name); }

// ---- SVG charts (no external libraries) ------------------------------------
// items: [{ label, value }] where value is a percent 0..100
function barChart(items) {
  if (!items.length) return `<p class="muted">No data yet.</p>`;
  const W = 520, H = 240, padL = 34, padB = 46, padT = 12, padR = 8;
  const cw = W - padL - padR, ch = H - padT - padB;
  const n = items.length, gap = 14;
  const bw = Math.max(10, (cw - gap * (n - 1)) / n);
  const y = (v) => padT + ch - (v / 100) * ch;
  let g = "";
  [0, 25, 50, 75, 100].forEach((v) => {
    g += `<line x1="${padL}" y1="${y(v)}" x2="${W - padR}" y2="${y(v)}" stroke="#EADFD2"/>` +
         `<text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="10" fill="#9a9086">${v}</text>`;
  });
  items.forEach((it, i) => {
    const x = padL + i * (bw + gap);
    const bh = (Math.max(0, Math.min(100, it.value)) / 100) * ch;
    const col = it.value >= 70 ? "#81B29A" : it.value >= 50 ? "#F2CC8F" : "#E07A5F";
    g += `<rect x="${x}" y="${padT + ch - bh}" width="${bw}" height="${bh}" rx="5" fill="${col}"/>`;
    g += `<text x="${x + bw / 2}" y="${padT + ch - bh - 5}" text-anchor="middle" font-size="11" font-weight="700" fill="#3D342A">${it.value}%</text>`;
    g += `<text x="${x + bw / 2}" y="${H - padB + 16}" text-anchor="middle" font-size="10" fill="#7D7264">${escapeHtml(trim(it.label, 10))}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img">${g}</svg>`;
}

function lineChart(items) {
  if (items.length < 2) return `<p class="muted">Needs at least two tests to show a trend.</p>`;
  const W = 520, H = 240, padL = 34, padB = 46, padT = 12, padR = 10;
  const cw = W - padL - padR, ch = H - padT - padB;
  const x = (i) => padL + (i / (items.length - 1)) * cw;
  const y = (v) => padT + ch - (v / 100) * ch;
  let g = "";
  [0, 25, 50, 75, 100].forEach((v) => {
    g += `<line x1="${padL}" y1="${y(v)}" x2="${W - padR}" y2="${y(v)}" stroke="#EADFD2"/>` +
         `<text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="10" fill="#9a9086">${v}</text>`;
  });
  const pts = items.map((it, i) => `${x(i)},${y(it.value)}`).join(" ");
  g += `<polyline points="${pts}" fill="none" stroke="#E07A5F" stroke-width="3" stroke-linejoin="round"/>`;
  items.forEach((it, i) => {
    g += `<circle cx="${x(i)}" cy="${y(it.value)}" r="4" fill="#C65B42"/>`;
    g += `<text x="${x(i)}" y="${y(it.value) - 9}" text-anchor="middle" font-size="10" font-weight="700" fill="#3D342A">${it.value}%</text>`;
    g += `<text x="${x(i)}" y="${H - padB + 16}" text-anchor="middle" font-size="10" fill="#7D7264">${escapeHtml(trim(it.label, 8))}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img">${g}</svg>`;
}
function trim(s, n) { s = String(s ?? ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
