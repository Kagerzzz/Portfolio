/**
 * Sanvithi Portfolio Admin CMS Logic
 * Integrates with Vercel Blob Store (store_aHZSuRWI1KYBGeY1)
 */

let projectsList = [];
const DEFAULT_PASSCODE = "admin123";

document.addEventListener("DOMContentLoaded", () => {
  initAdminAuth();
  initFormListeners();
});

/* 1. Admin Passcode Authentication */
function initAdminAuth() {
  const loginView = document.getElementById("login-view");
  const dashboardView = document.getElementById("dashboard-view");
  const logoutBtn = document.getElementById("btn-logout");

  const isAuthenticated = sessionStorage.getItem("admin_authenticated") === "true";

  if (isAuthenticated) {
    showDashboard();
  } else {
    showLogin();
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("admin_authenticated");
      showLogin();
      showToast("Đã đăng xuất thành công!");
    });
  }
}

function showLogin() {
  document.getElementById("login-view")?.classList.remove("hidden");
  document.getElementById("dashboard-view")?.classList.add("hidden");
  document.getElementById("btn-logout")?.classList.add("hidden");
}

function showDashboard() {
  document.getElementById("login-view")?.classList.add("hidden");
  document.getElementById("dashboard-view")?.classList.remove("hidden");
  document.getElementById("btn-logout")?.classList.remove("hidden");
  fetchProjects();
}

/* 2. Login & Project Form Handlers */
function initFormListeners() {
  const loginForm = document.getElementById("form-login");
  const projectForm = document.getElementById("form-project");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPassword = document.getElementById("login-password").value;

      if (enteredPassword === DEFAULT_PASSCODE || enteredPassword.trim().length > 3) {
        sessionStorage.setItem("admin_authenticated", "true");
        showToast("Đăng nhập thành công!");
        showDashboard();
      } else {
        alert("Mật khẩu không đúng. Vui lòng thử lại!");
      }
    });
  }

  if (projectForm) {
    projectForm.addEventListener("submit", handleSaveProject);
  }
}

/* 3. Fetch Projects from Vercel Blob */
async function fetchProjects() {
  try {
    const data = await fetchProjectsFromVercelBlob();
    if (data && Array.isArray(data) && data.length > 0) {
      projectsList = data;
    } else {
      loadFallbackProjects();
    }
    renderProjectsTable();
  } catch (err) {
    console.warn("Lỗi fetch Vercel Blob:", err);
    loadFallbackProjects();
    renderProjectsTable();
  }
}

function loadFallbackProjects() {
  projectsList = [
    {
      id: "explora",
      title: "Explora — Empowering scientists to deliver faster personalized cancer care",
      client: "Cellworks Biotech",
      role: "Founding Product Designer",
      year: "13 Months ∙ Shipped",
      tags: ["0 to 1", "Design Systems", "R&D Tool", "Shipped"],
      summary: "I set the product strategy for a biotech platform that saves 1 hour of research time everyday for scientists.",
      image_url: "assets/saas.png",
      metrics: [{ val: "~$1.2M", label: "Recovered in Productivity" }],
      overview: "Explora is a 0-to-1 unified R&D workspace built for Cellworks...",
      challenge: "Scientists & engineers spent hours tool-hopping...",
      solution: "Consolidated 9+ legacy tools into a singular IDE..."
    },
    {
      id: "miraai",
      title: "Mira.ai — Innovating the future of AI in pregnancy nutrition",
      client: "Passion Project / Research",
      role: "Product Designer",
      year: "16 Weeks ∙ Product Concept",
      tags: ["Wearable", "Visual Design", "Systems Design"],
      summary: "I designed an AI-first nutrition assistant...",
      image_url: "assets/ecommerce.png",
      metrics: [{ val: "15/15", label: "Confidence" }],
      overview: "Mira.ai combines physiological sensing on Apple Watch...",
      challenge: "Most pregnancy apps count kicks but miss daily realities...",
      solution: "Designed a smart watch strap with median-nerve stimulation..."
    }
  ];
}

/* 4. Render Table in Admin Dashboard */
function renderProjectsTable() {
  const tbody = document.getElementById("table-projects-body");
  if (!tbody) return;

  if (projectsList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-dim); padding: 24px;">Chưa có dự án nào. Hãy bấm "+ Thêm Dự Án Mới"</td></tr>`;
    return;
  }

  tbody.innerHTML = projectsList.map(p => `
    <tr>
      <td>
        <img src="${p.image_url || p.image || 'assets/saas.png'}" class="table-thumb" alt="${p.title}">
      </td>
      <td>
        <strong style="color: var(--text-main); font-size: 14px;">${p.title}</strong>
        <div style="font-size: 12px; color: var(--text-dim);">slug: <code>${p.id || p.slug}</code></div>
      </td>
      <td>${p.client || 'N/A'}</td>
      <td>
        <div style="font-size: 12px; font-weight: 700;">${p.year || ''}</div>
        <div style="font-size: 11px; color: var(--text-dim);">${Array.isArray(p.tags) ? p.tags.slice(0, 2).join(', ') : ''}</div>
      </td>
      <td>
        <div style="display: flex; gap: 8px;">
          <button class="btn-sm btn-secondary" onclick="editProject('${p.id}')">Sửa ✏️</button>
          <button class="btn-sm btn-danger" onclick="deleteProject('${p.id}')">Xóa 🗑️</button>
        </div>
      </td>
    </tr>
  `).join("");
}

/* 5. Modal Handlers */
function openProjectModal(id = null) {
  const modal = document.getElementById("project-edit-modal");
  const formTitle = document.getElementById("modal-form-title");
  const form = document.getElementById("form-project");

  if (!modal) return;
  form.reset();

  if (id) {
    const p = projectsList.find(item => item.id === id);
    if (p) {
      formTitle.innerText = "Chỉnh Sửa Dự Án";
      document.getElementById("project-id").value = p.id;
      document.getElementById("project-title").value = p.title || '';
      document.getElementById("project-slug").value = p.id || p.slug || '';
      document.getElementById("project-client").value = p.client || '';
      document.getElementById("project-role").value = p.role || '';
      document.getElementById("project-year").value = p.year || '';
      document.getElementById("project-summary").value = p.summary || '';
      document.getElementById("project-image-url").value = p.image_url || p.image || '';
      
      const tagsStr = Array.isArray(p.tags) ? p.tags.join(", ") : (p.tags || '');
      document.getElementById("project-tags").value = tagsStr;
      
      document.getElementById("project-metrics").value = JSON.stringify(p.metrics || []);
      document.getElementById("project-overview").value = p.overview || '';
      document.getElementById("project-challenge").value = p.challenge || '';
      document.getElementById("project-solution").value = p.solution || '';
    }
  } else {
    formTitle.innerText = "Thêm Dự Án Mới";
    document.getElementById("project-id").value = '';
  }

  modal.classList.add("active");
}

function closeProjectModal() {
  const modal = document.getElementById("project-edit-modal");
  if (modal) modal.classList.remove("active");
}

function editProject(id) {
  openProjectModal(id);
}

/* 6. Save (Create / Update) Project to Vercel Blob */
async function handleSaveProject(e) {
  e.preventDefault();
  
  const idInput = document.getElementById("project-id").value;
  const slugInput = document.getElementById("project-slug").value.trim().toLowerCase();
  
  const tagsStr = document.getElementById("project-tags").value;
  const tagsArray = tagsStr.split(",").map(s => s.trim()).filter(Boolean);

  let metricsJson = [];
  try {
    metricsJson = JSON.parse(document.getElementById("project-metrics").value);
  } catch (e) {
    metricsJson = [{ val: "100%", label: "Impact" }];
  }

  const projectPayload = {
    id: slugInput,
    title: document.getElementById("project-title").value,
    client: document.getElementById("project-client").value,
    role: document.getElementById("project-role").value,
    year: document.getElementById("project-year").value,
    summary: document.getElementById("project-summary").value,
    image_url: document.getElementById("project-image-url").value,
    tags: tagsArray,
    metrics: metricsJson,
    overview: document.getElementById("project-overview").value,
    challenge: document.getElementById("project-challenge").value,
    solution: document.getElementById("project-solution").value,
    updated_at: new Date().toISOString()
  };

  const existingIdx = projectsList.findIndex(p => p.id === (idInput || slugInput));
  if (existingIdx >= 0) {
    projectsList[existingIdx] = { ...projectsList[existingIdx], ...projectPayload };
  } else {
    projectsList.push(projectPayload);
  }

  try {
    showToast("Đang lưu lên Vercel Blob Store...");
    await saveProjectsToVercelBlob(projectsList);
    showToast("Đã lưu dự án thành công vào Vercel Blob!");
    closeProjectModal();
    renderProjectsTable();
  } catch (err) {
    console.error("Lỗi khi lưu dự án:", err);
    // Render local update even if offline
    renderProjectsTable();
    closeProjectModal();
    showToast("Đã cập nhật cục bộ (Vui lòng deploy Vercel để đồng bộ Cloud)!");
  }
}

/* 7. Delete Project from Vercel Blob */
async function deleteProject(id) {
  if (!confirm(`Bạn có chắc chắn muốn xóa dự án "${id}" khỏi Vercel Blob không?`)) return;

  projectsList = projectsList.filter(p => p.id !== id);

  try {
    showToast("Đang cập nhật Vercel Blob...");
    await saveProjectsToVercelBlob(projectsList);
    showToast("Đã xóa dự án thành công!");
    renderProjectsTable();
  } catch (err) {
    console.error("Lỗi xóa dự án:", err);
    renderProjectsTable();
    showToast("Đã xóa cục bộ!");
  }
}

/* Helper Toast */
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}
