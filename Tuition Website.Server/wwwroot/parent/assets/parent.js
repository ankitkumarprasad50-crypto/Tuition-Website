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

async function initParentShell() {
  let me;
  try { me = await api("/api/parent/me"); } catch { return null; }
  const bar = document.createElement("div");
  bar.className = "topbar";
  bar.innerHTML = `
    <a class="topbar__brand" href="/parent/"><span class="topbar__logo">🌳</span> Vidya Vriksh</a>
    <div class="topbar__user"><span class="who">${escapeHtml(me.email)}</span>
      <button class="btn btn--ghost btn--sm" id="logoutBtn">Log out</button></div>`;
  document.body.prepend(bar);
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
