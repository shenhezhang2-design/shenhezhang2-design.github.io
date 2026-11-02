/* Line-engraving portrait renderer.
   Turns a photo (or a generated placeholder bust) into horizontal engraved lines whose
   thickness follows the image's darkness. Lines ripple gently under the pointer.
   With a real photo, a soft ink-tinted print of the photo sits under finer lines so the
   face stays recognisable (tune with opts.photoTone and opts.lines). */
(function () {
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function placeholderBust(w, h) {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const g = c.getContext("2d");
    const bg = g.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#f4f4f4"); bg.addColorStop(1, "#c9c9c9");
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    g.filter = "blur(" + Math.round(w * 0.012) + "px)";
    // shoulders
    let sg = g.createRadialGradient(w * 0.38, h * 0.82, w * 0.05, w * 0.5, h * 1.05, w * 0.62);
    sg.addColorStop(0, "#8a8a8a"); sg.addColorStop(1, "#1e1e1e");
    g.fillStyle = sg;
    g.beginPath(); g.ellipse(w * 0.5, h * 1.08, w * 0.56, h * 0.38, 0, 0, Math.PI * 2); g.fill();
    // neck
    let ng = g.createLinearGradient(w * 0.4, 0, w * 0.6, 0);
    ng.addColorStop(0, "#9a9a9a"); ng.addColorStop(1, "#3a3a3a");
    g.fillStyle = ng;
    g.beginPath(); g.moveTo(w * 0.41, h * 0.5); g.lineTo(w * 0.59, h * 0.5); g.lineTo(w * 0.61, h * 0.76);
    g.quadraticCurveTo(w * 0.5, h * 0.82, w * 0.39, h * 0.76); g.closePath(); g.fill();
    // head
    let hg = g.createRadialGradient(w * 0.42, h * 0.36, w * 0.02, w * 0.5, h * 0.42, w * 0.3);
    hg.addColorStop(0, "#ececec"); hg.addColorStop(0.55, "#a6a6a6"); hg.addColorStop(1, "#3c3c3c");
    g.fillStyle = hg;
    g.beginPath(); g.ellipse(w * 0.5, h * 0.4, w * 0.205, h * 0.2, 0, 0, Math.PI * 2); g.fill();
    // hair
    g.save();
    g.beginPath(); g.ellipse(w * 0.5, h * 0.4, w * 0.215, h * 0.21, 0, 0, Math.PI * 2); g.clip();
    let hr = g.createLinearGradient(0, h * 0.18, 0, h * 0.34);
    hr.addColorStop(0, "#151515"); hr.addColorStop(1, "#2a2a2a");
    g.fillStyle = hr;
    g.beginPath(); g.ellipse(w * 0.5, h * 0.25, w * 0.26, h * 0.1, -0.08, 0, Math.PI * 2); g.fill();
    g.restore();
    return c;
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function sampleLuminance(source, w, h) {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const g = c.getContext("2d", { willReadFrequently: true });
    const sw = source.width, sh = source.height;
    const s = Math.max(w / sw, h / sh); // cover fit
    const dw = sw * s, dh = sh * s;
    g.drawImage(source, (w - dw) / 2, (h - dh) / 2.4, dw, dh);
    const d = g.getImageData(0, 0, w, h).data;
    const lum = new Float32Array(w * h);
    let min = 1, max = 0;
    for (let i = 0; i < w * h; i++) {
      const v = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
      lum[i] = v; if (v < min) min = v; if (v > max) max = v;
    }
    const span = Math.max(0.001, max - min);
    for (let i = 0; i < lum.length; i++) lum[i] = (lum[i] - min) / span; // auto-levels
    return lum;
  }

  // Ink-tinted print of the luminance map: ink colour, alpha follows darkness.
  function tintLayer(lum, w, h, ink, tone) {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const g = c.getContext("2d");
    const im = g.createImageData(w, h), d = im.data;
    const n = parseInt(ink.slice(1), 16);
    const r = (n >> 16) & 255, gg = (n >> 8) & 255, b = n & 255;
    for (let i = 0; i < lum.length; i++) {
      d[i * 4] = r; d[i * 4 + 1] = gg; d[i * 4 + 2] = b;
      d[i * 4 + 3] = Math.round(255 * tone * Math.pow(1 - lum[i], 1.25));
    }
    g.putImageData(im, 0, 0);
    return c;
  }

  function Engraving(canvas, opts) {
    this.canvas = canvas;
    this.opts = Object.assign({ src: null, ink: "#D97757", accent: "#A8441F", spacing: 7, photoTone: 0.95, lines: 100, lineAlpha: 0.55, style: "halftone", dots: 108 }, opts || {});
    this.ctx = canvas.getContext("2d");
    this.pointer = { x: -9999, y: -9999, strength: 0, target: 0 };
    this.progress = reduceMotion ? 1 : 0;
    this.source = null;
    this._raf = null;
    this.init();
  }

  Engraving.prototype.init = async function () {
    const img = await loadImage(this.opts.src);
    this.isPhoto = !!img;
    this.source = img || placeholderBust(400, 500);
    this.resize();
    this._onResize = () => { this.resize(); this.draw(); };
    window.addEventListener("resize", this._onResize);
    const host = this.canvas.parentElement;
    host.addEventListener("pointermove", (e) => {
      const r = this.canvas.getBoundingClientRect();
      this.pointer.x = e.clientX - r.left; this.pointer.y = e.clientY - r.top;
      this.pointer.target = 1; this.kick();
    });
    host.addEventListener("pointerleave", () => { this.pointer.target = 0; this.kick(); });
    this.kick();
  };

  Engraving.prototype.resize = function () {
    // clientWidth/Height ignore CSS rotation of the parent plate
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, this.canvas.clientWidth);
    this.h = Math.max(1, this.canvas.clientHeight);
    this.canvas.width = this.w * dpr; this.canvas.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.lum = sampleLuminance(this.source, this.w, this.h);
    this.spacing = this.isPhoto ? Math.max(3.5, this.w / this.opts.lines) : Math.max(5, Math.round(this.w / 52));
    this.tint = this.isPhoto ? tintLayer(this.lum, this.w, this.h, this.opts.ink, this.opts.photoTone) : null;
    if (this.isPhoto && this.opts.style === "stipple") this.buildStipple();
  };

  // Weighted random dots: denser where the photo is darker (stipple / pointillism).
  Engraving.prototype.buildStipple = function () {
    const { w, h } = this;
    const n = Math.round(w * h * 0.28);
    const pts = new Float32Array(n * 3);
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    let k = 0, guard = 0;
    while (k < n && guard < n * 40) {
      guard++;
      const x = rnd() * w, y = rnd() * h;
      const d = Math.pow(1 - this.lumAt(x, y), 1.6);
      if (rnd() < d) { pts[k * 3] = x; pts[k * 3 + 1] = y; pts[k * 3 + 2] = rnd(); k++; }
    }
    this.stipple = pts.subarray(0, k * 3);
  };

  Engraving.prototype.lumAt = function (x, y) {
    const xi = Math.min(this.w - 1, Math.max(0, x | 0));
    const yi = Math.min(this.h - 1, Math.max(0, y | 0));
    return this.lum[yi * this.w + xi];
  };

  Engraving.prototype.kick = function () {
    if (this._raf) return;
    const tick = (t) => {
      this._raf = null;
      let busy = false;
      if (this.progress < 1) { this.progress = Math.min(1, this.progress + 0.022); busy = true; }
      const p = this.pointer;
      p.strength += (p.target - p.strength) * (reduceMotion ? 1 : 0.12);
      if (Math.abs(p.target - p.strength) > 0.01) busy = true;
      this.time = t / 1000;
      this.draw();
      if (busy || p.target > 0) this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  };

  Engraving.prototype.draw = function () {
    if (!this.lum) return;
    if (this.isPhoto && this.opts.style === "halftone") return this.drawHalftone();
    if (this.isPhoto && this.opts.style === "stipple") return this.drawStipple();
    const { ctx, w, h } = this;
    const sp = this.spacing, step = 3;
    const p = this.pointer, sigma = w * 0.16, amp = sp * 1.6 * p.strength;
    const t = this.time || 0;
    ctx.clearRect(0, 0, w, h);
    const photo = this.isPhoto;
    if (photo && this.tint) {
      ctx.globalAlpha = Math.min(1, this.progress * 1.25);
      ctx.drawImage(this.tint, 0, 0, w, h);
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = this.opts.ink;
    if (photo) ctx.globalAlpha = this.opts.lineAlpha;
    const rows = Math.ceil(h / sp);
    for (let r = 0; r <= rows; r++) {
      const y0 = r * sp + sp / 2;
      // staggered reveal: each row draws left→right, rows start one after another
      const local = Math.min(1, Math.max(0, this.progress * 1.6 - (r / rows) * 0.6));
      const xEnd = local * w;
      if (xEnd <= 0) continue;
      const top = [], bot = [];
      for (let x = 0; x <= xEnd + step; x += step) {
        const xx = Math.min(x, xEnd);
        const L = this.lumAt(xx, y0);
        const dark = Math.pow(1 - L, 1.15);
        let half = photo ? 0.08 + dark * sp * 0.24 : 0.18 + dark * sp * 0.46;
        let y = y0 + (L - 0.5) * sp * (photo ? 0.15 : 0.7);
        if (amp > 0.01) {
          const dx = xx - p.x, dy = y0 - p.y;
          const fall = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
          y += Math.sin(dx * 0.09 - t * 4) * amp * fall;
          half *= 1 + 0.35 * fall * p.strength;
        }
        top.push(xx, y - half); bot.push(xx, y + half);
      }
      ctx.beginPath();
      ctx.moveTo(top[0], top[1]);
      for (let i = 2; i < top.length; i += 2) ctx.lineTo(top[i], top[i + 1]);
      for (let i = bot.length - 2; i >= 0; i -= 2) ctx.lineTo(bot[i], bot[i + 1]);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  // Newspaper halftone: a 45° screen of dots whose size follows darkness.
  // The dots print in the site's orange (opts.ink, #D97757). Under the pointer they swell like a
  // loupe passing over the print and deepen to a darker orange (opts.accent), fading back
  // towards the edge of the loupe.
  const hexRGB = (hx) => { const n = parseInt(hx.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const LEVELS = 8;   // colour steps between ink and accent (one path per step keeps drawing fast)
  Engraving.prototype.drawHalftone = function () {
    const { ctx, w, h } = this;
    const cell = Math.max(3.2, w / this.opts.dots);
    const p = this.pointer, sigma = w * 0.13;
    ctx.clearRect(0, 0, w, h);
    const ink = hexRGB(this.opts.ink), acc = hexRGB(this.opts.accent);
    const paths = [];
    for (let k = 0; k <= LEVELS; k++) paths.push(new Path2D());
    const a = Math.PI / 4, ca = Math.cos(a), sa = Math.sin(a);
    const R = Math.hypot(w, h) / 2, cx = w / 2, cy = h / 2;
    const n = Math.ceil(R / cell) + 1;
    const maxR = cell * 0.62;
    for (let j = -n; j <= n; j++) {
      for (let i = -n; i <= n; i++) {
        const u = i * cell, v = j * cell;
        const x = cx + u * ca - v * sa, y = cy + u * sa + v * ca;
        if (x < -cell || y < -cell || x > w + cell || y > h + cell) continue;
        // diagonal reveal from the top-left corner
        const local = Math.min(1, Math.max(0, this.progress * 1.7 - ((x + y) / (w + h)) * 0.7));
        if (local <= 0) continue;
        const L = this.lumAt(x, y);
        let r = maxR * Math.sqrt(Math.pow(1 - L, 1.3)) * local;
        let lvl = 0;
        if (p.strength > 0.01) {
          const dx = x - p.x, dy = y - p.y;
          const fall = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
          r *= 1 + 0.55 * fall * p.strength;
          lvl = Math.round(Math.min(1, fall * p.strength * 1.35) * LEVELS);
        }
        if (r < 0.25) continue;
        const path = paths[lvl];
        path.moveTo(x + r, y);
        path.arc(x, y, r, 0, Math.PI * 2);
      }
    }
    for (let k = 0; k <= LEVELS; k++) {
      const t = k / LEVELS;
      ctx.fillStyle = `rgb(${ink.map((c, i) => Math.round(c + (acc[i] - c) * t)).join(",")})`;
      ctx.fill(paths[k]);
    }
  };

  // Stipple: dots drift away from the pointer and settle back.
  Engraving.prototype.drawStipple = function () {
    const { ctx, w, h } = this;
    const pts = this.stipple; if (!pts) return;
    const p = this.pointer, sigma = w * 0.1, push = w * 0.05 * p.strength;
    const r = Math.max(0.55, w / 560);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = this.opts.ink;
    ctx.beginPath();
    const shown = (pts.length / 3) * Math.min(1, this.progress * 1.2);
    for (let k = 0; k < shown; k++) {
      let x = pts[k * 3], y = pts[k * 3 + 1];
      if (push > 0.05) {
        const dx = x - p.x, dy = y - p.y, d2 = dx * dx + dy * dy;
        const fall = Math.exp(-d2 / (2 * sigma * sigma)), d = Math.sqrt(d2) || 1;
        x += (dx / d) * push * fall; y += (dy / d) * push * fall;
      }
      ctx.moveTo(x + r, y);
      ctx.arc(x, y, r, 0, Math.PI * 2);
    }
    ctx.fill();
  };

  Engraving.prototype.destroy = function () {
    window.removeEventListener("resize", this._onResize);
    if (this._raf) cancelAnimationFrame(this._raf);
  };

  window.Engraving = Engraving;
})();
