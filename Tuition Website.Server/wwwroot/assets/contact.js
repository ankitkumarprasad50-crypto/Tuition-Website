// ============================================================================
//  Enquiry form — posts to the .NET backend (/api/enroll), shows a success
//  popup, and offers a WhatsApp fallback so an enquiry always reaches Jyoti.
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiryForm");
  if (!form) return;

  const submitBtn = document.getElementById("enquirySubmit");
  const errorEl = document.getElementById("enquiryError");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const modal = document.getElementById("enquiryModal");
  const closeBtn = document.getElementById("enquiryClose");
  const wa = (window.SITE && window.SITE.whatsapp) || "918340077114";

  function updateWhatsappLink() {
    const d = new FormData(form);
    const text =
      "Hi! I'd like to enquire about tuition at Milestone Tuitions.\n" +
      `Parent: ${d.get("parentName") || ""}\n` +
      `Student: ${d.get("studentName") || ""}\n` +
      `Class: ${d.get("studentClass") || ""}\n` +
      `Subjects: ${d.get("subjects") || ""}\n` +
      `Phone: ${(d.get("countryCode") || "")} ${d.get("phone") || ""}`;
    if (whatsappBtn) whatsappBtn.href = `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
  }
  form.addEventListener("input", updateWhatsappLink);
  updateWhatsappLink();

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    // force reflow so the CSS animation runs, then show
    requestAnimationFrame(() => modal.classList.add("is-open"));
    if (closeBtn) closeBtn.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.hidden = true;
  }
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal && !modal.hidden) closeModal(); });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (errorEl) errorEl.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    const d = new FormData(form);
    const payload = {
      parentName: d.get("parentName"),
      studentName: d.get("studentName"),
      studentClass: d.get("studentClass"),
      subjects: d.get("subjects"),
      phone: ((d.get("countryCode") || "") + " " + (d.get("phone") || "")).trim(),
      message: d.get("message"),
    };

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed: " + res.status);
      form.reset();
      updateWhatsappLink();
      openModal();
    } catch (err) {
      console.error("Enquiry submit failed:", err);
      if (errorEl) errorEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Enquiry";
    }
  });
});
