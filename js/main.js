(function () {
  "use strict";
  var D = window.PORTFOLIO;
  var C = D.config;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function initials(t) { return t.split(/[\s/.\-]+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join(""); }
  function host(u) { return u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""); }

  /* ---------- Static links from config ---------- */
  $$('[data-link="github"]').forEach(function (a) { a.href = C.github; });
  $$('[data-link="linkedin"]').forEach(function (a) { a.href = C.linkedin; });
  $$('[data-link="email"]').forEach(function (a) { a.href = "mailto:" + C.email; if (!a.textContent.trim()) a.textContent = C.email; });
  $$('[data-link="resume"]').forEach(function (a) { a.href = C.resume; });
  $$('[data-link="github-text"]').forEach(function (a) { a.href = C.github; a.textContent = host(C.github); });
  $$('[data-link="linkedin-text"]').forEach(function (a) { a.href = C.linkedin; a.textContent = host(C.linkedin); });
  $("#heroLoc").textContent = C.location;
  $("#contactLoc").textContent = C.location;
  $("#profileImg").src = C.profileImage;
  var obj = $("[data-resume-object]"); if (obj) obj.data = C.resume + "#toolbar=0&navpanes=0";

  /* ---------- What I build ---------- */
  var build = [
    ["Full-stack applications", "React, Node.js and Flask apps with authentication, dashboards and real-time features."],
    ["AI / ML solutions", "Classification, regression and forecasting models wrapped in usable products."],
    ["Data science projects", "EDA, feature engineering and honest model evaluation on real datasets."],
    ["Python applications", "Flask services and pipelines backed by SQL and NoSQL databases."],
    ["Backend systems", "REST APIs with JWT or session auth, role-based access and report export."],
    ["Interactive web experiences", "Maps, charts and branching stories that respond to the user."]
  ];
  $("#buildGrid").innerHTML = build.map(function (b) { return "<article><h3>" + esc(b[0]) + "</h3><p>" + esc(b[1]) + "</p></article>"; }).join("");

  /* ---------- Skills ---------- */
  var skillTabs = ["All"].concat(D.skills.map(function (g) { return g.group; }));
  var activeSkill = "All";
  function iconFor(name, slug) {
    if (!slug) return '<span class="chip__ico" aria-hidden="true">' + esc(initials(name)) + "</span>";
    var url = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/" + slug + "/" + slug + "-original.svg";
    return '<span class="chip__ico" aria-hidden="true"><img src="' + url + '" alt="" loading="lazy" width="18" height="18" onerror="this.parentNode.textContent=\'' + esc(initials(name)) + '\'"></span>';
  }
  function renderSkills() {
    $("#skillTabs").innerHTML = skillTabs.map(function (t) {
      return '<button class="tab" type="button" role="tab" aria-selected="' + (t === activeSkill) + '" data-tab="' + esc(t) + '">' + esc(t) + "</button>";
    }).join("");
    $("#skillGrid").innerHTML = D.skills.filter(function (g) { return activeSkill === "All" || g.group === activeSkill; }).map(function (g) {
      return '<div class="skill-group"><h3>' + esc(g.group) + '</h3><div class="chips">' + g.items.map(function (i) {
        return '<span class="chip">' + iconFor(i[0], i[1]) + esc(i[0]) + "</span>";
      }).join("") + "</div></div>";
    }).join("");
  }
  $("#skillTabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-tab]"); if (!b) return;
    activeSkill = b.dataset.tab; renderSkills();
    var again = $('[data-tab="' + activeSkill + '"]'); if (again) again.focus();
  });
  renderSkills();

  /* ---------- Projects ---------- */
  var activeFilter = "All", query = "";
  function projectCard(p) {
    var flat = []; Object.keys(p.tech).forEach(function (k) { flat = flat.concat(p.tech[k]); });
    var seen = {}; flat = flat.filter(function (t) { if (seen[t]) return false; seen[t] = 1; return true; });
    var live = p.liveUrl
      ? '<a class="btn btn--sm btn--primary" href="' + esc(p.liveUrl) + '" target="_blank" rel="noopener">Live demo</a>'
      : '<span class="btn btn--sm" aria-disabled="true" title="Demo link not added yet">Live demo soon</span>';
    return '<article class="card reveal">' +
      '<div class="card__media"><img src="assets/projects/' + p.id + '.svg" alt="' + esc(p.title + " project cover") + '" loading="lazy" width="640" height="360"><span class="card__no">' + p.number + "</span></div>" +
      '<div class="card__body"><p class="card__cat">' + esc(p.category) + "</p>" +
      "<h3>" + esc(p.title) + "<small>" + esc(p.subtitle) + "</small></h3>" +
      '<p class="card__desc">' + esc(p.short) + "</p>" +
      '<ul class="badges" aria-label="Technologies">' + flat.slice(0, 7).map(function (t) { return '<li class="badge">' + esc(t) + "</li>"; }).join("") + (flat.length > 7 ? '<li class="badge">+' + (flat.length - 7) + "</li>" : "") + "</ul>" +
      '<ul class="card__feat">' + p.features.slice(0, 3).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
      '<div class="card__actions"><button class="btn btn--sm" type="button" data-case="' + p.id + '">View case study</button>' + live +
      '<a class="btn btn--sm btn--ghost" href="' + esc(p.githubUrl) + '" target="_blank" rel="noopener">GitHub</a></div></div></article>';
  }
  function renderProjects() {
    var q = query.trim().toLowerCase();
    var list = D.projects.filter(function (p) {
      var inFilter = activeFilter === "All" || p.filters.indexOf(activeFilter) > -1;
      if (!inFilter) return false;
      if (!q) return true;
      var hay = (p.title + " " + p.subtitle + " " + p.short + " " + p.category + " " + Object.keys(p.tech).map(function (k) { return p.tech[k].join(" "); }).join(" ")).toLowerCase();
      return hay.indexOf(q) > -1;
    });
    $("#projectGrid").innerHTML = list.map(projectCard).join("");
    $("#projectEmpty").hidden = list.length > 0;
    observeReveal();
  }
  function renderFilters() {
    $("#projectTabs").innerHTML = D.filters.map(function (f) {
      return '<button class="tab" type="button" aria-pressed="' + (f === activeFilter) + '" data-filter="' + esc(f) + '">' + esc(f) + "</button>";
    }).join("");
  }
  $("#projectTabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-filter]"); if (!b) return;
    activeFilter = b.dataset.filter; renderFilters(); renderProjects();
    $('[data-filter="' + activeFilter + '"]').focus();
  });
  $("#projectSearch").addEventListener("input", function (e) { query = e.target.value; renderProjects(); });
  $("#projectGrid").addEventListener("click", function (e) {
    var b = e.target.closest("[data-case]"); if (b) openCase(b.dataset.case, b);
  });
  renderFilters(); renderProjects();

  /* ---------- Case study ---------- */
  var dlg = $("#case"), lastTrigger = null, currentId = null;
  function list(items) { return '<ul class="bullets">' + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>"; }
  function caseHTML(p) {
    var live = p.liveUrl
      ? '<a class="btn btn--primary" href="' + esc(p.liveUrl) + '" target="_blank" rel="noopener">Open live demo</a>'
      : '<span class="btn" aria-disabled="true">Live demo coming soon</span>';
    var html = '<div class="case__hero"><img src="assets/projects/' + p.id + '.svg" alt="' + esc(p.title + " cover") + '"></div>' +
      '<div class="case__head"><p class="card__cat">Project ' + p.number + " · " + esc(p.category) + "</p><h2 id=\"case-title\">" + esc(p.title) + '</h2><p class="sub">' + esc(p.subtitle) + "</p>" +
      '<div class="case__cta">' + live + '<a class="btn" href="' + esc(p.githubUrl) + '" target="_blank" rel="noopener">View code on GitHub</a></div></div>';
    if (p.stats) html += '<div class="stats">' + p.stats.map(function (s) { return "<div><b>" + esc(s.value) + "</b><span>" + esc(s.label) + "</span></div>"; }).join("") + "</div>";
    html += '<div class="case__sec"><h3>Overview</h3><p>' + esc(p.description) + "</p></div>";
    if (p.note) html += '<div class="case__note">' + esc(p.note) + "</div>";
    html += '<div class="case__sec case__two"><div><h3>The problem</h3><p>' + esc(p.problem) + "</p></div><div><h3>The solution</h3><p>" + esc(p.solution) + "</p></div></div>";
    html += '<div class="case__sec"><h3>Workflow</h3><ol class="flow">' + p.workflow.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ol></div>";
    html += '<div class="case__sec"><h3>Architecture</h3><div class="arch">' + p.architecture.map(function (a) {
      return '<div class="arch__row"><b>' + esc(a.layer) + '</b><ul class="badges">' + a.items.map(function (i) { return '<li class="badge">' + esc(i) + "</li>"; }).join("") + "</ul></div>";
    }).join("") + "</div></div>";
    html += '<div class="case__sec case__two"><div><h3>Key features</h3>' + list(p.features) + "</div><div><h3>Tech stack</h3>" +
      Object.keys(p.tech).map(function (k) { return '<div class="techgroup"><h4>' + esc(k) + '</h4><ul class="badges">' + p.tech[k].map(function (t) { return '<li class="badge">' + esc(t) + "</li>"; }).join("") + "</ul></div>"; }).join("") + "</div></div>";
    if (p.results && p.results.length) html += '<div class="case__sec"><h3>Results</h3>' + list(p.results) + "</div>";
    var shots = (p.screenshots && p.screenshots.length)
      ? '<div class="shots">' + p.screenshots.map(function (s, i) { return '<img src="' + esc(s) + '" alt="' + esc(p.title + " screenshot " + (i + 1)) + '" loading="lazy">'; }).join("") + "</div>"
      : '<div class="shots"><div class="ph">Add screenshots to <code>assets/projects/' + p.id + '/</code> and list them in <code>js/data.js</code></div></div>';
    html += '<div class="case__sec"><h3>Screenshots</h3>' + shots + "</div>";
    return html;
  }
  function openCase(id, trigger, fromHash) {
    var p = D.projects.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    currentId = id; if (trigger) lastTrigger = trigger;
    $("#caseBody").innerHTML = caseHTML(p); $("#caseBody").scrollTop = 0;
    var i = D.projects.indexOf(p), n = D.projects.length;
    $("#casePrev").dataset.go = D.projects[(i - 1 + n) % n].id;
    $("#caseNext").dataset.go = D.projects[(i + 1) % n].id;
    if (!dlg.open) dlg.showModal();
    if (!fromHash) history.replaceState(null, "", "#project-" + id);
  }
  function closeCase() {
    if (dlg.open) dlg.close();
  }
  dlg.addEventListener("close", function () {
    currentId = null;
    if (location.hash.indexOf("#project-") === 0) history.replaceState(null, "", "#projects");
    if (lastTrigger && document.body.contains(lastTrigger)) lastTrigger.focus();
  });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeCase(); });
  $("#caseClose").addEventListener("click", closeCase);
  ["casePrev", "caseNext"].forEach(function (id) { $("#" + id).addEventListener("click", function (e) { openCase(e.currentTarget.dataset.go); }); });
  window.addEventListener("hashchange", function () {
    if (location.hash.indexOf("#project-") === 0) openCase(location.hash.slice(9), null, true);
  });
  if (location.hash.indexOf("#project-") === 0) openCase(location.hash.slice(9), null, true);

  /* ---------- Timeline & certifications ---------- */
  $("#timeline").innerHTML = D.timeline.map(function (t) {
    return '<li class="tl reveal"><p class="tl__type">' + esc(t.type) + "</p><h3>" + esc(t.title) + '</h3><p class="tl__org">' + esc(t.org) + "</p>" +
      (t.when ? '<p class="tl__when">' + esc(t.when) + "</p>" : "") + (t.text ? '<p class="tl__text">' + esc(t.text) + "</p>" : "") + "</li>";
  }).join("");
  var badgeIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.4 1.8 3-.1 1 2.8 2.5 1.7-.9 2.9.9 2.9-2.5 1.7-1 2.8-3-.1L12 22l-2.4-1.8-3 .1-1-2.8-2.5-1.7.9-2.9-.9-2.9 2.5-1.7 1-2.8 3 .1L12 2Zm-1 12.6 5-5-1.4-1.4-3.6 3.6-1.6-1.6L8 11.6l3 3Z"/></svg>';
  $("#certGrid").innerHTML = D.certs.map(function (c) {
    return '<article class="cert reveal"><div class="cert__ico">' + badgeIco + "</div><h3>" + esc(c.name) + "</h3>" + (c.org ? "<p>" + esc(c.org) + "</p>" : "") +
      '<div class="cert__foot">' + (c.url ? '<a class="btn btn--sm" href="' + esc(c.url) + '" target="_blank" rel="noopener">View certificate</a>' : '<span class="btn btn--sm" aria-disabled="true">Certificate link soon</span>') + "</div></article>";
  }).join("");

  /* ---------- Contact form ---------- */
  var form = $("#contactForm"), statusEl = $("#formStatus"), sendBtn = $("#sendBtn");
  var rules = {
    name: function (v) { return v.trim().length >= 2 ? "" : "Enter your name (at least 2 characters)."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address, like name@example.com."; },
    subject: function (v) { return v.trim().length >= 3 ? "" : "Add a short subject."; },
    message: function (v) { return v.trim().length >= 10 ? "" : "Write at least 10 characters so I know how to help."; }
  };
  function check(name) {
    var el = form.elements[name], msg = rules[name](el.value);
    $("#e-" + name).textContent = msg; el.closest(".field").classList.toggle("invalid", !!msg);
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }
  Object.keys(rules).forEach(function (n) { form.elements[n].addEventListener("blur", function () { check(n); }); form.elements[n].addEventListener("input", function () { if ($("#e-" + n).textContent) check(n); }); });
  form.addEventListener("submit", function (e) {
    e.preventDefault(); statusEl.className = "status"; statusEl.textContent = "";
    var ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { statusEl.className = "status bad"; statusEl.textContent = "Please fix the highlighted fields and send again."; var bad = $(".invalid input, .invalid textarea", form); if (bad) bad.focus(); return; }
    var fe = form.elements; var data = { name: fe.name.value.trim(), email: fe.email.value.trim(), subject: fe.subject.value.trim(), message: fe.message.value.trim() };
    sendBtn.disabled = true; sendBtn.textContent = "Sending…";
    function done(okay, text) { sendBtn.disabled = false; sendBtn.textContent = "Send message"; statusEl.className = "status " + (okay ? "ok" : "bad"); statusEl.textContent = text; if (okay) form.reset(); }
    if (C.formEndpoint) {
      fetch(C.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(true, "Message sent. Thank you, I'll reply soon."); })
        .catch(function () { done(false, "Couldn't send the message. Please email " + C.email + " directly."); });
    } else {
      var body = "Name: " + data.name + "\nEmail: " + data.email + "\n\n" + data.message;
      window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(data.subject) + "&body=" + encodeURIComponent(body);
      setTimeout(function () { done(true, "Your email app should open with the message ready to send. If not, write to " + C.email + "."); }, 600);
    }
  });

  /* ---------- Nav, theme, scroll ---------- */
  var menu = $("#menu"), burger = $("#burger");
  function setMenu(open) { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
  burger.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  var themeBtn = $("#themeBtn");
  function syncTheme() { var t = document.documentElement.getAttribute("data-theme"); themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme"); }
  themeBtn.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("mk-theme", next); } catch (e) {}
    syncTheme();
  });
  syncTheme();

  var links = $$(".menu a[href^='#']:not(.menu__cta)");
  var sections = links.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  var toTop = $("#toTop");
  window.addEventListener("scroll", function () { toTop.hidden = window.scrollY < 700; }, { passive: true });
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });

  var io = null;
  function observeReveal() {
    var els = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    if (!io) io = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }); }, { threshold: .12 });
    els.forEach(function (e) { io.observe(e); });
  }
  observeReveal();

  /* ---------- Loader ---------- */
  window.addEventListener("load", function () { setTimeout(function () { $("#loader").classList.add("done"); }, reduceMotion ? 0 : 700); });

  /* ---------- Particle network (light, paused when hidden) ---------- */
  var cv = $("#bg");
  if (cv && !reduceMotion) {
    var ctx = cv.getContext("2d"), W, H, pts = [], mouse = { x: -999, y: -999 }, raf;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() { W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; var n = Math.min(70, Math.floor(innerWidth / 22)); pts = []; for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25 * dpr, vy: (Math.random() - .5) * .25 * dpr }); }
    size(); window.addEventListener("resize", size);
    window.addEventListener("pointermove", function (e) { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; }, { passive: true });
    function tick() {
      ctx.clearRect(0, 0, W, H);
      var light = document.documentElement.getAttribute("data-theme") === "light";
      var col = light ? "75,82,232" : "138,144,255", maxD = 150 * dpr;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.fillStyle = "rgba(" + col + ",.8)"; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6 * dpr, 0, 6.283); ctx.fill();
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) { ctx.strokeStyle = "rgba(" + col + "," + (.22 * (1 - d / maxD)) + ")"; ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        var mx = p.x - mouse.x, my = p.y - mouse.y, md = Math.sqrt(mx * mx + my * my);
        if (md < 160 * dpr) { ctx.strokeStyle = "rgba(255,184,107," + (.35 * (1 - md / (160 * dpr))) + ")"; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      raf = requestAnimationFrame(tick);
    }
    tick();
    document.addEventListener("visibilitychange", function () { if (document.hidden) cancelAnimationFrame(raf); else tick(); });
  }
})();
