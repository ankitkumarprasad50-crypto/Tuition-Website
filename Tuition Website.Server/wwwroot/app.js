// ============================================================================
//  Vidya Vriksh Tuition — front-end behaviour (plain JavaScript, no build step)
// ============================================================================

// Your WhatsApp number: country code + number, digits only (no +, spaces, dashes).
const WHATSAPP_NUMBER = "918340077114";

// ---- Mobile menu toggle ----------------------------------------------------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});

// Close the mobile menu after tapping a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---- Footer year -----------------------------------------------------------
const footerCopy = document.getElementById("footerCopy");
if (footerCopy) {
  footerCopy.textContent = `© ${new Date().getFullYear()} Vidya Vriksh Tuition. Made with care. ❤️`;
}

// ---- Enrollment form -------------------------------------------------------
const form = document.getElementById("enrollForm");
const submitBtn = document.getElementById("enrollSubmit");
const errorEl = document.getElementById("enrollError");
const successEl = document.getElementById("enrollSuccess");
const againBtn = document.getElementById("enrollAgain");
const whatsappBtn = document.getElementById("whatsappBtn");

// Keep the WhatsApp button's prefilled message in sync with the form
function updateWhatsappLink() {
  const data = new FormData(form);
  const text =
    "Hi! I'd like to enquire about tuition.\n" +
    `Parent: ${data.get("parentName") || ""}\n` +
    `Student: ${data.get("studentName") || ""}\n` +
    `Class: ${data.get("studentClass") || ""}\n` +
    `Subjects: ${data.get("subjects") || ""}\n` +
    `Phone: ${data.get("phone") || ""}`;
  whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
form.addEventListener("input", updateWhatsappLink);
updateWhatsappLink();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.hidden = true;
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  const data = new FormData(form);
  const payload = {
    parentName: data.get("parentName"),
    studentName: data.get("studentName"),
    studentClass: data.get("studentClass"),
    subjects: data.get("subjects"),
    phone: data.get("phone"),
    message: data.get("message"),
  };

  try {
    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    // Success — show the thank-you card
    form.hidden = true;
    successEl.hidden = false;
    form.reset();
  } catch (err) {
    console.error("Enrollment submit failed:", err);
    errorEl.hidden = false;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Enquiry";
  }
});

// "Send another" — go back to the form
againBtn.addEventListener("click", () => {
  successEl.hidden = true;
  form.hidden = false;
  updateWhatsappLink();
});
