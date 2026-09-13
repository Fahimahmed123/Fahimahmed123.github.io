// main.js — shared across all pages.

const CATEGORY_CLASS = {
  "Web Development": "cat-web",
  "Machine Learning": "cat-ml",
  "Systems Programming": "cat-sys",
};

let activeCategory = "All";

document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  setYear();
  setupFilterPills();
  renderProjectGrid();
  renderResearch();
  renderProjectDetail();
  setupAboutSlider();
  setupHeroTilt();
});

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : str;
  return div.innerHTML;
}

function projectLinksHTML(p) {
  return [p.link, p.repo]
    .filter((l) => l && l.url)
    .map(
      (l) =>
        `<a class="p-link" href="${escapeHTML(l.url)}" target="_blank" rel="noopener">${escapeHTML(
          l.label
        )} ↗</a>`
    )
    .join("");
}

function tagsHTML(tags) {
  return (tags || []).map((t) => `<span class="tag">${escapeHTML(t)}</span>`).join("");
}

/* ---- Home page: filter pills + project grid ---- */

function setupFilterPills() {
  const row = document.getElementById("filter-pills");
  if (!row || typeof CATEGORIES === "undefined") return;

  const cats = ["All", ...CATEGORIES];
  row.innerHTML = cats
    .map(
      (c) =>
        `<button type="button" class="filter-pill${c === "All" ? " active" : ""}" data-cat="${escapeHTML(
          c
        )}">${escapeHTML(c)}</button>`
    )
    .join("");

  row.querySelectorAll(".filter-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      row.querySelectorAll(".filter-pill").forEach((b) => b.classList.toggle("active", b === btn));
      renderProjectGrid();
    });
  });
}

function renderProjectGrid() {
  const grid = document.getElementById("project-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  const list =
    activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);

  grid.innerHTML = list
    .map((p) => {
      const catClass = CATEGORY_CLASS[p.category] || "cat-web";
      return `
        <a class="card-link" href="project.html?slug=${encodeURIComponent(p.slug)}">
          <article class="project-card">
            <div class="card-banner ${catClass}">
              <span class="banner-tag">${escapeHTML(p.category)}</span>
              <span class="banner-glyph">${escapeHTML(p.glyph || "")}</span>
            </div>
            <div class="card-body">
              <h3>${escapeHTML(p.title)}</h3>
              <div class="p-stack">${escapeHTML(p.stack || "")}</div>
              <p>${escapeHTML(p.summary || "")}</p>
              <div class="tag-row">${tagsHTML(p.tags)}</div>
            </div>
          </article>
        </a>
      `;
    })
    .join("");
}

/* ---- about.html: research list ---- */

function renderResearch() {
  const list = document.getElementById("research-list");
  if (!list || typeof RESEARCH === "undefined") return;

  list.innerHTML = RESEARCH.map(
    (r) => `
      <div class="research-item">
        <div class="p-stack">${escapeHTML(r.note || "")}</div>
        <h3>${escapeHTML(r.title)}</h3>
        <p>${escapeHTML(r.summary || "")}</p>
      </div>
    `
  ).join("");
}

/* ---- project.html: single project detail, picked by ?slug= ---- */

function renderProjectDetail() {
  const el = document.getElementById("project-detail");
  if (!el || typeof PROJECTS === "undefined") return;

  const slug = new URLSearchParams(window.location.search).get("slug");
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    el.innerHTML = `
      <div class="empty-state">
        <h1>Project not found</h1>
        <p>That project doesn't exist, or the link is out of date.</p>
        <a class="btn primary" href="index.html">Back to all projects</a>
      </div>
    `;
    document.title = "Project not found — Fahim Farhad Ahmed";
    return;
  }

  document.title = `${project.title} — Fahim Farhad Ahmed`;

  const details = Array.isArray(project.details) ? project.details : [project.details];
  const detailsHTML = details.map((d) => `<p>${escapeHTML(d)}</p>`).join("");

  el.innerHTML = `
    <a class="back-link" href="index.html">← All projects</a>
    <div class="project-detail-head">
      <div>
        <div class="p-stack">${escapeHTML(project.category)} · ${escapeHTML(project.stack || "")}</div>
        <h1>${escapeHTML(project.title)}</h1>
      </div>
      <div class="actions">${projectLinksHTML(project)}</div>
    </div>
    <div class="tag-row" style="margin: 20px 0 28px;">${tagsHTML(project.tags)}</div>
    <div class="project-body">${detailsHTML}</div>
  `;
}

/* ---- shared: mobile nav toggle + footer year ---- */

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function setupAboutSlider() {
  const slider = document.querySelector('.about-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.about-slide')];
  if (slides.length < 2) return;
  let index = 0;
  let timer;
  const show = (next) => {
    slides[index].classList.remove('is-active');
    index = (next + slides.length) % slides.length;
    slides[index].classList.add('is-active');
  };
  const start = () => { clearInterval(timer); timer = setInterval(() => show(index + 1), 3600); };
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', start);
  start();
}

function setupHeroTilt() {
  const wrap = document.querySelector('.hero-photo-wrap');
  const card = wrap?.querySelector('.hero-photo');
  if (!wrap || !card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  wrap.addEventListener('pointermove', (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -6}deg) translateY(-4px)`;
  });
  wrap.addEventListener('pointerleave', () => { card.style.transform = ''; });
}
