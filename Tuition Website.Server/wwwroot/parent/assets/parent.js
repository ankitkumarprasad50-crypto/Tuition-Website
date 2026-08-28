// ============================================================================
//  Vidya Vriksh Parent Portal — helpers, auth guard, and SVG charts
// ============================================================================
async function api(path, opts = {}) {
  const res = await fetch(path, {
    method: opts.method || "GET",
    headers: opts.body ? { "Content-Type": "application/json" } : undefined,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (res.status === 401 && !opts.noRedirect) { location.href = "/parent/login"; throw { status: 401 }; }
  let data = null; try { data = await res.json(); } catch {}
  if (!res.ok) throw { status: res.status, error: (data && data.error) || `Error ${res.status}` };
  return data;
}

// ---- English ⇄ Telugu (shares the 'lang' choice with the public site) ------
window.PI18N = {
  en: {
    "p.loginTitle": "Parent Portal", "p.loginSub": "See your child's marks & progress",
    "p.email": "Email", "p.password": "Password", "p.signin": "Sign in", "p.back": "← Back to website", "p.or": "or",
    "p.myChildren": "My children", "p.signedIn": "Signed in as", "p.howto": "❔ How to use",
    "p.noChildren": "No student records are linked to your email yet. Please ask the tuition to set this up.",
    "p.overall": "Overall average", "p.teacher": "Teacher:", "p.marksByTest": "Marks by test",
    "p.marksSub": "Percentage scored in each test", "p.trend": "Progress trend", "p.trendSub": "How results are changing over time",
    "p.thTest": "Test", "p.thSubject": "Subject", "p.thDate": "Date", "p.thScore": "Score", "p.thResult": "Result",
    "p.noTests": "No tests recorded yet.", "p.logout": "Log out", "p.loadErr": "Something went wrong loading your reports.",
    "p.tourWelcomeT": "Welcome!", "p.tourWelcomeB": "A quick tour of your child's progress. Tap Skip anytime.",
    "p.tourChildT": "Your child", "p.tourChildB": "Each of your children appears in a card like this.",
    "p.tourAvgT": "Overall average", "p.tourAvgB": "The average across all tests, with a short note on how they're doing.",
    "p.tourChartT": "The charts", "p.tourChartB": "Marks by test and Progress trend. Green = strong, amber = okay, red = needs support.",
    "p.tourTableT": "Every test", "p.tourTableB": "The full list of tests with exact marks — read-only.",
    "p.tourHelpT": "Need help?", "p.tourHelpB": "Tap How to use to replay this, or open the full guide.",
    "p.tourOutT": "Log out", "p.tourOutB": "Tap here when you're done. Questions about the marks? Contact the tuition.",
  },
  te: {
    "p.loginTitle": "తల్లిదండ్రుల పోర్టల్", "p.loginSub": "మీ పిల్ల మార్కులు & ప్రగతి చూడండి",
    "p.email": "ఇమెయిల్", "p.password": "పాస్‌వర్డ్", "p.signin": "సైన్ ఇన్", "p.back": "← వెబ్‌సైట్‌కి తిరిగి", "p.or": "లేదా",
    "p.myChildren": "నా పిల్లలు", "p.signedIn": "సైన్ ఇన్:", "p.howto": "❔ ఎలా వాడాలి",
    "p.noChildren": "మీ ఇమెయిల్‌కి ఇంకా విద్యార్థి వివరాలు జతచేయబడలేదు. దయచేసి ట్యూషన్‌ను అడగండి.",
    "p.overall": "మొత్తం సగటు", "p.teacher": "టీచర్:", "p.marksByTest": "పరీక్షల వారీగా మార్కులు",
    "p.marksSub": "ప్రతి పరీక్షలో సాధించిన శాతం", "p.trend": "ప్రగతి ధోరణి", "p.trendSub": "కాలక్రమేణా ఫలితాలు ఎలా మారుతున్నాయి",
    "p.thTest": "పరీక్ష", "p.thSubject": "సబ్జెక్ట్", "p.thDate": "తేదీ", "p.thScore": "స్కోర్", "p.thResult": "ఫలితం",
    "p.noTests": "ఇంకా పరీక్షలు నమోదు కాలేదు.", "p.logout": "లాగ్ అవుట్", "p.loadErr": "మీ రిపోర్టులు లోడ్ చేయడంలో సమస్య.",
    "p.tourWelcomeT": "స్వాగతం!", "p.tourWelcomeB": "మీ పిల్ల ప్రగతిపై చిన్న పరిచయం. ఎప్పుడైనా స్కిప్ నొక్కవచ్చు.",
    "p.tourChildT": "మీ పిల్లవాడు", "p.tourChildB": "మీ ప్రతి పిల్లవాడు ఇలాంటి కార్డులో కనిపిస్తారు.",
    "p.tourAvgT": "మొత్తం సగటు", "p.tourAvgB": "అన్ని పరీక్షల సగటు, ఎలా చదువుతున్నారో చిన్న నోట్‌తో.",
    "p.tourChartT": "చార్టులు", "p.tourChartB": "పరీక్షల మార్కులు, ప్రగతి ధోరణి. ఆకుపచ్చ = బలం, పసుపు = సరే, ఎరుపు = మద్దతు అవసరం.",
    "p.tourTableT": "ప్రతి పరీక్ష", "p.tourTableB": "ఖచ్చితమైన మార్కులతో అన్ని పరీక్షల జాబితా — చదవడానికి మాత్రమే.",
    "p.tourHelpT": "సహాయం కావాలా?", "p.tourHelpB": "ఇది మళ్లీ చూడటానికి 'ఎలా వాడాలి' నొక్కండి, లేదా పూర్తి గైడ్ తెరవండి.",
    "p.tourOutT": "లాగ్ అవుట్", "p.tourOutB": "పూర్తయ్యాక ఇక్కడ నొక్కండి. మార్కుల గురించి ప్రశ్నలా? ట్యూషన్‌ను సంప్రదించండి.",
  },
};
function pLang() { try { return localStorage.getItem("lang") === "te" ? "te" : "en"; } catch { return "en"; } }
function ptr(key) { const d = PI18N[pLang()] || PI18N.en; return d[key] != null ? d[key] : (PI18N.en[key] != null ? PI18N.en[key] : key); }
window.ptr = ptr;
window.pVerdict = function (englishVerdict) {
  if (pLang() !== "te") return englishVerdict;
  const map = {
    "Excellent — consistently strong performance. 🌟": "అద్భుతం — స్థిరంగా బలమైన ప్రదర్శన. 🌟",
    "Very good — doing well with room to shine further. 👍": "చాలా బాగుంది — ఇంకా మెరుగుపడే అవకాశం ఉంది. 👍",
    "Good progress — steady improvement with regular practice. 📈": "మంచి ప్రగతి — క్రమం తప్పని ప్రాక్టీస్‌తో స్థిరమైన మెరుగుదల. 📈",
    "Needs support — extra practice and attention recommended. 🤝": "మద్దతు అవసరం — అదనపు ప్రాక్టీస్, శ్రద్ధ సిఫార్సు. 🤝",
    "No tests recorded yet.": "ఇంకా పరీక్షలు నమోదు కాలేదు.",
  };
  return map[englishVerdict] || englishVerdict;
};
window.applyPI18n = function () {
  const lang = pLang();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { const v = ptr(el.getAttribute("data-i18n")); if (v != null) el.textContent = v; });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { const v = ptr(el.getAttribute("data-i18n-ph")); if (v != null) el.setAttribute("placeholder", v); });
  document.querySelectorAll(".lang-toggle").forEach((b) => { b.textContent = lang === "te" ? "English" : "తెలుగు"; });
};
window.toggleParentLang = function () { try { localStorage.setItem("lang", pLang() === "te" ? "en" : "te"); } catch {} location.reload(); };
document.addEventListener("DOMContentLoaded", window.applyPI18n);

async function initParentShell() {
  let me;
  try { me = await api("/api/parent/me"); } catch { return null; }
  const bar = document.createElement("div");
  bar.className = "topbar";
  bar.innerHTML = `
    <a class="topbar__brand" href="/parent/"><span class="topbar__logo">🌳</span> Vidya Vriksh</a>
    <div class="topbar__user">
      <button class="lang-toggle" type="button" onclick="toggleParentLang()">తెలుగు</button>
      <span class="who">${escapeHtml(me.email)}</span>
      <button class="btn btn--ghost btn--sm" id="logoutBtn" data-i18n="p.logout">Log out</button></div>`;
  document.body.prepend(bar);
  window.applyPI18n();
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await api("/api/parent/logout", { method: "POST" });
    location.href = "/parent/login";
  });
  return me;
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function pillClass(p) { return p >= 70 ? "pill--good" : p >= 50 ? "pill--mid" : p > 0 ? "pill--low" : "pill--muted"; }
function trim(s, n) { s = String(s ?? ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; }

function barChart(items) {
  if (!items.length) return `<p class="muted">No tests recorded yet.</p>`;
  const W = 520, H = 240, padL = 34, padB = 46, padT = 12, padR = 8;
  const cw = W - padL - padR, ch = H - padT - padB, n = items.length, gap = 14;
  const bw = Math.max(10, (cw - gap * (n - 1)) / n);
  const y = (v) => padT + ch - (v / 100) * ch;
  let g = "";
  [0, 25, 50, 75, 100].forEach((v) => {
    g += `<line x1="${padL}" y1="${y(v)}" x2="${W - padR}" y2="${y(v)}" stroke="#EADFD2"/>` +
         `<text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="10" fill="#9a9086">${v}</text>`;
  });
  items.forEach((it, i) => {
    const x = padL + i * (bw + gap), bh = (Math.max(0, Math.min(100, it.value)) / 100) * ch;
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
  const x = (i) => padL + (i / (items.length - 1)) * cw, y = (v) => padT + ch - (v / 100) * ch;
  let g = "";
  [0, 25, 50, 75, 100].forEach((v) => {
    g += `<line x1="${padL}" y1="${y(v)}" x2="${W - padR}" y2="${y(v)}" stroke="#EADFD2"/>` +
         `<text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="10" fill="#9a9086">${v}</text>`;
  });
  g += `<polyline points="${items.map((it, i) => `${x(i)},${y(it.value)}`).join(" ")}" fill="none" stroke="#E07A5F" stroke-width="3" stroke-linejoin="round"/>`;
  items.forEach((it, i) => {
    g += `<circle cx="${x(i)}" cy="${y(it.value)}" r="4" fill="#C65B42"/>`;
    g += `<text x="${x(i)}" y="${y(it.value) - 9}" text-anchor="middle" font-size="10" font-weight="700" fill="#3D342A">${it.value}%</text>`;
    g += `<text x="${x(i)}" y="${H - padB + 16}" text-anchor="middle" font-size="10" fill="#7D7264">${escapeHtml(trim(it.label, 8))}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img">${g}</svg>`;
}
