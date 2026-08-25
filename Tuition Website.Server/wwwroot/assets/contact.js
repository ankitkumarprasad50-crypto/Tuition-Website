// ============================================================================
//  Enquiry form — posts to the .NET backend (/api/enroll) and offers a
//  WhatsApp fallback so an enquiry always reaches Jyoti.
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiryForm");
  if (!form) return;

  const submitBtn = document.getElementById("enquirySubmit");
  const errorEl = document.getElementById("enquiryError");
  const successEl = document.getElementById("enquirySuccess");
  const againBtn = document.getElementById("enquiryAgain");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const wa = (window.SITE && window.SITE.whatsapp) || "918340077114";

  function updateWhatsappLink() {
    const d = new FormData(form);
    const text =
      "Hi! I'd like to enquire about tuition at Vidya Vriksh.\n" +
      `Parent: ${d.get("parentName") || ""}\n` +
      `Student: ${d.get("studentName") || ""}\n` +
      `Class: ${d.get("studentClass") || ""}\n` +
      `Subjects: ${d.get("subjects") || ""}\n` +
      `Phone: ${d.get("phone") || ""}`;
    if (whatsappBtn) whatsappBtn.href = `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
  }
  form.addEventListener("input", updateWhatsappLink);
  updateWhatsappLink();

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
      phone: d.get("phone"),
      message: d.get("message"),
    };

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed: " + res.status);
      form.hidden = true;
      if (successEl) successEl.hidden = false;
      form.reset();
    } catch (err) {
      console.error("Enquiry submit failed:", err);
      if (errorEl) errorEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Enquiry";
    }
  });

  if (againBtn) {
    againBtn.addEventListener("click", () => {
      if (successEl) successEl.hidden = true;
      form.hidden = false;
      updateWhatsappLink();
    });
  }
});
