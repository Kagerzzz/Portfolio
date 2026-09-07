/**
 * Sanvithi Portfolio Admin CMS Logic
 * Integrates with Supabase Auth & Database (CRUD Operations for Projects)
 */

let projectsList = [];
let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
  initAdminAuth();
  initFormListeners();
});

/* 1. Supabase Auth Management */
async function initAdminAuth() {
  const loginView = document.getElementById("login-view");
  const dashboardView = document.getElementById("dashboard-view");
  const logoutBtn = document.getElementById("btn-logout");

  if (!supabaseClient) {
    console.warn("⚠️ Supabase chưa được cấu hình. Đang chạy ở giao diện Demo local.");
    // View demo dashboard if supabaseClient is null
    if (loginView) loginView.classList.add("hidden");
    if (dashboardView) dashboardView.classList.remove("hidden");
    loadDemoProjects();
    return;
  }

  // Check existing session
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    currentUser = session.user;
    showDashboard();
  } else {
    showLogin();
  }

  // Listen to auth state changes
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
      currentUser = session.user;
      showDashboard();
    } else {
      currentUser = null;
      showLogin();
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await supabaseClient.auth.signOut();
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

/* 2. Login Form Handler */
function initFormListeners() {
  const loginForm = document.getElementById("form-login");
  const projectForm = document.getElementById("form-project");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      if (!supabaseClient) {
        showToast("Demo Mode: Đăng nhập thành công!");
        showDashboard();
        return;
      }

      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Đăng nhập thất bại: " + error.message);
      } else {
        showToast("Đăng nhập thành công!");
      }
    });
  }

  if (projectForm) {
    projectForm.addEventListener("submit", handleSaveProject);
  }
}

/* 3. Fetch Projects from Supabase */
async function fetchProjects() {
  if (!supabaseClient) {
    loadDemoProjects();
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;

    projectsList = data || [];
    renderProjectsTable();
  } catch (err) {
    console.error("Lỗi fetch projects:", err);
    showToast("Khôi phục dữ liệu demo local...");
    loadDemoProjects();
  }
}

function loadDemoProjects() {
  projectsList = [
    {
      id: "explora",
      title: "Explora — Empowering scientists to deliver faster personalized cancer care",
      client: "Cellworks Biotech",
      role: "Founding Product Designer",
      year: "13 Months ∙ Shipped",
      tags: ["0 to 1", "Design Systems", "R&D Tool"],
      summary: "I set the product strategy for a biotech platform...",
      image_url: "assets/saas.png",
      stage_bg: "explora",
      metrics: [{ val: "~$1.2M", label: "Recovered" }],
      overview: "Explora is a 0-to-1 unified R&D workspace...",
      challenge: "Scientists spent hours tool-hopping...",
      solution: "Consolidated 9+ legacy tools into a singular IDE...",
      sort_order: 1
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
      stage_bg: "miraai",
      metrics: [{ val: "15/15", label: "Confidence" }],
      overview: "Mira.ai combines physiological sensing...",
      challenge: "Most pregnancy apps count kicks...",
      solution: "Designed a smart watch strap...",
      sort_order: 2
    }
  ];
  renderProjectsTable();
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
      <td>${p.sort_order || 0}</td>
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
      document.getElementById("project-stage-bg").value = p.stage_bg || 'explora';
      
      const tagsStr = Array.isArray(p.tags) ? p.tags.join(", ") : (p.tags || '');
      document.getElementById("project-left-labels").value = tagsStr;
      
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

/* 6. Save (Create / Update) Project */
async function handleSaveProject(e) {
  e.preventDefault();
  
  const idInput = document.getElementById("project-id").value;
  const slugInput = document.getElementById("project-slug").value.trim().toLowerCase();
  
  const tagsStr = document.getElementById("project-left-labels").value;
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
    stage_bg: document.getElementById("project-stage-bg").value,
    tags: tagsArray,
    metrics: metricsJson,
    overview: document.getElementById("project-overview").value,
    challenge: document.getElementById("project-challenge").value,
    solution: document.getElementById("project-solution").value,
    updated_at: new Date().toISOString()
  };

  if (!supabaseClient) {
    // Local Demo update
    const existingIdx = projectsList.findIndex(p => p.id === (idInput || slugInput));
    if (existingIdx >= 0) {
      projectsList[existingIdx] = { ...projectsList[existingIdx], ...projectPayload };
    } else {
      projectsList.push(projectPayload);
    }
    renderProjectsTable();
    closeProjectModal();
    showToast("Đã lưu dự án (Chế độ Demo)!");
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from('projects')
      .upsert(projectPayload);

    if (error) throw error;

    showToast("Đã lưu dự án thành công vào Supabase!");
    closeProjectModal();
    fetchProjects();
  } catch (err) {
    console.error("Lỗi khi lưu dự án:", err);
    alert("Lỗi khi lưu dự án: " + err.message);
  }
}

/* 7. Delete Project */
async function deleteProject(id) {
  if (!confirm(`Bạn có chắc chắn muốn xóa dự án "${id}" không?`)) return;

  if (!supabaseClient) {
    projectsList = projectsList.filter(p => p.id !== id);
    renderProjectsTable();
    showToast("Đã xóa dự án (Chế độ Demo)!");
    return;
  }

  try {
    const { error } = await supabaseClient
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    showToast("Đã xóa dự án thành công!");
    fetchProjects();
  } catch (err) {
    console.error("Lỗi xóa dự án:", err);
    alert("Không thể xóa: " + err.message);
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
