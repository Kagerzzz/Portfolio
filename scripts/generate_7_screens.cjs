const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT_DIR = path.resolve(__dirname, '..', 'assets', 'tasksync');
const TEMP_DIR = path.resolve(__dirname, 'temp_html');

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function getBaseStyles(theme = 'light') {
  const isDark = theme === 'dark';
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    body {
      width: 375px;
      height: 812px;
      background: ${isDark ? '#0B0F19' : '#F8FAFC'};
      color: ${isDark ? '#F1F5F9' : '#0F172A'};
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .status-bar {
      height: 44px;
      padding: 12px 24px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      color: ${isDark ? '#FFFFFF' : '#0F172A'};
      z-index: 50;
      flex-shrink: 0;
    }
    .status-icons {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .home-indicator {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 134px;
      height: 5px;
      background: ${isDark ? '#475569' : '#0F172A'};
      border-radius: 3px;
      z-index: 50;
    }
    .app-header {
      height: 52px;
      padding: 0 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    .header-title {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }
    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: ${isDark ? '#1E293B' : '#F1F5F9'};
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      color: ${isDark ? '#E2E8F0' : '#334155'};
    }
    .screen-content {
      flex: 1;
      padding: 8px 18px 20px;
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }
    .badge-primary { background: #EEF2FF; color: #4361EE; }
    .badge-success { background: #ECFDF5; color: #059669; }
    .badge-warning { background: #FFFBEB; color: #D97706; }
    .badge-danger { background: #FEF2F2; color: #DC2626; }
    .badge-purple { background: #F3E8FF; color: #7E22CE; }
    .card {
      background: #FFFFFF;
      border-radius: 16px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 16px -2px rgba(67, 97, 238, 0.05);
      padding: 16px;
    }
  `;
}

// 1. Calendar Screen HTML
function getCalendarHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getBaseStyles('light')}
.month-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
}
.month-name {
  font-size: 17px;
  font-weight: 700;
  color: #0F172A;
  display: flex;
  align-items: center;
  gap: 6px;
}
.today-tag {
  background: #EEF2FF;
  color: #4361EE;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
}
.week-strip {
  display: flex;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 10px 8px;
  border: 1px solid #E2E8F0;
}
.day-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 40px;
  padding: 6px 0;
  border-radius: 12px;
}
.day-col.active {
  background: #4361EE;
  color: #FFFFFF !important;
  box-shadow: 0 6px 14px rgba(67, 97, 238, 0.35);
}
.day-name { font-size: 11px; font-weight: 600; color: #64748B; }
.day-col.active .day-name { color: #DBEAFE; }
.day-num { font-size: 16px; font-weight: 700; color: #0F172A; }
.day-col.active .day-num { color: #FFFFFF; }
.day-dot { width: 4px; height: 4px; border-radius: 50%; background: #4361EE; }
.day-col.active .day-dot { background: #FFFFFF; }

.filter-pills {
  display: flex;
  gap: 8px;
  overflow-x: hidden;
}
.pill {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  color: #64748B;
  display: flex;
  align-items: center;
  gap: 4px;
}
.pill.active {
  background: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}
.timeline-card {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 12px 14px;
  border: 1px solid #E2E8F0;
  border-left: 4px solid #4361EE;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.timeline-card.green { border-left-color: #10B981; }
.timeline-card.purple { border-left-color: #8B5CF6; }
.timeline-card.amber { border-left-color: #F59E0B; }

.t-time-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.t-time { font-size: 12px; font-weight: 600; color: #64748B; }
.t-title { font-size: 14px; font-weight: 700; color: #0F172A; }
.t-meta { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
.t-avatars { display: flex; }
.t-avatar { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #FFFFFF; margin-left: -6px; background: #CBD5E1; }
.t-avatar:first-child { margin-left: 0; }
.t-tag { font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 5px; }

.bottom-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 68px;
  background: #FFFFFF;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 16px;
  z-index: 40;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: #94A3B8;
  font-size: 10px;
  font-weight: 600;
}
.nav-item.active { color: #4361EE; }
.fab-btn {
  position: absolute;
  right: 20px;
  bottom: 84px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: linear-gradient(135deg, #4361EE, #3A0CA3);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#0F172A"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#0F172A"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#0F172A"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#0F172A"/><path d="M20 3.5V7.5" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="app-header">
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </div>
    <div class="header-title">Smart Calendar</div>
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
    </div>
  </div>

  <div class="screen-content">
    <div class="month-row">
      <div class="month-name">
        October 2026
        <span class="today-tag">Today</span>
      </div>
      <div style="display:flex; gap:6px;">
        <div class="icon-btn" style="width:28px; height:28px;">‹</div>
        <div class="icon-btn" style="width:28px; height:28px;">›</div>
      </div>
    </div>

    <!-- Week Strip -->
    <div class="week-strip">
      <div class="day-col"><span class="day-name">Sun</span><span class="day-num">11</span></div>
      <div class="day-col"><span class="day-name">Mon</span><span class="day-num">12</span><div class="day-dot"></div></div>
      <div class="day-col"><span class="day-name">Tue</span><span class="day-num">13</span></div>
      <div class="day-col"><span class="day-name">Wed</span><span class="day-num">14</span><div class="day-dot"></div></div>
      <div class="day-col active"><span class="day-name">Thu</span><span class="day-num">15</span><div class="day-dot"></div></div>
      <div class="day-col"><span class="day-name">Fri</span><span class="day-num">16</span><div class="day-dot"></div></div>
      <div class="day-col"><span class="day-name">Sat</span><span class="day-num">17</span></div>
    </div>

    <div class="filter-pills">
      <div class="pill active">All Schedule (4)</div>
      <div class="pill">Sprint Review</div>
      <div class="pill">Client Demo</div>
    </div>

    <div class="timeline">
      <div class="timeline-card">
        <div class="t-time-row">
          <span class="t-time">09:30 AM — 10:30 AM</span>
          <span class="badge badge-primary">Design Team</span>
        </div>
        <div class="t-title">Sprint 42: UI Kit Review & Token Sync</div>
        <div class="t-meta">
          <span style="font-size:11px; color:#64748B;">📍 Room 302 • HQ</span>
          <div class="t-avatars">
            <div class="t-avatar" style="background:#4361EE; color:#fff; font-size:9px; display:flex; align-items:center; justify-content:center; font-weight:700;">AS</div>
            <div class="t-avatar" style="background:#10B981; color:#fff; font-size:9px; display:flex; align-items:center; justify-content:center; font-weight:700;">LP</div>
            <div class="t-avatar" style="background:#F59E0B; color:#fff; font-size:9px; display:flex; align-items:center; justify-content:center; font-weight:700;">SJ</div>
          </div>
        </div>
      </div>

      <div class="timeline-card green">
        <div class="t-time-row">
          <span class="t-time">11:00 AM — 12:00 PM</span>
          <span class="badge badge-success">Client Sync</span>
        </div>
        <div class="t-title">Fintech Partner Demo: Mobile Handover</div>
        <div class="t-meta">
          <span style="font-size:11px; color:#64748B;">🌐 Google Meet • 8 Guests</span>
          <span class="badge" style="background:#DCFCE7; color:#15803D;">Confirmed</span>
        </div>
      </div>

      <div class="timeline-card purple">
        <div class="t-time-row">
          <span class="t-time">02:30 PM — 03:45 PM</span>
          <span class="badge badge-purple">Executive</span>
        </div>
        <div class="t-title">Q4 Product Roadmap & OKR Alignment</div>
        <div class="t-meta">
          <span style="font-size:11px; color:#64748B;">📍 Main Boardroom</span>
          <div class="t-avatars">
            <div class="t-avatar" style="background:#8B5CF6; color:#fff; font-size:9px; display:flex; align-items:center; justify-content:center;">MV</div>
            <div class="t-avatar" style="background:#EC4899; color:#fff; font-size:9px; display:flex; align-items:center; justify-content:center;">EC</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="fab-btn">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
  </div>

  <div class="bottom-nav">
    <div class="nav-item">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      Home
    </div>
    <div class="nav-item active">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Calendar
    </div>
    <div class="nav-item">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      Tasks
    </div>
    <div class="nav-item">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      Mail
    </div>
    <div class="nav-item">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      More
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 2. Task Detail Screen HTML
function getTaskDetailHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getBaseStyles('light')}
.task-id-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task-badge {
  background: #EEF2FF;
  color: #4361EE;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 8px;
}
.task-title {
  font-size: 19px;
  font-weight: 700;
  line-height: 1.3;
  color: #0F172A;
  margin-top: 4px;
}
.meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 12px;
}
.meta-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.meta-lbl { font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; }
.meta-val { font-size: 13px; font-weight: 600; color: #0F172A; display: flex; align-items: center; gap: 6px; }
.meta-avt { width: 20px; height: 20px; border-radius: 50%; background: #4361EE; color: #fff; font-size: 10px; display: inline-flex; align-items: center; justify-content: center; }

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: #0F172A;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.progress-bar-wrap {
  width: 100%;
  height: 6px;
  background: #E2E8F0;
  border-radius: 3px;
  overflow: hidden;
  margin: 6px 0;
}
.progress-bar-fill {
  width: 75%;
  height: 100%;
  background: linear-gradient(90deg, #4361EE, #10B981);
  border-radius: 3px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid #F1F5F9;
  font-size: 13px;
  color: #334155;
}
.check-item:last-child { border-bottom: none; }
.checkbox {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 2px solid #CBD5E1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.checkbox.done {
  background: #4361EE;
  border-color: #4361EE;
  color: #FFFFFF;
}
.check-item.done-text {
  text-decoration: line-through;
  color: #94A3B8;
}

.attachment-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 8px 10px;
}
.file-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #FFFFFF;
}

.bottom-action-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: #FFFFFF;
  border-top: 1px solid #E2E8F0;
  padding: 10px 18px 20px;
  display: flex;
  gap: 10px;
  z-index: 40;
}
.btn {
  flex: 1;
  height: 44px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
}
.btn-primary { background: #4361EE; color: #FFFFFF; box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3); }
.btn-secondary { background: #F1F5F9; color: #334155; }
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#0F172A"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#0F172A"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#0F172A"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#0F172A"/><path d="M20 3.5V7.5" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="app-header">
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </div>
    <div class="header-title">Task Details</div>
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
    </div>
  </div>

  <div class="screen-content" style="padding-bottom: 84px;">
    <div>
      <div class="task-id-bar">
        <span class="task-badge">#TASK-1042</span>
        <div style="display:flex; gap:6px;">
          <span class="badge badge-warning">High Priority</span>
          <span class="badge badge-primary">In Progress</span>
        </div>
      </div>
      <div class="task-title">Revamp Mobile Onboarding & Biometrics Flow</div>
    </div>

    <!-- Meta Details Grid -->
    <div class="meta-grid">
      <div class="meta-cell">
        <span class="meta-lbl">Assignee</span>
        <span class="meta-val"><span class="meta-avt">AS</span> Alex Smith</span>
      </div>
      <div class="meta-cell">
        <span class="meta-lbl">Due Date</span>
        <span class="meta-val" style="color:#DC2626;">Oct 18, 2026</span>
      </div>
      <div class="meta-cell">
        <span class="meta-lbl">Project</span>
        <span class="meta-val">TaskSync Core</span>
      </div>
      <div class="meta-cell">
        <span class="meta-lbl">Reporter</span>
        <span class="meta-val">Sarah Jenkins</span>
      </div>
    </div>

    <!-- Subtasks Checklist Card -->
    <div class="card" style="padding:14px;">
      <div class="section-title">
        <span>Subtasks Checklist</span>
        <span style="font-size:12px; color:#4361EE;">3 of 4 Done (75%)</span>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill"></div>
      </div>

      <div class="check-item done-text">
        <div class="checkbox done">✓</div>
        <span>Competitor benchmark audit & teardown</span>
      </div>
      <div class="check-item done-text">
        <div class="checkbox done">✓</div>
        <span>Wireframe FaceID & OTP fallback states</span>
      </div>
      <div class="check-item done-text">
        <div class="checkbox done">✓</div>
        <span>High-fidelity design components in Figma</span>
      </div>
      <div class="check-item">
        <div class="checkbox"></div>
        <span style="font-weight:600; color:#0F172A;">Interactive prototype & usability test</span>
      </div>
    </div>

    <!-- Attachments -->
    <div class="card" style="padding:14px;">
      <div class="section-title" style="margin-bottom:8px;">
        <span>Attached Files (2)</span>
        <span style="font-size:11px; color:#64748B;">+ Add File</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <div class="attachment-card">
          <div class="file-icon" style="background:#8B5CF6;">FIG</div>
          <div style="flex:1;">
            <div style="font-size:12px; font-weight:700; color:#0F172A;">Onboarding_Flow_v2.4.fig</div>
            <div style="font-size:11px; color:#64748B;">14.2 MB • Updated 2h ago</div>
          </div>
        </div>
        <div class="attachment-card">
          <div class="file-icon" style="background:#EF4444;">PDF</div>
          <div style="flex:1;">
            <div style="font-size:12px; font-weight:700; color:#0F172A;">Usability_Test_Script.pdf</div>
            <div style="font-size:11px; color:#64748B;">2.8 MB • Sarah J.</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-action-bar">
    <button class="btn btn-secondary">Edit Task</button>
    <button class="btn btn-primary">Complete Subtask</button>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 3. Request Center Screen HTML
function getRequestHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getBaseStyles('light')}
.request-tabs {
  display: flex;
  background: #F1F5F9;
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
}
.req-tab {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  color: #64748B;
}
.req-tab.active {
  background: #FFFFFF;
  color: #4361EE;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}
.form-label {
  font-size: 12px;
  font-weight: 700;
  color: #334155;
  display: flex;
  justify-content: space-between;
}
.input-box {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 13px;
  color: #0F172A;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.date-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.summary-banner {
  background: #EEF2FF;
  border: 1px dashed #4361EE;
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.approval-flow {
  background: #FFFFFF;
  border-radius: 14px;
  border: 1px solid #E2E8F0;
  padding: 14px;
}
.step-node {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}
.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #4361EE;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.step-circle.wait {
  background: #F1F5F9;
  border: 2px solid #CBD5E1;
  color: #64748B;
}
.step-line {
  width: 2px;
  height: 18px;
  background: #E2E8F0;
  margin-left: 13px;
}
.submit-btn {
  height: 48px;
  background: linear-gradient(135deg, #4361EE, #3A0CA3);
  color: #FFFFFF;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(67, 97, 238, 0.35);
  margin-top: 6px;
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#0F172A"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#0F172A"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#0F172A"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#0F172A"/><path d="M20 3.5V7.5" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="app-header">
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </div>
    <div class="header-title">Create Request</div>
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    </div>
  </div>

  <div class="screen-content">
    <div class="request-tabs">
      <div class="req-tab active">Paid Leave</div>
      <div class="req-tab">Overtime</div>
      <div class="req-tab">Expense</div>
      <div class="req-tab">Device</div>
    </div>

    <div class="card" style="padding:14px;">
      <div class="form-group">
        <div class="form-label">
          <span>Leave Type</span>
          <span style="color:#059669; font-weight:600;">12.5 Days Available</span>
        </div>
        <div class="input-box">
          <span>Annual Paid Leave (AL)</span>
          <span style="color:#64748B;">▾</span>
        </div>
      </div>

      <div class="form-group">
        <div class="form-label">Date Range</div>
        <div class="date-row">
          <div class="input-box">
            <div>
              <div style="font-size:10px; color:#64748B;">FROM</div>
              <div style="font-weight:700;">Oct 15, 2026</div>
            </div>
            📅
          </div>
          <div class="input-box">
            <div>
              <div style="font-size:10px; color:#64748B;">TO</div>
              <div style="font-weight:700;">Oct 16, 2026</div>
            </div>
            📅
          </div>
        </div>
      </div>

      <div class="summary-banner">
        <span style="font-size:12px; font-weight:700; color:#4361EE;">Total Deducted:</span>
        <span class="badge badge-primary" style="font-size:12px;">2 Working Days</span>
      </div>

      <div class="form-group" style="margin-top:10px; margin-bottom:0;">
        <div class="form-label">Reason / Notes</div>
        <div class="input-box" style="height:52px; align-items:flex-start;">
          <span style="color:#334155; font-size:12px;">Family personal matter. Sprint deliverables handed over to Linh P.</span>
        </div>
      </div>
    </div>

    <!-- Approval Route Card -->
    <div class="approval-flow">
      <div style="font-size:13px; font-weight:700; margin-bottom:10px; color:#0F172A;">Approval Hierarchy</div>
      <div class="step-node">
        <div class="step-circle">1</div>
        <div>
          <div style="font-size:13px; font-weight:700;">Sarah Jenkins</div>
          <div style="font-size:11px; color:#64748B;">Direct Lead • Design Team (Pending)</div>
        </div>
      </div>
      <div class="step-line"></div>
      <div class="step-node">
        <div class="step-circle wait">2</div>
        <div>
          <div style="font-size:13px; font-weight:600; color:#64748B;">Michael Vance</div>
          <div style="font-size:11px; color:#94A3B8;">HR Operations Director</div>
        </div>
      </div>
    </div>

    <button class="submit-btn">Submit Leave Request</button>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 4. Salary & Payroll Hub Screen HTML
function getSalaryHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getBaseStyles('light')}
.salary-hero {
  background: linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4361EE 100%);
  border-radius: 18px;
  padding: 18px;
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(49, 46, 129, 0.35);
}
.salary-hero::after {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 130px;
  height: 130px;
  background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
  border-radius: 50%;
}
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.5);
  color: #34D399;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 20px;
}
.salary-amt {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 10px 0 4px;
}
.salary-meta {
  font-size: 11px;
  color: #C7D2FE;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255,255,255,0.15);
  padding-top: 10px;
  margin-top: 10px;
}

.stat-strip {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
.stat-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 10px 8px;
  text-align: center;
}
.stat-val { font-size: 15px; font-weight: 800; color: #0F172A; }
.stat-lbl { font-size: 10px; font-weight: 600; color: #64748B; margin-top: 2px; }

.breakdown-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 14px;
}
.row-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 13px;
  border-bottom: 1px dashed #F1F5F9;
}
.row-item:last-child { border-bottom: none; }
.row-lbl { color: #475569; display: flex; align-items: center; gap: 6px; }
.row-val { font-weight: 700; color: #0F172A; }
.row-val.plus { color: #059669; }
.row-val.minus { color: #DC2626; }

.export-btn {
  height: 44px;
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  color: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#0F172A"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#0F172A"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#0F172A"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#0F172A"/><path d="M20 3.5V7.5" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="app-header">
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </div>
    <div class="header-title">Salary & Payroll</div>
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </div>
  </div>

  <div class="screen-content">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:13px; font-weight:700; color:#64748B;">Payroll Cycle:</span>
      <span class="badge badge-primary" style="font-size:12px;">September 2026 ▾</span>
    </div>

    <!-- Salary Hero Card -->
    <div class="salary-hero">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:12px; font-weight:600; color:#E0E7FF;">Net Take-Home Pay</span>
        <span class="hero-tag">● Disbursed</span>
      </div>
      <div class="salary-amt">$4,850.00</div>
      <div class="salary-meta">
        <span>Transferred to Chase Bank (••4921)</span>
        <span>Sep 30, 2026</span>
      </div>
    </div>

    <!-- Attendance Stats -->
    <div class="stat-strip">
      <div class="stat-box">
        <div class="stat-val" style="color:#059669;">22 / 22</div>
        <div class="stat-lbl">Days Present</div>
      </div>
      <div class="stat-box">
        <div class="stat-val" style="color:#4361EE;">8.5 hrs</div>
        <div class="stat-lbl">Overtime Log</div>
      </div>
      <div class="stat-box">
        <div class="stat-val" style="color:#8B5CF6;">100%</div>
        <div class="stat-lbl">Punctuality</div>
      </div>
    </div>

    <!-- Breakdown Details -->
    <div class="breakdown-card">
      <div style="font-size:13px; font-weight:700; margin-bottom:8px; color:#0F172A;">Earnings & Deductions</div>
      
      <div class="row-item">
        <span class="row-lbl">Base Monthly Salary</span>
        <span class="row-val">$4,200.00</span>
      </div>
      <div class="row-item">
        <span class="row-lbl">Sprint Performance Bonus</span>
        <span class="row-val plus">+$850.00</span>
      </div>
      <div class="row-item">
        <span class="row-lbl">Remote Connectivity Stipend</span>
        <span class="row-val plus">+$150.00</span>
      </div>
      <div class="row-item">
        <span class="row-lbl">Total Gross Income</span>
        <span class="row-val">$5,200.00</span>
      </div>
      <div class="row-item">
        <span class="row-lbl">Withholding Tax & Social Ins.</span>
        <span class="row-val minus">-$350.00</span>
      </div>
    </div>

    <div class="export-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Download Official Payslip (PDF)
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 5. Performance Report Screen HTML
function getReportHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getBaseStyles('light')}
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.metric-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 12px;
}
.metric-val { font-size: 22px; font-weight: 800; color: #0F172A; }
.metric-title { font-size: 11px; font-weight: 600; color: #64748B; margin-top: 2px; }
.trend-up { font-size: 11px; font-weight: 700; color: #059669; }

.chart-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 14px;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.bars-wrap {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 110px;
  padding-bottom: 6px;
  border-bottom: 1px solid #E2E8F0;
}
.bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 44px;
}
.bar-body {
  width: 28px;
  border-radius: 6px 6px 0 0;
  background: #4361EE;
}
.bar-lbl { font-size: 11px; font-weight: 600; color: #64748B; }

.category-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 12px;
}
.cat-progress {
  flex: 1;
  height: 6px;
  background: #F1F5F9;
  border-radius: 3px;
  margin: 0 10px;
  overflow: hidden;
}
.cat-fill { height: 100%; border-radius: 3px; }

.badge-score {
  background: linear-gradient(135deg, #10B981, #059669);
  color: #FFFFFF;
  padding: 8px 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#0F172A"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#0F172A"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#0F172A"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#0F172A"/><path d="M20 3.5V7.5" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="app-header">
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </div>
    <div class="header-title">Performance Report</div>
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
    </div>
  </div>

  <div class="screen-content">
    <div class="metrics-grid">
      <div class="metric-box">
        <div class="trend-up">↑ +4.2%</div>
        <div class="metric-val">168.5h</div>
        <div class="metric-title">Total Hours Logged</div>
      </div>
      <div class="metric-box">
        <div class="trend-up">↑ 98% rate</div>
        <div class="metric-val">42 Tasks</div>
        <div class="metric-title">Completed On-Time</div>
      </div>
      <div class="metric-box">
        <div class="trend-up">Top 5%</div>
        <div class="metric-val">46 pts</div>
        <div class="metric-title">Sprint Velocity</div>
      </div>
      <div class="metric-box">
        <div class="trend-up">Streak 45d</div>
        <div class="metric-val">100%</div>
        <div class="metric-title">Attendance Index</div>
      </div>
    </div>

    <!-- Weekly Chart -->
    <div class="chart-card">
      <div class="chart-header">
        <span style="font-size:13px; font-weight:700; color:#0F172A;">Weekly Hours Distribution</span>
        <span style="font-size:11px; color:#4361EE; font-weight:600;">Avg: 42h/wk</span>
      </div>
      <div class="bars-wrap">
        <div class="bar-col">
          <div style="font-size:10px; font-weight:700; color:#64748B;">40h</div>
          <div class="bar-body" style="height:65px; background:#93C5FD;"></div>
          <span class="bar-lbl">W1</span>
        </div>
        <div class="bar-col">
          <div style="font-size:10px; font-weight:700; color:#64748B;">44h</div>
          <div class="bar-body" style="height:76px; background:#8B5CF6;"></div>
          <span class="bar-lbl">W2</span>
        </div>
        <div class="bar-col">
          <div style="font-size:10px; font-weight:700; color:#64748B;">42h</div>
          <div class="bar-body" style="height:70px; background:#4361EE;"></div>
          <span class="bar-lbl">W3</span>
        </div>
        <div class="bar-col">
          <div style="font-size:10px; font-weight:700; color:#64748B;">42.5h</div>
          <div class="bar-body" style="height:72px; background:#10B981;"></div>
          <span class="bar-lbl">W4</span>
        </div>
      </div>
    </div>

    <!-- Category Breakdown -->
    <div class="card" style="padding:14px;">
      <div style="font-size:13px; font-weight:700; margin-bottom:8px; color:#0F172A;">Time Allocation by Domain</div>
      <div class="category-row">
        <span style="width:75px; color:#334155;">UI/UX Design</span>
        <div class="cat-progress"><div class="cat-fill" style="width:55%; background:#4361EE;"></div></div>
        <span style="font-weight:700;">55%</span>
      </div>
      <div class="category-row">
        <span style="width:75px; color:#334155;">Sync & Calls</span>
        <div class="cat-progress"><div class="cat-fill" style="width:25%; background:#8B5CF6;"></div></div>
        <span style="font-weight:700;">25%</span>
      </div>
      <div class="category-row">
        <span style="width:75px; color:#334155;">QA & Reviews</span>
        <div class="cat-progress"><div class="cat-fill" style="width:12%; background:#10B981;"></div></div>
        <span style="font-weight:700;">12%</span>
      </div>
    </div>

    <div class="badge-score">
      <div>
        <div style="font-size:11px; opacity:0.9;">Quarterly Review Rating</div>
        <div style="font-size:15px; font-weight:800;">A+ (Outstanding Performance)</div>
      </div>
      <span style="font-size:20px;">⭐</span>
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 6. Goals & OKRs Screen HTML
function getGoalsHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getBaseStyles('light')}
.goals-hero {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.progress-ring-box {
  width: 70px;
  height: 70px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.progress-num { font-size: 18px; font-weight: 800; color: #4361EE; }

.goal-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.goal-title {
  font-size: 14px;
  font-weight: 700;
  color: #0F172A;
  line-height: 1.3;
}
.kr-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px 0;
  border-top: 1px solid #F1F5F9;
}
.kr-title { font-size: 12px; color: #334155; display: flex; justify-content: space-between; }
.kr-bar {
  height: 5px;
  background: #F1F5F9;
  border-radius: 3px;
  overflow: hidden;
}
.kr-fill { height: 100%; border-radius: 3px; }

.fab-add {
  position: absolute;
  right: 20px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #4361EE;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#0F172A"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#0F172A"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#0F172A"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#0F172A"/><path d="M20 3.5V7.5" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="app-header">
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </div>
    <div class="header-title">OKRs & Goals</div>
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="12 8 8 12 12 16 12 8"/></svg>
    </div>
  </div>

  <div class="screen-content">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:13px; font-weight:700; color:#64748B;">Target Period:</span>
      <span class="badge badge-primary" style="font-size:12px;">Q4 2026 OKRs ▾</span>
    </div>

    <!-- Goals Hero -->
    <div class="goals-hero">
      <div>
        <div style="font-size:12px; font-weight:600; color:#64748B;">Overall Progress</div>
        <div style="font-size:24px; font-weight:800; color:#0F172A; margin: 2px 0;">78% Complete</div>
        <span class="badge badge-success">Ahead of Schedule</span>
      </div>
      <div class="progress-ring-box">
        <svg width="70" height="70" viewBox="0 0 36 36">
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" stroke-width="3.5"/>
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4361EE" stroke-width="3.5" stroke-dasharray="78, 100"/>
        </svg>
        <span class="progress-num" style="position:absolute;">78%</span>
      </div>
    </div>

    <!-- Goal 1 -->
    <div class="goal-card">
      <div class="goal-header">
        <div>
          <span class="badge badge-success" style="margin-bottom:4px;">On Track • 85%</span>
          <div class="goal-title">🚀 Scale Design System v2.0 Across Mobile & Web</div>
        </div>
      </div>
      <div class="kr-item">
        <div class="kr-title"><span>KR 1: Publish 40 core component tokens</span><span style="font-weight:700;">100%</span></div>
        <div class="kr-bar"><div class="kr-fill" style="width:100%; background:#10B981;"></div></div>
      </div>
      <div class="kr-item">
        <div class="kr-title"><span>KR 2: Achieve 90% mobile dev adoption</span><span style="font-weight:700;">75%</span></div>
        <div class="kr-bar"><div class="kr-fill" style="width:75%; background:#4361EE;"></div></div>
      </div>
      <div class="kr-item">
        <div class="kr-title"><span>KR 3: Zero accessibility AA defects</span><span style="font-weight:700;">80%</span></div>
        <div class="kr-bar"><div class="kr-fill" style="width:80%; background:#4361EE;"></div></div>
      </div>
    </div>

    <!-- Goal 2 -->
    <div class="goal-card">
      <div class="goal-header">
        <div>
          <span class="badge badge-warning" style="margin-bottom:4px;">Attention Needed • 64%</span>
          <div class="goal-title">📱 Launch TaskSync Mobile v2.4 to Beta</div>
        </div>
      </div>
      <div class="kr-item">
        <div class="kr-title"><span>KR 1: Finalize 20 high-fidelity screens</span><span style="font-weight:700;">90%</span></div>
        <div class="kr-bar"><div class="kr-fill" style="width:90%; background:#10B981;"></div></div>
      </div>
      <div class="kr-item">
        <div class="kr-title"><span>KR 2: Complete usability tests with 50 users</span><span style="font-weight:700;">45%</span></div>
        <div class="kr-bar"><div class="kr-fill" style="width:45%; background:#F59E0B;"></div></div>
      </div>
    </div>
  </div>

  <div class="fab-add">+</div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

// 7. Smart Reminders & Contextual Alerts Screen HTML
function getReminderHTML() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getBaseStyles('light')}
.geofence-banner {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.geo-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #4361EE;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.reminder-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.reminder-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.rem-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.rem-title { font-size: 13px; font-weight: 700; color: #0F172A; }
.rem-time { font-size: 11px; color: #64748B; display: flex; align-items: center; gap: 4px; }
.toggle-switch {
  width: 42px;
  height: 24px;
  border-radius: 12px;
  background: #4361EE;
  position: relative;
  flex-shrink: 0;
}
.toggle-switch.off {
  background: #CBD5E1;
}
.toggle-knob {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #FFFFFF;
  position: absolute;
  top: 2px;
  right: 2px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.toggle-switch.off .toggle-knob {
  left: 2px;
  right: auto;
}

.quick-add-bar {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #94A3B8;
  font-size: 13px;
}
</style>
</head>
<body>
  <div class="status-bar">
    <span>9:41</span>
    <div class="status-icons">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 9.5H3V11.5H1V9.5ZM5 7H7V11.5H5V7ZM9 4.5H11V11.5H9V4.5ZM13 1H15V11.5H13V1Z" fill="#0F172A"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.4 5.1L14.7 3.8C12.8 1.9 10.3 0.7 7.5 0.7C4.7 0.7 2.2 1.9 0.3 3.8L1.6 5.1C3.1 3.5 5.2 2.5 7.5 2.5ZM7.5 6C8.9 6 10.2 6.6 11.1 7.6L12.4 6.3C11.1 5 9.4 4.2 7.5 4.2C5.6 4.2 3.9 5 2.6 6.3L3.9 7.6C4.8 6.6 6.1 6 7.5 6ZM7.5 9.5C8.3 9.5 9 10.2 9 11H6C6 10.2 6.7 9.5 7.5 9.5Z" fill="#0F172A"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#0F172A"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="#0F172A"/><path d="M20 3.5V7.5" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div class="app-header">
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </div>
    <div class="header-title">Smart Reminders</div>
    <div class="icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </div>
  </div>

  <div class="screen-content">
    <!-- Geofence Trigger Notice -->
    <div class="geofence-banner">
      <div class="geo-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
      <div>
        <div style="font-size:12px; font-weight:700; color:#1E40AF;">Office Geofence Active</div>
        <div style="font-size:11px; color:#3B82F6;">Auto-triggers check-in alert when within 100m of HQ Tower.</div>
      </div>
    </div>

    <!-- Reminder Items -->
    <div class="reminder-list">
      <div class="reminder-card">
        <div class="rem-main">
          <div style="display:flex; gap:6px;">
            <span class="badge badge-danger">Urgent</span>
            <span class="badge badge-primary">GPS Geofence</span>
          </div>
          <div class="rem-title">Check-in GPS Attendance before 09:00 AM</div>
          <div class="rem-time">⏰ Daily at 08:45 AM • HQ Office Zone</div>
        </div>
        <div class="toggle-switch"><div class="toggle-knob"></div></div>
      </div>

      <div class="reminder-card">
        <div class="rem-main">
          <span class="badge badge-warning" style="width:fit-content;">Payroll</span>
          <div class="rem-title">Submit Weekly Timesheet & Sprint Report</div>
          <div class="rem-time">⏰ Every Friday at 04:30 PM</div>
        </div>
        <div class="toggle-switch"><div class="toggle-knob"></div></div>
      </div>

      <div class="reminder-card">
        <div class="rem-main">
          <span class="badge badge-purple" style="width:fit-content;">Meeting</span>
          <div class="rem-title">Design Critique: Prepare Slide Deck</div>
          <div class="rem-time">⏰ Today, 01:45 PM (15m before event)</div>
        </div>
        <div class="toggle-switch"><div class="toggle-knob"></div></div>
      </div>

      <div class="reminder-card">
        <div class="rem-main">
          <span class="badge" style="background:#F1F5F9; color:#64748B; width:fit-content;">Approval</span>
          <div class="rem-title" style="color:#64748B;">Review Leave Request for Sarah Jenkins</div>
          <div class="rem-time">⏰ Tomorrow, 10:00 AM</div>
        </div>
        <div class="toggle-switch off"><div class="toggle-knob"></div></div>
      </div>
    </div>

    <!-- Quick Add -->
    <div class="quick-add-bar">
      <span>+ Add a smart reminder...</span>
      <div style="display:flex; gap:8px;">
        <span>🎙️</span>
        <span>📍</span>
      </div>
    </div>
  </div>
  <div class="home-indicator"></div>
</body>
</html>`;
}

const SCREENS = [
  { name: 'tasksync-calendar.png', htmlFn: getCalendarHTML },
  { name: 'tasksync-task-detail.png', htmlFn: getTaskDetailHTML },
  { name: 'tasksync-request.png', htmlFn: getRequestHTML },
  { name: 'tasksync-salary.png', htmlFn: getSalaryHTML },
  { name: 'tasksync-report.png', htmlFn: getReportHTML },
  { name: 'tasksync-goals.png', htmlFn: getGoalsHTML },
  { name: 'tasksync-reminder.png', htmlFn: getReminderHTML }
];

console.log('Starting generation of 7 screens...');

for (const screen of SCREENS) {
  const htmlPath = path.join(TEMP_DIR, screen.name.replace('.png', '.html'));
  const outPngPath = path.join(OUT_DIR, screen.name);

  fs.writeFileSync(htmlPath, screen.htmlFn(), 'utf8');

  const cmd = `"${EDGE_PATH}" --headless=new --screenshot="${outPngPath}" --window-size=375,812 --force-device-scale-factor=2 --hide-scrollbars "file:///${htmlPath.replace(/\\\\/g, '/')}"`;
  
  try {
    console.log(`Rendering ${screen.name}...`);
    execSync(cmd, { stdio: 'pipe' });
    
    // Give OS file system a small breath
    execSync('powershell -Command "Start-Sleep -Milliseconds 800"');

    if (fs.existsSync(outPngPath)) {
      const size = fs.statSync(outPngPath).size;
      console.log(`✔ SUCCESS: ${screen.name} (${size} bytes)`);
    } else {
      console.error(`✖ ERROR: ${screen.name} was not created`);
    }
  } catch (err) {
    console.error(`✖ EXCEPTION rendering ${screen.name}:`, err.message);
  }
}

console.log('All screens processed.');
