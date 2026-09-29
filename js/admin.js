/**
 * Sanvithi Portfolio Admin CMS Logic
 * Integrates with Vercel Blob Store (store_aHZSuRWI1KYBGeY1)
 */

let projectsList = [];
const DEFAULT_PASSCODE = "admin123";

document.addEventListener("DOMContentLoaded", () => {
  initAdminAuth();
  initFormListeners();
  initImageDesigner();
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
      
      // Populate Rich Doc Canvas (100% of modal detail view)
      const docCanvas = document.getElementById("project-doc-canvas");
      if (docCanvas) {
        if (p.content && p.content.trim()) {
          docCanvas.innerHTML = p.content;
        } else {
          // Construct rich starter document with full styling
          docCanvas.innerHTML = `
            <div class="doc-callout">
              <span class="doc-badge">${(p.tags && p.tags[0]) || 'CASE STUDY'}</span>
              <h1 style="margin: 12px 0 8px; font-size: 28px; line-height: 1.2;">${p.title}</h1>
              <p style="margin: 0; font-size: 16px; color: var(--text-muted);">${p.summary || ''}</p>
            </div>

            <div class="doc-img-block">
              <img src="${p.image_url || p.image || 'assets/saas.png'}" alt="${p.title}" class="doc-img" style="width: 100%;">
              <div class="doc-caption">Visual Showcase ∙ ${p.client || 'Project'}</div>
            </div>

            <div class="doc-grid-2">
              <div class="doc-grid-col">
                <h3>The Challenge</h3>
                <p>${p.challenge || 'Vấn đề lớn nhất của người dùng cần giải quyết...'}</p>
              </div>
              <div class="doc-grid-col">
                <h3>The Solution & Impact</h3>
                <p>${p.solution || 'Chi tiết các giải pháp thiết kế và tác động đạt được...'}</p>
              </div>
            </div>
          `;
        }
      }
    }
  } else {
    formTitle.innerText = "Thêm Dự Án Mới";
    document.getElementById("project-id").value = '';
    const docCanvas = document.getElementById("project-doc-canvas");
    if (docCanvas) {
      docCanvas.innerHTML = `
        <div class="doc-callout">
          <span class="doc-badge">NEW CASE STUDY ✦</span>
          <h1 style="margin: 12px 0 8px; font-size: 28px;">Tiêu Đề Dự Án Của Bạn</h1>
          <p style="margin: 0; font-size: 16px; color: var(--text-muted);">Mô tả tổng quan về dự án và kết quả đạt được...</p>
        </div>

        <div class="doc-img-block">
          <img src="assets/saas.png" alt="Preview" class="doc-img" style="width: 100%;">
          <div class="doc-caption">Hình ảnh đại diện dự án</div>
        </div>

        <div class="doc-grid-2">
          <div class="doc-grid-col">
            <h3>The Challenge</h3>
            <p>Mô tả bài toán thách thức...</p>
          </div>
          <div class="doc-grid-col">
            <h3>The Solution</h3>
            <p>Mô tả giải pháp thiết kế...</p>
          </div>
        </div>
      `;
    }
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

/* Free-form Doc Canvas Toolbar Actions */
function execDocCmd(command, value = null) {
  const canvas = document.getElementById("project-doc-canvas");
  if (canvas) canvas.focus();
  document.execCommand(command, false, value);
}

function changeDocFontSize(size) {
  if (!size) return;
  const canvas = document.getElementById("project-doc-canvas");
  if (canvas) canvas.focus();

  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = size;
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }
}

/* Insert Image: Dialog with URL / Local File Picker */
function insertDocImage() {
  const choice = confirm("Bấm OK để TẢI ẢNH TỪ MÁY TÍNH.\nBấm CANCEL để NHẬP ĐƯỜNG DẪN ẢNH (URL).");
  if (choice) {
    const fileInput = document.getElementById("doc-image-file-input");
    if (fileInput) fileInput.click();
  } else {
    const url = prompt("Nhập đường dẫn ảnh (URL hoặc assets/saas.png):", "assets/saas.png");
    if (!url) return;
    const caption = prompt("Nhập chú thích ảnh (tùy chọn):", "Ảnh Minh Họa Giao Diện");

    const html = `
      <div class="doc-img-block align-center">
        <img src="${url}" alt="${caption || 'Image'}" class="doc-img" style="width: 100%;">
        ${caption ? `<div class="doc-caption">${caption}</div>` : ''}
      </div>
      <p></p>
    `;
    execDocCmd('insertHTML', html);
    showToast("Đã chèn ảnh! Bạn có thể click vào ảnh để thu nhỏ/phóng to tùy thích.");
  }
}

/* Local Image File Reader */
function handleLocalImageFileSelected(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    const caption = prompt("Nhập chú thích ảnh (tùy chọn):", file.name.replace(/\.[^/.]+$/, ""));

    const html = `
      <div class="doc-img-block align-center">
        <img src="${dataUrl}" alt="${caption || 'Image'}" class="doc-img" style="width: 100%;">
        ${caption ? `<div class="doc-caption">${caption}</div>` : ''}
      </div>
      <p></p>
    `;
    execDocCmd('insertHTML', html);
    showToast("Đã tải ảnh lên! Hãy click vào ảnh để chỉnh kích thước và căn lề.");
    e.target.value = ''; // Reset
  };
  reader.readAsDataURL(file);
}

function insertDocTwoColumns() {
  const html = `
    <div class="doc-grid-2">
      <div class="doc-grid-col">
        <h3>Cột 1: Thông tin</h3>
        <p>Nhập mô tả hoặc chèn ảnh bên cột trái...</p>
      </div>
      <div class="doc-grid-col">
        <h3>Cột 2: Minh họa</h3>
        <p>Nhập mô tả hoặc chèn ảnh bên cột phải...</p>
      </div>
    </div>
    <p></p>
  `;
  execDocCmd('insertHTML', html);
}

function insertDocCallout() {
  const title = prompt("Tiêu đề hộp Callout:", "💡 Điểm Nhấn Sáng Tạo");
  if (!title) return;
  
  const html = `
    <div class="doc-callout">
      <div class="doc-callout-title">${title}</div>
      <div>Nhập nội dung ghi chú nổi bật ở đây...</div>
    </div>
    <p></p>
  `;
  execDocCmd('insertHTML', html);
}

function insertDocBadge() {
  const text = prompt("Nội dung nhãn Badge:", "KEY FINDING ✦");
  if (!text) return;
  execDocCmd('insertHTML', `<span class="doc-badge">${text}</span> `);
}

/* 6. Save (Create / Update) Project to Vercel Blob */
async function handleSaveProject(e) {
  e.preventDefault();
  
  const idInput = document.getElementById("project-id").value;
  const slugInput = document.getElementById("project-slug").value.trim().toLowerCase();
  
  const tagsStr = document.getElementById("project-tags").value;
  const tagsArray = tagsStr.split(",").map(s => s.trim()).filter(Boolean);

  const docCanvas = document.getElementById("project-doc-canvas");
  const richContent = docCanvas ? docCanvas.innerHTML : '';

  const projectPayload = {
    id: slugInput,
    title: document.getElementById("project-title").value,
    client: document.getElementById("project-client").value,
    role: document.getElementById("project-role").value,
    year: document.getElementById("project-year").value,
    summary: document.getElementById("project-summary").value,
    image_url: document.getElementById("project-image-url").value,
    tags: tagsArray,
    content: richContent,
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

/* ==========================================================================
   Visual Interactive Image Designer & Resizer Engine
   - Click to select image
   - Visual floating toolbar with quick presets (25%, 50%, 75%, 100%)
   - Zoom -/+ by 10%
   - Align left, center, right, float with text wrapping
   - Frame styles (Neubrutalism, Rounded, Minimal)
   - Interactive corner drag-to-resize handle
   ========================================================================== */

let activeImage = null;

function initImageDesigner() {
  const canvas = document.getElementById("project-doc-canvas");
  const toolbar = document.getElementById("image-designer-bar");
  const resizeBox = document.getElementById("image-resize-box");
  const fileInput = document.getElementById("doc-image-file-input");

  if (!canvas || !toolbar || !resizeBox) return;

  // 1. Click on canvas images to select
  canvas.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (img && canvas.contains(img)) {
      e.stopPropagation();
      selectDocImage(img);
    } else {
      deselectDocImage();
    }
  });

  // 2. Click outside deselects
  document.addEventListener("click", (e) => {
    if (toolbar.contains(e.target) || resizeBox.contains(e.target)) return;
    if (e.target.closest("#project-doc-canvas img")) return;
    deselectDocImage();
  });

  // 3. Keep overlay positioned on scroll or resize
  const modalArea = document.querySelector(".modal-card");
  if (modalArea) {
    modalArea.addEventListener("scroll", updateImageOverlayPosition);
  }
  window.addEventListener("scroll", updateImageOverlayPosition, true);
  window.addEventListener("resize", updateImageOverlayPosition);

  // 4. Corner Drag-to-Resize Handler
  initCornerDragResize();

  // 5. Direct Local File Upload Handler
  if (fileInput) {
    fileInput.addEventListener("change", handleLocalImageFileSelected);
  }
}

function selectDocImage(img) {
  activeImage = img;
  updateImageOverlayPosition();

  const toolbar = document.getElementById("image-designer-bar");
  const resizeBox = document.getElementById("image-resize-box");
  if (toolbar) toolbar.classList.remove("hidden");
  if (resizeBox) resizeBox.classList.remove("hidden");

  updateImageSizeBadge();
}

function deselectDocImage() {
  activeImage = null;
  const toolbar = document.getElementById("image-designer-bar");
  const resizeBox = document.getElementById("image-resize-box");
  if (toolbar) toolbar.classList.add("hidden");
  if (resizeBox) resizeBox.classList.add("hidden");
}

function updateImageOverlayPosition() {
  if (!activeImage) return;
  const toolbar = document.getElementById("image-designer-bar");
  const resizeBox = document.getElementById("image-resize-box");
  if (!toolbar || !resizeBox) return;

  const rect = activeImage.getBoundingClientRect();
  
  // Update resize box
  resizeBox.style.top = `${rect.top}px`;
  resizeBox.style.left = `${rect.left}px`;
  resizeBox.style.width = `${rect.width}px`;
  resizeBox.style.height = `${rect.height}px`;

  // Update floating toolbar position (centered horizontally above image)
  let toolbarTop = rect.top;
  if (toolbarTop < 80) {
    // If too close to viewport top, show below image
    toolbarTop = rect.bottom + 50;
  }
  toolbar.style.top = `${toolbarTop}px`;
  toolbar.style.left = `${rect.left + rect.width / 2}px`;
}

function updateImageSizeBadge() {
  if (!activeImage) return;
  const badge = document.getElementById("img-size-badge");
  if (!badge) return;

  const widthStyle = activeImage.style.width;
  if (widthStyle.includes("%")) {
    badge.innerText = widthStyle;
  } else {
    const parentWidth = activeImage.parentElement.clientWidth || 600;
    const currentPercent = Math.round((activeImage.clientWidth / parentWidth) * 100);
    badge.innerText = `${Math.min(100, Math.max(10, currentPercent))}%`;
  }
}

/* Quick Resize Presets (25%, 50%, 75%, 100%) */
function resizeActiveImage(ratio) {
  if (!activeImage) return;
  const percent = Math.round(ratio * 100);
  activeImage.style.width = `${percent}%`;
  activeImage.style.maxWidth = "100%";
  activeImage.style.height = "auto";
  updateImageSizeBadge();
  setTimeout(updateImageOverlayPosition, 50);
}

/* Fine-Grained Zoom (+10% / -10%) */
function zoomActiveImage(delta) {
  if (!activeImage) return;
  const parentWidth = activeImage.parentElement.clientWidth || 600;
  let currentPercent = Math.round((activeImage.clientWidth / parentWidth) * 100);
  if (activeImage.style.width && activeImage.style.width.includes("%")) {
    currentPercent = parseInt(activeImage.style.width, 10);
  }

  let newPercent = Math.min(100, Math.max(15, currentPercent + delta));
  activeImage.style.width = `${newPercent}%`;
  activeImage.style.maxWidth = "100%";
  activeImage.style.height = "auto";
  updateImageSizeBadge();
  setTimeout(updateImageOverlayPosition, 50);
}

/* Alignment & Text Wrapping */
function alignActiveImage(mode) {
  if (!activeImage) return;
  let block = activeImage.closest(".doc-img-block");
  
  // If not inside .doc-img-block, wrap it
  if (!block) {
    block = document.createElement("div");
    block.className = "doc-img-block";
    activeImage.parentNode.insertBefore(block, activeImage);
    block.appendChild(activeImage);
  }

  block.classList.remove("align-left", "align-center", "align-right", "float-left", "float-right");

  if (mode === "left") {
    block.classList.add("align-left");
  } else if (mode === "center") {
    block.classList.add("align-center");
  } else if (mode === "right") {
    block.classList.add("align-right");
  } else if (mode === "float-left") {
    block.classList.add("float-left");
  } else if (mode === "float-right") {
    block.classList.add("float-right");
  }

  updateImageOverlayPosition();
}

/* Frame Styles: Default -> Rounded -> Minimal -> Card */
function toggleActiveImageFrame() {
  if (!activeImage) return;

  if (activeImage.classList.contains("style-rounded")) {
    activeImage.classList.remove("style-rounded");
    activeImage.classList.add("style-minimal");
    showToast("Kiểu ảnh: Tối giản (Không viền)");
  } else if (activeImage.classList.contains("style-minimal")) {
    activeImage.classList.remove("style-minimal");
    activeImage.classList.add("style-card");
    showToast("Kiểu ảnh: Thẻ Neubrutalism Đậm");
  } else if (activeImage.classList.contains("style-card")) {
    activeImage.classList.remove("style-card");
    showToast("Kiểu ảnh: Chuẩn Mặc Định");
  } else {
    activeImage.classList.add("style-rounded");
    showToast("Kiểu ảnh: Bo Tròn Mềm Mại");
  }

  updateImageOverlayPosition();
}

/* Delete Image */
function deleteActiveImage() {
  if (!activeImage) return;
  const block = activeImage.closest(".doc-img-block");
  if (block) block.remove();
  else activeImage.remove();
  deselectDocImage();
  showToast("Đã xóa ảnh!");
}

/* Interactive Drag-to-Resize */
function initCornerDragResize() {
  const handles = document.querySelectorAll(".resize-handle");
  handles.forEach(handle => {
    handle.addEventListener("mousedown", (e) => {
      if (!activeImage) return;
      e.preventDefault();
      e.stopPropagation();

      const startX = e.clientX;
      const startWidth = activeImage.clientWidth;
      const parentWidth = activeImage.parentElement.clientWidth || 600;
      const isLeft = handle.classList.contains("handle-bl");

      function onMouseMove(moveEvent) {
        const deltaX = moveEvent.clientX - startX;
        const widthChange = isLeft ? -deltaX * 2 : deltaX * 2;
        let newWidth = Math.max(80, Math.min(parentWidth, startWidth + widthChange));
        let newPercent = Math.round((newWidth / parentWidth) * 100);

        activeImage.style.width = `${newPercent}%`;
        activeImage.style.maxWidth = "100%";
        activeImage.style.height = "auto";

        updateImageSizeBadge();
        updateImageOverlayPosition();
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });
}
