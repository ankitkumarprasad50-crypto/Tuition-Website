// ============================================================================
//  Simple first-login tutorial. startTour(key, steps, {force}) shows a series
//  of cards with Back / Next / Skip. It auto-shows once per device (remembered
//  in localStorage) unless {force:true}. isMobile() lets steps adapt wording.
// ============================================================================
(function () {
  function seen(key) { try { return localStorage.getItem("tour_" + key) === "1"; } catch { return false; } }
  function markSeen(key) { try { localStorage.setItem("tour_" + key, "1"); } catch {} }

  window.isMobile = function () {
    return window.matchMedia && window.matchMedia("(max-width: 640px)").matches;
  };

  window.startTour = function (key, steps, opts) {
    opts = opts || {};
    if (!opts.force && seen(key)) return;
    if (!steps || !steps.length) return;

    let i = 0;
    const overlay = document.createElement("div");
    overlay.className = "tour-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML =
      '<div class="tour-card">' +
      '  <button class="tour-skip" type="button">Skip ✕</button>' +
      '  <div class="tour-emoji"></div>' +
      '  <h3 class="tour-title"></h3>' +
      '  <div class="tour-body"></div>' +
      '  <div class="tour-dots"></div>' +
      '  <div class="tour-actions">' +
      '    <button class="tour-back btn btn--ghost btn--sm" type="button">Back</button>' +
      '    <button class="tour-next btn btn--primary btn--sm" type="button">Next</button>' +
      '  </div>' +
      "</div>";
    document.body.appendChild(overlay);

    const dots = overlay.querySelector(".tour-dots");
    steps.forEach(() => { const d = document.createElement("span"); d.className = "tour-dot"; dots.appendChild(d); });

    const emoji = overlay.querySelector(".tour-emoji");
    const title = overlay.querySelector(".tour-title");
    const body = overlay.querySelector(".tour-body");
    const back = overlay.querySelector(".tour-back");
    const next = overlay.querySelector(".tour-next");

    function render() {
      const st = steps[i];
      emoji.textContent = st.emoji || "👋";
      title.textContent = st.title || "";
      body.innerHTML = st.body || "";
      Array.prototype.forEach.call(dots.children, (d, n) => d.classList.toggle("is-active", n === i));
      back.style.visibility = i === 0 ? "hidden" : "visible";
      next.textContent = i === steps.length - 1 ? "Got it! 🎉" : "Next";
    }
    function close() { markSeen(key); overlay.remove(); }

    overlay.querySelector(".tour-skip").addEventListener("click", close);
    back.addEventListener("click", () => { if (i > 0) { i--; render(); } });
    next.addEventListener("click", () => { if (i < steps.length - 1) { i++; render(); } else close(); });
    document.addEventListener("keydown", function esc(e) {
      if (!document.body.contains(overlay)) { document.removeEventListener("keydown", esc); return; }
      if (e.key === "Escape") close();
    });

    render();
  };
})();
