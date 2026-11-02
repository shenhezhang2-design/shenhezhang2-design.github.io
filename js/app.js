/* App: hash router + renderers for Home / Work / Project / About.
   Routes: #home  #work  #work-<project-id>  #about                          */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $("#app");
  let lang = "en";
  let engravings = [];
  let workFilter = "all";
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try { lang = localStorage.getItem("sz-lang") || ""; } catch (e) { lang = ""; }
  if (lang !== "en" && lang !== "zh") lang = (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";

  const t = (v) => (v == null ? "" : typeof v === "object" && !Array.isArray(v) ? (v[lang] ?? v.en ?? "") : v);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const T = (v) => esc(t(v));
  const t_ = (k) => t(window.UI[k]);
  const paras = (v) => t(v).split(/\n\s*\n/).map((p) => `<p>${esc(p)}</p>`).join("");
  const roman = (n) => {
    const m = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]]; let s = "";
    for (const [v, r] of m) while (n >= v) { s += r; n -= v; } return s;
  };
  const projects = () => (window.PROJECTS || []).filter((p) => !p.hidden);
  // every project, including the text-only research page, is shown as a card
  const cardProjects = () => projects();
  const plateOf = (p) => `${t(window.UI.plate)} ${roman(cardProjects().indexOf(p) + 1)}`;
  const arrow = `<svg class="arw" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;

  /* ---------------------------------------------------------------- shared */
  function cover(p, cls = "") {
    return `<img class="${cls}" src="${esc(p.cover)}" alt="" loading="lazy" decoding="async">`;
  }

  function card(p, i) {
    const cat = window.CATEGORIES[p.category];
    return `
      <a class="card" href="#work-${esc(p.id)}" data-cat="${esc(p.category)}">
        <div class="card-media tone-${esc(p.tone || "light")}">
          ${cover(p)}
          <span class="plate">${T(window.UI.plate)} ${roman(i + 1)}</span>
          ${p.draft ? `<span class="draft">${T(window.UI.draft)}</span>` : ""}
          ${p.nda ? `<span class="draft nda" title="${T(window.UI.ndaNote)}">${T(window.UI.nda)}</span>` : ""}
          ${p.format === "text" ? `<span class="draft live">${T(window.UI.inProgress)}</span>` : ""}
          <div class="card-pop tone-${esc(p.tone || "light")}" aria-hidden="true">
            <p>${T(p.teaser || p.summary)}</p>
            <span class="pop-go">${T(window.UI.viewProject)} ${arrow}</span>
          </div>
        </div>
        <div class="card-meta"><span class="pill">${T(cat)}</span><span class="mono">${T(p.year)}</span></div>
        <h3 class="card-title">${T(p.title)}</h3>
        <p class="card-sum">${T(p.summary)}</p>
      </a>`;
  }

  /* ---------------------------------------------------------------- home */
  const letters = (word, start) => [...word].map((c, i) => `<span class="ch" aria-hidden="true" style="--i:${start + i}">${esc(c)}</span>`).join("");

  // Hero plate stack: the portrait plus a few project covers, fanned like loose prints.
  // Click a plate behind to bring it forward; click the front project plate to open it.
  const SLOTS = [
    { x: 14, y: 26, r: -1.5, s: 1, d: -8 },   // front
    { x: 40, y: 0, r: 5, s: .97, d: 10 },     // top right
    { x: 0, y: 2, r: -6, s: .97, d: 14 },     // top left
    { x: 41, y: 30, r: 7, s: .96, d: 18 },    // bottom right
    { x: 0, y: 30, r: -11, s: .96, d: 22 }    // bottom left
  ];
  const WAIT = { x: 14, y: 18, r: -1.5, s: .9, d: 0 };   // plates not in view wait behind the front one
  function stackProjects() {
    const list = projects(), P = window.PROFILE;
    // every project with a card goes into the stack (or the ones listed in PROFILE.heroProjects);
    // four are fanned out at a time, the rest wait behind and come round with "Next plate"
    const ids = P.heroProjects && P.heroProjects.length ? P.heroProjects : cardProjects().map((p) => p.id);
    return ids.map((id) => list.find((p) => p.id === id)).filter(Boolean);
  }
  function stackHTML() {
    const P = window.PROFILE, U = window.UI, list = projects();
    const items = stackProjects();
    const plates = items.map((p) => {
      const n = esc(plateOf(p));
      return `
        <div class="sc sc-proj" data-id="${esc(p.id)}" tabindex="0" role="button" data-title="${T(p.title)}" data-n="${n}">
          <div class="sc-in">
            <img src="${esc(p.plate || p.cover)}" alt="" loading="lazy" decoding="async">
            <span class="sc-tag">${n}</span>
            <div class="sc-label">
              <span class="mono">${n} · ${T(window.CATEGORIES[p.category])}</span>
              <span class="sc-title">${T(p.title)}</span>
              <span class="sc-go">${T(U.viewProject)} ${arrow}</span>
            </div>
          </div>
        </div>`;
    }).join("");
    return `
      <figure class="stack-wrap">
        <div class="stack" id="stack">
          <div class="stack-kraft" aria-hidden="true"></div>
          <div class="sc sc-avatar" tabindex="0" role="button" data-title="${esc(P.name)}">
            <div class="sc-in"><canvas class="engrave" aria-hidden="true"></canvas>
              <span class="sc-about">${T(U.aboutMe)} ${arrow}</span></div>
          </div>
          ${plates}
        </div>
        <figcaption class="stack-cap">
          <span class="mono" id="stack-cap" aria-live="polite"></span>
          ${items.length ? `<button class="stack-next mono" id="stack-next" type="button">${T(U.nextPlate)} ${arrow}</button>` : ""}
        </figcaption>
      </figure>`;
  }

  function initStack() {
    const stack = $("#stack"); if (!stack) return;
    const cards = [...stack.querySelectorAll(".sc")];
    const U = window.UI;
    let order = cards.map((_, i) => i);   // order[slot] = card index; slot 0 is the front

    function layout() {
      order.forEach((ci, slot) => {
        const el = cards[ci], shown = slot < SLOTS.length, s = shown ? SLOTS[slot] : WAIT;
        el.classList.toggle("is-waiting", !shown);
        el.tabIndex = shown ? 0 : -1;
        el.style.setProperty("--x", s.x + "%");
        el.style.setProperty("--y", s.y + "%");
        el.style.setProperty("--r", s.r + "deg");
        el.style.setProperty("--s", s.s);
        el.style.setProperty("--d", s.d);
        el.style.setProperty("--fi", slot);
        el.style.zIndex = String(shown ? 20 - slot : 1);
        const front = slot === 0;
        el.classList.toggle("is-front", front);
        const isProj = el.classList.contains("sc-proj");
        el.setAttribute("aria-label", front
          ? (isProj ? `${t(U.viewProject)}: ${el.dataset.title}` : `${t(U.aboutMe)}: ${el.dataset.title}`)
          : `${t(U.bringForward)}: ${el.dataset.title}`);
      });
      const f = cards[order[0]];
      $("#stack-cap").textContent = f.classList.contains("sc-proj")
        ? `${f.dataset.n} — ${f.dataset.title}`
        : t(U.figCaption);
    }

    function bring(ci) {
      const slot = order.indexOf(ci);
      if (slot <= 0) return;
      [order[0], order[slot]] = [order[slot], order[0]];
      const el = cards[ci];
      el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
      layout();
    }

    function activate(el) {
      const ci = cards.indexOf(el);
      if (order[0] === ci) {
        // front plate: a project opens its page, the portrait opens the About page
        location.hash = el.dataset.id ? "work-" + el.dataset.id : "about";
      } else bring(ci);
    }

    cards.forEach((el) => {
      el.addEventListener("click", () => activate(el));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(el); }
      });
      el.addEventListener("animationend", () => el.classList.remove("pop"));
    });
    // Next plate: the front plate goes to the back of the pile and everything moves up one place,
    // so repeated clicks go through the portrait and every project in turn
    function next() {
      order.push(order.shift());
      const el = cards[order[0]];
      el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
      layout();
    }
    const nb = $("#stack-next");
    if (nb) nb.addEventListener("click", next);

    // gentle parallax: plates drift by depth as the pointer moves over the hero
    const hero = stack.closest(".hero");
    if (!reduceMotion && hero && matchMedia("(hover: hover)").matches) {
      hero.addEventListener("pointermove", (e) => {
        const r = stack.getBoundingClientRect();
        const px = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width)));
        const py = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height)));
        stack.style.setProperty("--px", px.toFixed(3));
        stack.style.setProperty("--py", py.toFixed(3));
      });
      hero.addEventListener("pointerleave", () => { stack.style.setProperty("--px", 0); stack.style.setProperty("--py", 0); });
    }

    // deal the plates out from the front position on first load
    if (!reduceMotion) {
      stack.classList.add("dealing");
      cards.forEach((el) => {
        const s = SLOTS[0];
        el.style.setProperty("--x", s.x + "%"); el.style.setProperty("--y", s.y + "%");
        el.style.setProperty("--r", "0deg"); el.style.setProperty("--s", 1);
      });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        layout();
        setTimeout(() => stack.classList.remove("dealing"), 1400);
      }));
    } else layout();
    $("#stack-cap").textContent = t(U.figCaption);
  }

  /* ---------------------------------------------------------------- scroll reveal */
  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    const els = [...app.querySelectorAll(".card, .fact, .blk, .cv-sec, .section-head, .next-card, .contact-in")];
    const vh = window.innerHeight;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("rv-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => {
      if (el.getBoundingClientRect().top > vh * 0.95) {
        const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) % 3 : 0;
        el.style.setProperty("--rd", sib * 90 + "ms");
        el.classList.add("rv");
        io.observe(el);
      }
    });
    // safety net: never leave content hidden
    setTimeout(() => els.forEach((el) => el.classList.add("rv-in")), 3500);
  }

  // Selected work: a horizontal slider of every project, three in view on desktop
  function initSelected() {
    const track = $("#sel-track"); if (!track) return;
    const cards = [...track.children];
    const prev = $(".sel-prev"), next = $(".sel-next"), count = $("#sel-count"), dotsEl = $("#sel-dots");
    const perView = () => Math.max(1, Math.round(track.clientWidth / (cards[0].getBoundingClientRect().width || 1)));
    const step = () => cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
    let pages = 0;
    function buildDots() {
      const n = Math.max(1, Math.ceil(cards.length / perView()));
      if (n === pages) return;
      pages = n;
      dotsEl.innerHTML = Array.from({ length: n }, (_, i) => `<button class="sel-dot" type="button" aria-label="${t_("pageOf")} ${i + 1} / ${n}" data-p="${i}"></button>`).join("");
      dotsEl.hidden = n < 2;
    }
    dotsEl.addEventListener("click", (e) => {
      const d = e.target.closest(".sel-dot"); if (!d) return;
      track.scrollTo({ left: Math.min(+d.dataset.p * perView(), cards.length - perView()) * step(), behavior: reduceMotion ? "auto" : "smooth" });
    });
    function update() {
      buildDots();
      const first = Math.round(track.scrollLeft / step());
      const last = Math.min(cards.length, first + perView());
      count.textContent = `${String(first + 1).padStart(2, "0")}–${String(last).padStart(2, "0")} ${t_("screenOf")} ${String(cards.length).padStart(2, "0")}`;
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      const page = next.disabled ? pages - 1 : Math.floor(first / perView());
      dotsEl.querySelectorAll(".sel-dot").forEach((d, i) => { if (i === page) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
    }
    prev.addEventListener("click", () => track.scrollBy({ left: -step() * perView(), behavior: reduceMotion ? "auto" : "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: step() * perView(), behavior: reduceMotion ? "auto" : "smooth" }));
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function renderHome() {
    const P = window.PROFILE, U = window.UI;
    const list = projects();
    return `
    <section class="hero wrap">
      <div class="hero-text">
        <p class="eyebrow mono">${T(P.role)} — ${T(P.location)}</p>
        <h1 class="hero-name" aria-label="${esc(P.name)}"><span>${letters("Shenhe", 0)}</span><span>${letters("Zhang", 6)}<em>(${esc(P.nickname)})</em></span></h1>
        <p class="hero-lead"><strong>${T(P.heroLead)}</strong> ${T(P.heroBody)}</p>
        <div class="hero-cta">
          <a class="btn btn-dark" href="#work">${T(U.viewWork)} ${arrow}</a>
          <a class="btn btn-line" href="#about">${T(U.aboutMe)}</a>
        </div>
      </div>
      ${stackHTML()}
    </section>

    <section class="wrap">
      <div class="facts">${P.facts.map((f) => `<div class="fact"><span class="mono">${T(f.label)}</span><p>${T(f.value)}</p></div>`).join("")}</div>
    </section>

    <section class="band">
      <div class="wrap">
        <div class="section-head">
          <h2 class="h2">${T(U.selected)}</h2>
          <div class="sel-ctrl">
            <a class="link" href="#work">${T(U.allWork)} (${list.length}) ${arrow}</a>
            <button class="sel-arrow sel-prev" type="button" aria-label="${T(U.prevPage)}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <button class="sel-arrow sel-next" type="button" aria-label="${T(U.nextPage)}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </div>
        <div class="sel-track" id="sel-track">${cardProjects().map(card).join("")}</div>
        <div class="sel-foot">
          <div class="sel-dots" id="sel-dots"></div>
          <span class="mono sel-count" id="sel-count"></span>
        </div>
      </div>
    </section>
    ${contactHTML()}`;
  }

  /* ---------------------------------------------------------------- work */
  function renderWork() {
    const U = window.UI, list = projects();
    const cats = Object.keys(window.CATEGORIES).filter((c) => list.some((p) => p.category === c));
    return `
    <section class="page-head wrap">
      <p class="eyebrow mono">${list.length} ${T(U.projects)}</p>
      <h1 class="h1">${T(U.workTitle)}</h1>
      <p class="lead">${T(U.workIntro)}</p>
      <div class="filters" role="group" aria-label="Filter">
        <button class="chip" data-f="all" aria-pressed="${workFilter === "all"}">${T(U.all)}</button>
        ${cats.map((c) => `<button class="chip" data-f="${c}" aria-pressed="${workFilter === c}">${T(window.CATEGORIES[c])}</button>`).join("")}
      </div>
    </section>
    <section class="wrap work-grid">
      <div class="grid grid-3" id="work-grid">${cardProjects().map(card).join("")}</div>
      <p class="work-empty" id="work-empty" hidden>${T(U.noResults)}</p>
    </section>`;
  }

  function applyFilter() {
    let shown = 0;
    document.querySelectorAll("#work-grid .card").forEach((c) => {
      c.hidden = !(workFilter === "all" || c.dataset.cat === workFilter);
      if (!c.hidden) shown++;
    });
    const empty = $("#work-empty"); if (empty) empty.hidden = shown > 0;
    document.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.f === workFilter)));
  }

  /* ---------------------------------------------------------------- project */
  // equal-height galleries: each figure grows in proportion to its image's aspect ratio,
  // so all images in the row end up exactly the same height
  document.addEventListener("load", (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.closest(".gallery-eq")) return;
    const fig = img.closest(".fig");
    if (fig && img.naturalHeight) fig.style.setProperty("--ar", (img.naturalWidth / img.naturalHeight).toFixed(4));
  }, true);

  function figure(src, caption, ratio, frame, bg) {
    const r = ratio || "4/3";
    if (src && (bg || r === "auto")) {
      // natural aspect ratio; optional plate colour (used for images flattened onto a project background)
      return `<figure class="fig"><div class="fig-media fig-auto${bg ? " fig-pad" : ""}"${bg ? ` style="background:${esc(bg)}"` : ""}><img src="${esc(src)}" alt="${T(caption)}" loading="lazy"></div>${caption ? `<figcaption class="mono">${T(caption)}</figcaption>` : ""}</figure>`;
    }
    if (src && frame) {
      return `<figure class="fig"><div class="bezel bezel-${esc(frame)}"><img src="${esc(src)}" alt="${T(caption)}" loading="lazy"></div>${caption ? `<figcaption class="mono">${T(caption)}</figcaption>` : ""}</figure>`;
    }
    const inner = src
      ? `<img src="${esc(src)}" alt="${T(caption)}" loading="lazy">`
      : `<div class="ph"><span class="mono">${T(window.UI.imagePlaceholder)}</span></div>`;
    return `<figure class="fig"><div class="fig-media" style="aspect-ratio:${esc(r)}">${inner}</div>${caption ? `<figcaption class="mono">${T(caption)}</figcaption>` : ""}</figure>`;
  }

  function block(b) {
    switch (b.type) {
      case "text":
        return `<div class="blk blk-text">${b.heading ? `<h3 class="blk-h mono">${T(b.heading)}</h3>` : "<span></span>"}<div class="prose">${paras(b.body)}</div></div>`;
      case "list":
        return `<div class="blk blk-text">${b.heading ? `<h3 class="blk-h mono">${T(b.heading)}</h3>` : "<span></span>"}<ul class="prose list">${b.items.map((i) => `<li>${T(i)}</li>`).join("")}</ul></div>`;
      case "refs":
        return `<div class="blk blk-refs"><p class="mono refs-h">${T(b.heading || window.UI.refs)}</p><ol class="refs">${b.items.map((i) => `<li>${T(i)}</li>`).join("")}</ol></div>`;
      case "quote":
        return `<blockquote class="blk blk-quote"><p>${T(b.body)}</p>${b.cite ? `<cite class="mono">${T(b.cite)}</cite>` : ""}</blockquote>`;
      case "facts":
        return `<div class="blk blk-facts">${b.items.map((f) => `<div><span class="num">${T(f.value)}</span><span class="mono">${T(f.label)}</span></div>`).join("")}</div>`;
      case "image":
        return `<div class="blk blk-wide${b.full ? " blk-full" : ""}">${figure(b.src, b.caption, b.ratio || "16/9", b.frame, b.bg)}</div>`;
      case "gallery":
        // equal: true -> every image in the row gets the same height (widths follow each image's own proportions)
        return `<div class="blk blk-wide gallery${b.equal ? " gallery-eq" : ""}" style="--cols:${b.cols || 2}">${b.items.map((i) => figure(i.src, i.caption, i.ratio || b.ratio || "4/3", b.frame, b.bg)).join("")}</div>`;
      case "viewer": return viewerHTML(b);
      case "steps": return stepsHTML(b);
      case "split":
        return `<div class="blk blk-split${b.reverse ? " rev" : ""}">
          <div class="split-text">${b.heading ? `<h3 class="blk-h mono">${T(b.heading)}</h3>` : ""}<div class="prose">${paras(b.body)}</div></div>
          <figure class="fig split-media"><div class="plate-box theme-${esc(b.theme || "light")}"><img src="${esc(b.src)}" alt="${T(b.caption)}" loading="lazy"></div>${b.caption ? `<figcaption class="mono">${T(b.caption)}</figcaption>` : ""}</figure>
        </div>`;
      case "swatches":
        return `<div class="blk blk-text">${b.heading ? `<h3 class="blk-h mono">${T(b.heading)}</h3>` : "<span></span>"}
          <div><div class="prose">${paras(b.body)}</div>
          <ul class="swatches">${b.items.map((c) => `<li><span class="sw" style="background:${esc(c.hex)}"></span><span class="sw-name">${T(c.name)}</span><span class="mono">${esc(c.hex)}</span></li>`).join("")}</ul></div></div>`;
      case "prototype":
        return `<div class="blk blk-proto">
          <div class="proto-head">${b.heading ? `<h3 class="h2">${T(b.heading)}</h3>` : ""}<p class="proto-body">${T(b.body)}</p></div>
          <div class="proto-stage" data-embed="${esc(b.embed)}">
            ${b.poster ? `<img class="proto-poster" src="${esc(b.poster)}" alt="" loading="lazy">` : ""}
            <div class="proto-cta">
              <button class="btn btn-light proto-load" type="button">${T(window.UI.loadPrototype)} ${arrow}</button>
              ${b.link ? `<a class="link proto-link" href="${esc(b.link)}" target="_blank" rel="noopener">${T(window.UI.openFigma)} ↗</a>` : ""}
            </div>
          </div>
          <p class="mono proto-hint">${T(window.UI.prototypeHint)}</p>
        </div>`;
      default:
        return "";
    }
  }

  function viewerHTML(b) {
    const tabs = b.tabs || [];
    const first = tabs[0] && tabs[0].screens[0];
    return `<div class="blk blk-viewer theme-${esc(b.theme || "dark")}" data-viewer>
      <div class="viewer-head">
        <div>${b.heading ? `<h3 class="h2">${T(b.heading)}</h3>` : ""}${b.body ? `<p class="viewer-body">${T(b.body)}</p>` : ""}</div>
        ${tabs.length > 1 ? `<div class="viewer-tabs" role="tablist">${tabs.map((tb, i) => `<button class="vtab" role="tab" data-tab="${i}" aria-selected="${i === 0}">${T(tb.label)}<span class="mono">${tb.screens.length}</span></button>`).join("")}</div>` : ""}
      </div>
      <div class="viewer-stage">
        <button class="vnav vprev" type="button" aria-label="Previous screen">←</button>
        <div class="bezel bezel-${esc(b.theme || "dark")} viewer-screen"><img src="${first ? esc(first.src) : ""}" alt="${first ? T(first.caption) : ""}"></div>
        <button class="vnav vnext" type="button" aria-label="Next screen">→</button>
      </div>
      <div class="viewer-foot"><p class="viewer-cap">${first ? T(first.caption) : ""}</p><span class="mono viewer-count"></span></div>
      ${tabs.map((tb, ti) => `<div class="viewer-thumbs" data-thumbs="${ti}" ${ti ? "hidden" : ""}>${tb.screens.map((sc, si) => `<button class="vthumb" type="button" data-i="${si}" data-src="${esc(sc.src)}" data-cap="${T(sc.caption)}" aria-label="${T(sc.caption)}"><img src="${esc(sc.src)}" alt="" loading="lazy"></button>`).join("")}</div>`).join("")}
    </div>`;
  }

  function stepsHTML(b) {
    return `<div class="blk blk-steps theme-${esc(b.theme || "light")}">
      <div class="steps-head">${b.heading ? `<h3 class="h2">${T(b.heading)}</h3>` : ""}${b.body ? `<p class="viewer-body">${T(b.body)}</p>` : ""}</div>
      <ol class="steps" style="--n:${b.items.length}">${b.items.map((it) => `
        <li class="step">
          <span class="step-n">${T(it.label)}</span>
          ${b.frame === "none"
            ? `<div class="step-img"><img src="${esc(it.src)}" alt="${T(it.caption)}" loading="lazy"></div>`
            : `<div class="bezel bezel-${esc(b.theme || "light")}"><img src="${esc(it.src)}" alt="${T(it.caption)}" loading="lazy"></div>`}
          <p class="step-cap">${T(it.caption)}</p>
        </li>`).join("")}</ol>
    </div>`;
  }

  function initViewers() {
    app.querySelectorAll("[data-viewer]").forEach((v) => {
      let tab = 0, idx = 0;
      const img = v.querySelector(".viewer-screen img"), cap = v.querySelector(".viewer-cap"), count = v.querySelector(".viewer-count");
      const thumbsOf = (t) => [...v.querySelectorAll(`[data-thumbs="${t}"] .vthumb`)];
      function show(t, i) {
        const th = thumbsOf(t); if (!th.length) return;
        tab = t; idx = (i + th.length) % th.length;
        v.querySelectorAll("[data-thumbs]").forEach((g) => (g.hidden = g.dataset.thumbs !== String(t)));
        v.querySelectorAll(".vtab").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === String(t))));
        th.forEach((b, k) => b.classList.toggle("on", k === idx));
        const b = th[idx];
        if (img.getAttribute("src") !== b.dataset.src) {
          img.classList.remove("swap"); void img.offsetWidth; img.classList.add("swap");
          img.src = b.dataset.src; img.alt = b.dataset.cap;
        }
        cap.textContent = b.dataset.cap;
        count.textContent = `${String(idx + 1).padStart(2, "0")} ${t_("screenOf")} ${String(th.length).padStart(2, "0")}`;
      }
      v.addEventListener("click", (e) => {
        const tb = e.target.closest(".vtab"); if (tb) return show(+tb.dataset.tab, 0);
        const th = e.target.closest(".vthumb"); if (th) return show(tab, +th.dataset.i);
        if (e.target.closest(".vprev")) return show(tab, idx - 1);
        if (e.target.closest(".vnext") || e.target.closest(".viewer-screen")) return show(tab, idx + 1);
      });
      v.tabIndex = -1;
      v.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") show(tab, idx + 1);
        if (e.key === "ArrowLeft") show(tab, idx - 1);
      });
      show(0, 0);
    });
    app.querySelectorAll(".proto-load").forEach((btn) => btn.addEventListener("click", () => {
      const stage = btn.closest(".proto-stage");
      const f = document.createElement("iframe");
      f.src = stage.dataset.embed; f.title = "Figma prototype"; f.loading = "lazy";
      f.setAttribute("allowfullscreen", "");
      stage.classList.add("loaded"); stage.appendChild(f);
    }));
  }

  function renderProject(id) {
    const U = window.UI, list = projects();
    const i = list.findIndex((p) => p.id === id);
    if (i < 0) return `<section class="page-head wrap"><h1 class="h1">404</h1><p class="lead">${T(U.notFound)}</p><a class="btn btn-dark" href="#work">${T(U.back)}</a></section>`;
    const p = list[i], next = list[(i + 1) % list.length];
    const m = p.meta || {};
    const metaRows = [["role", m.role], ["timeline", m.timeline], ["team", m.team], ["tools", m.tools]].filter((r) => r[1]);
    return `
    <article class="project">
      <header class="wrap proj-head">
        <a class="back mono" href="#work">← ${T(U.back)}</a>
        <p class="eyebrow mono">${esc(plateOf(p))} · ${T(window.CATEGORIES[p.category])} · ${T(p.year)}</p>
        <h1 class="h1 proj-title">${T(p.title)}</h1>
        <p class="lead">${T(p.summary)}</p>
        ${p.nda ? `<p class="nda-note"><span class="draft nda">${T(U.nda)}</span>${T(U.ndaNote)}</p>` : ""}
        <dl class="meta">
          <div><dt class="mono">${T(U.context)}</dt><dd>${T(p.client)}</dd></div>
          ${metaRows.map(([k, v]) => `<div><dt class="mono">${T(U[k])}</dt><dd>${T(v)}</dd></div>`).join("")}
        </dl>
      </header>
      ${p.hero
        ? `<div class="proj-cover proj-cover-full"><img src="${esc(p.hero)}" alt="${T(p.title)}"></div>`
        : `<div class="wrap"><div class="proj-cover">${cover(p)}</div></div>`}
      <div class="wrap blocks">${(p.blocks || []).map(block).join("")}</div>
      ${list.length > 1 ? `
      <nav class="wrap next">
        <a class="next-card" href="#work-${esc(next.id)}">
          <div class="next-text"><span class="mono">${T(U.next)}</span><span class="next-title">${T(next.title)}</span><span class="link">${arrow}</span></div>
          <div class="next-media">${cover(next)}</div>
        </a>
      </nav>` : ""}
    </article>`;
  }

  /* ---------------------------------------------------------------- about */
  function rows(items) {
    return items.map((e) => `
      <li class="row">
        <span class="mono row-years">${T(e.years)}</span>
        <div class="row-body"><p class="row-place">${T(e.place)}</p><p class="row-title">${T(e.title)}</p>${e.note ? `<p class="row-note">${T(e.note)}</p>` : ""}</div>
      </li>`).join("");
  }

  function renderAbout() {
    const P = window.PROFILE, A = window.ABOUT, U = window.UI;
    const links = (P.links || []).filter((l) => l.url);
    return `
    <section class="wrap about-head">
      <figure class="about-portrait"><img src="${esc(P.photo || P.avatar)}" alt="${esc(P.name)}" decoding="async"></figure>
      <div class="about-intro">
        <p class="eyebrow mono">${T(U.aboutTitle)}</p>
        <h1 class="statement">${T(A.statement)}</h1>
      </div>
    </section>

    <section class="wrap cv">
      <div class="cv-sec"><h2 class="blk-h mono">${T(U.education)}</h2><ul class="rows">${rows(A.education)}</ul></div>
      <div class="cv-sec"><h2 class="blk-h mono">${T(U.experience)}</h2><ul class="rows">${rows(A.experience)}</ul></div>
      <div class="cv-sec"><h2 class="blk-h mono">${T(U.skills)}</h2>
        <div class="skills">${A.skills.map((s) => `<div class="skill-g"><p class="row-place">${T(s.group)}</p><ul class="tags">${(Array.isArray(s.items) ? s.items : t(s.items)).map((x) => `<li class="pill">${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
      </div>
      ${A.interests ? `<div class="cv-sec"><h2 class="blk-h mono">${T(U.interests)}</h2><p class="row-title">${T(A.interests)}</p></div>` : ""}
    </section>

    ${contactHTML()}`;
  }

  function contactHTML() {
    const P = window.PROFILE, U = window.UI;
    const links = (P.links || []).filter((l) => l.url);
    return `
    <section class="contact" id="contact">
      <div class="wrap contact-in">
        <div>
          <h2 class="contact-h">${T(U.letsTalk)}</h2>
          <p class="contact-p">${T(U.contactBody)}</p>
        </div>
        <dl class="contact-list">
          <div><dt class="mono">${T(U.email)}</dt><dd><a href="mailto:${esc(P.email)}">${esc(P.email)}</a><button class="copy mono" data-copy="${esc(P.email)}">${T(U.copy)}</button></dd></div>
          <div><dt class="mono">${T(U.phone)}</dt><dd><a href="tel:${esc(P.phone.replace(/\s/g, ""))}">${esc(P.phone)}</a><button class="copy mono" data-copy="${esc(P.phone)}">${T(U.copy)}</button></dd></div>
          <div><dt class="mono">${T(U.based)}</dt><dd>${T(P.location)}</dd></div>
          ${links.map((l) => `<div><dt class="mono">${esc(l.label)}</dt><dd><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.url.replace(/^https?:\/\//, ""))}</a></dd></div>`).join("")}
        </dl>
        ${P.cvAvailable ? `<a class="btn btn-light" href="${esc(P.cv)}" target="_blank" rel="noopener">${T(U.downloadCv)} ${arrow}</a>` : ""}
      </div>
    </section>`;
  }

  /* ---------------------------------------------------------------- chrome */
  function renderChrome(view) {
    const U = window.UI;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-nav]").forEach((a) => {
      const k = a.dataset.nav;
      a.textContent = t(U["nav" + k[0].toUpperCase() + k.slice(1)]);
      if (k === view) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    const cta = $("#nav-cta"); if (cta) cta.textContent = t(U.contact);
    const fn = $("#foot-note"); if (fn) fn.textContent = t(U.footerNote);
    const fe = $("#foot-email"); if (fe) { fe.textContent = window.PROFILE.email; fe.href = "mailto:" + window.PROFILE.email; }
  }

  let prevHash = null, workY = 0;
  const jump = (y) => window.scrollTo({ top: y, left: 0, behavior: "instant" });
  function route() {
    const h = (location.hash || "").slice(1);
    // Get in touch on Home: scroll to the contact band already on the page instead of switching to About
    if (h === "contact" && (prevHash === "home" || prevHash === "")) {
      setMenu(false);
      const c = $("#contact"); if (c) { c.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); prevHash = h; return; }
    }
    if (prevHash === "work") workY = window.scrollY;
    const fromProject = prevHash && prevHash.startsWith("work-");
    setMenu(false);
    engravings.forEach((e) => e.destroy()); engravings = [];
    let view = "home", html;
    if (h === "work") { view = "work"; html = renderWork(); }
    else if (h.startsWith("work-")) { view = "work"; html = renderProject(h.slice(5)); }
    else if (h === "about" || h === "contact") { view = "about"; html = renderAbout(); }
    else { html = renderHome(); }
    app.innerHTML = html;
    app.dataset.view = view;
    renderChrome(view);
    if (view === "work" && h === "work") applyFilter();
    document.querySelectorAll("canvas.engrave").forEach((c) => engravings.push(new window.Engraving(c, { src: window.PROFILE.avatar })));
    if (view === "home") { initStack(); initSelected(); }
    if (h.startsWith("work-")) initViewers();
    initReveal();
    const name = window.PROFILE.name;
    const titles = { home: name, work: t(window.UI.navWork) + " — " + name, about: t(window.UI.navAbout) + " — " + name };
    const proj = h.startsWith("work-") && projects().find((p) => p.id === h.slice(5));
    // per-project page palette (see pageTheme in projects.js)
    if (proj && proj.pageTheme) document.documentElement.dataset.pt = proj.pageTheme;
    else delete document.documentElement.dataset.pt;
    document.title = proj ? t(proj.title) + " — " + name : titles[view];
    if (h === "contact") { const c = $("#contact"); if (c) jump(c.getBoundingClientRect().top + window.scrollY); }
    else if (h === "work" && fromProject) jump(workY);
    else jump(0);
    prevHash = h;
  }

  /* ---------------------------------------------------------------- events */
  document.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) { workFilter = chip.dataset.f; applyFilter(); return; }
    const lb = e.target.closest("[data-lang]");
    if (lb) {
      lang = lb.dataset.lang;
      try { localStorage.setItem("sz-lang", lang); } catch (err) { /* storage unavailable */ }
      const y = window.scrollY; prevHash = null; route(); jump(y); return;
    }
    const cp = e.target.closest(".copy");
    if (cp) {
      const done = () => { cp.textContent = t(window.UI.copied); setTimeout(() => (cp.textContent = t(window.UI.copy)), 1600); };
      const fallback = () => { const r = document.createRange(); r.selectNodeContents(cp.previousElementSibling); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
      try { navigator.clipboard.writeText(cp.dataset.copy).then(done, fallback); } catch (err) { fallback(); }
    }
  });
  const menuBtn = $("#menu-btn");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    if (menuBtn) menuBtn.setAttribute("aria-expanded", String(open));
  }
  if (menuBtn) menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  document.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  const scrim = $("#menu-scrim"); if (scrim) scrim.addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) { setMenu(false); menuBtn && menuBtn.focus(); }
  });
  matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  window.addEventListener("hashchange", route);
  route();
})();
