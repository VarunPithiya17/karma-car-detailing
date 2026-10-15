// Karma Car Detailing — shared engine. Prices are DEMO placeholders.
const PHONE = "919317171728";
const SIZES = ["Hatch", "Sedan", "SUV", "Luxury"];
const SVC = [
  { id: "foam", cat: "Wash", name: "Karma Foam Wash", img: "wash", time: "90 min", d: "pH-neutral snow foam, two-bucket hand wash, wheel & arch deep clean, streak-free dry.", p: [699, 899, 1099, 1499] },
  { id: "interior", cat: "Interior", name: "Interior Deep Detail", img: "porsche", time: "4 hrs", d: "Steam sanitising, seat shampoo, leather conditioning, roof liner & AC vent clean.", p: [2499, 2999, 3499, 4999] },
  { id: "polish", cat: "Paint", name: "Machine Polish", img: "s-polish", time: "6 hrs", d: "Single-stage DA polish that lifts swirl marks and restores depth to tired paint.", p: [3999, 4499, 5499, 7999] },
  { id: "correct", cat: "Paint", name: "Paint Correction", img: "muscle", time: "1–2 days", d: "Multi-stage cut & refine. Paint-depth gauged, up to 90% defect removal.", p: [8999, 10999, 12999, 17999] },
  { id: "ceramic", cat: "Protection", name: "9H Ceramic Coating", img: "s-ceramic", time: "2 days", d: "Hydrophobic glass-hard shell, 3-year warranty, includes one-step correction.", p: [14999, 17999, 21999, 29999] },
  { id: "graphene", cat: "Protection", name: "Graphene Coating", img: "s-teflon", time: "2 days", d: "Next-gen graphene layer — lower water spotting, higher gloss, 5-year warranty.", p: [21999, 24999, 29999, 39999] },
  { id: "ppf", cat: "Protection", name: "Paint Protection Film", img: "s-ppf", time: "3–4 days", d: "Self-healing TPU film against stone chips and scratches. 10-year warranty.", p: [69999, 89999, 109999, 149999] },
  { id: "wrap", cat: "Style", name: "Colour Change Wrap", img: "s-wrap", time: "4–5 days", d: "Gloss, satin or matte wraps. Fully reversible, factory paint stays protected.", p: [59999, 74999, 89999, 119999] },
  { id: "rust", cat: "Protection", name: "Underbody Anti-Rust", img: "s-rust", time: "5 hrs", d: "Rubberised underbody coat — built for Surat's monsoon and coastal humidity.", p: [2999, 3499, 3999, 5499] },
  { id: "headlight", cat: "Paint", name: "Headlight Restoration", img: "bmw", time: "2 hrs", d: "Wet-sand, polish and UV seal yellowed headlamps back to clear.", p: [999, 1199, 1499, 1999] },
];
const PAGES = [
  { name: "Home", url: "index.html", k: "home start" },
  { name: "Services & Pricing", url: "services.html", k: "price rate menu" },
  { name: "Gallery", url: "gallery.html", k: "work before after photos" },
  { name: "Book a Slot", url: "book.html", k: "appointment booking whatsapp contact" },
];
const inr = n => "₹" + n.toLocaleString("en-IN");
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ICON = {
  search: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="8" r="6"/><path d="m13 13 4 4"/></svg>',
  menu: '<svg width="20" height="14" stroke="currentColor" stroke-width="1.8"><path d="M0 2h20M0 12h20"/></svg>',
  x: '<svg width="16" height="16" stroke="currentColor" stroke-width="1.8"><path d="m1 1 14 14M15 1 1 15"/></svg>',
  arrow: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8h12M9 3l5 5-5 5"/></svg>',
};

// ---------- chrome (header/footer/overlays injected once for every page)
const here = location.pathname.split("/").pop() || "index.html";
document.body.insertAdjacentHTML("afterbegin", `
<div class="cursor"></div>
<header class="hdr"><a class="logo" href="index.html"><i></i>KARMA</a>
<nav class="nav">${PAGES.map(p => `<a href="${p.url}" class="${p.url === here ? "on" : ""}">${p.name}</a>`).join("")}</nav>
<div class="hdr-r"><button class="icon-btn" data-search aria-label="Search (Ctrl+K)">${ICON.search}</button>
<a class="btn" href="book.html"><span>Book now</span>${ICON.arrow}</a>
<button class="icon-btn burger" data-menu aria-label="Menu">${ICON.menu}</button></div></header>
<div class="menu" aria-hidden="true"><button class="icon-btn x" data-menu aria-label="Close">${ICON.x}</button>
${PAGES.map(p => `<a href="${p.url}">${p.name}</a>`).join("")}<p class="gold" style="margin-top:20px">+91 93171 71728</p></div>
<div class="search" role="dialog" aria-label="Search"><button class="icon-btn x" data-search aria-label="Close">${ICON.x}</button>
<p class="eyebrow">Search services, prices, pages</p><input id="q" placeholder="Try “ceramic”" autocomplete="off"><ul id="qr"></ul></div>`);
document.body.insertAdjacentHTML("beforeend", `
<footer class="ftr"><div><a class="logo" href="index.html"><i></i>KARMA</a><p style="margin-top:14px;max-width:320px">Surat's obsessive car detailing studio. Ceramic, graphene, PPF and paint correction — done once, done right.</p></div>
<div><h5>Studio</h5>${PAGES.map(p => `<a href="${p.url}">${p.name}</a>`).join("")}</div>
<div><h5>Services</h5>${SVC.slice(3, 8).map(s => `<a href="services.html#${s.id}">${s.name}</a>`).join("")}</div>
<div><h5>Visit</h5><a href="tel:+${PHONE}">+91 93171 71728</a><a href="https://wa.me/${PHONE}">WhatsApp us</a><a>Surat, Gujarat</a><a>Mon–Sun · 9am–8pm</a></div>
<div class="big">KARMA</div><div class="bot"><span>© 2026 Karma Car Detailing, Surat</span><span>What goes around, shines back.</span></div></footer>
<a class="wa" href="https://wa.me/${PHONE}" aria-label="WhatsApp"><svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z"/></svg></a>
<div class="toast"></div>`);

const toast = m => { const t = $(".toast"); t.textContent = m; t.classList.add("on"); setTimeout(() => t.classList.remove("on"), 2600); };
const menu = $(".menu");
$$("[data-menu]").forEach(b => b.onclick = () => { menu.classList.toggle("open"); menu.setAttribute("aria-hidden", !menu.classList.contains("open")); });

// ---------- search (services + pages, keyboard nav)
const S = $(".search"), q = $("#q"), qr = $("#qr");
const IDX = [...SVC.map(s => ({ t: s.name, sub: `${s.cat} · from ${inr(s.p[0])}`, url: `services.html#${s.id}`, k: (s.name + s.cat + s.d).toLowerCase() })),
  ...PAGES.map(p => ({ t: p.name, sub: "Page", url: p.url, k: (p.name + p.k).toLowerCase() }))];
let sel = 0;
function renderQ() {
  const v = q.value.trim().toLowerCase(), hits = IDX.filter(i => !v || v.split(/\s+/).every(w => i.k.includes(w)));
  sel = Math.min(sel, Math.max(hits.length - 1, 0));
  qr.innerHTML = hits.length ? hits.map((h, i) => `<li><a href="${h.url}" class="${i === sel ? "sel" : ""}"><span>${h.t}</span><small>${h.sub}</small></a></li>`).join("")
    : `<li style="padding:18px 0;color:var(--mute)">Nothing found — <a class="gold" href="https://wa.me/${PHONE}?text=${encodeURIComponent("Hi Karma, do you do " + q.value + "?")}">ask us on WhatsApp</a></li>`;
}
const openS = o => { S.classList.toggle("open", o); if (o) { q.value = ""; sel = 0; renderQ(); setTimeout(() => q.focus(), 30); } };
$$("[data-search]").forEach(b => b.onclick = () => openS(!S.classList.contains("open")));
q.oninput = () => { sel = 0; renderQ(); };
addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key === "k" || e.key === "/" && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); openS(true); }
  if (e.key === "Escape") { openS(false); menu.classList.remove("open"); $(".lb")?.classList.remove("open"); }
  if (!S.classList.contains("open")) return;
  const n = $$("#qr a").length;
  if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); sel = (sel + (e.key === "ArrowDown" ? 1 : n - 1)) % Math.max(n, 1); renderQ(); }
  if (e.key === "Enter" && n) location.href = $$("#qr a")[sel].href;
});

// ---------- cursor
const cur = $(".cursor");
if (matchMedia("(hover:hover)").matches) {
  let x = 0, y = 0, cx = 0, cy = 0;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
  (function loop() { cx += (x - cx) * .2; cy += (y - cy) * .2; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  document.addEventListener("mouseover", e => cur.classList.toggle("big", !!e.target.closest("a,button,.ba,figure,.card")));
  // magnetic buttons
  document.addEventListener("mousemove", e => { const b = e.target.closest(".btn"); if (!b) return; const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
  document.addEventListener("mouseout", e => { const b = e.target.closest?.(".btn"); if (b) b.style.transform = ""; });
}

// ---------- header + smooth scroll + reveals
const hdr = $(".hdr");
addEventListener("scroll", () => hdr.classList.toggle("solid", scrollY > 40), { passive: true });
gsap.registerPlugin(ScrollTrigger);
if (!reduce && window.Lenis) { const l = new Lenis({ lerp: .1 }); l.on("scroll", ScrollTrigger.update); gsap.ticker.add(t => l.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
function splitWords(el) { el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w"><span>${w}</span></span>`).join(" "); return $$(".w>span", el); }
$$(".split").forEach(el => { const w = splitWords(el); gsap.from(w, { yPercent: 110, duration: 1, stagger: .04, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } }); });
$$(".reveal").forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
$$("[data-count]").forEach(el => { const o = { v: 0 }, end = +el.dataset.count; ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: end, duration: 2, ease: "power3.out", onUpdate: () => el.textContent = Math.round(o.v).toLocaleString("en-IN") + (el.dataset.suf || "") }) }); });
// before/after slider (pointer + keyboard)
$$(".ba").forEach(ba => {
  const set = x => ba.style.setProperty("--x", Math.max(0, Math.min(100, x)) + "%");
  const mv = e => { const r = ba.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
  ba.onpointerdown = e => { ba.setPointerCapture(e.pointerId); mv(e); ba.onpointermove = mv; };
  ba.onpointerup = () => ba.onpointermove = null;
  ba.tabIndex = 0; ba.onkeydown = e => { const v = parseFloat(getComputedStyle(ba).getPropertyValue("--x")) || 50; if (e.key === "ArrowLeft") set(v - 5); if (e.key === "ArrowRight") set(v + 5); };
  if (!reduce) gsap.fromTo(ba, { "--x": "15%" }, { "--x": "70%", duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: ba, start: "top 70%" } });
});
// page transition out
document.addEventListener("click", e => {
  const a = e.target.closest("a[href$='.html'],a[href*='.html#']"); if (!a || e.ctrlKey || e.metaKey || reduce) return;
  e.preventDefault(); gsap.to("main", { opacity: 0, y: -30, duration: .35, ease: "power2.in", onComplete: () => location.href = a.href });
});
addEventListener("pageshow", e => { if (e.persisted) gsap.set("main", { opacity: 1, y: 0 }); });
gsap.from("main", { opacity: 0, duration: .6 });
