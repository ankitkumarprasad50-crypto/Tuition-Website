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
