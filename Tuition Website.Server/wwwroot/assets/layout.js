// ============================================================================
//  Vidya Vriksh Tuition — shared header/footer + site config
//  Loaded on every page. Edit the menu, contact details, etc. HERE (one place).
// ============================================================================

const SITE = {
  name: "Vidya Vriksh Tuition",
  tagline: "Caring, all-subject tuition from Pre-KG to Intermediate in Kovvur",
  phoneDisplay: "+91 83400 77114",
  phoneLink: "+918340077114",
  whatsapp: "918340077114",            // country code + number, digits only
  email: "jyotiprasad980307@gmail.com",  // public contact email
  address: "D.No 15-10-27, Bapuji Nagar, Near Railway Station, Kovvur, East Godavari, Andhra Pradesh",
  mapQuery: "Bapuji Nagar, Near Railway Station, Kovvur, East Godavari, Andhra Pradesh",
  timings: "6:00 PM – 8:00 PM · Monday to Saturday",
};
window.SITE = SITE;

const NAV = [
  { href: "/",         label: "Home" },
  { href: "/about",    label: "About" },
  { href: "/courses",  label: "Courses" },
  { href: "/fees",     label: "Fees" },
  // Gallery hidden until real photos are ready:
  // { href: "/gallery", label: "Gallery" },
  { href: "/faq",      label: "FAQ" },
  { href: "/contact",  label: "Contact" },
];

// Which nav item is the current page?
function currentPath() {
  let p = location.pathname.toLowerCase();
  if (p.endsWith("/index.html")) p = "/";
  return p;
}
function isActive(href) {
  const p = currentPath();
  if (href === "/") return p === "/";
  return p === href.toLowerCase();
}

// ---- Header ----------------------------------------------------------------
function buildHeader() {
  const links = NAV.map(
    (l) => `<a href="${l.href}"${isActive(l.href) ? ' class="is-active"' : ""}>${l.label}</a>`
  ).join("");
  return `
    <header class="nav">
      <a class="nav__brand" href="/">
        <span class="nav__logo" aria-hidden="true">🌳</span>
        <span class="nav__name">${SITE.name}</span>
      </a>
      <button class="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav__links" id="navLinks">
        ${links}
        <a class="nav__cta" href="/contact#enquiry">Enrol Now</a>
      </nav>
    </header>`;
}

// ---- Footer ----------------------------------------------------------------
function buildFooter() {
  const quickLinks = NAV.map((l) => `<a href="${l.href}">${l.label}</a>`).join("");
  const emailLine = SITE.email ? `<a href="mailto:${SITE.email}">${SITE.email}</a>` : "";
  return `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__col">
          <strong class="footer__name"><span aria-hidden="true">🌳</span> ${SITE.name}</strong>
          <p>${SITE.tagline}</p>
          <p>${SITE.timings}</p>
        </div>
        <div class="footer__col">
          <h4>Explore</h4>
          ${quickLinks}
        </div>
        <div class="footer__col">
          <h4>Reach us</h4>
          <a href="tel:${SITE.phoneLink}">${SITE.phoneDisplay}</a>
          <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp us</a>
          ${emailLine}
          <p>${SITE.address}</p>
        </div>
      </div>
      <p class="footer__copy">© <span id="yr"></span> ${SITE.name} · Website by <strong>Ankit Kumar</strong><br><a href="/guide" style="color:rgba(255,255,255,.6)">User Guide</a> · <a href="/parent/" style="color:rgba(255,255,255,.6)">Parent login</a> · <a href="/admin/" style="color:rgba(255,255,255,.6)">Teacher login</a></p>
    </footer>`;
}

// ---- Mount -----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.innerHTML = buildHeader();
  if (footerMount) footerMount.innerHTML = buildFooter();

  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // FAQ accordion (works on any page containing .faq__q buttons)
  document.querySelectorAll(".faq__q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq__item");
      const wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq__item.is-open").forEach((i) => i.classList.remove("is-open"));
      if (!wasOpen) item.classList.add("is-open");
    });
  });
});
