// ============================================================================
//  Spotlight tutorial. startTour(key, steps, {force}) dims the screen and
//  highlights a real element for each step, with a tooltip (Back/Next/Skip).
//  A step with no `target` (or a target not on screen) shows a centered card.
//  Because it points at live elements, it adapts to mobile vs desktop by itself.
//  Auto-shows once per device (localStorage) unless {force:true}.
// ============================================================================
(function () {
  function seen(k) { try { return localStorage.getItem("tour_" + k) === "1"; } catch { return false; } }
  function markSeen(k) { try { localStorage.setItem("tour_" + k, "1"); } catch {} }

  window.isMobile = function () {
    return window.matchMedia && window.matchMedia("(max-width: 640px)").matches;
  };

  function resolveTarget(t) {
    if (!t) return null;
    let el = null;
    try { el = typeof t === "function" ? t() : document.querySelector(t); } catch { el = null; }
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return (r.width > 0 && r.height > 0) ? el : null;
  }

  window.startTour = function (key, steps, opts) {
    opts = opts || {};
    if (!opts.force && seen(key)) return;
    if (!steps || !steps.length) return;

    let i = 0;
    const scrim = document.createElement("div"); scrim.className = "tour-scrim";
    const hl = document.createElement("div"); hl.className = "tour-hl";
    const tip = document.createElement("div"); tip.className = "tour-tip";
    tip.innerHTML =
      '<button class="tour-skip" type="button">Skip ✕</button>' +
      '<div class="tour-emoji"></div><h3 class="tour-title"></h3><div class="tour-body"></div>' +
      '<div class="tour-dots"></div>' +
      '<div class="tour-actions"><button class="tour-back btn btn--ghost btn--sm" type="button">Back</button>' +
      '<button class="tour-next btn btn--primary btn--sm" type="button">Next</button></div>';
    document.body.appendChild(scrim);
    document.body.appendChild(hl);
    document.body.appendChild(tip);

    const dots = tip.querySelector(".tour-dots");
    steps.forEach(() => { const d = document.createElement("span"); d.className = "tour-dot"; dots.appendChild(d); });
    const emoji = tip.querySelector(".tour-emoji"), title = tip.querySelector(".tour-title"),
          body = tip.querySelector(".tour-body"), back = tip.querySelector(".tour-back"), next = tip.querySelector(".tour-next");

    function position() {
      const el = resolveTarget(steps[i].target);
      const vw = window.innerWidth, vh = window.innerHeight;
      if (el) {
        el.scrollIntoView({ block: "center", inline: "nearest" });
        const r = el.getBoundingClientRect();
        const pad = steps[i].pad != null ? steps[i].pad : 8;
        hl.classList.add("ring");
        hl.style.top = (r.top - pad) + "px"; hl.style.left = (r.left - pad) + "px";
        hl.style.width = (r.width + pad * 2) + "px"; hl.style.height = (r.height + pad * 2) + "px";
        const tr = tip.getBoundingClientRect(), gap = 12;
        let top = r.bottom + gap;
        if (top + tr.height > vh - 8) top = r.top - gap - tr.height;
        if (top < 8) top = 8;
        let left = r.left + r.width / 2 - tr.width / 2;
        left = Math.max(8, Math.min(left, vw - tr.width - 8));
        tip.style.top = top + "px"; tip.style.left = left + "px";
      } else {
        hl.classList.remove("ring");
        hl.style.top = (vh / 2) + "px"; hl.style.left = (vw / 2) + "px"; hl.style.width = "0px"; hl.style.height = "0px";
        const tr = tip.getBoundingClientRect();
        tip.style.top = Math.max(8, (vh - tr.height) / 2) + "px";
        tip.style.left = Math.max(8, (vw - tr.width) / 2) + "px";
      }
    }
    function render() {
      const st = steps[i];
      emoji.textContent = st.emoji || "👋";
      title.textContent = st.title || "";
      body.innerHTML = st.body || "";
      Array.prototype.forEach.call(dots.children, (d, n) => d.classList.toggle("is-active", n === i));
      back.style.visibility = i === 0 ? "hidden" : "visible";
      next.textContent = i === steps.length - 1 ? "Got it! 🎉" : "Next";
      requestAnimationFrame(position);
    }
    function close() {
      markSeen(key);
      scrim.remove(); hl.remove(); tip.remove();
      window.removeEventListener("resize", onResize);
    }
    function onResize() { position(); }

    tip.querySelector(".tour-skip").addEventListener("click", close);
    back.addEventListener("click", () => { if (i > 0) { i--; render(); } });
    next.addEventListener("click", () => { if (i < steps.length - 1) { i++; render(); } else close(); });
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", function esc(e) {
      if (!document.body.contains(tip)) { document.removeEventListener("keydown", esc); return; }
      if (e.key === "Escape") close();
    });

    render();
  };
})();
