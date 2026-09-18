/* ==========================================================================
   YOURPITCHH — script.js
   Vanilla JS. Frontend-only demo. All data is simulated via localStorage.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     0. SEED DATA
  --------------------------------------------------------------------- */
  const SEED_JOBS = [
    {
      id: "job-001",
      title: "24/7 Non-Voice Process — Chat Support",
      company: "YourPitchh Client (Demo)",
      location: "Bengaluru, Karnataka",
      type: "Full Time",
      category: "Customer Support",
      experience: "0–2 years",
      salary: "₹2.4L – ₹3.6L / year",
      posted: "2024-01-15",
      skills: ["Creative Writing", "Written Communication", "Verbal Communication", "Chat Support"],
      description: "Handle real-time chat conversations with customers across rotational 24/7 shifts, resolving queries with clear, friendly written communication.",
      responsibilities: [
        "Respond to customer chats within defined SLA windows",
        "Maintain accuracy and tone consistent with brand voice",
        "Escalate complex issues to the right internal team",
        "Log every conversation in the support system"
      ],
      requirements: [
        "Strong written English and typing speed",
        "Comfortable working rotational 24/7 shifts",
        "Prior chat/non-voice experience is a plus, not mandatory"
      ],
      benefits: ["Shift allowance", "Performance incentives", "On-the-job training"],
      demo: true
    },
    {
      id: "job-002",
      title: "Lead Generation Specialist",
      company: "YourPitchh Client (Demo)",
      location: "Bengaluru, Karnataka",
      type: "Full Time",
      category: "Sales / Lead Generation",
      experience: "1–3 years",
      salary: "₹3L – ₹4.5L / year",
      posted: "2024-02-02",
      skills: ["Cold Calling", "Lead Qualification", "CRM Tools", "Verbal Communication"],
      description: "Identify and qualify new business leads for a growing client portfolio, working closely with the sales team to build a healthy pipeline.",
      responsibilities: [
        "Research and prospect new leads across target segments",
        "Qualify inbound and outbound leads against defined criteria",
        "Maintain accurate records in the CRM",
        "Hand off qualified leads to closing sales executives"
      ],
      requirements: [
        "Confident verbal communication in English/Hindi",
        "Comfortable with outbound calling targets",
        "Basic familiarity with CRM tools preferred"
      ],
      benefits: ["Uncapped incentives", "Career growth into sales roles", "Training provided"],
      demo: true
    },
    {
      id: "job-003",
      title: "HR Recruiter — Trainee",
      company: "YourPitchh Client (Demo)",
      location: "Jayanagar, Bengaluru",
      type: "Full Time",
      category: "HR / Recruitment",
      experience: "0–1 years",
      salary: "₹2.2L – ₹3L / year",
      posted: "2024-03-10",
      skills: ["Sourcing", "Screening", "Communication", "MS Excel"],
      description: "Support the recruitment lifecycle for client mandates — sourcing candidates, screening resumes, and coordinating interviews.",
      responsibilities: [
        "Source candidates through portals and referrals",
        "Conduct first-level screening calls",
        "Schedule and coordinate interviews with employers",
        "Maintain candidate pipeline trackers"
      ],
      requirements: [
        "Graduate in any discipline",
        "Good communication and people skills",
        "Willingness to learn end-to-end recruitment"
      ],
      benefits: ["Structured training", "Mentorship", "Growth into senior recruiter roles"],
      demo: true
    },
    {
      id: "job-004",
      title: "Customer Support Associate — Voice",
      company: "YourPitchh Client (Demo)",
      location: "Bengaluru, Karnataka",
      type: "Full Time",
      category: "Customer Support",
      experience: "0–2 years",
      salary: "₹2.6L – ₹3.8L / year",
      posted: "2024-03-28",
      skills: ["Voice Support", "Verbal Communication", "Problem Solving"],
      description: "Handle inbound and outbound customer calls, resolving service queries while maintaining a high customer satisfaction score.",
      responsibilities: [
        "Answer inbound customer calls professionally",
        "Troubleshoot and resolve queries on first contact where possible",
        "Document interactions accurately",
        "Meet quality and CSAT targets"
      ],
      requirements: [
        "Clear spoken English/Hindi",
        "Comfortable with rotational shifts",
        "Basic computer literacy"
      ],
      benefits: ["Shift allowance", "Health support", "Incentive structure"],
      demo: true
    }
  ];

  const SEED_REVIEWS = [
    { id: "r1", name: "Harshith Kumar EV", rating: 5, date: "2023-11-02",
      text: "I had a very positive experience with YourPitchh throughout my job search. The team was professional, responsive and supportive throughout the process." },
    { id: "r2", name: "Monisha J Nisha", rating: 5, date: "2023-09-18",
      text: "I had a great experience with this consultancy! They helped me secure a job within just 2 days." },
    { id: "r3", name: "Demo Reviewer", rating: 4, date: "2023-07-04",
      text: "Sample review placeholder — additional public reviews can be added here once verified from the company's Google Business profile." }
  ];

  const SEED_UPDATES = [
    { title: "Service Continuity During COVID-19", date: "March 23, 2020",
      text: "An update shared with candidates and employers on how recruitment support continued during the pandemic period." },
    { title: "Hiring for 24/7 Non-Voice Process (Chat Support)", date: "July 3, 2019",
      text: "A historical hiring announcement for a chat support role, shown here as an example of past recruitment activity." },
    { title: "Hiring for Lead Generation Specialist", date: "April 27, 2019",
      text: "A historical hiring announcement for a lead generation role from the company's public activity." }
  ];

  const CANDIDATE_DEMO = {
    name: "Demo Candidate",
    completion: 80,
    savedJobs: [],
    appliedJobs: [
      { job: "24/7 Non-Voice Process — Chat Support", date: "2024-04-02", status: "Interview Scheduled" },
      { job: "Lead Generation Specialist", date: "2024-04-10", status: "Under Review" },
      { job: "HR Recruiter — Trainee", date: "2024-03-20", status: "Applied" },
      { job: "Customer Support Associate — Voice", date: "2024-02-28", status: "Selected" }
    ]
  };

  const EMPLOYER_DEMO_CANDIDATES = [
    { name: "A. Kumar", job: "Chat Support", date: "2024-04-01", status: "Applied" },
    { name: "P. Sharma", job: "Lead Generation Specialist", date: "2024-04-03", status: "Shortlisted" },
    { name: "R. Iyer", job: "HR Recruiter — Trainee", date: "2024-04-05", status: "Interview Scheduled" },
    { name: "S. Fernandes", job: "Chat Support", date: "2024-04-06", status: "Rejected" },
    { name: "N. Bose", job: "Customer Support — Voice", date: "2024-04-08", status: "Selected" }
  ];

  /* ---------------------------------------------------------------------
     1. STORAGE HELPERS
  --------------------------------------------------------------------- */
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* storage unavailable */ }
    }
  };

  function getAllJobs() {
    const posted = store.get("yp_posted_jobs", []);
    return [...posted, ...SEED_JOBS];
  }

  function getSavedIds() { return store.get("yp_saved_jobs", []); }
  function toggleSaved(id) {
    let saved = getSavedIds();
    if (saved.includes(id)) saved = saved.filter(x => x !== id);
    else saved.push(id);
    store.set("yp_saved_jobs", saved);
    return saved.includes(id);
  }

  /* ---------------------------------------------------------------------
     2. TOASTS
  --------------------------------------------------------------------- */
  function toast(message, type) {
    let stack = document.querySelector(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    const el = document.createElement("div");
    el.className = "toast" + (type ? " " + type : "");
    el.innerHTML = `<span class="ico">${type === "error" ? "⚠" : "✓"}</span><span>${message}</span>`;
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 300);
    }, 3200);
  }
  window.ypToast = toast;

  /* ---------------------------------------------------------------------
     3. THEME
  --------------------------------------------------------------------- */
  function initTheme() {
    const saved = localStorage.getItem("yp_theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    document.querySelectorAll(".theme-toggle").forEach(btn => {
      updateThemeIcon(btn);
      btn.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("yp_theme", next);
        document.querySelectorAll(".theme-toggle").forEach(updateThemeIcon);
      });
    });
  }
  function updateThemeIcon(btn) {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.innerHTML = dark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.2" y1="4.2" x2="5.6" y2="5.6"/><line x1="18.4" y1="18.4" x2="19.8" y2="19.8"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.2" y1="19.8" x2="5.6" y2="18.4"/><line x1="18.4" y1="5.6" x2="19.8" y2="4.2"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  }

  /* ---------------------------------------------------------------------
     4. NAVBAR / MOBILE MENU
  --------------------------------------------------------------------- */
  function initNav() {
    const nav = document.querySelector(".navbar");
    if (nav) {
      window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 30);
      }, { passive: true });
    }
    const burger = document.querySelector(".hamburger");
    const menu = document.querySelector(".mobile-menu");
    if (burger && menu) {
      burger.addEventListener("click", () => {
        burger.classList.toggle("open");
        menu.classList.toggle("open");
        document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
      });
      menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        burger.classList.remove("open");
        menu.classList.remove("open");
        document.body.style.overflow = "";
      }));
    }
    // active link highlighting by current path
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(a => {
      const href = a.getAttribute("href") || "";
      if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
    });
  }

  /* ---------------------------------------------------------------------
     5. BUTTON RIPPLE
  --------------------------------------------------------------------- */
  function initRipple() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  /* ---------------------------------------------------------------------
     6. SCROLL REVEAL + COUNTERS + TIMELINE
  --------------------------------------------------------------------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal, .tl-item");
    if (!items.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    items.forEach(el => io.observe(el));
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-counter"));
        const suffix = el.getAttribute("data-suffix") || "";
        const decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals")) : 0;
        let cur = 0;
        const steps = 40;
        const inc = target / steps;
        const timer = setInterval(() => {
          cur += inc;
          if (cur >= target) { cur = target; clearInterval(timer); }
          el.textContent = cur.toFixed(decimals) + suffix;
        }, 30);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------------------
     7. FAQ ACCORDION
  --------------------------------------------------------------------- */
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(item => {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        item.closest(".faq-list").querySelectorAll(".faq-item").forEach(other => {
          other.classList.remove("open");
          other.querySelector(".faq-a").style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     8. MODAL HELPERS
  --------------------------------------------------------------------- */
  function openModal(overlay) {
    if (!overlay) return;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(overlay) {
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
  function initModalCloseHandlers() {
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal(overlay);
      });
      overlay.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", () => closeModal(overlay));
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.open").forEach(closeModal);
      }
    });
  }
  window.ypOpenModal = openModal;
  window.ypCloseModal = closeModal;

  /* ---------------------------------------------------------------------
     9. SERVICE "LEARN MORE" MODAL
  --------------------------------------------------------------------- */
  const SERVICE_DETAILS = {
    "recruitment-staffing": ["Recruitment & Staffing", "End-to-end hiring support for permanent and contract roles, from role scoping to offer stage."],
    "talent-acquisition": ["Talent Acquisition", "Proactive sourcing strategies to build a consistent pipeline of qualified candidates for ongoing hiring needs."],
    "candidate-screening": ["Candidate Screening", "Structured resume and profile screening so employers only meet candidates who match the role."],
    "interview-prep": ["Interview Preparation", "Guidance for candidates on interview etiquette, common questions and presenting their experience clearly."],
    "job-placement": ["Job Placement Support", "Support through the final stages of the hiring process, from interview scheduling to offer discussions."],
    "employer-hiring": ["Employer Hiring Solutions", "Tailored hiring workflows for employers, adapted to team size, urgency and role complexity."],
    "non-voice": ["Non-Voice / Chat Support Hiring", "Focused sourcing for chat and written-communication roles across customer support functions."],
    "lead-gen": ["Lead Generation Recruitment", "Hiring support specifically for lead generation and inside-sales roles."],
    "hr-consulting": ["HR Consulting", "Advisory support on hiring processes, role structuring and recruitment best practices."],
    "career-support": ["Career Support", "Ongoing guidance for candidates navigating career moves, beyond a single job placement."]
  };
  function initServiceModal() {
    const overlay = document.getElementById("service-modal");
    if (!overlay) return;
    const titleEl = overlay.querySelector("[data-service-title]");
    const bodyEl = overlay.querySelector("[data-service-body]");
    document.querySelectorAll("[data-service]").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-service");
        const detail = SERVICE_DETAILS[key];
        if (!detail) return;
        titleEl.textContent = detail[0];
        bodyEl.textContent = detail[1];
        openModal(overlay);
      });
    });
  }

  /* ---------------------------------------------------------------------
     10. JOBS: RENDER, SEARCH, FILTER
  --------------------------------------------------------------------- */
  function jobCardHtml(job) {
    const saved = getSavedIds().includes(job.id);
    return `
    <div class="job-card reveal" data-job-id="${job.id}">
      <div class="job-card-top">
        <div>
          <h3>${escapeHtml(job.title)}</h3>
          <div class="company">${escapeHtml(job.company)}</div>
        </div>
        <span class="job-tag ${job.demo ? "demo" : ""}">${job.demo ? "Demo Job" : "Open"}</span>
      </div>
      <div class="job-meta">
        <span>📍 ${escapeHtml(job.location)}</span>
        <span>🕒 ${escapeHtml(job.type)}</span>
        <span>📈 ${escapeHtml(job.experience)}</span>
        <span>💰 ${escapeHtml(job.salary)}</span>
      </div>
      <p class="job-desc">${escapeHtml(job.description)}</p>
      <div class="job-skills">${job.skills.slice(0, 4).map(s => `<span>${escapeHtml(s)}</span>`).join("")}</div>
      <div class="job-card-actions">
        <button class="btn btn-outline btn-sm" data-view-job="${job.id}">View Details</button>
        <button class="btn btn-primary btn-sm" data-apply-job="${job.id}">Apply Now</button>
        <button class="save-btn ${saved ? "saved" : ""}" data-save-job="${job.id}" aria-label="Save job" title="Save job">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${saved ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>
      <div class="job-posted">Posted ${formatDate(job.posted)}</div>
    </div>`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }
  function formatDate(str) {
    try {
      const d = new Date(str);
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    } catch (e) { return str; }
  }

  let currentJobResults = [];

  function renderJobs(jobs, gridId, countId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    currentJobResults = jobs;
    const countEl = countId ? document.getElementById(countId) : null;
    if (countEl) countEl.textContent = `${jobs.length} job${jobs.length === 1 ? "" : "s"} found`;
    if (!jobs.length) {
      grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.6" y2="16.6"/></svg>
        <h3>No jobs match your search</h3>
        <p>Try adjusting your filters or clearing your search to see all opportunities.</p>
      </div>`;
      return;
    }
    grid.innerHTML = jobs.map(jobCardHtml).join("");
    bindJobCardActions(grid);
    initReveal();
  }

  function bindJobCardActions(scope) {
    scope.querySelectorAll("[data-view-job]").forEach(btn => {
      btn.addEventListener("click", () => openJobDetails(btn.getAttribute("data-view-job")));
    });
    scope.querySelectorAll("[data-apply-job]").forEach(btn => {
      btn.addEventListener("click", () => openApplyForm(btn.getAttribute("data-apply-job")));
    });
    scope.querySelectorAll("[data-save-job]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-save-job");
        const isSaved = toggleSaved(id);
        btn.classList.toggle("saved", isSaved);
        btn.querySelector("svg").setAttribute("fill", isSaved ? "currentColor" : "none");
        toast(isSaved ? "Job saved successfully" : "Job removed from saved", "success");
      });
    });
  }

  function filterJobs() {
    const q = (document.getElementById("f-search")?.value || "").toLowerCase().trim();
    const loc = document.getElementById("f-location")?.value || "";
    const type = document.getElementById("f-type")?.value || "";
    const exp = document.getElementById("f-experience")?.value || "";
    const cat = document.getElementById("f-category")?.value || "";
    let jobs = getAllJobs();

    if (q) {
      jobs = jobs.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    if (loc) jobs = jobs.filter(j => j.location === loc);
    if (type) jobs = jobs.filter(j => j.type === type);
    if (exp) jobs = jobs.filter(j => j.experience === exp);
    if (cat) jobs = jobs.filter(j => j.category === cat);

    renderJobs(jobs, "jobs-grid", "jobs-count");
  }

  function populateFilterOptions() {
    const jobs = getAllJobs();
    const fill = (id, values) => {
      const el = document.getElementById(id);
      if (!el) return;
      const current = el.value;
      const opts = ['<option value="">Any</option>'].concat(
        [...new Set(values)].sort().map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`)
      );
      el.innerHTML = opts.join("");
      el.value = current;
    };
    fill("f-location", jobs.map(j => j.location));
    fill("f-type", jobs.map(j => j.type));
    fill("f-experience", jobs.map(j => j.experience));
    fill("f-category", jobs.map(j => j.category));
  }

  function initJobsPage() {
    const grid = document.getElementById("jobs-grid");
    if (!grid) return;
    populateFilterOptions();
    renderJobs(getAllJobs(), "jobs-grid", "jobs-count");

    document.getElementById("f-search")?.addEventListener("input", debounce(filterJobs, 200));
    ["f-location", "f-type", "f-experience", "f-category"].forEach(id => {
      document.getElementById(id)?.addEventListener("change", filterJobs);
    });
    document.getElementById("search-btn")?.addEventListener("click", filterJobs);
    document.getElementById("clear-filters")?.addEventListener("click", () => {
      ["f-search", "f-location", "f-type", "f-experience", "f-category"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      filterJobs();
    });
  }

  function debounce(fn, wait) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  }

  /* Home page job preview (first 3) */
  function initHomeJobsPreview() {
    const grid = document.getElementById("home-jobs-grid");
    if (!grid) return;
    const jobs = getAllJobs().slice(0, 3);
    grid.innerHTML = jobs.map(jobCardHtml).join("");
    bindJobCardActions(grid);
  }

  /* ---------------------------------------------------------------------
     11. JOB DETAILS MODAL
  --------------------------------------------------------------------- */
  function openJobDetails(id) {
    const job = getAllJobs().find(j => j.id === id);
    const overlay = document.getElementById("job-detail-modal");
    if (!job || !overlay) return;
    overlay.querySelector("[data-jd-title]").textContent = job.title;
    overlay.querySelector("[data-jd-sub]").textContent = `${job.company} · ${job.location}`;
    overlay.querySelector("[data-jd-salary]").textContent = job.salary;
    overlay.querySelector("[data-jd-exp]").textContent = job.experience;
    overlay.querySelector("[data-jd-type]").textContent = job.type;
    overlay.querySelector("[data-jd-desc]").textContent = job.description;
    overlay.querySelector("[data-jd-skills]").innerHTML = job.skills.map(s => `<span>${escapeHtml(s)}</span>`).join("");
    overlay.querySelector("[data-jd-resp]").innerHTML = job.responsibilities.map(r => `<li>${escapeHtml(r)}</li>`).join("");
    overlay.querySelector("[data-jd-req]").innerHTML = job.requirements.map(r => `<li>${escapeHtml(r)}</li>`).join("");
    overlay.querySelector("[data-jd-ben]").innerHTML = job.benefits.map(r => `<li>${escapeHtml(r)}</li>`).join("");
    const saveBtn = overlay.querySelector("[data-jd-save]");
    const isSaved = getSavedIds().includes(job.id);
    saveBtn.textContent = isSaved ? "Saved ✓" : "Save Job";
    saveBtn.onclick = () => {
      const nowSaved = toggleSaved(job.id);
      saveBtn.textContent = nowSaved ? "Saved ✓" : "Save Job";
      toast(nowSaved ? "Job saved successfully" : "Job removed from saved", "success");
    };
    overlay.querySelector("[data-jd-apply]").onclick = () => { closeModal(overlay); openApplyForm(job.id); };
    overlay.querySelector("[data-jd-share]").onclick = () => {
      const url = location.href.split("#")[0] + "#job=" + job.id;
      if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
      toast("Job link copied to clipboard", "success");
    };
    openModal(overlay);
  }

  /* ---------------------------------------------------------------------
     12. APPLY NOW FLOW
  --------------------------------------------------------------------- */
  function openApplyForm(jobId) {
    const overlay = document.getElementById("apply-modal");
    if (!overlay) return;
    const job = getAllJobs().find(j => j.id === jobId);
    overlay.querySelector("[data-apply-job-title]").textContent = job ? job.title : "this role";
    overlay.querySelector("form")?.reset();
    overlay.querySelector(".file-drop")?.classList.remove("has-file");
    overlay.querySelector("[data-file-label]") && (overlay.querySelector("[data-file-label]").textContent = "Click to upload your resume (PDF/DOC)");
    overlay.querySelector(".apply-form-view").style.display = "block";
    overlay.querySelector(".apply-success-view").style.display = "none";
    overlay.dataset.jobId = jobId || "";
    openModal(overlay);
  }

  function initApplyForm() {
    const overlay = document.getElementById("apply-modal");
    if (!overlay) return;
    const form = overlay.querySelector("form");
    const fileDrop = overlay.querySelector(".file-drop");
    const fileInput = overlay.querySelector('input[type="file"]');

    fileDrop?.addEventListener("click", () => fileInput.click());
    fileInput?.addEventListener("change", () => {
      if (fileInput.files.length) {
        fileDrop.classList.add("has-file");
        overlay.querySelector("[data-file-label]").textContent = "✓ " + fileInput.files[0].name;
      }
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;
      const data = Object.fromEntries(new FormData(form).entries());
      const job = getAllJobs().find(j => j.id === overlay.dataset.jobId);
      const applications = store.get("yp_applications", []);
      applications.unshift({
        id: "app-" + Date.now(),
        jobId: overlay.dataset.jobId,
        jobTitle: job ? job.title : "General Application",
        ...data,
        resumeFileName: fileInput.files[0] ? fileInput.files[0].name : "",
        status: "Applied",
        appliedOn: new Date().toISOString()
      });
      store.set("yp_applications", applications);

      overlay.querySelector(".apply-form-view").style.display = "none";
      overlay.querySelector(".apply-success-view").style.display = "block";
      toast("Application submitted", "success");
    });
  }

  /* ---------------------------------------------------------------------
     13. FORM VALIDATION
  --------------------------------------------------------------------- */
  function validateForm(form) {
    let valid = true;
    form.querySelectorAll("[required]").forEach(input => {
      const field = input.closest(".field") || input.closest(".checkbox-field");
      let ok = true;
      if (input.type === "checkbox") ok = input.checked;
      else if (input.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      else if (input.type === "tel") ok = /^[0-9+\-\s()]{7,15}$/.test(input.value.trim());
      else if (input.tagName === "TEXTAREA" && input.hasAttribute("minlength")) ok = input.value.trim().length >= parseInt(input.getAttribute("minlength"));
      else ok = input.value.trim().length > 0;

      if (field) field.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });
    return valid;
  }

  /* ---------------------------------------------------------------------
     14. POST A JOB (Employer)
  --------------------------------------------------------------------- */
  function initPostJobForm() {
    const form = document.getElementById("post-job-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;
      const data = Object.fromEntries(new FormData(form).entries());
      const jobs = store.get("yp_posted_jobs", []);
      const newJob = {
        id: "posted-" + Date.now(),
        title: data.jobTitle,
        company: data.companyName,
        location: data.location,
        type: data.jobType,
        category: data.category || "General",
        experience: data.experience,
        salary: data.salary || "To be discussed",
        posted: new Date().toISOString().slice(0, 10),
        skills: (data.skills || "").split(",").map(s => s.trim()).filter(Boolean),
        description: data.description,
        responsibilities: ["Details to be shared during the interview process."],
        requirements: ["As discussed with the hiring team."],
        benefits: ["To be confirmed by employer."],
        demo: true,
        contactEmail: data.contactEmail
      };
      jobs.unshift(newJob);
      store.set("yp_posted_jobs", jobs);
      form.reset();
      toast("Job posted successfully", "success");
      populateFilterOptions();
      filterJobs();
      initHomeJobsPreview();
      renderEmployerDashboard();
    });
  }

  /* ---------------------------------------------------------------------
     15. CANDIDATE DASHBOARD
  --------------------------------------------------------------------- */
  function renderCandidateDashboard() {
    const root = document.getElementById("candidate-dashboard");
    if (!root) return;
    const savedCount = getSavedIds().length;
    const applications = store.get("yp_applications", []);
    const applied = [...CANDIDATE_DEMO.appliedJobs, ...applications.map(a => ({ job: a.jobTitle, date: a.appliedOn?.slice(0, 10), status: a.status }))];

    root.querySelector("[data-completion-fill]").style.width = CANDIDATE_DEMO.completion + "%";
    root.querySelector("[data-completion-num]").textContent = CANDIDATE_DEMO.completion + "%";
    root.querySelector("[data-saved-count]").textContent = savedCount;
    root.querySelector("[data-applied-count]").textContent = applied.length;
    root.querySelector("[data-interview-count]").textContent = applied.filter(a => a.status === "Interview Scheduled").length;

    root.querySelector("[data-applied-list]").innerHTML = applied.map(a => `
      <tr><td>${escapeHtml(a.job)}</td><td>${a.date ? formatDate(a.date) : "—"}</td>
      <td><span class="status-pill status-${(a.status || "Applied").replace(/\s+/g,"")}">${escapeHtml(a.status || "Applied")}</span></td></tr>
    `).join("");
  }

  /* ---------------------------------------------------------------------
     16. EMPLOYER DASHBOARD
  --------------------------------------------------------------------- */
  function renderEmployerDashboard() {
    const root = document.getElementById("employer-dashboard");
    if (!root) return;
    const posted = store.get("yp_posted_jobs", []);
    const candidates = store.get("yp_employer_candidates", null) || EMPLOYER_DEMO_CANDIDATES;
    store.set("yp_employer_candidates", candidates);

    root.querySelector("[data-active-jobs]").textContent = posted.length + SEED_JOBS.length;
    root.querySelector("[data-total-apps]").textContent = candidates.length + store.get("yp_applications", []).length;
    root.querySelector("[data-shortlisted]").textContent = candidates.filter(c => c.status === "Shortlisted").length;
    root.querySelector("[data-interviews]").textContent = candidates.filter(c => c.status === "Interview Scheduled").length;

    const tbody = root.querySelector("[data-candidate-table]");
    tbody.innerHTML = candidates.map((c, i) => `
      <tr>
        <td>${escapeHtml(c.name)}</td>
        <td>${escapeHtml(c.job)}</td>
        <td>${formatDate(c.date)}</td>
        <td><span class="status-pill status-${c.status.replace(/\s+/g,"")}">${escapeHtml(c.status)}</span></td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" data-cand-action="shortlist" data-idx="${i}" title="Shortlist">✓</button>
            <button class="icon-btn" data-cand-action="interview" data-idx="${i}" title="Schedule Interview">📅</button>
            <button class="icon-btn danger" data-cand-action="reject" data-idx="${i}" title="Reject">✕</button>
          </div>
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll("[data-cand-action]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-idx"));
        const action = btn.getAttribute("data-cand-action");
        const list = store.get("yp_employer_candidates", EMPLOYER_DEMO_CANDIDATES);
        if (action === "shortlist") list[idx].status = "Shortlisted";
        if (action === "interview") list[idx].status = "Interview Scheduled";
        if (action === "reject") list[idx].status = "Rejected";
        store.set("yp_employer_candidates", list);
        renderEmployerDashboard();
        toast("Candidate status updated", "success");
      });
    });
  }

  /* ---------------------------------------------------------------------
     17. REVIEWS
  --------------------------------------------------------------------- */
  function renderReviews(sort) {
    const grid = document.getElementById("reviews-grid");
    if (!grid) return;
    let reviews = [...SEED_REVIEWS];
    if (sort === "highest") reviews.sort((a, b) => b.rating - a.rating);
    else if (sort === "lowest") reviews.sort((a, b) => a.rating - b.rating);
    else if (sort === "newest") reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    grid.innerHTML = reviews.map(r => `
      <div class="review-card reveal">
        <div class="review-top">
          <div class="review-avatar">${escapeHtml(r.name.charAt(0))}</div>
          <div>
            <div class="review-name">${escapeHtml(r.name)}</div>
            <div class="review-date">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)} · ${formatDate(r.date)}</div>
          </div>
        </div>
        <p>${escapeHtml(r.text)}</p>
        <div class="review-source">Example sourced from the company's public Google Business profile.</div>
      </div>
    `).join("");
    initReveal();
  }
  function initReviews() {
    const grid = document.getElementById("reviews-grid");
    if (!grid) return;
    renderReviews("relevant");
    document.getElementById("review-sort")?.addEventListener("change", (e) => renderReviews(e.target.value));
    document.getElementById("read-all-reviews")?.addEventListener("click", () => toast("Full review list is a demo placeholder for this prototype.", "success"));
  }

  /* ---------------------------------------------------------------------
     18. GALLERY LIGHTBOX
  --------------------------------------------------------------------- */
  function initGallery() {
    const items = document.querySelectorAll("[data-gallery-img]");
    const lightbox = document.getElementById("lightbox");
    if (!items.length || !lightbox) return;
    const imgEl = lightbox.querySelector("img");
    const counterEl = lightbox.querySelector(".lightbox-counter");
    const urls = Array.from(items).map(i => i.getAttribute("data-gallery-img"));
    let idx = 0;
    function show(i) {
      idx = (i + urls.length) % urls.length;
      imgEl.src = urls[idx];
      counterEl.textContent = `${idx + 1} / ${urls.length}`;
    }
    items.forEach((item, i) => item.addEventListener("click", () => { show(i); openModal(lightbox); }));
    lightbox.querySelector(".lb-prev")?.addEventListener("click", () => show(idx - 1));
    lightbox.querySelector(".lb-next")?.addEventListener("click", () => show(idx + 1));
    lightbox.querySelector(".lb-close")?.addEventListener("click", () => closeModal(lightbox));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeModal(lightbox); });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "ArrowLeft") show(idx - 1);
    });
  }

  /* ---------------------------------------------------------------------
     19. CONTACT FORM
  --------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;
      const data = Object.fromEntries(new FormData(form).entries());
      const list = store.get("yp_enquiries", []);
      list.unshift({ id: "enq-" + Date.now(), ...data, submittedOn: new Date().toISOString() });
      store.set("yp_enquiries", list);
      form.reset();
      toast("Enquiry sent successfully", "success");
    });
  }

  /* ---------------------------------------------------------------------
     20. CONSULTATION MODAL
  --------------------------------------------------------------------- */
  function initConsultModal() {
    const overlay = document.getElementById("consult-modal");
    if (!overlay) return;
    document.querySelectorAll("[data-open-consult]").forEach(btn => btn.addEventListener("click", () => openModal(overlay)));
    overlay.querySelectorAll(".choice-card").forEach(card => {
      card.addEventListener("click", () => {
        overlay.querySelectorAll(".choice-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
      });
    });
  }

  /* ---------------------------------------------------------------------
     21. INIT
  --------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNav();
    initRipple();
    initReveal();
    initCounters();
    initFaq();
    initModalCloseHandlers();
    initServiceModal();
    initJobsPage();
    initHomeJobsPreview();
    initApplyForm();
    initPostJobForm();
    renderCandidateDashboard();
    renderEmployerDashboard();
    initReviews();
    initGallery();
    initContactForm();
    initConsultModal();

    document.querySelectorAll("[data-scroll-jobs]").forEach(btn => {
      btn.addEventListener("click", () => {
        const el = document.getElementById("jobs") || document.getElementById("jobs-grid");
        el?.scrollIntoView({ behavior: "smooth" });
      });
    });

    document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());
  });

  window.ypStore = store;
  window.ypGetAllJobs = getAllJobs;
})();
