/**
 * Sanvithi.com Portfolio - Creative Neubrutalism Engine
 * Confetti Particles, Live Clocks, Dynamic Cursor, 3D Parallax Tilt & Supabase DB
 */

// Hero Questions & Interactive Answers
const HERO_TAB_DATA = {
  who: "Designer who creates meaningful experiences through visual and motion design.",
  care: "Pointing my time and skills toward a healthier, greener future for humanity.",
  believe: "Humans are capable of creating out-of-the-world sublime things when they come together.",
  cook: "Rich South Indian curries, comforting pasta & fresh matcha lattes.",
  upto: "Supporting founders in building design-first AI products & exploring gouache painting."
};

// All 5 Real Sanvithi.com Projects
const PROJECTS_DATA = [
  {
    id: "explora",
    title: "Explora — Empowering scientists to deliver faster personalized cancer care",
    client: "Cellworks Biotech",
    role: "Founding Product Designer",
    year: "13 Months ∙ Shipped",
    tags: ["0 to 1", "Design Systems", "R&D Tool", "Shipped"],
    summary: "I set the product strategy for a biotech platform that saves 1 hour of research time everyday for scientists.",
    image: "assets/saas.png",
    metrics: [
      { val: "~$1.2M", label: "Recovered in Productivity" },
      { val: "100%", label: "Organization Adoption" },
      { val: "9 → 1", label: "Systems Consolidated" }
    ],
    overview: "Explora is a 0-to-1 unified R&D workspace built for Cellworks, a biotech company focused on curing cancer. Before Explora, scientists juggled 9+ legacy tools and spreadsheets.",
    challenge: "Scientists & engineers spent hours tool-hopping, waiting for legacy systems to process simulations, which created a massive productivity lag in cancer research.",
    solution: "I led the 0 to 1 design to consolidate 9+ legacy tools into a singular IDE with split-workspace grids, parallel simulation plotting, and automated progress tracking."
  },
  {
    id: "miraai",
    title: "Mira.ai — Innovating the future of AI in pregnancy nutrition",
    client: "Passion Project / Research",
    role: "Product Designer",
    year: "16 Weeks ∙ Product Concept",
    tags: ["Wearable", "Visual Design", "Systems Design", "Product Concept", "Pregnancy Nutrition"],
    summary: "I designed an AI-first nutrition assistant that turns complex health data into clear everyday decisions for pregnant women.",
    image: "assets/ecommerce.png",
    metrics: [
      { val: "15/15", label: "Testers Greater Confidence" },
      { val: "100%", label: "Preferred AI Context" },
      { val: "~70%", label: "Pregnancies with Nausea" }
    ],
    overview: "Mira.ai combines physiological sensing (HRV metrics) on the Apple Watch with a bio-digital twin in the mobile app to adapt recipes and provide real-time nausea relief.",
    challenge: "Most pregnancy apps count kicks and bump sizes but ignore the body carrying it — missing the daily realities of nausea, discomfort, and shifting nutrient needs.",
    solution: "We designed a smart watch strap with median-nerve stimulation and a transparent AI assistant that explains every food suggestion and asks for human consent before acting."
  },
  {
    id: "manage",
    title: "Manage (Siemens) — Accelerating field operations with intuitive interaction",
    client: "Siemens (Acquired Manage)",
    role: "Product Designer",
    year: "4 Months ∙ Shipped",
    tags: ["Enterprise / SaaS", "Interaction Design", "Lighting & Energy Management System", "Shipped"],
    summary: "I rebuilt a core workflow of a lighting management platform, cutting setup time from 5 days to 2 for field engineers.",
    image: "assets/design-system.png",
    metrics: [
      { val: "5 → 2", label: "Days Setup Time" },
      { val: "100%", label: "Commissioning Accuracy" },
      { val: "+25%", label: "Screen Real Estate" }
    ],
    overview: "Manage is the primary interface for field engineers commissioning 1,000+ smart sensors across massive commercial building construction sites.",
    challenge: "The legacy interface was a 'wall of data' requiring click marathons and manual coordinate entries, taking 5 full days to commission a single building.",
    solution: "I redesigned the core workflow with direct drag-to-group selection, sticky instruction strips, and a collapsible high-density floor plan interface."
  },
  {
    id: "ai-consumer-research",
    title: "AI Consumer Research Platform — Expert Data Collection App",
    client: "Co-led with 2 Founders",
    role: "Product Design",
    year: "Consumer ∙ Shipped",
    tags: ["Co-led with 2 Founders", "Consumer-facing", "AI Platform", "Product Design", "Shipped"],
    summary: "I envisioned the MVP mobile app screens to enable experts to participate in AI-driven research.",
    image: "assets/fintech.png",
    metrics: [
      { val: "2", label: "Founders Co-led" },
      { val: "MVP", label: "Shipped to App Store" },
      { val: "AI", label: "Driven Insights" }
    ],
    overview: "Mobile application enabling domain experts to participate in specialized AI model training and evaluation tasks.",
    challenge: "Creating an engaging consumer UX while collecting high-precision annotations from technical experts.",
    solution: "Streamlined micro-tasking interface with instant visual feedback and gamified progress tracking."
  },
  {
    id: "ai-insurance-claims",
    title: "AI-Native Insurance Claim Management — B2B Prototype",
    client: "Co-led with Founder",
    role: "Lead Designer & Prototyper",
    year: "B2B ∙ Prototype",
    tags: ["Co-led with Founder", "AI-native", "B2B", "Prototype", "Insurance Claim Management"],
    summary: "I prototyped the MVP version of an AI-native insurance claim management platform for the founder to pitch to investors.",
    image: "assets/saas.png",
    metrics: [
      { val: "10x", label: "Faster Claim Processing" },
      { val: "B2B", label: "Enterprise Ready" },
      { val: "Seed", label: "Investor Pitch Ready" }
    ],
    overview: "A automated claims processing engine using multimodal AI models to inspect damage reports, verify policy terms, and draft settlement offers.",
    challenge: "Insurance adjusters needed full auditability for automated AI decisions.",
    solution: "Designed a side-by-side human-in-the-loop dashboard highlighting evidence sources and risk confidence scores."
  }
];

let activeProjects = [...PROJECTS_DATA];

// Initialize Events
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMoodSwitcher();
  initLiveClocks();
  initHeroTabs();
  renderProjects();
  initModalEvents();
  initMouseFollowingBadge();
  init3DParallaxTilt();
  initConfettiEngine();
  
  // Asynchronously fetch dynamic data from Vercel Blob Store
  loadProjectsFromBlob();
});

/* Fetch projects dynamically from Vercel Blob Store */
async function loadProjectsFromBlob() {
  if (typeof fetchProjectsFromVercelBlob !== 'function') return;

  try {
    const data = await fetchProjectsFromVercelBlob();
    if (data && Array.isArray(data) && data.length > 0) {
      activeProjects = data.map(p => ({
        id: p.id,
        title: p.title || '',
        client: p.client || '',
        role: p.role || '',
        year: p.year || '',
        tags: Array.isArray(p.tags) ? p.tags : (p.tags ? p.tags.split(',').map(s=>s.trim()) : []),
        summary: p.summary || p.title,
        image: p.image_url || p.image || 'assets/saas.png',
        metrics: p.metrics || [],
        overview: p.overview || '',
        challenge: p.challenge || '',
        solution: p.solution || ''
      }));
      
      renderProjects();
      init3DParallaxTilt();
      console.log('✅ Đã nạp thành công', activeProjects.length, 'dự án từ Vercel Blob Store!');
    }
  } catch (err) {
    console.warn("⚠️ Vercel Blob loading error (falling back to static local data):", err);
  }
}

/* Theme Toggle (Light / Dark) */
function initThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("sanvithi_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("sanvithi_theme", next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (!icon) return;
  icon.innerHTML = theme === "dark"
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
}

/* Mood Switcher (Color Palette Customizer) */
function initMoodSwitcher() {
  const moodDots = document.querySelectorAll(".mood-dot");
  const savedMood = localStorage.getItem("sanvithi_mood") || "default";
  document.documentElement.setAttribute("data-mood", savedMood);

  moodDots.forEach(dot => {
    if (dot.getAttribute("data-set-mood") === savedMood) dot.classList.add("active");
    else dot.classList.remove("active");

    dot.addEventListener("click", () => {
      moodDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      const selectedMood = dot.getAttribute("data-set-mood");
      document.documentElement.setAttribute("data-mood", selectedMood);
      localStorage.setItem("sanvithi_mood", selectedMood);
      fireConfetti();
    });
  });
}

/* Live Dual Clocks (San Francisco & Bangalore) */
function initLiveClocks() {
  const sfEl = document.getElementById("sf-time");
  const blrEl = document.getElementById("blr-time");
  if (!sfEl || !blrEl) return;

  function tick() {
    const now = new Date();
    const sfTime = now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", hour12: true });
    const blrTime = now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true });

    sfEl.innerText = `SF ${sfTime}`;
    blrEl.innerText = `BLR ${blrTime}`;
  }

  tick();
  setInterval(tick, 1000);
}

/* Hero Tabs */
function initHeroTabs() {
  const tabBtns = document.querySelectorAll(".hero-tab-btn");
  const headline = document.getElementById("hero-dynamic-text");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-tab");
      if (headline && HERO_TAB_DATA[key]) {
        headline.style.opacity = "0";
        setTimeout(() => {
          headline.innerText = HERO_TAB_DATA[key];
          headline.style.opacity = "1";
        }, 150);
      }
    });
  });
}

/* Render Projects Grid with Retro Window OS, HUD Brackets, & Quick-Metrics */
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = activeProjects.map((project, index) => {
    const numStamp = (index + 1).toString().padStart(2, "0");
    const themeClass = `card-theme-${index % 5}`;
    
    // Status text mapping
    let statusBadge = "FEATURED ✦";
    const tagsLower = (project.tags || []).map(t => t.toLowerCase());
    if (tagsLower.some(t => t.includes("shipped"))) statusBadge = "LIVE SHIPPED 🚀";
    else if (tagsLower.some(t => t.includes("concept"))) statusBadge = "AI CONCEPT ✦";
    else if (tagsLower.some(t => t.includes("prototype"))) statusBadge = "B2B PROTOTYPE 💡";

    // Quick Metrics
    const metricsPills = (project.metrics || []).slice(0, 2).map(m => `
      <div class="quick-metric-chip">
        <span class="quick-metric-val">${m.val}</span>
        <span>${m.label}</span>
      </div>
    `).join("");

    return `
    <article class="project-item ${themeClass}" id="${project.id}" onclick="handleCardClick('${project.id}', event)">
      
      <!-- Retro Window Bar -->
      <div class="card-window-bar">
        <div class="window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>
        <div class="window-slug">sanvi.design/case/${project.id}</div>
        <div class="window-status">${statusBadge}</div>
      </div>

      <!-- Card Main Body -->
      <div class="project-card-body">
        <div class="project-number-stamp">#${numStamp}</div>
        
        <!-- Transparent Media Stage with HUD Focus Brackets -->
        <div class="project-media">
          <span class="hud-bracket hud-tl"></span>
          <span class="hud-bracket hud-tr"></span>
          <span class="hud-bracket hud-bl"></span>
          <span class="hud-bracket hud-br"></span>
          <img src="${project.image}" alt="${project.title}" class="project-img">
        </div>

        <!-- Project Meta & Information -->
        <div>
          <div class="project-tags">
            ${(project.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join("")}
          </div>
          <h2 class="project-title-large">${project.summary}</h2>
          
          <!-- Hover-revealed Quick Metrics Strip -->
          <div class="card-metrics-strip">
            ${metricsPills}
          </div>

          <button class="btn-read-case" onclick="event.stopPropagation(); handleCardClick('${project.id}', event)">
            <span>explore case study</span>
            <span class="btn-arrow">↗</span>
          </button>
        </div>
      </div>

    </article>
  `;
  }).join("");
}

function handleCardClick(id, event) {
  fireConfetti(event);
  openCaseStudyModal(id);
}

/* 3D Parallax Mouse Tilt Animation with Neubrutalist Hard Shadow */
function init3DParallaxTilt() {
  const cards = document.querySelectorAll(".project-item");
  cards.forEach(card => {
    const img = card.querySelector(".project-img");
    if (!img) return;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      const shadowX = Math.round(-rotateY * 1.2 + 4);
      const shadowY = Math.round(rotateX * 1.2 + 6);
      
      img.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.05) translateY(-6px)`;
      img.style.boxShadow = `${shadowX}px ${shadowY}px 0px var(--border-color)`;
    });

    card.addEventListener("mouseleave", () => {
      img.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)";
      img.style.boxShadow = "var(--shadow-neo-sm)";
    });
  });
}

/* Mouse-Following Floating Badge ("tap me ✦" -> "EXPLORE CASE ↗") */
function initMouseFollowingBadge() {
  const badge = document.getElementById("floating-badge");
  if (!badge) return;

  document.addEventListener("mousemove", (e) => {
    badge.style.left = `${e.clientX}px`;
    badge.style.top = `${e.clientY}px`;
  });

  document.addEventListener("mouseover", (e) => {
    const projectCard = e.target.closest(".project-item");
    if (projectCard) {
      badge.classList.add("visible", "explore");
      badge.innerHTML = "EXPLORE CASE ↗";
    } else {
      badge.classList.remove("explore");
      badge.innerHTML = "tap me ✦";
      
      const isInteractive = e.target.closest("button, a, .hero-rotating-badge");
      if (isInteractive) {
        badge.classList.add("visible");
      } else {
        badge.classList.remove("visible");
      }
    }
  });

  document.addEventListener("mouseleave", () => {
    badge.classList.remove("visible");
  });
}

/* Modal Case Study with Counter Roll Animation */
function openCaseStudyModal(id) {
  const p = activeProjects.find(item => item.id === id) || PROJECTS_DATA.find(item => item.id === id);
  if (!p) return;

  const modal = document.getElementById("case-study-modal");
  const content = document.getElementById("modal-content-target");

  content.innerHTML = `
    <img src="${p.image}" alt="${p.title}" class="modal-hero-banner">
    <div class="project-tags" style="margin-bottom: 14px;">
      ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join("")}
      <span class="tag-pill" style="background: var(--neo-yellow); font-weight: 800;">VERIFIED CASE STUDY ✦</span>
    </div>
    <h2 class="font-serif" style="font-size: 2.3rem; margin-bottom: 16px; letter-spacing: -0.02em;">${p.title}</h2>
    
    <div class="modal-metrics-grid">
      ${p.metrics.map(m => `
        <div>
          <div class="metric-num">${m.val}</div>
          <div class="metric-label">${m.label}</div>
        </div>
      `).join("")}
    </div>

    <div class="case-study-doc-content">
      ${p.content && p.content.trim() ? p.content : `
        <h3 class="font-serif" style="font-size: 1.4rem; color: var(--text-main); margin: 28px 0 10px;">Overview</h3>
        <p>${p.overview || ''}</p>

        <h3 class="font-serif" style="font-size: 1.4rem; color: var(--text-main); margin: 28px 0 10px;">The Challenge</h3>
        <p>${p.challenge || ''}</p>

        <h3 class="font-serif" style="font-size: 1.4rem; color: var(--text-main); margin: 28px 0 10px;">The Solution & Impact</h3>
        <p>${p.solution || ''}</p>
      `}
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  fireConfetti();
}

function initModalEvents() {
  const modal = document.getElementById("case-study-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById("case-study-modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

/* Copy Email Toast with Confetti Burst */
function copyEmailToast(event) {
  const email = "sanvithi.saya@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast(`email copied: ${email} ✦`);
    fireConfetti(event);
  }).catch(() => {
    showToast(`email: ${email} ✦`);
    fireConfetti(event);
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

/* ==========================================================================
   Lightweight Neubrutalist Confetti Engine (Zero Dependencies)
   ========================================================================== */
let confettiParticles = [];
let confettiCtx = null;
let confettiAnimationId = null;

function initConfettiEngine() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  confettiCtx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();
}

function fireConfetti(event = null) {
  if (!confettiCtx) return;
  const colors = ["#FFDE59", "#FF90E8", "#70E000", "#4CC9F0", "#FF914D", "#FFFFFF", "#000000"];
  const startX = event && event.clientX ? event.clientX : window.innerWidth / 2;
  const startY = event && event.clientY ? event.clientY : window.innerHeight * 0.4;

  const count = 55;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * Math.random());
    const velocity = 5 + Math.random() * 9;
    confettiParticles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 3,
      size: 7 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 15,
      alpha: 1,
      decay: 0.015 + Math.random() * 0.02
    });
  }

  if (!confettiAnimationId) {
    animateConfetti();
  }
}

function animateConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas || !confettiCtx) return;

  confettiCtx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.35; // gravity
    p.vx *= 0.98; // air resistance
    p.rotation += p.vRot;
    p.alpha -= p.decay;

    if (p.alpha <= 0 || p.y > canvas.height) {
      confettiParticles.splice(i, 1);
      continue;
    }

    confettiCtx.save();
    confettiCtx.globalAlpha = p.alpha;
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.strokeStyle = "#000000";
    confettiCtx.lineWidth = 1.5;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
    confettiCtx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
    confettiCtx.restore();
  }

  if (confettiParticles.length > 0) {
    confettiAnimationId = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimationId = null;
    confettiCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
